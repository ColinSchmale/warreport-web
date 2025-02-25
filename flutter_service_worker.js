'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "77edf32bb2683f3bcd1abe25b6c4b26f",
"version.json": "b0ef53da73e82b7e0aff63eed3ea917b",
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
"index.html": "ed170e184c1f546ced7d3a1f30c200fc",
"/": "ed170e184c1f546ced7d3a1f30c200fc",
"privacy-policy.html": "ce584189b1ac42eb6d6d26051b295399",
"contact.html": "30736aeaf28f048a33b196571384bf9c",
"CNAME": "db59d0bb93db98cd8740d52c45dd5ea7",
"main.dart.js": "cf3548ed279316c1cbf719b38d9b47b0",
"config.json": "7b4a0ebaed1fe6d1887ffdd34bc5b204",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"about/favicon-16x16.png": "b12ef5c22edde3d87330cd0ca69bd908",
"about/clan_war_league_hu_76886b26bc5e0e38.webp": "1766ef0899d4c507bf0cbb40f7063825",
"about/en.search-data.json": "e6543fe767733413f6ddb39bbfad185a",
"about/clan_war_league.jpg": "bfb626a357599a2966b4ab0ad64752f0",
"about/en.search.js": "feffb672220d91ab9ab70c7e3097a67c",
"about/contact/index.html": "56a3afd1737bba341a0b65b8e04b4126",
"about/favicon.ico": "c346de2d04f0194ea0e99d3ee8039b0a",
"about/discord/index.html": "754bf3e808b5f1e7d60977b576f011a8",
"about/index.html": "0cb580f85dfa5b8af66d20913c19ad70",
"about/index.xml": "8c5f66cc42af66bb59939ede053ba764",
"about/android-chrome-192x192.png": "d5a7974bdaaa254b9918c755a055ae7b",
"about/clan_wars.jpg": "bd493dabc1b9bbd455af131b8bd0cf5f",
"about/clan_wars_hu_45ca23fa95f16011.webp": "6162c5e4c73eb318f7806e1fbcf1abaa",
"about/apple-touch-icon.png": "e9be432a3509abdb07f1aa8b5da2025a",
"about/css/custom.min.238e754088478da19f54702cbd976c4b45c6b39d67a9bc8d61f79aa55e724c34.css": "00ae561f7634a0cfa3b02c08004ca5ee",
"about/css/custom.css": "3756e796e72cda933d7d2993ebfc8853",
"about/css/compiled/main.min.0d60cbb74d97ccaea83c3ea6d973c5961d69642b38588069a503bc04e284cbc7.css": "76bf661816e8832f68c04aaccec630ce",
"about/css/compiled/main.css": "1a72407e73e84089342eaba34f604c35",
"about/de.search-data.json": "5ad1eb93e1cd0a3b9e64b1197e44821d",
"about/images/logo-dark.svg": "66cc271a2553b31ebe9885b04ffeef44",
"about/images/logo.png": "a94b14bc7ffe98c619db34032a063517",
"about/images/logo.svg": "39477ec3d41196ec7beaf5042f868f7a",
"about/js/main.js": "a6729a3702040f47fa0be7fdccbfa782",
"about/js/main.min.d0f0346255ba9418db8fcf7f9440ca4e532e06276d8df17497e19e1045ee360b.js": "6787c09210ba01dafedeb9fe367b0150",
"about/players.jpg": "f20e1238ad55a8508bcbb6d3db9f397d",
"about/en.search.min.d87c892b0f5626368727e17b7b9aa2f28bc6384612f6e368994538eb5053a0f2.js": "c611349f1976e0eec3c3e33dd9dbb425",
"about/404.html": "c8c27469fbf56b4af8429685b9c6fde1",
"about/favicon-dark.svg": "b3c8055a6eb94d416dea38b8844f1399",
"about/legend_league_hu_3a9e49463c575c3b.webp": "cce4c4616dc4286dda27d17487751086",
"about/de.search.min.8efc9460bc5a17dc3941f52018e147e063ec54a6484f769794e55a5d2c900c94.js": "b88feb5adb8c4e9bbc4120a54c9d8e4b",
"about/docs/legends_search.jpg": "691ab742294dbb210268127a13695de7",
"about/docs/index.html": "f05863a3c5c434dadbf50320c5c3898a",
"about/docs/index.xml": "347faff0ef87f2ba7598c66f683da2d9",
"about/docs/faq/index.html": "f0224030c304841de5d703d216bc2929",
"about/docs/features/clans/index.html": "7b49456bc5547a22ed4f3b6eceb7c983",
"about/docs/features/clan_war_league/index.html": "2ac196604c0c6fc2cff07e3e2e0d8413",
"about/docs/features/index.html": "ffdd26aeaf6e245f32275c4a17c48675",
"about/docs/features/index.xml": "4fc3b03bc89bb312f69e0f8b0dabf26f",
"about/docs/features/players/index.html": "36e0a22bad54bee7bcdf1de51ec4a55a",
"about/docs/features/clan_wars/index.html": "81a7ca4b4709378aadecc38604c025e2",
"about/docs/features/legend_league/index.html": "38ad51ab6f3a8d5e5acbac6ff57317d2",
"about/docs/features/clan_tag.jpg": "afcbe4cfb94699e59aacb8ebcfb357d2",
"about/docs/features/player_tag.jpg": "5e9b77ea373d46f4168e8ece56681562",
"about/docs/features/account/index.html": "3392571e1c28f38bdf74c0e91c52ed80",
"about/blog/index.html": "2c3e4618fb65494683886ad3c91933a8",
"about/tags/index.html": "1785083500bb171ea830b23afd7be4d6",
"about/tags/index.xml": "83ed5d01300d262cffe1fda9f0f54434",
"about/de.search.js": "e05a1c0464b678c733fc31893e86a95f",
"about/clans.jpg": "f4a91815fae5b6edd4df9e5c134a6693",
"about/legend_league.jpg": "a8a70f9cf5b18b4014585838b13dd0ba",
"about/android-chrome-512x512.png": "bf81e628b32fdd9ca0d0430fcee8458a",
"about/site.webmanifest": "4f579854b6ae9c8d12150d9917cb3549",
"about/lib/flexsearch/flexsearch.bundle.min.0425860527cc9968f9f049421c7a56b39327d475e2e3a8f550416be3a9134327.js": "ccdbea67f75ca683d752719f47b8294d",
"about/de/clan_war_league_hu_76886b26bc5e0e38.webp": "1766ef0899d4c507bf0cbb40f7063825",
"about/de/clan_war_league.jpg": "bfb626a357599a2966b4ab0ad64752f0",
"about/de/contact/index.html": "788e7e31e4d66166d5cd1465029ca076",
"about/de/discord/index.html": "8598f9ce218b19cede83aef85c933a1e",
"about/de/index.html": "0dc1cf2fd88c581cdc86046c8e9e4e92",
"about/de/index.xml": "86f7cd342f330c6f2d61642855a94bee",
"about/de/clan_wars.jpg": "bd493dabc1b9bbd455af131b8bd0cf5f",
"about/de/clan_wars_hu_45ca23fa95f16011.webp": "6162c5e4c73eb318f7806e1fbcf1abaa",
"about/de/images/logo.png": "492acf067427a22f9f3be55948d26c82",
"about/de/players.jpg": "f20e1238ad55a8508bcbb6d3db9f397d",
"about/de/404.html": "c8c27469fbf56b4af8429685b9c6fde1",
"about/de/legend_league_hu_3a9e49463c575c3b.webp": "cce4c4616dc4286dda27d17487751086",
"about/de/docs/legends_search.jpg": "691ab742294dbb210268127a13695de7",
"about/de/docs/index.html": "78c473e6d4fe1d451bb053602f26d59a",
"about/de/docs/index.xml": "637d12b4128ae6e372ddf86e9625bdeb",
"about/de/docs/faq/index.html": "4691ed05ab0703604298d1493f5b0e5e",
"about/de/docs/features/clans/index.html": "9784e2eedcdd6f513114e595a5dbb0b9",
"about/de/docs/features/clan_war_league/index.html": "da6296c11790f9c1c1929a60cc39ed7f",
"about/de/docs/features/index.html": "69771e361e6672ce3ad9e2482434f421",
"about/de/docs/features/index.xml": "f74e94fd8e79161d0376cc08cfcf9c3d",
"about/de/docs/features/players/index.html": "6d8f310056fc46351f275ba8b82be54f",
"about/de/docs/features/clan_wars/index.html": "32c5ffac5c1bf293890edc0b1e7ae0a2",
"about/de/docs/features/legend_league/index.html": "4239a2e649c9fa65fb214c8ef996fad5",
"about/de/docs/features/clan_tag.jpg": "afcbe4cfb94699e59aacb8ebcfb357d2",
"about/de/docs/features/player_tag.jpg": "5e9b77ea373d46f4168e8ece56681562",
"about/de/docs/features/account/index.html": "3166d240592d66fd90fdc053896f0509",
"about/de/blog/index.html": "de1f6cea75ba71867294eb622a2d6d8c",
"about/de/tags/index.html": "a4f20fd13d35afd68bcf1869bb1a14a7",
"about/de/tags/index.xml": "f48e7b97abb70dbddde5e24718cc35f8",
"about/de/clans.jpg": "f4a91815fae5b6edd4df9e5c134a6693",
"about/de/legend_league.jpg": "a8a70f9cf5b18b4014585838b13dd0ba",
"about/de/sitemap.xml": "dfd8a4f8df9367083dbd0a992cfc6025",
"about/de/players_hu_781ca9e6d42af2da.webp": "02bf53e185d0424382443372bae6bebd",
"about/de/clans_hu_b36ad41b4a46a1ea.webp": "454b7863b0dec8628e16b438ca70a881",
"about/de/categories/index.html": "c96fc888e4d29a2a16b681c76c264dc3",
"about/de/categories/index.xml": "76de89b71807e56db0f5fa2d4981431e",
"about/de/privacy_policy/index.html": "b1729ec5e096ad1ae82f8be4e93ca5e8",
"about/sitemap.xml": "4b140057dd6e808cc6425c0feadabc2d",
"about/players_hu_781ca9e6d42af2da.webp": "02bf53e185d0424382443372bae6bebd",
"about/en/index.html": "f7d932658485bb470c71c77d65de994f",
"about/en/sitemap.xml": "5f96c13b3cb8023e86963c4f6901012f",
"about/clans_hu_b36ad41b4a46a1ea.webp": "454b7863b0dec8628e16b438ca70a881",
"about/categories/index.html": "666b1e2915a87ad7733e82c0935c251a",
"about/categories/index.xml": "d423f1730e1c2ba22989086f4d6faf70",
"about/favicon.svg": "bc185d65cb2f06335890211e60483289",
"about/privacy_policy/index.html": "75f5c0f993ccbf08652ef56e6b9f496b",
"about/favicon-32x32.png": "76af7cdd432dae496c0a2a5aa900e895",
"README.md": "e81009d3ef17481bd6fd2aeae3b83f4d",
"favicon.png": "89bf6a7ce8a86dec490ed8fecf017eb2",
"icons/Icon-192.png": "89bf6a7ce8a86dec490ed8fecf017eb2",
"icons/Icon-512.png": "6448fea72d5bc4fc1a687ec764ec3e88",
"manifest.json": "3bd95746b51fad10ef5eff43574fad4b",
"assets/AssetManifest.json": "c2b1903dc64b4d46e1355b0210535423",
"assets/NOTICES": "0759a73edd3e7923eea634cfbe64170d",
"assets/FontManifest.json": "7b3b848aed509ecd684cc2f89aaf4e31",
"assets/AssetManifest.bin.json": "cff896bfbf861e7dab5d5cd2d4f9782d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "925212dfd918124ca5fc2e9bbb08e679",
"assets/fonts/MaterialIcons-Regular.otf": "41de496e83c4ebde4a310090ad6f0131",
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
"sitemap.txt": "9a5c0198197cfbc77fb0854e85daff69",
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
