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
    if ((r.categories || []).includes("Sweets")) return "🍮";
    if ((r.categories || []).includes("Breakfast")) return "🌅";
    return EMOJI[main] || EMOJI.default;
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
    const [recipesRes, ingRes, catRes] = await Promise.all([
      fetch("data/recipes.json"),
      fetch("data/ingredients.json"),
      fetch("data/categories.json"),
    ]);
    const recipesData = await recipesRes.json();
    const ingData = await ingRes.json();
    const catData = await catRes.json();
    state.recipes = recipesData.recipes || [];
    state.ingredients = ingData.ingredients || [];
    state.categories = catData.categories || [];
    state.byId = Object.fromEntries(state.recipes.map((r) => [r.id, r]));
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
        <button class="back-btn" id="back-from-recipe">←</button>
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
        <h3>Steps · विधि</h3>
        <ol class="steps-list">${r.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
      </div>
      ${(r.tips || []).length ? `<div class="panel tips"><strong>Tips:</strong><br>${r.tips.join("<br>")}</div>` : ""}
      <div class="panel"><div class="meta">Categories: ${(r.categories || []).join(", ")} · Diet: ${r.diet}</div></div>
    `;
    renderIngredients(r);
    $("#back-from-recipe").onclick = () => history.back();
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
          <div class="step-num">Step ${cur.index + 1} of ${cur.total}</div>
          <p>${cur.text}</p>
        </div>
        <div class="cooking-nav">
          <button class="btn btn-ghost" id="cook-prev" ${cur.isFirst ? "disabled" : ""}>← Previous</button>
          <button class="btn btn-primary" id="cook-next">${cur.isLast ? "Done ✓" : "Next →"}</button>
        </div>
      </div>
    `;
    $("#exit-cook").onclick = () => {
      CookingMode.exit();
      Router.go("#/recipe/" + cur.recipe.id);
    };
    $("#cook-prev").onclick = () => paintCooking(CookingMode.prev());
    $("#cook-next").onclick = () => {
      if (cur.isLast) {
        Storage.markCooked(cur.recipe.id);
        CookingMode.exit();
        toast("शाबाश! Cooking done");
        Router.go("#/recipe/" + cur.recipe.id);
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
    $all("[data-go]").forEach((el) => {
      el.addEventListener("click", () => Router.go(el.dataset.go));
    });
    $all(".bottom-nav button").forEach((btn) => {
      btn.addEventListener("click", () => Router.go("#/" + btn.dataset.nav));
    });
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
        await navigator.serviceWorker.register("./service-worker.js");
      } catch (e) {
        console.warn("SW registration failed", e);
      }
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
