'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "989a1c57dba67714bcda2fa89923b908",
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
"index.html": "acbdfd21e4c5bf4b9f9365916d9c7bf4",
"/": "acbdfd21e4c5bf4b9f9365916d9c7bf4",
"privacy-policy.html": "6416e42a403b06d96b6de9fd263befe6",
"CNAME": "db59d0bb93db98cd8740d52c45dd5ea7",
"main.dart.js": "1c84f0cd9edbc37a0d85cfa66aa24c1e",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "d5a7974bdaaa254b9918c755a055ae7b",
"icons/Icon-192.png": "d5a7974bdaaa254b9918c755a055ae7b",
"icons/Icon-512.png": "bf81e628b32fdd9ca0d0430fcee8458a",
"manifest.json": "c32b7b2b8630b5fdb27f9d780fddf3a5",
".git/config": "28bd7cce195986435401121d4a6d7a3b",
".git/objects/66/59ca59d2491f7bb412c133b36660add4e4873b": "a94da2310608d5db12fd72c5248fb6d3",
".git/objects/6f/dde6048856bcfa1b31c1783671326b4caee410": "16c9ec59c271c952b9822be1c71478b6",
".git/objects/51/1da41ab5857e41127256e4c2a6584e1e314950": "958ada32fe5e3b535e4ee1fb5b61ac20",
".git/objects/67/e6d993d2eb14fa4d00bbb3414421fc297c8889": "0057bcdd591018bd59ef031b54e8d05c",
".git/objects/02/b9543955734663bd8c9b4ab68f417a8d9ec796": "dd2591eb7eb44e855f67a65d6aca3b0b",
".git/objects/d0/a539684366fd1e6c28567462be8674491f56b7": "c51edb5226d282165e302cbc4c06ea84",
".git/objects/a5/43f8b79dd011ba30a14f88c275f9d9cc98f186": "688c053448a883c1073beedb75376666",
".git/objects/f4/cda5d45bc5b0a1839ead7ee2bd9d81f8ae25c7": "32471ca0ead8595cdc09e979deb3dccc",
".git/objects/ee/970f78d3b15536ba7877b10cd7c71c1a82aa72": "6db7f73211a008d8ab4ce4eae4d05843",
".git/objects/pack/pack-cbfcaf0519888a81963eb4edbace5f39e452fe85.idx": "2e70cdf714e559a5f6716e26b6c7cbb2",
".git/objects/pack/pack-cbfcaf0519888a81963eb4edbace5f39e452fe85.pack": "6457e864341a873504a31e40f3abf208",
".git/objects/26/808dd053215b0358f67cfb0a6a5237797be67d": "b0bbb918e4811413a4b159b9f617ebca",
".git/objects/07/7255320a18a52180e997a51211ccacd738244e": "b7542d8642f5ad21ff57bd27fa040121",
".git/objects/6e/3d4bc3ec241b9e012f5db1f0335a4ad83cce72": "2013fa40cef5c8c36d13f7e4d493b7ff",
".git/objects/9a/c20fcb70b7453d7156483c63f52ff47ee7eba6": "9b22c7511c1b2a84978cfadb049014c1",
".git/objects/36/a89f8d0f7e6b9bab5433cfbc71e11c1f52a67b": "68c854a111ccc04ff8aad49e69951ac9",
".git/objects/3a/5c196e2c8c92984a4ace7378349f7c167d489c": "c6390e2df130f5b9cb56a59aaa62cf06",
".git/objects/53/66b746edaaa1e3ab69ec40ccdd22c4628cc250": "475baf91b95c911b06c918cdd21a5efd",
".git/objects/dd/1e79cde4992da6b80d27a1a3410643fd976fcf": "477d38284a4c505d31485fe3d76ee04d",
".git/objects/1d/5a081ea2f452695db0d49615ef0e275da4e406": "1976ed0e0ddb69dc913479d125484e12",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/fork-settings": "c7f9f26b69b0f208cb4f637f3f258132",
".git/logs/HEAD": "6da502982b8337adfa06d021375fef9b",
".git/logs/refs/heads/main": "6da502982b8337adfa06d021375fef9b",
".git/logs/refs/remotes/origin/HEAD": "d83a9398428572aee718cd1b5dcb993a",
".git/logs/refs/remotes/origin/main": "9a58e3ca65f46e3cdc003541a1151eb1",
".git/refs/heads/main": "282534d8bf1da25e6dfa7384edf2ab45",
".git/refs/remotes/origin/HEAD": "98b16e0b650190870f1b40bc8f4aec4e",
".git/refs/remotes/origin/main": "282534d8bf1da25e6dfa7384edf2ab45",
".git/index": "6c77b03004e8da70e1975b2fe8656941",
".git/packed-refs": "6b80ea5a9804895e11b77e9fac44ef94",
".git/COMMIT_EDITMSG": "c5744cc6d3aaebf616acf7025e12147f",
".git/FETCH_HEAD": "de4779bb213f05818ac814e26f56eb48",
"assets/AssetManifest.json": "835984f1832fa898e5230e33b9951556",
"assets/NOTICES": "119aa8f10321d5e2816bf6b7bfd3654b",
"assets/FontManifest.json": "7b3b848aed509ecd684cc2f89aaf4e31",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "577930fdab652096b6f8e0f494528ca1",
"assets/fonts/MaterialIcons-Regular.otf": "e7ef1eaf7272acedb2728acd45451aac",
"assets/fonts/CustomIcons.ttf": "b7f03824d0264f2da089de9254581b7f",
"assets/assets/images/preview_image.jpg": "c541d0fb95396e6a916a9baeaf8b1f13",
"assets/assets/images/ic_keyboard_arrow_down.png": "76dd280fe1c4a17606988a8baf165863",
"assets/assets/images/splash.png": "b9bcd50ab20787c2961d56714369d44c",
"assets/assets/images/ic_keyboard_arrow_up.png": "41b9af44c7e57dfacf3f48dadae7f1e5",
"assets/assets/ca/lets-encrypt-r3.pem": "be77e5992c00fcd753d1b9c11d3768f2",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "1a074e8452fe5e0d02b112e22cdcf455",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "be0e3b33510f5b7b0cc76cc4d3e50048",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "42df12e09ecc0d5a4a34a69d7ee44314",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15"};
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
