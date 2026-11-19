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

    if (normalize(location.hash || "#/home") === path) {
      current = path;
      notify();
      return;
    }

    if (!replace && current && current !== path) {
      stack.push(current);
      if (stack.length > 80) stack.shift();
    }

    current = path;
    if (replace) {
      suppressHashPush = true;
      history.replaceState(history.state, "", location.pathname + location.search + path);
      suppressHashPush = false;
      notify();
    } else {
      location.hash = path; // includes leading #
    }
  }

  function back(fallback = "#/home") {
    const prev = stack.pop();
    go(prev || fallback, { replace: true });
  }

  function notify() {
    current = normalize(location.hash || "#/home");
    const route = parse();
    listeners.forEach((fn) => fn(route));
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  window.addEventListener("hashchange", () => {
    if (suppressHashPush) return;
    const next = normalize(location.hash || "#/home");
    if (current && current !== next) {
      // Browser back: if next is already in stack, trim to it
      const idx = stack.lastIndexOf(next);
      if (idx >= 0) {
        stack.length = idx;
      } else if (current !== next) {
        // forward navigation via browser — keep current on stack
        stack.push(current);
      }
    }
    current = next;
    notify();
  });

  current = normalize(location.hash || "#/home");
  if (!location.hash) {
    history.replaceState(null, "", "#/home");
    current = "#/home";
  }

  return { parse, go, back, onChange, notify };
})();
