// service-worker.js

const CACHE_NAME = 'dhuripara-cache-v2';
const URLS_TO_CACHE = [
  'index.html',
  'css/style.css',
  'scripts/script.js',
  'manifest.json',
  'images/cover.webp',
  'offline.html'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('✅ Caching app shell...');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        return response || caches.match('offline.html');
      });
    })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('🧹 Removing old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});
