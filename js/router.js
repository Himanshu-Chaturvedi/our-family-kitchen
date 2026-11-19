const Router = (() => {
  const listeners = [];

  function parse() {
    const hash = (location.hash || "#/home").replace(/^#/, "");
    const parts = hash.split("/").filter(Boolean);
    const name = parts[0] || "home";
    const params = parts.slice(1);
    return { name, params, path: hash };
  }

  function go(path) {
    if (!path.startsWith("#")) path = "#" + path;
    if (location.hash === path) {
      notify();
      return;
    }
    location.hash = path;
  }

  function notify() {
    const route = parse();
    listeners.forEach((fn) => fn(route));
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  window.addEventListener("hashchange", notify);

  return { parse, go, onChange, notify };
})();
