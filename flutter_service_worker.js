'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "96a781710d41d0ff3a662c3f35f3ff4f",
"version.json": "42dad7b26c4aa3e5d092006808def2ce",
"splash/img/light-2x.png": "3581e372dbedd9febfefd60c40101dc3",
"splash/img/dark-4x.png": "01438c3a169a58960c90d7fd82600ee8",
"splash/img/light-3x.png": "82583572b81b4fda989f3ef8b75dfa94",
"splash/img/dark-3x.png": "82583572b81b4fda989f3ef8b75dfa94",
"splash/img/light-4x.png": "01438c3a169a58960c90d7fd82600ee8",
"splash/img/dark-2x.png": "3581e372dbedd9febfefd60c40101dc3",
"splash/img/dark-1x.png": "1735675a2001a35ce99527e0ca07ca37",
"splash/img/light-1x.png": "1735675a2001a35ce99527e0ca07ca37",
"splash/splash.js": "123c400b58bea74c1305ca3ac966748d",
"splash/style.css": "87bd38c7e629047f693a28a8c4ccd458",
"index.html": "7bdee9583621b2b2b40bde06ba1f78a1",
"/": "7bdee9583621b2b2b40bde06ba1f78a1",
"about.html": "97285035a694d8b427f3bd4a7dbee117",
"privacy-policy.html": "fcd3044f2f679346168459296a59c203",
"contact.html": "97e3ba708af9f7a94d16914ddf4ee448",
"CNAME": "db59d0bb93db98cd8740d52c45dd5ea7",
"main.dart.js": "6c70c9be7b188346051e48eb1384a791",
"config.json": "7b4a0ebaed1fe6d1887ffdd34bc5b204",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"README.md": "e81009d3ef17481bd6fd2aeae3b83f4d",
"favicon.png": "89bf6a7ce8a86dec490ed8fecf017eb2",
"icons/Icon-192.png": "89bf6a7ce8a86dec490ed8fecf017eb2",
"icons/Icon-512.png": "6448fea72d5bc4fc1a687ec764ec3e88",
"manifest.json": "c32b7b2b8630b5fdb27f9d780fddf3a5",
"assets/AssetManifest.json": "c2b1903dc64b4d46e1355b0210535423",
"assets/NOTICES": "19b193d52777ede5295a304d90a38648",
"assets/FontManifest.json": "7b3b848aed509ecd684cc2f89aaf4e31",
"assets/AssetManifest.bin.json": "cff896bfbf861e7dab5d5cd2d4f9782d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "925212dfd918124ca5fc2e9bbb08e679",
"assets/fonts/MaterialIcons-Regular.otf": "cc647413aedc10f41587a3913cb466fb",
"assets/fonts/CustomIcons.ttf": "b7f03824d0264f2da089de9254581b7f",
"assets/assets/images/preview_image.jpg": "8a3fa3d2345b3e2fbbec5f23d8c87ccb",
"assets/assets/images/splash.png": "b9bcd50ab20787c2961d56714369d44c",
"assets/assets/images/app_icon_square.png": "492acf067427a22f9f3be55948d26c82",
"assets/assets/images/icons/creator_code.svg.vec": "f262e3222af287acd9027bcf961e29cc",
"assets/assets/images/icons/experience.svg.vec": "165726fb3252e08b9854f7c68b847425",
"assets/assets/images/icons/family_friendly.svg.vec": "c6f3ab042ae914089c982b0d30e1ce98",
"assets/assets/images/icons/not_family_friendly.svg.vec": "df38b35b1e4a82fe6d9a51f30eb85f92",
"assets/assets/ca/isrgrootx1.pem": "118ecd744d864b32ffdb48b2e29f1d7f",
"assets/assets/ca/lets-encrypt-r3.pem": "be77e5992c00fcd753d1b9c11d3768f2",
"translate.html": "8abcdb26e6e9e95574549af3447b1034",
"sitemap.txt": "4e508712aa24ebd1002450a76285c539",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
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
