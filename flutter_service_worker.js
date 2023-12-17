'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "a5b8fa014fe34e9dda6bd9cc97bd1d2c",
"splash/img/light-2x.png": "d5304399451e0b8b40407b8237cb8550",
"splash/img/dark-4x.png": "d813a69dd93192fc374f36a47ed8d114",
"splash/img/light-3x.png": "361b55857044a4531bebfa3388afca9c",
"splash/img/dark-3x.png": "361b55857044a4531bebfa3388afca9c",
"splash/img/light-4x.png": "d813a69dd93192fc374f36a47ed8d114",
"splash/img/dark-2x.png": "d5304399451e0b8b40407b8237cb8550",
"splash/img/dark-1x.png": "27ff82df1e395c3b9cd1e364765bcae2",
"splash/img/light-1x.png": "27ff82df1e395c3b9cd1e364765bcae2",
"splash/splash.js": "123c400b58bea74c1305ca3ac966748d",
"splash/style.css": "87bd38c7e629047f693a28a8c4ccd458",
"index.html": "64238c8b67ac42fef72940758dcbdf90",
"/": "64238c8b67ac42fef72940758dcbdf90",
"privacy-policy.html": "6416e42a403b06d96b6de9fd263befe6",
"CNAME": "db59d0bb93db98cd8740d52c45dd5ea7",
"main.dart.js": "b7a040b0e4f399fe01b098ac45607301",
"flutter.js": "7d69e653079438abfbb24b82a655b0a4",
"favicon.png": "d5a7974bdaaa254b9918c755a055ae7b",
"icons/Icon-192.png": "d5a7974bdaaa254b9918c755a055ae7b",
"icons/Icon-512.png": "bf81e628b32fdd9ca0d0430fcee8458a",
"manifest.json": "c32b7b2b8630b5fdb27f9d780fddf3a5",
".git/config": "717ff5af3258c4c00b8848e6e5fd0fd5",
".git/objects/pack/pack-cc5cddde2c6de1156ee2633538a21b381fa93292.pack": "2215ef830d05bf3400f763120a772c85",
".git/objects/pack/pack-cc5cddde2c6de1156ee2633538a21b381fa93292.idx": "42972dc890ab94f15af25d2254a43839",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/fork-settings": "d0f3f68a8599a895268fce377e69e12f",
".git/logs/HEAD": "f121b9a8d76da8d2e01aac2926920885",
".git/logs/refs/heads/main": "3114bf062d0d7d28f3cd3a3f77ce0e14",
".git/logs/refs/remotes/origin/main": "291c633fb503e73b4c8c5232369b6930",
".git/refs/heads/main": "7b172841e2dbbc9bd7c230d0e1418cd0",
".git/refs/remotes/origin/main": "7b172841e2dbbc9bd7c230d0e1418cd0",
".git/index": "35066a1c9604e24eae69bda1e2135fd5",
".git/FETCH_HEAD": "484c8fdf2cecbc429f9ae8e2daed7c6d",
"assets/AssetManifest.json": "69abf4ad738ac1ca87720147b478bef2",
"assets/NOTICES": "46e0a5cc178573610251fa3fcf0fefae",
"assets/FontManifest.json": "7b3b848aed509ecd684cc2f89aaf4e31",
"assets/AssetManifest.bin.json": "2272fc2e500ec45b7df9772b65063c05",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/AssetManifest.bin": "e14b2f3f49ad2a262ddb9e64e6fb93e7",
"assets/fonts/MaterialIcons-Regular.otf": "e7ef1eaf7272acedb2728acd45451aac",
"assets/fonts/CustomIcons.ttf": "b7f03824d0264f2da089de9254581b7f",
"assets/assets/images/preview_image.jpg": "c541d0fb95396e6a916a9baeaf8b1f13",
"assets/assets/images/ic_keyboard_arrow_down.png": "76dd280fe1c4a17606988a8baf165863",
"assets/assets/images/splash.png": "b9bcd50ab20787c2961d56714369d44c",
"assets/assets/images/app_icon_square.png": "492acf067427a22f9f3be55948d26c82",
"assets/assets/images/ic_keyboard_arrow_up.png": "41b9af44c7e57dfacf3f48dadae7f1e5",
"assets/assets/ca/lets-encrypt-r3.pem": "be77e5992c00fcd753d1b9c11d3768f2",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
