const cacheName = 'v1';
const cacheAssets = [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/main.js'
];

// Call install event
self.addEventListener('install', (event) => {
    console.log('SW installed');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('SW caching files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});

// Call activate event
self.addEventListener('activate', (event) => {
    console.log('SW activated');
    //remove old caches
    event.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('SW deleting old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

// Call fetch event
self.addEventListener('fetch', e => {
    console.log('SW fetching');
    console.log(e);
    e.respondWith(
        fetch(e.request).catch(() => {
            caches.match(e.request)
        })
    );
});