const CACHE_VERSION = "v2";
const CACHE_NAME = "addison-birthday-" + CACHE_VERSION;

const ASSETS = [
  "./index.html",
  "./css/styles.css",
  "./js/config.js",
  "./js/storage.js",
  "./js/ui-core.js",
  "./js/ui-theme.js",
  "./js/ui-wheel.js",
  "./js/ui-filters.js",
  "./js/ui-ideas.js",
  "./js/ui-favorites.js",
  "./js/ui-plan.js",
  "./js/ui-notes.js",
  "./js/ui-effects.js",
  "./js/ui-init.js",
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
