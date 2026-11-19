window.DKCare = (() => {
  const LIMIT_KEY = "ofk_dk_limits";
  const PLANNER_KEY = "ofk_dk_planner";
  const SHOP_KEY = "ofk_dk_shop";
  const FILTER_KEY = "ofk_dk_filters";

  const MEALS = ["Breakfast", "Mid-morning snack", "Lunch", "Evening snack", "Dinner"];
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const STATUS = {
    suitableWithin: "suitable-within-limits",
    portion: "suitable-with-portion-adjustment",
    substitute: "requires-ingredient-substitution",
    review: "requires-renal-dietitian-review",
    notRecommended: "not-recommended",
  };

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function defaultLimits() {
    return {
      configured: false,
      maxSodiumMgPerDay: null,
      maxProteinGPerDay: null,
      maxPotassiumMgPerDay: null,
      maxPhosphorusMgPerDay: null,
      maxCarbsGPerMeal: null,
      maxFluidMlPerDay: null,
      notes: "",
    };
  }

  function getLimits() {
    return { ...defaultLimits(), ...read(LIMIT_KEY, {}) };
  }

  function setLimits(partial) {
    const next = { ...getLimits(), ...partial };
    const numericKeys = [
      "maxSodiumMgPerDay",
      "maxProteinGPerDay",
      "maxPotassiumMgPerDay",
      "maxPhosphorusMgPerDay",
      "maxCarbsGPerMeal",
      "maxFluidMlPerDay",
    ];
    next.configured = numericKeys.some((k) => next[k] !== null && next[k] !== "" && !Number.isNaN(Number(next[k])));
    write(LIMIT_KEY, next);
    return next;
  }

  function emptyPlanner() {
    const p = {};
    DAYS.forEach((d) => {
      p[d] = {};
      MEALS.forEach((m) => {
        p[d][m] = null;
      });
    });
    return p;
  }

  function getPlanner() {
    return read(PLANNER_KEY, emptyPlanner());
  }

  function setSlot(day, meal, recipeId) {
    const p = getPlanner();
    if (!p[day]) p[day] = {};
    p[day][meal] = recipeId;
    write(PLANNER_KEY, p);
    return p;
  }

  function getShop() {
    return read(SHOP_KEY, []);
  }

  function setShop(items) {
    write(SHOP_KEY, items);
  }

  function getFilters() {
    return read(FILTER_KEY, {
      lowAddedSugar: false,
      controlledCarbs: false,
      lowSodium: false,
      proteinConscious: false,
      potassiumConscious: false,
      phosphorusConscious: false,
    });
  }

  function setFilters(f) {
    write(FILTER_KEY, f);
    return f;
  }

  function nutritionText(n) {
    if (!n || n.status === "unavailable") return "Nutrition estimate unavailable";
    const parts = [];
    if (n.calories != null) parts.push(`~${n.calories} kcal`);
    if (n.carbs_g != null) parts.push(`Carbs ~${n.carbs_g} g`);
    if (n.protein_g != null) parts.push(`Protein ~${n.protein_g} g`);
    if (n.sodium_mg != null) parts.push(`Sodium ~${n.sodium_mg} mg`);
    if (n.potassium_mg != null) parts.push(`K ~${n.potassium_mg} mg`);
    if (n.phosphorus_mg != null) parts.push(`P ~${n.phosphorus_mg} mg`);
    return parts.length ? parts.join(" · ") + " (approx; verify)" : "Nutrition estimate unavailable";
  }

  function evaluateSuitability(recipe, limits) {
    const lim = limits || getLimits();
    let status = recipe.suitabilityDefault || STATUS.review;
    const reasons = [];

    if (!lim.configured) {
      if (status === STATUS.suitableWithin) status = STATUS.portion;
      reasons.push("Dietary limits are not configured yet — use clinician guidance.");
      return { status, reasons, labelKey: status };
    }

    const n = recipe.nutrition || {};
    const hasNums =
      n &&
      n.status !== "unavailable" &&
      [n.sodium_mg, n.protein_g, n.potassium_mg, n.phosphorus_mg, n.carbs_g].some((v) => v != null);

    if (!hasNums) {
      status = STATUS.review;
      reasons.push("Reliable per-recipe nutrition numbers are unavailable for automated checking.");
      return { status, reasons, labelKey: status };
    }

    const checks = [
      ["maxCarbsGPerMeal", n.carbs_g, "carbohydrate"],
      ["maxProteinGPerDay", n.protein_g, "protein"],
      ["maxSodiumMgPerDay", n.sodium_mg, "sodium"],
      ["maxPotassiumMgPerDay", n.potassium_mg, "potassium"],
      ["maxPhosphorusMgPerDay", n.phosphorus_mg, "phosphorus"],
    ];

    let over = false;
    checks.forEach(([key, val, name]) => {
      const max = lim[key];
      if (max != null && val != null && Number(val) > Number(max)) {
        over = true;
        reasons.push(`${name} estimate exceeds configured limit`);
      }
    });

    if (over) {
      return { status: STATUS.notRecommended, reasons, labelKey: STATUS.notRecommended };
    }

    if (recipe.flags && recipe.flags.proteinConscious && lim.maxProteinGPerDay != null) {
      status = STATUS.portion;
      reasons.push("Keep protein portion within the configured daily budget.");
    } else {
      status = STATUS.suitableWithin;
      reasons.push("Within configured numeric limits based on available estimates.");
    }
    return { status, reasons, labelKey: status };
  }

  function filterRecipes(recipes, filters, category) {
    const f = filters || getFilters();
    return recipes.filter((r) => {
      if (category && !(r.dkCategories || []).includes(category)) return false;
      const flags = r.flags || {};
      if (f.lowAddedSugar && !flags.lowAddedSugar && !r.noAddedSugar) return false;
      if (f.controlledCarbs && !flags.controlledCarbs) return false;
      if (f.lowSodium && !flags.lowSodium) return false;
      if (f.proteinConscious && !flags.proteinConscious) return false;
      if (f.potassiumConscious && !flags.potassiumConscious) return false;
      if (f.phosphorusConscious && !flags.phosphorusConscious) return false;
      return true;
    });
  }

  function buildShopping(recipesById, planner) {
    const map = new Map();
    DAYS.forEach((d) => {
      MEALS.forEach((m) => {
        const id = planner[d] && planner[d][m];
        const r = id && recipesById[id];
        if (!r) return;
        (r.ingredients || []).forEach((ing) => {
          const key = (ing.ingredientId || ing.name).toLowerCase();
          if (!map.has(key)) {
            map.set(key, {
              key,
              name: ing.name,
              quantity: Number(ing.quantity) || 0,
              unit: ing.unit || "",
              checked: false,
            });
          } else {
            map.get(key).quantity += Number(ing.quantity) || 0;
          }
        });
      });
    });
    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  }

  function statusBadgeClass(status) {
    if (status === STATUS.suitableWithin) return "dk-badge ok";
    if (status === STATUS.portion) return "dk-badge warn";
    if (status === STATUS.substitute) return "dk-badge warn";
    if (status === STATUS.notRecommended) return "dk-badge bad";
    return "dk-badge review";
  }

  return {
    MEALS,
    DAYS,
    STATUS,
    getLimits,
    setLimits,
    defaultLimits,
    getPlanner,
    setSlot,
    emptyPlanner,
    getShop,
    setShop,
    getFilters,
    setFilters,
    nutritionText,
    evaluateSuitability,
    filterRecipes,
    buildShopping,
    statusBadgeClass,
  };
})();
