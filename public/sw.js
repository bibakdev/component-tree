const CACHE_NAME = 'tree-builder-v1';
const PRECACHE_URLS = ["/404.html","/index.html","/index.txt","/manifest.json","/sw.template.js","/tree192.png","/tree512.png","/_next/static/chunks/02c4xh53~gn6h.js","/_next/static/chunks/03~yq9q893hmn.js","/_next/static/chunks/07lhk_q6pmm3r.js","/_next/static/chunks/0b5yd18v4zlw1.js","/_next/static/chunks/0b7mq3~j72421.css","/_next/static/chunks/0dbhjjzl8qfwv.js","/_next/static/chunks/0ntdg9z0xxt~5.js","/_next/static/chunks/0r8nt2o8muejo.js","/_next/static/chunks/turbopack-03rxl8.l5w9ge.js","/_next/static/HQlDFbXWU6GMdGczPvjKh/_buildManifest.js","/_next/static/HQlDFbXWU6GMdGczPvjKh/_clientMiddlewareManifest.js","/_next/static/HQlDFbXWU6GMdGczPvjKh/_ssgManifest.js","/_not-found/__next._full.txt","/_not-found/__next._head.txt","/_not-found/__next._index.txt","/_not-found/__next._not-found/__PAGE__.txt","/_not-found/__next._not-found.txt","/_not-found/__next._tree.txt","/_not-found.html","/_not-found.txt","/__next._full.txt","/__next._head.txt","/__next._index.txt","/__next._tree.txt","/__next.__PAGE__.txt","/"];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const cloned = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, cloned));
        }
        return response;
      });
      return cached || fetchPromise;
    })
  );
});
