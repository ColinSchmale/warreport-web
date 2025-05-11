'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "c72541c71a91e1f2754fa39bb1750e63",
"version.json": "5445cf33ea7d1d70bd176ab81377abda",
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
"index.html": "2fb9a817b9899c3de1c0058e15b1556c",
"/": "2fb9a817b9899c3de1c0058e15b1556c",
"privacy-policy.html": "ce584189b1ac42eb6d6d26051b295399",
"contact.html": "30736aeaf28f048a33b196571384bf9c",
"CNAME": "db59d0bb93db98cd8740d52c45dd5ea7",
"main.dart.js": "71c9879ecf46289d4d49fa77f87b6043",
"config.json": "d4c9e04f899d2a37281a41941a233b33",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"about/favicon-16x16.png": "60dfa4de0e5296f9a90b4e027968038b",
"about/en.search-data.json": "d09df51358481b09005aa7b9847b8650",
"about/clan_war_league.jpg": "3b72415676bfbb2df5a5cdbd625e6955",
"about/en.search.js": "feffb672220d91ab9ab70c7e3097a67c",
"about/contact/index.html": "59f4312b5fc021adab47e7bcac57f8f2",
"about/favicon.ico": "e36cfe1fbcee7bbbaaa55ed6b65210fb",
"about/discord/index.html": "ab0e3c6c1004e2b00dc2e15d956cd132",
"about/index.html": "b6d57dc826966bc5bf926db6e0ddcce2",
"about/index.xml": "8c5f66cc42af66bb59939ede053ba764",
"about/android-chrome-192x192.png": "31a8d59ea58175ad4e0b3cd5fcfbc3e3",
"about/clan_wars.jpg": "2892c175e14f12903d066bebfb697c67",
"about/apple-touch-icon.png": "82d3f9b1c97b744d24b00bd40b20a572",
"about/css/custom.min.2b97556f13d50111f5a501a893405ade5e3906a9718a7775f02d0abc738ab67e.css": "ffe06a76528fc33468c69b4852fdf3c9",
"about/css/custom.css": "241fd8e79396d1c1fac712199ca6f837",
"about/css/compiled/main.min.0d60cbb74d97ccaea83c3ea6d973c5961d69642b38588069a503bc04e284cbc7.css": "76bf661816e8832f68c04aaccec630ce",
"about/css/compiled/main.css": "1a72407e73e84089342eaba34f604c35",
"about/css/custom.min.8c1c3cdfe72747f48cdd833430fa4e27b75356c93cf0ed91090e95724f264c12.css": "7573a703d3a5312d0792951a31b0c31e",
"about/css/custom.min.4b8799dc1c2ee7a76fb43ac3b538155739de1de6277915844307af60f26a3b5d.css": "f419d6f3f342aa2251dc7781e4831048",
"about/css/custom.min.309bbe40d1fda93ad795e9579c34393e1bd25d96f4158dde4f3227bce4d335e8.css": "9ae28999bd5a7cf1659a3ec0afdaa9bc",
"about/de.search-data.json": "71fb1edef14fcb26c0ccd73f2e769b22",
"about/images/logo-dark.svg": "66cc271a2553b31ebe9885b04ffeef44",
"about/images/logo.png": "a94b14bc7ffe98c619db34032a063517",
"about/images/logo.svg": "39477ec3d41196ec7beaf5042f868f7a",
"about/js/main.js": "a6729a3702040f47fa0be7fdccbfa782",
"about/js/main.min.d0f0346255ba9418db8fcf7f9440ca4e532e06276d8df17497e19e1045ee360b.js": "6787c09210ba01dafedeb9fe367b0150",
"about/clan_war_league_hu_83e694890ccd08f4.webp": "78100f6c5bdbbbf6f3bb268b1aa5b9c3",
"about/players.jpg": "ccb688737e3a334ecd8d84b4bceb15f8",
"about/en.search.min.d87c892b0f5626368727e17b7b9aa2f28bc6384612f6e368994538eb5053a0f2.js": "c611349f1976e0eec3c3e33dd9dbb425",
"about/404.html": "c8c27469fbf56b4af8429685b9c6fde1",
"about/favicon-dark.svg": "8348b400736d163b070c9747cf4fbe20",
"about/de.search.min.8efc9460bc5a17dc3941f52018e147e063ec54a6484f769794e55a5d2c900c94.js": "b88feb5adb8c4e9bbc4120a54c9d8e4b",
"about/docs/legends_search.jpg": "691ab742294dbb210268127a13695de7",
"about/docs/index.html": "46de64513c3cc1890b8da9d57b2182a7",
"about/docs/index.xml": "ce9304a303fd3ad36be8d5a009d80649",
"about/docs/faq/index.html": "c69a4ba785cbb1444414864861c7bd41",
"about/docs/features/clans/index.html": "df120db0b4c8de4e6e6b530d3e84b913",
"about/docs/features/legends_search.jpg": "691ab742294dbb210268127a13695de7",
"about/docs/features/clan_war_league/index.html": "523c0819aa4b1dab135e1347b5e4a0d6",
"about/docs/features/index.html": "fce66fed2a6c39210cff561e8f55798e",
"about/docs/features/index.xml": "968b0fc2c6e3beecc60aed0403170346",
"about/docs/features/players/index.html": "3f70556a9ea89d75d9804b3bbc0b6b0a",
"about/docs/features/clan_wars/index.html": "1df373ab53365bc5592714433727cc19",
"about/docs/features/legend_league/index.html": "9ccfb7f634b7a42f27616d3f8502b41e",
"about/docs/features/clan_tag.jpg": "afcbe4cfb94699e59aacb8ebcfb357d2",
"about/docs/features/player_tag.jpg": "5e9b77ea373d46f4168e8ece56681562",
"about/docs/features/account/index.html": "60bde6c81632a5ea5dc263a403a72f77",
"about/legend_league_hu_b852ce37084a28a8.webp": "c344f7fa6755246e42b135d7b9d64de3",
"about/clans_hu_70914e941f261747.webp": "524814f6b4baf9941696df245e08caad",
"about/blog/index.html": "4b24c2ac7c95ea26efa503623da333fb",
"about/tags/index.html": "8babcd993766873fb56e20dc94133d2b",
"about/tags/index.xml": "83ed5d01300d262cffe1fda9f0f54434",
"about/de.search.js": "e05a1c0464b678c733fc31893e86a95f",
"about/clan_wars_hu_19ce4f867ea3dd6e.webp": "86e6e4997b7371800472983615577fcc",
"about/clans.jpg": "a763fd64c7629f221d74668de951050f",
"about/legend_league.jpg": "7e9df83a33e0d4b49c4483bbb00d8490",
"about/android-chrome-512x512.png": "983cf880c158180953f593e1af540ffa",
"about/site.webmanifest": "5c708dd9634089a157a410f9831d0632",
"about/lib/flexsearch/flexsearch.bundle.min.0425860527cc9968f9f049421c7a56b39327d475e2e3a8f550416be3a9134327.js": "ccdbea67f75ca683d752719f47b8294d",
"about/de/clan_war_league.jpg": "3b72415676bfbb2df5a5cdbd625e6955",
"about/de/contact/index.html": "a2039d4f6ce2afc2407de6e5ab4fdd35",
"about/de/discord/index.html": "31837dafdd6dc23ac26591c894c44b2a",
"about/de/index.html": "f21b6d7edaac8797b70c0f4fce7056be",
"about/de/index.xml": "92108ec2503d06a7c7518ff617a3c06d",
"about/de/clan_wars.jpg": "2892c175e14f12903d066bebfb697c67",
"about/de/images/logo.png": "a94b14bc7ffe98c619db34032a063517",
"about/de/clan_war_league_hu_83e694890ccd08f4.webp": "78100f6c5bdbbbf6f3bb268b1aa5b9c3",
"about/de/players.jpg": "ccb688737e3a334ecd8d84b4bceb15f8",
"about/de/404.html": "c8c27469fbf56b4af8429685b9c6fde1",
"about/de/docs/legends_search.jpg": "691ab742294dbb210268127a13695de7",
"about/de/docs/index.html": "bbba3b2af43eb0bae4a1549d048aa30d",
"about/de/docs/index.xml": "1d7774cc43bd6cd3654bff582ebb1df7",
"about/de/docs/faq/index.html": "a19f125dfdf9e495941c9d49053bcbae",
"about/de/docs/features/clans/index.html": "39d1ee5872592d25f51d9e59047f888b",
"about/de/docs/features/legends_search.jpg": "691ab742294dbb210268127a13695de7",
"about/de/docs/features/clan_war_league/index.html": "ddc3e3bafc0e121cb500573cece77980",
"about/de/docs/features/index.html": "52c0af4d27612c01e1c4cfb4e7e0dbff",
"about/de/docs/features/index.xml": "42cfb4132f3f37a1fb133d286a3ebbb0",
"about/de/docs/features/players/index.html": "e740e34a4250f38121faca6941668983",
"about/de/docs/features/clan_wars/index.html": "2e10fd877d85521672646472b3d95f58",
"about/de/docs/features/legend_league/index.html": "495fdae2c79b9563025be60714f52417",
"about/de/docs/features/clan_tag.jpg": "afcbe4cfb94699e59aacb8ebcfb357d2",
"about/de/docs/features/player_tag.jpg": "5e9b77ea373d46f4168e8ece56681562",
"about/de/docs/features/account/index.html": "d6d55fa28967d94c780925eb69411148",
"about/de/legend_league_hu_b852ce37084a28a8.webp": "c344f7fa6755246e42b135d7b9d64de3",
"about/de/clans_hu_70914e941f261747.webp": "524814f6b4baf9941696df245e08caad",
"about/de/blog/index.html": "740374427f8ffb90a085c0e4d0e92351",
"about/de/tags/index.html": "7e96a67cb533e1e86783bb7ca88d3143",
"about/de/tags/index.xml": "f48e7b97abb70dbddde5e24718cc35f8",
"about/de/clan_wars_hu_19ce4f867ea3dd6e.webp": "86e6e4997b7371800472983615577fcc",
"about/de/clans.jpg": "a763fd64c7629f221d74668de951050f",
"about/de/legend_league.jpg": "7e9df83a33e0d4b49c4483bbb00d8490",
"about/de/sitemap.xml": "dfd8a4f8df9367083dbd0a992cfc6025",
"about/de/categories/index.html": "68e44d990788f387370de8f887220325",
"about/de/categories/index.xml": "76de89b71807e56db0f5fa2d4981431e",
"about/de/privacy_policy/index.html": "5b817efea5eb1624eaf225aea75e35b2",
"about/de/players_hu_2ed330ceeb2ddd06.webp": "ec3b618135d90273d934ba6b7afaa5db",
"about/sitemap.xml": "4b140057dd6e808cc6425c0feadabc2d",
"about/en/index.html": "f7d932658485bb470c71c77d65de994f",
"about/en/sitemap.xml": "5f96c13b3cb8023e86963c4f6901012f",
"about/fonts/Clash_Regular.otf": "f37da98a3139ccdedbcf639072777796",
"about/categories/index.html": "907bcdeeeca8a3e929ee61330fa20a7a",
"about/categories/index.xml": "d423f1730e1c2ba22989086f4d6faf70",
"about/favicon.svg": "8348b400736d163b070c9747cf4fbe20",
"about/privacy_policy/index.html": "9b2c3ad2047098deb31c300e993b3f7e",
"about/favicon-32x32.png": "9fc9fb4abc840e1783faa7c6131781a9",
"about/players_hu_2ed330ceeb2ddd06.webp": "ec3b618135d90273d934ba6b7afaa5db",
"README.md": "e81009d3ef17481bd6fd2aeae3b83f4d",
"favicon.png": "89bf6a7ce8a86dec490ed8fecf017eb2",
"icons/Icon-192.png": "89bf6a7ce8a86dec490ed8fecf017eb2",
"icons/Icon-512.png": "6448fea72d5bc4fc1a687ec764ec3e88",
"manifest.json": "3bd95746b51fad10ef5eff43574fad4b",
"assets/AssetManifest.json": "c2b1903dc64b4d46e1355b0210535423",
"assets/NOTICES": "4d89b989d4cca05c087b588261d9797e",
"assets/FontManifest.json": "7b3b848aed509ecd684cc2f89aaf4e31",
"assets/AssetManifest.bin.json": "cff896bfbf861e7dab5d5cd2d4f9782d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "925212dfd918124ca5fc2e9bbb08e679",
"assets/fonts/MaterialIcons-Regular.otf": "62c6457d6140bc086dc5ca9b3839f427",
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
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.js": "ba4a8ae1a65ff3ad81c6818fd47e348b",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/canvaskit.js": "6cfe36b4647fbfa15683e09e7dd366bc",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
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
