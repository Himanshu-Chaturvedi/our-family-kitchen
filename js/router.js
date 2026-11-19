const Router = (() => {
  const listeners = [];
  const stack = [];
  let current = null;
  let suppressHash = false;

  /** Screens that start a fresh flow — back should not replay older branches */
  const ROOTS = new Set([
    "#/home",
    "#/finder",
    "#/favourites",
    "#/planner",
    "#/shopping",
    "#/settings",
    "#/dk",
    "#/all",
    "#/recent",
    "#/random",
  ]);

  function normalize(path) {
    if (!path) return "#/home";
    path = String(path).trim();
    if (!path.startsWith("#")) path = "#" + path;
    if (!path.startsWith("#/")) path = "#/" + path.replace(/^#/, "");
    if (path === "#/" || path === "#") return "#/home";
    return path;
  }

  function isRoot(path) {
    path = normalize(path);
    if (ROOTS.has(path)) return true;
    // category / search hubs opened from home are one level — not roots
    return false;
  }

  function parse() {
    const raw = normalize(location.hash || "#/home").slice(1);
    const parts = raw.split("/").filter(Boolean);
    return {
      name: parts[0] || "home",
      params: parts.slice(1),
      path: raw.startsWith("/") ? raw : "/" + raw,
    };
  }

  function setUrl(path, mode) {
    const url = location.pathname + location.search + path;
    suppressHash = true;
    if (mode === "replace") history.replaceState(history.state, "", url);
    else history.pushState(history.state, "", url);
    // allow hashchange/popstate to settle
    setTimeout(() => {
      suppressHash = false;
    }, 0);
  }

  function clearStack() {
    stack.length = 0;
  }

  function go(path, opts = {}) {
    path = normalize(path);
    const replace = !!opts.replace;
    const reset = !!opts.reset || path === "#/home" || (opts.root && isRoot(path));

    if (reset) {
      clearStack();
      current = path;
      setUrl(path, "replace");
      notify();
      return;
    }

    if (isRoot(path)) {
      // Switching main tabs (DK hub, finder, etc.) — fresh branch from here
      clearStack();
      current = path;
      setUrl(path, replace ? "replace" : "push");
      notify();
      return;
    }

    const alreadyThere = normalize(location.hash || "#/home") === path;
    if (alreadyThere && !opts.force) {
      current = path;
      notify();
      return;
    }

    // New section chosen from Home: only Home sits under this flow
    if (current === "#/home") {
      clearStack();
      stack.push("#/home");
    } else if (!replace && current && current !== path) {
      // Avoid pushing duplicates in a row
      if (stack[stack.length - 1] !== current) stack.push(current);
      if (stack.length > 40) stack.shift();
    }

    current = path;
    setUrl(path, replace ? "replace" : "push");
    notify();
  }

  function back(fallback = "#/home") {
    // Drop junk duplicates
    while (stack.length && normalize(stack[stack.length - 1]) === normalize(current)) {
      stack.pop();
    }

    const prev = stack.pop();
    const target = normalize(prev || fallback);

    if (target === "#/home" || isRoot(target)) {
      clearStack();
      current = target;
      setUrl(target, "replace");
      notify();
      return;
    }

    current = target;
    setUrl(target, "replace");
    notify();
  }

  function notify() {
    current = normalize(location.hash || "#/home");
    // If we landed on home by any means, never keep old branch history
    if (current === "#/home") clearStack();

    const route = parse();
    listeners.forEach((fn) => {
      try {
        fn(route);
      } catch (err) {
        console.error("Route handler error", route, err);
      }
    });
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  function onBrowserBack() {
    if (suppressHash) return;
    // System/browser back: use the same in-app stack rules
    if (stack.length) {
      back("#/home");
    } else if (normalize(location.hash || "#/home") !== "#/home") {
      go("#/home", { reset: true });
    } else {
      // Already home with empty stack — stay put (don't leave the site)
      setUrl("#/home", "replace");
      notify();
    }
  }

  window.addEventListener("popstate", onBrowserBack);
  window.addEventListener("hashchange", () => {
    if (suppressHash) return;
    const next = normalize(location.hash || "#/home");
    if (next === current) {
      notify();
      return;
    }
    // External hash change: treat like navigation with reset if home
    if (next === "#/home") {
      clearStack();
      current = next;
      notify();
      return;
    }
    current = next;
    notify();
  });

  current = normalize(location.hash || "#/home");
  if (!location.hash) {
    history.replaceState(null, "", location.pathname + location.search + "#/home");
    current = "#/home";
  }
  if (current === "#/home") clearStack();

  return { parse, go, back, onChange, notify, normalize, clearStack, isRoot };
})();
