const CookingMode = (() => {
  let recipe = null;
  let step = 0;

  function start(r) {
    recipe = r;
    step = 0;
    return current();
  }

  function current() {
    if (!recipe) return null;
    return {
      recipe,
      index: step,
      total: recipe.steps.length,
      text: recipe.steps[step],
      isFirst: step === 0,
      isLast: step === recipe.steps.length - 1,
    };
  }

  function next() {
    if (!recipe) return null;
    if (step < recipe.steps.length - 1) step += 1;
    return current();
  }

  function prev() {
    if (!recipe) return null;
    if (step > 0) step -= 1;
    return current();
  }

  function exit() {
    recipe = null;
    step = 0;
  }

  return { start, current, next, prev, exit };
})();
