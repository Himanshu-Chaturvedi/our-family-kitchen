const CACHE = "family-kitchen-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./css/responsive.css",
  "./js/app.js",
  "./js/router.js",
  "./js/search.js",
  "./js/filters.js",
  "./js/storage.js",
  "./js/planner.js",
  "./js/shopping.js",
  "./js/cooking-mode.js",
  "./js/dk-care.js",
  "./data/recipes.json",
  "./data/ingredients.json",
  "./data/categories.json",
  "./data/dk-recipes.json",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // Network-first for app shell / JS so updates are not stuck
  const url = new URL(req.url);
  const isAppShell =
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith("index.html") ||
    url.pathname.endsWith("/") ||
    url.pathname.endsWith("service-worker.js");

  if (isAppShell) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      const fetched = fetch(req)
        .then((res) => {
          if (res && res.ok && url.origin === self.location.origin) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetched;
    })
  );
});
