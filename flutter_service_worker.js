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
"index.html": "a47c495556600ee7ed188c6a7813764d",
"/": "a47c495556600ee7ed188c6a7813764d",
"privacy-policy.html": "6416e42a403b06d96b6de9fd263befe6",
"CNAME": "db59d0bb93db98cd8740d52c45dd5ea7",
"main.dart.js": "0dc2aabf964fa1039bedf2dd4ed6a73e",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "d5a7974bdaaa254b9918c755a055ae7b",
"icons/Icon-192.png": "d5a7974bdaaa254b9918c755a055ae7b",
"icons/Icon-512.png": "bf81e628b32fdd9ca0d0430fcee8458a",
"manifest.json": "c32b7b2b8630b5fdb27f9d780fddf3a5",
".git/config": "28bd7cce195986435401121d4a6d7a3b",
".git/objects/61/9eab482781570242332c10c8e11b3b5b86dc3f": "d5b9da06c2ea7587c8cab2faf29b1fbd",
".git/objects/0d/39cd18a56e7ce6e6d007a02a9c9fa1aaaab4b9": "ff11e9e52065be9118f75b64e2994164",
".git/objects/95/44e7d15854b2aa5af25d5518734380b207a92f": "0c4d339a28e28597bee124b1f0f613c5",
".git/objects/66/59ca59d2491f7bb412c133b36660add4e4873b": "a94da2310608d5db12fd72c5248fb6d3",
".git/objects/68/cbf42132c7e42cd4880762df7954336fe6f900": "53a119a98829c9778d943cfe88c63bbd",
".git/objects/6f/dde6048856bcfa1b31c1783671326b4caee410": "16c9ec59c271c952b9822be1c71478b6",
".git/objects/9b/15fd46da23611e6882140dc9084d8bcf422cc5": "842ecae72ec0e5aee7efa113877c5141",
".git/objects/6a/a2efb64b0f0a677a04dda6a7ec8196f06248dc": "c7b5e9221dcf3ad501b58d7cda42884c",
".git/objects/51/1da41ab5857e41127256e4c2a6584e1e314950": "958ada32fe5e3b535e4ee1fb5b61ac20",
".git/objects/67/e6d993d2eb14fa4d00bbb3414421fc297c8889": "0057bcdd591018bd59ef031b54e8d05c",
".git/objects/0e/e773383041b8cf837c06891d1314d8c6fb9438": "e8cd3b79a51a23531722fd964c2f8065",
".git/objects/5f/530adfdc54daef3a77b071b7f95c2f0be62822": "f2709fc0dcde4d579288005d5e0eadd2",
".git/objects/5f/b9e3c3b67158b0d551d19629717e5fdb449ea0": "b0f0ac6fa2eceea3dac84cd295e18eff",
".git/objects/9d/e0b345f74b31ab29f6019694f07222dd3f988e": "9c2efb17f8854b2317ce01e186e43f07",
".git/objects/02/b9543955734663bd8c9b4ab68f417a8d9ec796": "dd2591eb7eb44e855f67a65d6aca3b0b",
".git/objects/d9/3e00e43088aa60563922a24125bc0b17ec6091": "ee1ba33fcf278e951772ae27c7c8dba7",
".git/objects/bb/41045e20816322512856e8e62bdf6cbf970952": "ad085b1af62c5088fb250ba3b901e578",
".git/objects/d7/2c11112c7cb4e2ce754bc41470f9b829a2d00a": "d7280a766a5d6033f187d874a92b5ad6",
".git/objects/d0/6ed7a60abdbe3fba26c4f25b767800fa9b87b2": "5defb7f7bf27aeaa0fe44f38be0968b2",
".git/objects/d0/a539684366fd1e6c28567462be8674491f56b7": "c51edb5226d282165e302cbc4c06ea84",
".git/objects/df/7d2dcb89ab89da87467c0e1059b38c8d8f9296": "a44162ff357b024e4638ab18a9bb01c7",
".git/objects/a2/2a0b6e0f139790a5d29f5f3cf9ca7b6fb6467c": "e17ec95397c37cdc048b91551f57235f",
".git/objects/a5/43f8b79dd011ba30a14f88c275f9d9cc98f186": "688c053448a883c1073beedb75376666",
".git/objects/e2/e2f7de8991da4fa9b946f14f9e916b56be54c9": "eb0c5329e99a132b7ca07ce401b11367",
".git/objects/f4/cda5d45bc5b0a1839ead7ee2bd9d81f8ae25c7": "32471ca0ead8595cdc09e979deb3dccc",
".git/objects/ee/970f78d3b15536ba7877b10cd7c71c1a82aa72": "6db7f73211a008d8ab4ce4eae4d05843",
".git/objects/c9/eee02026a0cd7cf3161845713eba0374578639": "c992e8e1bff87835a5d196f9fc91faa3",
".git/objects/fc/de1bb3df8c330568f07ef326d43d8ae3562897": "6e5bf2450330342c243afc3723b9c27e",
".git/objects/ca/e4c4b16ef658bfb3d6a0e268e6d6b796a84ca1": "1a1223fdd6c45d92e3ba39902ae92a3c",
".git/objects/ec/0d30503d7cbf1d7dcc26b12318a1fa6bb0bedc": "888f65b2ae7646044c9a76d641ab979e",
".git/objects/4e/b331c6b0e0d059357269b969acea40644ee5ca": "a318a0bd3ceb572a90384a7cb79d35b6",
".git/objects/18/7ebb2ca7a968a1458cef1ddf1af39090a3945c": "8c8e622fb3ca2e931a2451aa6abf44fd",
".git/objects/pack/pack-cbfcaf0519888a81963eb4edbace5f39e452fe85.idx": "2e70cdf714e559a5f6716e26b6c7cbb2",
".git/objects/pack/pack-cbfcaf0519888a81963eb4edbace5f39e452fe85.pack": "6457e864341a873504a31e40f3abf208",
".git/objects/29/3f1786fa2a71916da8ce31d55c3b84b772d47c": "a2df19cb902b3a7b170b92b3de1af7ee",
".git/objects/74/44da41a5a18b5bf05423eb8ebd1d89e5ed61bb": "1dd36ceb3b3d613f52db3f759a3c4639",
".git/objects/7b/eab0e90bc9ec05e147938bc1e88afcf8778d6e": "53a29b077b25bdbeaecfe147133a0cf5",
".git/objects/8f/047770779c990351a21237e4a94ce688b536fa": "66161831f37adc9f27e2adf7f500622f",
".git/objects/8f/a632c84e8d4cb4bb751c74f3444c31450d0b9c": "0210bd5ccc2e731e7d2a665c0e73ef06",
".git/objects/19/de08875913478f02a9782856b1a1345e712de1": "d5c76e6b5424a07c74757009480b0e92",
".git/objects/4c/a2a7c226d2c3e26f0b9dde74214486d0baa896": "734657b1f27c72d07dd9e52a25c020c1",
".git/objects/26/808dd053215b0358f67cfb0a6a5237797be67d": "b0bbb918e4811413a4b159b9f617ebca",
".git/objects/2a/8f65ddc84cf2ea5c1a9ce2ce4b8b37ef28661a": "3a72b95ddd4a6465a575bb0cc06e89f0",
".git/objects/9f/25d0f15f6ceeba5a8cbdc8da9d067fd002dafb": "f9b048a9669bc0794bb740029939c492",
".git/objects/6b/458fa8295ce3d821557462a2567891a32662b9": "c7fdaba4662919d3c67695bbe99c7a19",
".git/objects/07/7255320a18a52180e997a51211ccacd738244e": "b7542d8642f5ad21ff57bd27fa040121",
".git/objects/6e/3d4bc3ec241b9e012f5db1f0335a4ad83cce72": "2013fa40cef5c8c36d13f7e4d493b7ff",
".git/objects/9a/c20fcb70b7453d7156483c63f52ff47ee7eba6": "9b22c7511c1b2a84978cfadb049014c1",
".git/objects/36/a89f8d0f7e6b9bab5433cfbc71e11c1f52a67b": "68c854a111ccc04ff8aad49e69951ac9",
".git/objects/91/8f0a0210101b107cfbe6c6abccd9d032a4a40d": "b939656b73669185bc162c36c3934d6a",
".git/objects/96/6d3a514f5508ae9724df6f00ea2dab43180315": "764e0a67c7628dd3241ab74d43f7cfcf",
".git/objects/3a/5c196e2c8c92984a4ace7378349f7c167d489c": "c6390e2df130f5b9cb56a59aaa62cf06",
".git/objects/53/66b746edaaa1e3ab69ec40ccdd22c4628cc250": "475baf91b95c911b06c918cdd21a5efd",
".git/objects/53/7807567919e88db2866b7825339c57e94c24d8": "970aec5149a3dbe9370a9dc982cdd022",
".git/objects/3f/19dc24755aa8e28a6742234b4deefc0dcc47d9": "754f7553964b90049974d2b69ca9bc21",
".git/objects/01/bcca7d1c23955f7aeda6a269b1b7f540802096": "635a6822e2a56f7f333d54c66b0234db",
".git/objects/d3/e6fdd8bfde4ac1e22c30b2455599ef8407e0c9": "c3cda11c7dffa253f365bd38e70d2110",
".git/objects/dd/8f2a160a263ac56878b9d4bcc525a8de09c7aa": "814c08c94bb25e3aece55cd7f297a208",
".git/objects/dd/4ccea3d8f7bc18d64b00b3ea9778c502512687": "11863dd9f9e005fc4f4ab3e26a7a7220",
".git/objects/dd/1e79cde4992da6b80d27a1a3410643fd976fcf": "477d38284a4c505d31485fe3d76ee04d",
".git/objects/d5/b54bd4a898b373f82bb1fa52b9580e7a976e3e": "943e27e1d359e2bc22daf20c70287c19",
".git/objects/a8/234e78324011301c932efde8dd789fba10495a": "5ad9ca983e505191e13f526cf3be6ade",
".git/objects/c3/59e9e2d09f256e924a1ff268d3a1f519454967": "e3c6b5cf84590a798f3ddfbc3c0aa319",
".git/objects/e6/b745f90f2a4d1ee873fc396496c110db8ff0f3": "2933b2b2ca80c66b96cf80cd73d4cd16",
".git/objects/f7/ce1d1230c6f821f017618144a43db517579bfa": "89f1526839c3b99a314f4e56fea8900b",
".git/objects/e8/55dc987b0db3ccd24a8869a087233a0e124f27": "9b242467f4dfe05ce7d2727a68a1ea66",
".git/objects/c5/9531952b4ae034323cad66b76030f1a7cbdc95": "b908d7ef1286adb510183304a502e8f3",
".git/objects/f1/bdf7dc2b6a3976e0b738f036387070213edf0e": "a3bf7f0ce0ed9fd1aa69bfb2a3103fa4",
".git/objects/e0/562b39ae7840157a5e305f663c861ea760ce4b": "88f5d06be2d1f8758feaf2b878ca1b89",
".git/objects/83/0e3d19e7f2ff19bbb4b955e3a38e3328837e12": "4412f19a8aebd49e1c2fb821b641e232",
".git/objects/1b/c1730be36ad60839c9c31a771f8bb7f2d16864": "fefb107d74b3b31a587386e606551279",
".git/objects/84/d4fe6e022cc44343a89472edde06d8ffdfa0d4": "82b12463fe4e6a56630238b550babbbc",
".git/objects/24/a8bb1f5ad340cbec40fc2b43504faac3e17247": "94df0b231afa3601de35bb3251dc3574",
".git/objects/24/0bc065ea3439f8679c9efe894cabd1ed614247": "201ca0c5bd088803200ddf11f4fa1ac1",
".git/objects/1d/5a081ea2f452695db0d49615ef0e275da4e406": "1976ed0e0ddb69dc913479d125484e12",
".git/objects/40/3754e5c91ffd7e6d8ab336c5555dda21c320e8": "2df65f459c248459e516ec796b4d78c2",
".git/objects/25/7fc582b6af1cf7b302bffe0dd3c0338e239378": "8eb90caf26effc2695a2caee801c8db9",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/fork-settings": "4bcb5397aa401ed72ac382561f413703",
".git/logs/HEAD": "32f84174038469b39f58f0583927dcb8",
".git/logs/refs/heads/main": "32f84174038469b39f58f0583927dcb8",
".git/logs/refs/remotes/origin/HEAD": "d83a9398428572aee718cd1b5dcb993a",
".git/logs/refs/remotes/origin/main": "3a63264b2a9028b6edf6786a7d64cd8b",
".git/refs/heads/main": "cf7e32fb7f1002eddc564694748f0193",
".git/refs/remotes/origin/HEAD": "98b16e0b650190870f1b40bc8f4aec4e",
".git/refs/remotes/origin/main": "cf7e32fb7f1002eddc564694748f0193",
".git/index": "f2e42ff42ab6f588047b5ac8881996d5",
".git/packed-refs": "6b80ea5a9804895e11b77e9fac44ef94",
".git/COMMIT_EDITMSG": "be7d3d6f334e94c15745f7db9b12cf87",
".git/FETCH_HEAD": "27cd3ffb078dedb94ca5d68bdd2385af",
"assets/AssetManifest.json": "69abf4ad738ac1ca87720147b478bef2",
"assets/NOTICES": "a19a0dda7434b61c27c70a0c88d6a0a7",
"assets/FontManifest.json": "7b3b848aed509ecd684cc2f89aaf4e31",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "e14b2f3f49ad2a262ddb9e64e6fb93e7",
"assets/fonts/MaterialIcons-Regular.otf": "e7ef1eaf7272acedb2728acd45451aac",
"assets/fonts/CustomIcons.ttf": "b7f03824d0264f2da089de9254581b7f",
"assets/assets/images/preview_image.jpg": "c541d0fb95396e6a916a9baeaf8b1f13",
"assets/assets/images/ic_keyboard_arrow_down.png": "76dd280fe1c4a17606988a8baf165863",
"assets/assets/images/splash.png": "b9bcd50ab20787c2961d56714369d44c",
"assets/assets/images/app_icon_square.png": "492acf067427a22f9f3be55948d26c82",
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
