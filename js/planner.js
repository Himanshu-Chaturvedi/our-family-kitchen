const Planner = (() => {
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const MEALS = ["Breakfast", "Lunch", "Dinner"];

  function getDays() {
    return DAYS;
  }

  function getMeals() {
    return MEALS;
  }

  function replaceSlot(day, meal, recipeId) {
    return Storage.setPlannerSlot(day, meal, recipeId);
  }

  function clearSlot(day, meal) {
    return Storage.setPlannerSlot(day, meal, null);
  }

  function collectRecipeIds(planner) {
    const ids = [];
    DAYS.forEach((d) => {
      MEALS.forEach((m) => {
        const id = planner[d] && planner[d][m];
        if (id) ids.push(id);
      });
    });
    return ids;
  }

  function randomFill(recipes) {
    const byMeal = {
      Breakfast: recipes.filter((r) => (r.categories || []).includes("Breakfast")),
      Lunch: recipes.filter((r) => (r.categories || []).includes("Lunch")),
      Dinner: recipes.filter((r) => (r.categories || []).includes("Dinner")),
    };
    const planner = Storage.emptyPlanner();
    DAYS.forEach((d) => {
      MEALS.forEach((m) => {
        const pool = byMeal[m].length ? byMeal[m] : recipes;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        planner[d][m] = pick.id;
      });
    });
    localStorage.setItem("ofk_planner", JSON.stringify(planner));
    return planner;
  }

  return { getDays, getMeals, replaceSlot, clearSlot, collectRecipeIds, randomFill };
})();
