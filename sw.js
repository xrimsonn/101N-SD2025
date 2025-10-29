const CACHE_NAME = 'my-cache-v1-pwa';

const CACHE_PATHS = [
    './',
    './index.html',
    './main.js',
    './manifestt.json',
    './sw.js',
    './css/index.css',
    './img/yo.jpg',
    './img/tottenham-hotspur-fc-16x16.png',
    './img/tottenham-hotspur-fc-32x32.png',
    './img/tottenham-hotspur-fc-64x64.png',
    './img/tottenham-hotspur-fc-96x96.png',
    './img/tottenham-hotspur-fc-128x128.png',
    './img/tottenham-hotspur-fc-192x192.png',
    './img/tottenham-hotspur-fc-256x256.png',
    './img/tottenham-hotspur-fc-384x384.png',
    './img/tottenham-hotspur-fc-512x512.png',
    './img/tottenham-hotspur-fc-1024x1024.png'
];

self.addEventListener('install', (event) => {
    console.log('Installing');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(CACHE_IMAGES))
            .catch((err) => console.log('Error', err))
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhiteList = [CACHE_NAME]
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

