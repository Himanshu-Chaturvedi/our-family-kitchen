(() => {
  const state = {
    recipes: [],
    ingredients: [],
    categories: [],
    byId: {},
    selectedIngredients: [],
    matchMode: "any",
    servingBase: 4,
    servingCurrent: 4,
    currentRecipeId: null,
    plannerPick: null,
    dk: null,
    dkById: {},
    dkPick: null,
  };

  const DK_STATUS_LABELS = {
    "suitable-within-limits": "Suitable within configured dietary limits",
    "suitable-with-portion-adjustment": "Suitable with portion adjustment",
    "requires-ingredient-substitution": "Requires ingredient substitution",
    "requires-renal-dietitian-review": "Requires renal dietitian review",
    "not-recommended": "Not recommended under current configured restrictions",
  };

  const EMOJI = {
    potato: "🥔",
    paneer: "🧀",
    "green-peas": "🟢",
    bhindi: "🌿",
    rice: "🍚",
    sattu: "🥣",
    sweets: "🍮",
    default: "🍽️",
  };

  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  function $all(sel, root = document) {
    return [...root.querySelectorAll(sel)];
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2200);
  }

  function recipeEmoji(r) {
    const main = (r.mainIngredients || [])[0];
    if ((r.categories || []).includes("Diabetes Special")) return "🩺";
    if ((r.categories || []).includes("Sweets")) return "🍮";
    if ((r.categories || []).includes("Breakfast")) return "🌅";
    return EMOJI[main] || EMOJI.default;
  }

  function stepsFor(r) {
    return r.stepsHi && r.stepsHi.length ? r.stepsHi : r.steps || [];
  }

  function tipsFor(r) {
    return r.tipsHi && r.tipsHi.length ? r.tipsHi : r.tips || [];
  }

  function currentSeason() {
    const m = new Date().getMonth();
    if (m >= 2 && m <= 4) return "Summer";
    if (m >= 5 && m <= 8) return "Monsoon";
    if (m >= 9 && m <= 10) return "Autumn";
    return "Winter";
  }

  function showView(id) {
    $all(".view").forEach((v) => v.classList.remove("active"));
    const el = document.getElementById("view-" + id);
    if (el) el.classList.add("active");
    $all(".bottom-nav button").forEach((b) => {
      b.classList.toggle("active", b.dataset.nav === id);
    });
  }

  function scaleQty(q, base, current) {
    if (typeof q !== "number") return q;
    const n = (q * current) / base;
    return Math.round(n * 100) / 100;
  }

  async function loadData() {
    const [recipesRes, ingRes, catRes, dkRes] = await Promise.all([
      fetch("data/recipes.json"),
      fetch("data/ingredients.json"),
      fetch("data/categories.json"),
      fetch("data/dk-recipes.json"),
    ]);
    const recipesData = await recipesRes.json();
    const ingData = await ingRes.json();
    const catData = await catRes.json();
    state.dk = await dkRes.json();
    state.recipes = recipesData.recipes || [];
    state.ingredients = ingData.ingredients || [];
    state.categories = catData.categories || [];
    state.byId = Object.fromEntries(state.recipes.map((r) => [r.id, r]));
    state.dkById = Object.fromEntries((state.dk.recipes || []).map((r) => [r.id, r]));
  }

  function renderHome() {
    showView("home");
    const season = currentSeason();
    $("#season-chip").textContent = `🌿 ${season} suggestion: try seasonal sabzi & soups`;
    const seasonal = state.recipes.filter(
      (r) => (r.season || []).includes(season) || (r.season || []).includes("All")
    );
    const tip = seasonal[Math.floor(Math.random() * Math.min(20, seasonal.length))];
    if (tip) {
      $("#season-chip").textContent = `🌿 ${season}: आज बनाएं — ${tip.nameHi || tip.name}`;
      $("#season-chip").onclick = () => Router.go("#/recipe/" + tip.id);
    }
  }

  function renderRecipeCard(r, extra = "") {
    const fav = Storage.isFavourite(r.id) ? "❤️" : "🤍";
    return `<button class="recipe-card" data-id="${r.id}">
      <div class="recipe-emoji">${recipeEmoji(r)}</div>
      <div>
        <h3>${r.name}</h3>
        <div class="meta">${r.nameHi} · ${r.prepTime + r.cookTime} min · ${r.difficulty}${extra}</div>
      </div>
      <div class="fav-mark">${fav}</div>
    </button>`;
  }

  function bindRecipeCards(container) {
    $all(".recipe-card", container).forEach((btn) => {
      btn.addEventListener("click", () => Router.go("#/recipe/" + btn.dataset.id));
    });
  }

  function renderList(title, recipes, opts = {}) {
    showView("list");
    $("#list-title").textContent = title;
    const box = $("#recipe-list");
    if (!recipes.length) {
      box.innerHTML = `<div class="empty">कोई रेसिपी नहीं मिली · No recipes found</div>`;
      return;
    }
    box.innerHTML = recipes.map((r) => renderRecipeCard(r, opts.extra ? opts.extra(r) : "")).join("");
    bindRecipeCards(box);
  }

  function renderCategory(cat) {
    Filters.set({ category: cat, query: "" });
    const list = Search.search(state.recipes, "", { category: cat });
    renderList(cat, list);
  }

  function renderSearch(query) {
    Filters.set({ query });
    const f = Filters.get();
    const list = Search.search(state.recipes, query, {
      category: f.category,
      season: f.season,
      difficulty: f.difficulty,
    });
    renderList(query ? `Search: ${query}` : "All Recipes", list);
  }

  function renderRecipe(id) {
    const r = state.byId[id];
    if (!r) {
      toast("Recipe not found");
      Router.go("#/home");
      return;
    }
    state.currentRecipeId = id;
    state.servingBase = r.servings || 4;
    state.servingCurrent = r.servings || 4;
    showView("recipe");
    const root = $("#view-recipe");
    const favLabel = Storage.isFavourite(id) ? "❤️ Favourited" : "🤍 Favourite";
    root.innerHTML = `
      <div class="page-header">
        <button type="button" class="back-btn" id="back-from-recipe" aria-label="Back">←</button>
        <h2>Recipe</h2>
      </div>
      <div class="detail-hero">
        <div class="detail-emoji">${recipeEmoji(r)}</div>
        <h2>${r.name}</h2>
        <div class="hi-name">${r.nameHi}</div>
        <div class="meta" style="margin-top:0.4rem">${(r.region || []).join(" · ")}</div>
        <div class="meta-grid">
          <div class="meta-pill"><strong>Prep</strong>${r.prepTime} min</div>
          <div class="meta-pill"><strong>Cook</strong>${r.cookTime} min</div>
          <div class="meta-pill"><strong>Serves</strong><span id="serve-label">${r.servings}</span></div>
          <div class="meta-pill"><strong>Level</strong>${r.difficulty}</div>
        </div>
        <div class="serving-control">
          <button type="button" id="serve-minus">−</button>
          <div>Servings: <strong id="serve-count">${state.servingCurrent}</strong></div>
          <button type="button" id="serve-plus">+</button>
        </div>
        <div class="action-row">
          <button class="btn btn-ghost" id="btn-fav">${favLabel}</button>
          <button class="btn btn-ghost" id="btn-cooked">✅ Cooked</button>
        </div>
        <button class="btn btn-primary btn-block" id="btn-cook">👩‍🍳 Start Cooking</button>
      </div>
      <div class="panel">
        <h3>Ingredients · सामग्री</h3>
        <ul class="ingredient-list" id="ing-list"></ul>
      </div>
      <div class="panel">
        <h3>विधि · Steps (Hinglish)</h3>
        <ol class="steps-list">${stepsFor(r).map((s) => `<li>${s}</li>`).join("")}</ol>
      </div>
      ${tipsFor(r).length ? `<div class="panel tips"><strong>टिप्स:</strong><br>${tipsFor(r).join("<br>")}</div>` : ""}
      ${r.diabetesNotes ? `<div class="panel tips"><strong>🩺 डायबिटीज नोट:</strong><br>${r.diabetesNotes}</div>` : ""}
      <div class="panel"><div class="meta">Categories: ${(r.categories || []).join(", ")} · Diet: ${r.diet}</div></div>
    `;
    renderIngredients(r);
    $("#back-from-recipe").onclick = () => Router.back("#/home");
    $("#serve-minus").onclick = () => {
      if (state.servingCurrent > 1) {
        state.servingCurrent -= 1;
        renderIngredients(r);
      }
    };
    $("#serve-plus").onclick = () => {
      state.servingCurrent += 1;
      renderIngredients(r);
    };
    $("#btn-fav").onclick = () => {
      Storage.toggleFavourite(id);
      toast(Storage.isFavourite(id) ? "Added to favourites" : "Removed from favourites");
      renderRecipe(id);
    };
    $("#btn-cooked").onclick = () => {
      Storage.markCooked(id);
      toast("Marked as cooked");
    };
    $("#btn-cook").onclick = () => Router.go("#/cooking/" + id);
  }

  function renderIngredients(r) {
    $("#serve-count").textContent = state.servingCurrent;
    $("#serve-label").textContent = state.servingCurrent;
    $("#ing-list").innerHTML = (r.ingredients || [])
      .map((ing) => {
        const q = scaleQty(ing.quantity, state.servingBase, state.servingCurrent);
        return `<li>${q} ${ing.unit} ${ing.name}</li>`;
      })
      .join("");
  }

  function renderCooking(id) {
    const r = state.byId[id];
    if (!r) return Router.go("#/home");
    const cur = CookingMode.start(r);
    showView("cooking");
    paintCooking(cur);
  }

  function paintCooking(cur) {
    const root = $("#view-cooking");
    root.innerHTML = `
      <div class="page-header">
        <button class="back-btn" id="exit-cook">✕</button>
        <h2>${cur.recipe.nameHi}</h2>
      </div>
      <div class="panel" style="margin-top:0">
        <strong>Ingredients at a glance</strong>
        <div class="meta" style="margin-top:0.4rem">${(cur.recipe.ingredients || [])
          .slice(0, 8)
          .map((i) => i.name)
          .join(" · ")}</div>
      </div>
      <div class="cooking-screen">
        <div class="cooking-step">
          <div class="step-num">स्टेप ${cur.index + 1} / ${cur.total}</div>
          <p>${cur.text}</p>
        </div>
        <div class="cooking-nav">
          <button class="btn btn-ghost" id="cook-prev" ${cur.isFirst ? "disabled" : ""}>← पिछला</button>
          <button class="btn btn-primary" id="cook-next">${cur.isLast ? "हो गया ✓" : "अगला →"}</button>
        </div>
      </div>
    `;
    $("#exit-cook").onclick = () => {
      CookingMode.exit();
      Router.back("#/recipe/" + cur.recipe.id);
    };
    $("#cook-prev").onclick = () => paintCooking(CookingMode.prev());
    $("#cook-next").onclick = () => {
      if (cur.isLast) {
        Storage.markCooked(cur.recipe.id);
        CookingMode.exit();
        toast("शाबाश! Cooking done");
        Router.go("#/recipe/" + cur.recipe.id, { replace: true });
      } else paintCooking(CookingMode.next());
    };
  }

  function ingredientCategories() {
    const order = [
      "Potato", "Paneer", "Matar", "Bhindi", "Lauki", "Gobhi", "Baingan", "Tinda",
      "Parwal", "Kaddu", "Karela", "Palak", "Methi", "Mushroom", "Chana", "Rajma",
      "Lobia", "Sattu", "Rice", "Dal", "Seasonal vegetables",
    ];
    const map = {};
    state.ingredients.forEach((ing) => {
      const c = ing.category || "Seasonal vegetables";
      if (!map[c]) map[c] = [];
      map[c].push(ing);
    });
    return order.filter((c) => map[c]).map((c) => ({ name: c, items: map[c] }));
  }

  function renderFinder() {
    showView("finder");
    const root = $("#finder-chips");
    const groups = ingredientCategories();
    const featured = [];
    groups.forEach((g) => {
      const pick = g.items.find((i) => i.category === g.name) || g.items[0];
      if (pick) featured.push(pick);
    });
    // show one chip per category (main veg) plus allow expanding
    root.innerHTML = featured
      .map((ing) => {
        const active = state.selectedIngredients.includes(ing.id) ? "active" : "";
        return `<button class="ing-chip ${active}" data-id="${ing.id}">${ing.nameHi}<br><small>${ing.name}</small></button>`;
      })
      .join("");
    $all(".ing-chip", root).forEach((btn) => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const i = state.selectedIngredients.indexOf(id);
        if (i >= 0) state.selectedIngredients.splice(i, 1);
        else state.selectedIngredients.push(id);
        renderFinder();
      };
    });
    $all(".match-mode .chip").forEach((c) => {
      c.classList.toggle("active", c.dataset.mode === state.matchMode);
      c.onclick = () => {
        state.matchMode = c.dataset.mode;
        renderFinderResults();
        renderFinder();
      };
    });
    renderFinderResults();
  }

  function renderFinderResults() {
    const box = $("#finder-results");
    const matches = Search.byIngredients(state.recipes, state.selectedIngredients, state.matchMode);
    if (!state.selectedIngredients.length) {
      box.innerHTML = `<div class="empty">सब्जी चुनें · Select vegetables above</div>`;
      return;
    }
    if (!matches.length) {
      box.innerHTML = `<div class="empty">No matching recipes</div>`;
      return;
    }
    const nameOf = Object.fromEntries(state.ingredients.map((i) => [i.id, i.name]));
    box.innerHTML = matches
      .map(({ recipe, matched, missing }) => {
        const used = `<div class="meta">Uses: ${matched.map((m) => nameOf[m] || m).join(", ")}</div>`;
        const miss =
          state.matchMode === "all" && missing.length
            ? `<div class="missing">Missing: ${missing.map((m) => nameOf[m] || m).join(", ")}</div>`
            : state.matchMode === "any" && missing.length
              ? `<div class="missing">Not in this dish: ${missing.map((m) => nameOf[m] || m).join(", ")}</div>`
              : "";
        return `${renderRecipeCard(recipe)}${used}${miss}`;
      })
      .join("");
    // rebind — cards are mixed with missing divs
    bindRecipeCards(box);
  }

  function renderFavourites() {
    const ids = Storage.getFavourites();
    const list = ids.map((id) => state.byId[id]).filter(Boolean);
    renderList("Favourite Recipes · पसंदीदा", list);
  }

  function renderRecent() {
    const ids = Storage.getRecent().map((x) => x.id);
    const list = ids.map((id) => state.byId[id]).filter(Boolean);
    renderList("Recently Cooked · हाल ही में", list);
  }

  function renderRandom() {
    const r = state.recipes[Math.floor(Math.random() * state.recipes.length)];
    Router.go("#/recipe/" + r.id);
  }

  function renderPlanner() {
    showView("planner");
    const planner = Storage.getPlanner();
    const root = $("#planner-root");
    root.innerHTML = Planner.getDays()
      .map((day) => {
        const slots = Planner.getMeals()
          .map((meal) => {
            const id = planner[day][meal];
            const r = id ? state.byId[id] : null;
            return `<div class="meal-slot">
              <div><strong>${meal}</strong><br>${r ? r.nameHi + " / " + r.name : "<em>Not set</em>"}</div>
              <div>
                <button data-day="${day}" data-meal="${meal}" class="pick-meal">Change</button>
                ${r ? `<button data-day="${day}" data-meal="${meal}" class="clear-meal">✕</button>` : ""}
              </div>
            </div>`;
          })
          .join("");
        return `<div class="planner-day"><h3>${day}</h3>${slots}</div>`;
      })
      .join("");
    $all(".pick-meal", root).forEach((btn) => {
      btn.onclick = () => {
        state.plannerPick = { day: btn.dataset.day, meal: btn.dataset.meal };
        const pool =
          state.recipes.filter((r) => (r.categories || []).includes(btn.dataset.meal)) ||
          state.recipes;
        showView("list");
        $("#list-title").textContent = `Pick ${btn.dataset.meal} for ${btn.dataset.day}`;
        const box = $("#recipe-list");
        box.innerHTML = pool.slice(0, 80).map((r) => renderRecipeCard(r)).join("");
        $all(".recipe-card", box).forEach((card) => {
          card.onclick = () => {
            Planner.replaceSlot(state.plannerPick.day, state.plannerPick.meal, card.dataset.id);
            toast("Meal planned");
            Router.go("#/planner");
          };
        });
      };
    });
    $all(".clear-meal", root).forEach((btn) => {
      btn.onclick = () => {
        Planner.clearSlot(btn.dataset.day, btn.dataset.meal);
        renderPlanner();
      };
    });
  }

  function renderShopping() {
    showView("shopping");
    const planner = Storage.getPlanner();
    let items = Storage.getShopping();
    if (!items.length) {
      items = Shopping.buildFromPlanner(state.byId, planner);
      Storage.setShopping(items);
    }
    const custom = Storage.getCustomShop();
    const all = Shopping.mergeCustom(items.filter((i) => !i.custom), custom);
    const root = $("#shopping-list");
    root.innerHTML = all
      .map(
        (item, idx) => `<label class="shop-item ${item.checked ? "done" : ""}">
        <input type="checkbox" data-idx="${idx}" ${item.checked ? "checked" : ""} />
        <span>${item.quantity ? item.quantity + " " + item.unit + " " : ""}${item.name}</span>
      </label>`
      )
      .join("") || `<div class="empty">Shopping list empty. Generate from planner.</div>`;

    // store merged for toggling
    state._shopRender = all;
    $all("input[type=checkbox]", root).forEach((inp) => {
      inp.onchange = () => {
        const i = Number(inp.dataset.idx);
        all[i].checked = inp.checked;
        const generated = all.filter((x) => !x.custom);
        const customs = all.filter((x) => x.custom).map((x) => ({
          name: x.name,
          quantity: x.quantity,
          unit: x.unit,
          checked: x.checked,
        }));
        Storage.setShopping(generated);
        Storage.setCustomShop(customs);
        renderShopping();
      };
    });
  }

  function renderSettings() {
    showView("settings");
  }

  function dkDisclaimer() {
    return `<div class="dk-disclaimer">
      <strong>Medical safety:</strong> Recipe helper only — not medical treatment.
      Does not reverse diabetes, improve eGFR, or repair kidneys.
      Use latest blood reports and your nephrologist / renal dietitian instructions for protein, potassium, phosphorus, sodium and fluid.
      Historical notes (not current labs): HbA1c ~11, creatinine 3.39, eGFR 20, urea 155.2, K 4.06, Na 131, weight ~90 kg.
    </div>`;
  }

  function renderDkHub() {
    showView("dk");
    const root = $("#view-dk");
    if (!root) {
      toast("DK screen missing — please refresh");
      return;
    }
    if (typeof DKCare === "undefined") {
      root.innerHTML = `<div class="panel"><p>Care module script failed to load.</p><button class="btn btn-primary" onclick="location.reload()">Refresh</button></div>`;
      return;
    }
    if (!state.dk || !state.dk.recipes) {
      root.innerHTML = `<div class="panel"><p>Care recipes not loaded.</p><button class="btn btn-primary" onclick="location.reload()">Refresh</button></div>`;
      return;
    }
    const lim = DKCare.getLimits();
    root.innerHTML = `
      <div class="page-header">
        <button type="button" class="back-btn js-back" aria-label="Back">←</button>
        <h2>Care module</h2>
      </div>
      <div class="dk-hero">
        <h1>❤️ Diabetes &amp; Kidney Care</h1>
        <p class="hi">शुगर और किडनी स्पेशल</p>
        <p class="meta" style="margin-top:0.45rem">Separate from the general family recipe book. For diabetes + kidney-conscious cooking help.</p>
      </div>
      ${dkDisclaimer()}
      <div class="panel">
        <div class="meta">Limits configured: <strong>${lim.configured ? "Yes (local)" : "No — set with clinician advice"}</strong></div>
        <button class="btn btn-ghost btn-block" id="dk-open-limits">⚙️ Configure dietary limits</button>
      </div>
      <div class="dk-grid" style="margin-top:0.9rem">
        <button class="nav-card dk-card" data-go="#/dk/cat/Diabetes-Friendly%20Breakfast"><span class="emoji">🌅</span><span class="en">Breakfast</span><span class="hi">नाश्ता</span></button>
        <button class="nav-card dk-card" data-go="#/dk/cat/Diabetes-Friendly%20Lunch"><span class="emoji">☀️</span><span class="en">Lunch</span><span class="hi">दोपहर</span></button>
        <button class="nav-card dk-card" data-go="#/dk/cat/Diabetes-Friendly%20Dinner"><span class="emoji">🌙</span><span class="en">Dinner</span><span class="hi">रात</span></button>
        <button class="nav-card dk-card" data-go="#/dk/cat/Healthy%20Snacks"><span class="emoji">🥒</span><span class="en">Snacks</span><span class="hi">स्नैक्स</span></button>
        <button class="nav-card dk-card" data-go="#/dk/cat/Special%20Kidney-Conscious%20Recipes"><span class="emoji">🩺</span><span class="en">Kidney-conscious</span><span class="hi">किडनी-सावधान</span></button>
        <button class="nav-card dk-card" data-go="#/dk/suitable"><span class="emoji">✅</span><span class="en">Suitable Recipes</span><span class="hi">उपयुक्त सूची</span></button>
        <button class="nav-card dk-card" data-go="#/dk/planner" style="grid-column:span 2"><span class="emoji">📅</span><span class="en">Weekly Planner</span><span class="hi">सप्ताह प्लानर + shopping</span></button>
      </div>
    `;
    $("#dk-open-limits").onclick = () => Router.go("#/dk/limits");
    $all("[data-go]", root).forEach((el) => el.addEventListener("click", () => Router.go(el.dataset.go)));
  }

  function renderDkFiltersBar(rootSel) {
    const f = DKCare.getFilters();
    const opts = [
      ["lowAddedSugar", "Low added sugar"],
      ["controlledCarbs", "Controlled carbs"],
      ["lowSodium", "Low sodium"],
      ["proteinConscious", "Protein-conscious"],
      ["potassiumConscious", "Potassium-conscious"],
      ["phosphorusConscious", "Phosphorus-conscious"],
    ];
    return `<div class="dk-filter-row" id="dk-filters">
      ${opts
        .map(
          ([k, label]) =>
            `<button type="button" class="chip ${f[k] ? "active" : ""}" data-dkf="${k}">${label}</button>`
        )
        .join("")}
    </div>
    <p class="meta">Filters use recipe care flags. Numeric checks apply only when limits are configured and reliable nutrition exists.</p>`;
  }

  function bindDkFilters(onChange) {
    $all("#dk-filters .chip").forEach((btn) => {
      btn.onclick = () => {
        const f = DKCare.getFilters();
        f[btn.dataset.dkf] = !f[btn.dataset.dkf];
        DKCare.setFilters(f);
        onChange();
      };
    });
  }

  function renderDkRecipeCard(r) {
    const ev = DKCare.evaluateSuitability(r);
    const label = DK_STATUS_LABELS[ev.status] || ev.status;
    return `<button class="recipe-card" data-dkid="${r.id}">
      <div class="recipe-emoji">❤️</div>
      <div>
        <h3>${r.name}</h3>
        <div class="meta">${r.nameHi} · ${r.prepTime + r.cookTime} min</div>
        <span class="${DKCare.statusBadgeClass(ev.status)}">${label}</span>
      </div>
    </button>`;
  }

  function renderDkList(title, list) {
    showView("dk");
    const root = $("#view-dk");
    root.innerHTML = `
      <div class="page-header">
        <button type="button" class="back-btn" id="dk-back">←</button>
        <h2>${title}</h2>
      </div>
      ${dkDisclaimer()}
      ${renderDkFiltersBar()}
      <div class="recipe-list" id="dk-list"></div>
    `;
    const filtered = DKCare.filterRecipes(list, DKCare.getFilters());
    const box = $("#dk-list");
    box.innerHTML = filtered.length
      ? filtered.map(renderDkRecipeCard).join("")
      : `<div class="empty">No recipes match these care filters.</div>`;
    $all("[data-dkid]", box).forEach((btn) => {
      btn.onclick = () => Router.go("#/dk/recipe/" + btn.dataset.dkid);
    });
    $("#dk-back").onclick = () => Router.back("#/dk");
    bindDkFilters(() => renderDkList(title, list));
  }

  function renderDkCategory(cat) {
    const list = (state.dk.recipes || []).filter((r) => (r.dkCategories || []).includes(cat));
    renderDkList(cat, list);
  }

  function renderDkSuitable() {
    const lim = DKCare.getLimits();
    const list = (state.dk.recipes || []).filter((r) => {
      const s = DKCare.evaluateSuitability(r, lim).status;
      return s === "suitable-within-limits" || s === "suitable-with-portion-adjustment";
    });
    renderDkList("Suitable Recipes · उपयुक्त", list.length ? list : state.dk.recipes || []);
  }

  function renderDkRecipe(id) {
    const r = state.dkById[id];
    if (!r) {
      toast("DK recipe not found");
      Router.go("#/dk");
      return;
    }
    const ev = DKCare.evaluateSuitability(r);
    const steps = r.stepsHi && r.stepsHi.length ? r.stepsHi : r.steps || [];
    showView("dk");
    $("#view-dk").innerHTML = `
      <div class="page-header">
        <button type="button" class="back-btn" id="dk-back">←</button>
        <h2>DK Recipe</h2>
      </div>
      ${dkDisclaimer()}
      <div class="detail-hero" style="border-color:var(--dk-border)">
        <div class="detail-emoji">❤️</div>
        <h2>${r.name}</h2>
        <div class="hi-name">${r.nameHi}</div>
        <span class="${DKCare.statusBadgeClass(ev.status)}">${DK_STATUS_LABELS[ev.status]}</span>
        <div class="meta" style="margin-top:0.5rem">${(ev.reasons || []).join(" ")}</div>
        <div class="meta-grid">
          <div class="meta-pill"><strong>Prep</strong>${r.prepTime} min</div>
          <div class="meta-pill"><strong>Cook</strong>${r.cookTime} min</div>
          <div class="meta-pill"><strong>Serves</strong>${r.servings}</div>
          <div class="meta-pill"><strong>Module</strong>DK Care</div>
        </div>
        <button class="btn btn-primary btn-block" id="dk-cook">👩‍🍳 Start Cooking</button>
      </div>
      <div class="panel">
        <h3>Ingredients · सामग्री</h3>
        <ul class="ingredient-list">${(r.ingredients || [])
          .map((i) => `<li>${i.quantity} ${i.unit} ${i.name}</li>`)
          .join("")}</ul>
      </div>
      <div class="panel">
        <h3>विधि · Steps</h3>
        <ol class="steps-list">${steps.map((s) => `<li>${s}</li>`).join("")}</ol>
      </div>
      <div class="panel tips"><strong>Portion guidance:</strong><br>${r.portionGuidance || ""}</div>
      <div class="panel"><strong>Nutrition:</strong><br>${DKCare.nutritionText(r.nutrition)}</div>
      <div class="panel"><strong>Dietary notes:</strong><br>${r.dietaryNotes || ""}</div>
      ${(r.substitutions || []).length
        ? `<div class="panel"><strong>Substitutions:</strong><ul>${r.substitutions
            .map((s) => `<li>${s}</li>`)
            .join("")}</ul></div>`
        : ""}
      <div class="panel meta">Flags: ${Object.entries(r.flags || {})
        .filter(([, v]) => v)
        .map(([k]) => k)
        .join(", ")}</div>
    `;
    $("#dk-back").onclick = () => Router.back("#/dk");
    $("#dk-cook").onclick = () => {
      // reuse cooking mode with DK recipe shape
      const cur = CookingMode.start(r);
      showView("cooking");
      // monkey-patch paint via existing cooking view helpers
      const paint = (c) => {
        $("#view-cooking").innerHTML = `
          <div class="page-header">
            <button class="back-btn" id="exit-cook">✕</button>
            <h2>${c.recipe.nameHi}</h2>
          </div>
          ${dkDisclaimer()}
          <div class="cooking-screen">
            <div class="cooking-step">
              <div class="step-num">स्टेप ${c.index + 1} / ${c.total}</div>
              <p>${c.text}</p>
            </div>
            <div class="cooking-nav">
              <button class="btn btn-ghost" id="cook-prev" ${c.isFirst ? "disabled" : ""}>← पिछला</button>
              <button class="btn btn-primary" id="cook-next">${c.isLast ? "हो गया ✓" : "अगला →"}</button>
            </div>
          </div>`;
        $("#exit-cook").onclick = () => {
          CookingMode.exit();
          Router.go("#/dk/recipe/" + r.id, { replace: true });
        };
        $("#cook-prev").onclick = () => paint(CookingMode.prev());
        $("#cook-next").onclick = () => {
          if (c.isLast) {
            CookingMode.exit();
            toast("Done — confirm portions with clinician advice");
            Router.go("#/dk/recipe/" + r.id, { replace: true });
          } else paint(CookingMode.next());
        };
      };
      paint(cur);
    };
  }

  function renderDkLimits() {
    const lim = DKCare.getLimits();
    showView("dk");
    $("#view-dk").innerHTML = `
      <div class="page-header">
        <button type="button" class="back-btn" id="dk-back">←</button>
        <h2>Dietary limits</h2>
      </div>
      ${dkDisclaimer()}
      <div class="panel">
        <p class="meta">Leave blank if your doctor has not set a number. Do not invent targets.</p>
        <div class="dk-limit-grid">
          <label>Max carbs per meal (g)<input id="lim-carbs" type="number" min="0" step="1" value="${lim.maxCarbsGPerMeal ?? ""}" placeholder="Not set" /></label>
          <label>Max protein per day (g)<input id="lim-protein" type="number" min="0" step="1" value="${lim.maxProteinGPerDay ?? ""}" placeholder="Not set" /></label>
          <label>Max sodium per day (mg)<input id="lim-na" type="number" min="0" step="1" value="${lim.maxSodiumMgPerDay ?? ""}" placeholder="Not set" /></label>
          <label>Max potassium per day (mg)<input id="lim-k" type="number" min="0" step="1" value="${lim.maxPotassiumMgPerDay ?? ""}" placeholder="Not set" /></label>
          <label>Max phosphorus per day (mg)<input id="lim-p" type="number" min="0" step="1" value="${lim.maxPhosphorusMgPerDay ?? ""}" placeholder="Not set" /></label>
          <label>Max fluid per day (ml)<input id="lim-fluid" type="number" min="0" step="1" value="${lim.maxFluidMlPerDay ?? ""}" placeholder="Not set" /></label>
          <label>Notes from clinician<textarea id="lim-notes" rows="3">${lim.notes || ""}</textarea></label>
        </div>
        <button class="btn btn-primary btn-block" id="dk-save-limits">Save limits locally</button>
        <button class="btn btn-ghost btn-block" id="dk-clear-limits">Clear all limits</button>
      </div>
    `;
    $("#dk-back").onclick = () => Router.back("#/dk");
    const numOrNull = (id) => {
      const v = $(id).value.trim();
      if (v === "") return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    };
    $("#dk-save-limits").onclick = () => {
      DKCare.setLimits({
        maxCarbsGPerMeal: numOrNull("#lim-carbs"),
        maxProteinGPerDay: numOrNull("#lim-protein"),
        maxSodiumMgPerDay: numOrNull("#lim-na"),
        maxPotassiumMgPerDay: numOrNull("#lim-k"),
        maxPhosphorusMgPerDay: numOrNull("#lim-p"),
        maxFluidMlPerDay: numOrNull("#lim-fluid"),
        notes: $("#lim-notes").value.trim(),
      });
      toast("Limits saved on this phone only");
      Router.go("#/dk");
    };
    $("#dk-clear-limits").onclick = () => {
      if (confirm("Clear configured dietary limits?")) {
        DKCare.setLimits(DKCare.defaultLimits());
        toast("Limits cleared");
        renderDkLimits();
      }
    };
  }

  function renderDkPlanner() {
    const planner = DKCare.getPlanner();
    showView("dk");
    $("#view-dk").innerHTML = `
      <div class="page-header">
        <button type="button" class="back-btn" id="dk-back">←</button>
        <h2>DK Weekly Planner</h2>
      </div>
      ${dkDisclaimer()}
      <p class="meta">Breakfast · Mid-morning · Lunch · Evening · Dinner. This is not an automatic medical diet prescription.</p>
      <button class="btn btn-primary btn-block" id="dk-gen-shop">🛒 Shopping list from DK planner</button>
      <div id="dk-planner-root" style="margin-top:0.8rem"></div>
      <div class="panel" style="margin-top:0.8rem">
        <h3>DK Shopping checklist</h3>
        <div id="dk-shop-list"></div>
      </div>
    `;
    const root = $("#dk-planner-root");
    root.innerHTML = DKCare.DAYS.map((day) => {
      const slots = DKCare.MEALS.map((meal) => {
        const id = planner[day][meal];
        const r = id ? state.dkById[id] : null;
        return `<div class="meal-slot">
          <div><strong>${meal}</strong><br>${r ? r.nameHi : "<em>Not set</em>"}</div>
          <button data-day="${day}" data-meal="${meal}" class="dk-pick">Change</button>
        </div>`;
      }).join("");
      return `<div class="planner-day"><h3>${day}</h3>${slots}</div>`;
    }).join("");

    $all(".dk-pick", root).forEach((btn) => {
      btn.onclick = () => {
        state.dkPick = { day: btn.dataset.day, meal: btn.dataset.meal };
        const meal = btn.dataset.meal;
        let pool = state.dk.recipes || [];
        if (meal.includes("Breakfast")) pool = pool.filter((r) => (r.mealSlots || []).includes("Breakfast"));
        else if (meal.includes("Lunch")) pool = pool.filter((r) => (r.mealSlots || []).includes("Lunch"));
        else if (meal.includes("Dinner")) pool = pool.filter((r) => (r.mealSlots || []).includes("Dinner"));
        else pool = pool.filter((r) => (r.mealSlots || []).some((s) => /snack/i.test(s)));
        showView("dk");
        $("#view-dk").innerHTML = `
          <div class="page-header"><button type="button" class="back-btn" id="dk-back">←</button><h2>Pick ${meal}</h2></div>
          <div class="recipe-list" id="dk-list">${pool.map(renderDkRecipeCard).join("")}</div>`;
        $("#dk-back").onclick = () => Router.go("#/dk/planner");
        $all("[data-dkid]").forEach((card) => {
          card.onclick = () => {
            DKCare.setSlot(state.dkPick.day, state.dkPick.meal, card.dataset.dkid);
            toast("Saved to DK planner");
            Router.go("#/dk/planner");
          };
        });
      };
    });

    const paintShop = () => {
      const items = DKCare.getShop();
      $("#dk-shop-list").innerHTML = items.length
        ? items
            .map(
              (it, idx) =>
                `<label class="shop-item ${it.checked ? "done" : ""}"><input type="checkbox" data-i="${idx}" ${
                  it.checked ? "checked" : ""
                }/><span>${it.quantity ? it.quantity + " " + it.unit + " " : ""}${it.name}</span></label>`
            )
            .join("")
        : `<div class="meta">Generate from planner to fill this list.</div>`;
      $all("#dk-shop-list input").forEach((inp) => {
        inp.onchange = () => {
          const items2 = DKCare.getShop();
          items2[Number(inp.dataset.i)].checked = inp.checked;
          DKCare.setShop(items2);
          paintShop();
        };
      });
    };
    paintShop();
    $("#dk-gen-shop").onclick = () => {
      const items = DKCare.buildShopping(state.dkById, DKCare.getPlanner());
      DKCare.setShop(items);
      toast("DK shopping list ready");
      paintShop();
    };
    $("#dk-back").onclick = () => Router.back("#/dk");
  }

  function handleRoute(route) {
    const { name, params } = route;
    switch (name) {
      case "home":
        renderHome();
        break;
      case "category":
        renderCategory(decodeURIComponent(params[0] || ""));
        break;
      case "search":
        renderSearch(decodeURIComponent(params[0] || ""));
        break;
      case "recipe":
        renderRecipe(params[0]);
        break;
      case "cooking":
        renderCooking(params[0]);
        break;
      case "finder":
        renderFinder();
        break;
      case "favourites":
        renderFavourites();
        break;
      case "recent":
        renderRecent();
        break;
      case "random":
        renderRandom();
        break;
      case "planner":
        renderPlanner();
        break;
      case "shopping":
        renderShopping();
        break;
      case "settings":
        renderSettings();
        break;
      case "all":
        renderList("All Recipes", Search.search(state.recipes, "", {}));
        break;
      case "dk": {
        const sub = params[0];
        if (!sub) renderDkHub();
        else if (sub === "cat") renderDkCategory(decodeURIComponent(params[1] || ""));
        else if (sub === "recipe") renderDkRecipe(params[1]);
        else if (sub === "planner") renderDkPlanner();
        else if (sub === "limits") renderDkLimits();
        else if (sub === "suitable") renderDkSuitable();
        else renderDkHub();
        break;
      }
      default:
        renderHome();
    }
  }

  function wireUI() {
    $("#global-search").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const q = e.target.value.trim();
        Router.go("#/search/" + encodeURIComponent(q));
      }
    });
    $("#btn-search").onclick = () => {
      const q = $("#global-search").value.trim();
      Router.go("#/search/" + encodeURIComponent(q));
    };
    // Event delegation — reliable for all data-go buttons (including DK module)
    document.body.addEventListener("click", (e) => {
      const backBtn = e.target.closest(".js-back");
      if (backBtn) {
        e.preventDefault();
        Router.back("#/home");
        return;
      }
      const goEl = e.target.closest("[data-go]");
      if (goEl) {
        e.preventDefault();
        const target = goEl.getAttribute("data-go");
        if (target) Router.go(target);
        return;
      }
      const navBtn = e.target.closest(".bottom-nav button[data-nav]");
      if (navBtn) {
        e.preventDefault();
        const nav = navBtn.getAttribute("data-nav");
        Router.go("#/" + nav, { replace: nav === "home" });
      }
    });
    const dkBtn = $("#btn-dk-care");
    if (dkBtn) {
      dkBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        Router.go("#/dk");
      });
    }
    $("#clear-finder").onclick = () => {
      state.selectedIngredients = [];
      renderFinder();
    };
    $("#gen-shop").onclick = () => {
      const items = Shopping.buildFromPlanner(state.byId, Storage.getPlanner());
      Storage.setShopping(items);
      toast("Shopping list generated");
      renderShopping();
    };
    $("#add-shop-item").onclick = () => {
      const name = $("#custom-shop-name").value.trim();
      if (!name) return;
      const custom = Storage.getCustomShop();
      custom.push({ name, quantity: 1, unit: "", checked: false });
      Storage.setCustomShop(custom);
      $("#custom-shop-name").value = "";
      renderShopping();
    };
    $("#btn-auto-plan").onclick = () => {
      Planner.randomFill(state.recipes);
      toast("Weekly plan filled");
      renderPlanner();
    };
    $("#btn-export").onclick = () => {
      const data = Storage.exportAll();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "family-kitchen-backup.json";
      a.click();
      toast("Backup downloaded");
    };
    $("#btn-import").onclick = () => $("#import-file").click();
    $("#import-file").onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        Storage.importAll(JSON.parse(text));
        toast("Backup restored");
      } catch {
        toast("Invalid backup file");
      }
    };
    $("#btn-reset").onclick = () => {
      if (confirm("Reset favourites, planner, shopping and history?")) {
        Storage.resetAll();
        toast("Preferences reset");
      }
    };
    $("#clear-filters").onclick = () => {
      Filters.clear();
      $("#global-search").value = "";
      renderList("All Recipes", state.recipes.slice().sort((a, b) => a.name.localeCompare(b.name)));
    };

    function updateOnline() {
      $("#offline-pill").classList.toggle("show", !navigator.onLine);
    }
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    updateOnline();
  }

  async function init() {
    try {
      await loadData();
    } catch (err) {
      console.error(err);
      document.body.innerHTML =
        "<p style='padding:2rem;font-family:sans-serif'>Failed to load recipe data. Please serve this folder over HTTP (not file://).</p>";
      return;
    }
    wireUI();
    Router.onChange(handleRoute);
    Router.notify();
    if ("serviceWorker" in navigator) {
      try {
        const reg = await navigator.serviceWorker.register("./service-worker.js?v=4");
        if (reg && reg.update) reg.update();
      } catch (e) {
        console.warn("SW registration failed", e);
      }
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
