const cacheName = 'v2';

// Call install event
self.addEventListener('install', (event) => {
    console.log('SW installed');
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
        fetch(e.request)
        .then(res => {
            //clone response
            const resClone = res.clone();
            //open cache
            caches.open(cacheName)
            .then(cache => {
                //add response to cache
                cache.put(e.request, resClone);
            })
            return res;
        }).catch(err => caches.match(e.request)
        .then(res => {
            return res;
        }))
    );
});