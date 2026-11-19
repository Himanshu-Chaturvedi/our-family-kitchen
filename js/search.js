const Search = (() => {
  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function recipeBlob(r) {
    const parts = [
      r.id,
      r.name,
      r.nameHi,
      ...(r.aliases || []),
      ...(r.region || []),
      ...(r.categories || []),
      ...(r.mainIngredients || []),
      ...(r.ingredients || []).map((i) => i.name),
      ...(r.season || []),
      r.diet,
    ];
    return normalize(parts.join(" "));
  }

  function scoreRecipe(r, query) {
    const q = normalize(query);
    if (!q) return 1;
    const blob = recipeBlob(r);
    if (blob.includes(q)) return 10;
    const tokens = q.split(" ").filter(Boolean);
    let hit = 0;
    tokens.forEach((t) => {
      if (blob.includes(t)) hit += 1;
    });
    return hit === 0 ? 0 : hit / tokens.length;
  }

  function search(recipes, query, filters = {}) {
    let list = recipes.slice();
    if (filters.category) {
      list = list.filter((r) => (r.categories || []).includes(filters.category));
    }
    if (filters.season && filters.season !== "All") {
      list = list.filter(
        (r) => (r.season || []).includes(filters.season) || (r.season || []).includes("All")
      );
    }
    if (filters.difficulty) {
      list = list.filter((r) => r.difficulty === filters.difficulty);
    }
    if (query && query.trim()) {
      list = list
        .map((r) => ({ r, s: scoreRecipe(r, query) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((x) => x.r);
    } else {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }

  function byIngredients(recipes, selectedIds, mode = "any") {
    if (!selectedIds.length) return [];
    return recipes
      .map((r) => {
        const mains = new Set(r.mainIngredients || []);
        const all = new Set([...(r.mainIngredients || []), ...(r.otherIngredients || [])]);
        (r.ingredients || []).forEach((i) => {
          if (i.ingredientId) all.add(i.ingredientId);
        });
        const matched = selectedIds.filter((id) => all.has(id) || mains.has(id));
        const missing = selectedIds.filter((id) => !all.has(id));
        const mainHits = selectedIds.filter((id) => mains.has(id)).length;
        return { recipe: r, matched, missing, mainHits };
      })
      .filter((x) => {
        if (mode === "all") return x.missing.length === 0 && x.matched.length > 0;
        return x.matched.length > 0 && x.mainHits > 0;
      })
      .sort((a, b) => b.mainHits - a.mainHits || a.missing.length - b.missing.length)
      .map((x) => x);
  }

  return { search, byIngredients, normalize, recipeBlob };
})();
