const CACHE_NAME = 'workout-app-v5';
const urlsToCache = [
  './',
  './index.html',
  'https://raw.githubusercontent.com/itwasnteasy/workout-audio/main/StimPack.mp3',
  'https://raw.githubusercontent.com/itwasnteasy/workout-audio/main/10-seconds-39474.mp3'
];

// Install event - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
