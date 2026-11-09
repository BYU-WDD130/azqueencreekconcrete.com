const CACHE_NAME = 'queen-creek-concrete-v1';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './images/patio-slab.webp',
    './images/driveway-installation.webp',
    './images/rv-pad.webp',
    './images/hero-concrete-bg.webp'
];

// Instalación del Service Worker y almacenamiento en caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Archivos en caché correctamente');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Eliminando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptación de peticiones para servir desde la caché
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si está en caché lo devuelve, si no, lo busca en la red
                return response || fetch(event.request);
            })
    );
});