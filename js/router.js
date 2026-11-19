const Router = (() => {
  const listeners = [];
  const stack = [];
  let current = null;
  let suppressHashPush = false;

  function normalize(path) {
    if (!path) return "#/home";
    path = String(path).trim();
    if (!path.startsWith("#")) path = "#" + path;
    if (!path.startsWith("#/")) path = "#/" + path.replace(/^#/, "");
    if (path === "#/" || path === "#") return "#/home";
    return path;
  }

  function parse() {
    const raw = normalize(location.hash || "#/home").slice(1); // /home/...
    const parts = raw.split("/").filter(Boolean);
    return {
      name: parts[0] || "home",
      params: parts.slice(1),
      path: raw.startsWith("/") ? raw : "/" + raw,
    };
  }

  function go(path, opts = {}) {
    path = normalize(path);
    const replace = !!opts.replace;
    const alreadyThere = normalize(location.hash || "#/home") === path;

    if (!replace && !alreadyThere && current && current !== path) {
      stack.push(current);
      if (stack.length > 80) stack.shift();
    }

    current = path;

    if (replace || alreadyThere) {
      suppressHashPush = true;
      history.replaceState(history.state, "", location.pathname + location.search + path);
      suppressHashPush = false;
      notify();
      return;
    }

    // Set hash, then notify immediately (some mobile WebViews miss hashchange)
    location.hash = path;
    notify();
  }

  function back(fallback = "#/home") {
    const prev = stack.pop();
    go(prev || fallback, { replace: true });
  }

  function notify() {
    current = normalize(location.hash || "#/home");
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

  window.addEventListener("hashchange", () => {
    if (suppressHashPush) return;
    const next = normalize(location.hash || "#/home");
    if (current && current !== next) {
      const idx = stack.lastIndexOf(next);
      if (idx >= 0) stack.length = idx;
      else stack.push(current);
    }
    current = next;
    notify();
  });

  current = normalize(location.hash || "#/home");
  if (!location.hash) {
    history.replaceState(null, "", location.pathname + location.search + "#/home");
    current = "#/home";
  }

  return { parse, go, back, onChange, notify, normalize };
})();
