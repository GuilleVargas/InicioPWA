self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('mi-cache').then(function (cache) {
            return cache.addAll([
                './',
                './index.html',
                './index.js',
                './style.css',
                './images/foto.jpg',
            ]);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        fetch(event.request)
            .catch(() => caches.match(event.request))
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request)
            .then(async response => {
                if (event.request.method === 'GET') {
                    try {
                        await cache.put(event.request, response.clone());
                    } catch (error) {
                        await cache.add(event.request);
                    }
                }
                return response;
            })
            .catch(() => caches.match(event.request)),
    );
});