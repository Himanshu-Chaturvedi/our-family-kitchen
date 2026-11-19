const Filters = (() => {
  const state = {
    category: null,
    season: null,
    difficulty: null,
    query: "",
  };

  function set(partial) {
    Object.assign(state, partial);
    return { ...state };
  }

  function clear() {
    state.category = null;
    state.season = null;
    state.difficulty = null;
    state.query = "";
    return { ...state };
  }

  function get() {
    return { ...state };
  }

  return { set, clear, get };
})();
