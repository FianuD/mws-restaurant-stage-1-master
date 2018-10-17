/**
 *  Array of file-names for cache
 */
const cacheFiles = [
    './',
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './data/restaurants.json',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg'
];

/**
 * Event listener for the installation event
 */
self.addEventListener('install', function(e){
    e.waitUntil(
        caches.open('v1').then(function(cache){
            return cache.addAll(cacheFiles);
        })
    );
});

/**
 * Event listener for the fetch event
 */
self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(response) {
            if(response) {
                console.log('Found ', e.request,' in cache');
                return response;
            } else {
                console.log('Could not find, ',e.request,' in cache, FETCHING!');
                return fetch(e.request)
                .then(function(response){
                    caches.open('v1').then(function(cache){
                        cache.put(e.request, response);
                    });
                    return response;
                })
                .catch(function(){
                    console.error(error);
                });
            }
		})
	);
});