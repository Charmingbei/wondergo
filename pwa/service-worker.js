const CACHE_NAME = "wondergo-pwa-v20260716-2";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=20260716-1",
  "./app.js?v=20260716-1",
  "./manifest.webmanifest",
  "../assets/ip-avatar.png",
  "../assets/ip-guide.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
