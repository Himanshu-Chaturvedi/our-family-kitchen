const CookingMode = (() => {
  let recipe = null;
  let step = 0;

  function stepsOf(r) {
    if (r.stepsHi && r.stepsHi.length) return r.stepsHi;
    return r.steps || [];
  }

  function start(r) {
    recipe = r;
    step = 0;
    return current();
  }

  function current() {
    if (!recipe) return null;
    const steps = stepsOf(recipe);
    return {
      recipe,
      index: step,
      total: steps.length,
      text: steps[step],
      isFirst: step === 0,
      isLast: step === steps.length - 1,
    };
  }

  function next() {
    if (!recipe) return null;
    const steps = stepsOf(recipe);
    if (step < steps.length - 1) step += 1;
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
