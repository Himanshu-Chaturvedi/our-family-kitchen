const Shopping = (() => {
  function buildFromPlanner(recipesById, planner) {
    const ids = Planner.collectRecipeIds(planner);
    const map = new Map();
    ids.forEach((id) => {
      const r = recipesById[id];
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
            fromRecipes: [r.name],
          });
        } else {
          const cur = map.get(key);
          cur.quantity += Number(ing.quantity) || 0;
          if (!cur.fromRecipes.includes(r.name)) cur.fromRecipes.push(r.name);
        }
      });
    });
    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  }

  function mergeCustom(generated, custom) {
    const keys = new Set(generated.map((g) => g.key));
    const extras = custom
      .filter((c) => c && c.name)
      .map((c) => ({
        key: "custom:" + c.name.toLowerCase(),
        name: c.name,
        quantity: c.quantity || 1,
        unit: c.unit || "",
        checked: !!c.checked,
        fromRecipes: ["Custom"],
        custom: true,
      }))
      .filter((c) => !keys.has(c.key.replace("custom:", "")));
    return [...generated, ...extras];
  }

  return { buildFromPlanner, mergeCustom };
})();
