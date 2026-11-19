const Storage = (() => {
  const KEYS = {
    favourites: "ofk_favourites",
    recent: "ofk_recent",
    planner: "ofk_planner",
    shopping: "ofk_shopping",
    customShop: "ofk_custom_shop",
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

  function getFavourites() {
    return read(KEYS.favourites, []);
  }

  function toggleFavourite(id) {
    const favs = getFavourites();
    const i = favs.indexOf(id);
    if (i >= 0) favs.splice(i, 1);
    else favs.unshift(id);
    write(KEYS.favourites, favs.slice(0, 200));
    return favs;
  }

  function isFavourite(id) {
    return getFavourites().includes(id);
  }

  function getRecent() {
    return read(KEYS.recent, []);
  }

  function markCooked(id) {
    const list = getRecent().filter((x) => x.id !== id);
    list.unshift({ id, at: Date.now() });
    write(KEYS.recent, list.slice(0, 50));
    return list;
  }

  function emptyPlanner() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const planner = {};
    days.forEach((d) => {
      planner[d] = { Breakfast: null, Lunch: null, Dinner: null };
    });
    return planner;
  }

  function getPlanner() {
    return read(KEYS.planner, emptyPlanner());
  }

  function setPlannerSlot(day, meal, recipeId) {
    const p = getPlanner();
    if (!p[day]) p[day] = { Breakfast: null, Lunch: null, Dinner: null };
    p[day][meal] = recipeId;
    write(KEYS.planner, p);
    return p;
  }

  function getShopping() {
    return read(KEYS.shopping, []);
  }

  function setShopping(items) {
    write(KEYS.shopping, items);
  }

  function getCustomShop() {
    return read(KEYS.customShop, []);
  }

  function setCustomShop(items) {
    write(KEYS.customShop, items);
  }

  function exportAll() {
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      favourites: getFavourites(),
      recent: getRecent(),
      planner: getPlanner(),
      shopping: getShopping(),
      customShop: getCustomShop(),
    };
  }

  function importAll(data) {
    if (!data || typeof data !== "object") throw new Error("Invalid backup");
    if (data.favourites) write(KEYS.favourites, data.favourites);
    if (data.recent) write(KEYS.recent, data.recent);
    if (data.planner) write(KEYS.planner, data.planner);
    if (data.shopping) write(KEYS.shopping, data.shopping);
    if (data.customShop) write(KEYS.customShop, data.customShop);
  }

  function resetAll() {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  }

  return {
    getFavourites,
    toggleFavourite,
    isFavourite,
    getRecent,
    markCooked,
    getPlanner,
    setPlannerSlot,
    emptyPlanner,
    getShopping,
    setShopping,
    getCustomShop,
    setCustomShop,
    exportAll,
    importAll,
    resetAll,
  };
})();
