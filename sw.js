const CACHE_VERSION = "v1";
const CACHE_NAME = "addison-birthday-" + CACHE_VERSION;

const ASSETS = [
  "./index.html",
  "./styles.css",
  "./config.js",
  "./storage.js",
  "./ui-core.js",
  "./ui-theme.js",
  "./ui-wheel.js",
  "./ui-filters.js",
  "./ui-ideas.js",
  "./ui-favorites.js",
  "./ui-plan.js",
  "./ui-notes.js",
  "./ui-effects.js",
  "./ui-init.js",
  "./manifest.json",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    }),
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) {
            return key.startsWith("addison-birthday-") && key !== CACHE_NAME;
          })
          .map(function (key) {
            return caches.delete(key);
          }),
      );
    }),
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      return cached || fetch(event.request);
    }),
  );
});
