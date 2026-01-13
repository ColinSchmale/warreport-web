'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "1f933e4f3eab3305b46cfda83ed8ad17",
"version.json": "444e97297233d82bb2b66ee1aac27cb2",
"splash/img/light-4x.webp": "c6870870abd5affe5f28ad5e5f13d5ae",
"splash/img/dark-3x.webp": "bb36a8dae118bfa635fdb7c61aee3974",
"splash/img/dark-1x.webp": "6d7a589ea5476c0a59df3e312b9958d4",
"splash/img/light-2x.webp": "d94dabf19dbfe19c1db05a6b7d5567d5",
"splash/img/dark-4x.webp": "c6870870abd5affe5f28ad5e5f13d5ae",
"splash/img/light-3x.webp": "bb36a8dae118bfa635fdb7c61aee3974",
"splash/img/dark-2x.webp": "d94dabf19dbfe19c1db05a6b7d5567d5",
"splash/img/light-1x.webp": "6d7a589ea5476c0a59df3e312b9958d4",
"splash/splash.js": "123c400b58bea74c1305ca3ac966748d",
"splash/style.css": "87bd38c7e629047f693a28a8c4ccd458",
"index.html": "3fba9cdc449709ccf2dbc4bfc74ebc62",
"/": "3fba9cdc449709ccf2dbc4bfc74ebc62",
"privacy-policy.html": "ce584189b1ac42eb6d6d26051b295399",
"contact.html": "30736aeaf28f048a33b196571384bf9c",
"CNAME": "db59d0bb93db98cd8740d52c45dd5ea7",
"main.dart.js": "dffedb468a828f8b21827c4a937d10c9",
"config.json": "6916e555e2cff0ab446335dc8a0d9263",
"apple-app-site-association": "a6b73a0265b4b644fceeb7bde4688956",
"flutter.js": "24bc71911b75b5f8135c949e27a2984e",
"about/favicon-16x16.png": "60dfa4de0e5296f9a90b4e027968038b",
"about/llms.txt": "dddac1931c7cb0b939a4dd0fa441af53",
"about/en.search-data.json": "f6a025cbb6307a0ad403dfb97ff23857",
"about/clan_war_league.jpg": "3b72415676bfbb2df5a5cdbd625e6955",
"about/clan_capital.jpg": "d984d99a9c76ffe28e340b768c1460d1",
"about/en.search.js": "f3f7f43b19bfa4f0befc95c6527bd937",
"about/contact/index.html": "d9015dd87c54924be91f041b35a05fd3",
"about/favicon.ico": "e36cfe1fbcee7bbbaaa55ed6b65210fb",
"about/players_hu_4b6db7b3cecdbabf.webp": "c8d26241e1a79b7757a9e89f30c94b6a",
"about/discord/index.html": "4893c8f0f9a90f23a409015db8168fb5",
"about/index.html": "3fd36f72ddd76900f8b1c56121da21b2",
"about/index.xml": "e78368e873118780eb1476144ab1f364",
"about/android-chrome-192x192.png": "31a8d59ea58175ad4e0b3cd5fcfbc3e3",
"about/clan_wars.jpg": "2892c175e14f12903d066bebfb697c67",
"about/clan_capital_hu_80e4887b11d66bb8.webp": "5bc237589c3c3392dbfeac133b6919bd",
"about/apple-touch-icon.png": "82d3f9b1c97b744d24b00bd40b20a572",
"about/clan_capital_hu_82b54e9e960fdd60.webp": "be305bb957eb9f86a321a990028643e0",
"about/css/variables.css": "8f29386d28c61e04ac8e9547b813e571",
"about/css/custom.css": "75ab2dee5c1d47658626741302508615",
"about/css/compiled/main.min.832fb213f16bdb4a7482368ea31cfa9759a70b78e5d689e4f9b554cf302b26aa.css": "09fa7d988a0b07d2900e24258912be18",
"about/css/compiled/main.min.0d60cbb74d97ccaea83c3ea6d973c5961d69642b38588069a503bc04e284cbc7.css": "76bf661816e8832f68c04aaccec630ce",
"about/css/compiled/main.css": "d88630debf95249a15dc6a98b9c29a31",
"about/css/compiled/main.min.3fa41f36ae4dc9c560472a13cfc87294a046c03b6be2455b054740285a775a3e.css": "990479dad312fb09b6118681990242c4",
"about/css/custom.min.309bbe40d1fda93ad795e9579c34393e1bd25d96f4158dde4f3227bce4d335e8.css": "9ae28999bd5a7cf1659a3ec0afdaa9bc",
"about/de.search-data.json": "5049b939c1e6aabc43bca0327449411c",
"about/images/logo-dark.svg": "66cc271a2553b31ebe9885b04ffeef44",
"about/images/logo.png": "a94b14bc7ffe98c619db34032a063517",
"about/images/logo.svg": "39477ec3d41196ec7beaf5042f868f7a",
"about/js/flexsearch.433e941a8a573ebb9931fc16fc75266ab6b93f569ac2fb4f3dc66882e0416f4c.js": "50da1f9c3049d2ebcbc040ce429d9549",
"about/js/main.js": "92bc43af4290a9fc349ca18a612c5ce7",
"about/js/main.min.f58305c0d41ab8d51fac90b26f97494372916070518f48a8c9a3ef72521d0573.js": "dad5d46c7e91b77941e37cd792d5a68c",
"about/js/main.min.d0f0346255ba9418db8fcf7f9440ca4e532e06276d8df17497e19e1045ee360b.js": "6787c09210ba01dafedeb9fe367b0150",
"about/js/flexsearch.9f5b5908f93ae86f1ecd4b043b799f580c2d1654e703dd9357d568ac41b2547a.js": "6293f40e3b54cd2d1807dc132abaf9dc",
"about/clan_war_league_hu_83e694890ccd08f4.webp": "78100f6c5bdbbbf6f3bb268b1aa5b9c3",
"about/players.jpg": "ccb688737e3a334ecd8d84b4bceb15f8",
"about/casts/demo.cast": "565c84a53f6badce2e0494cd937d6241",
"about/en.search.min.c949500b0addef7eacb00c9feb42031c133570fdda164dc0c580fa9cea772ca5.js": "9ffea12fa826aaf749fb3943c4602874",
"about/en.search.min.d87c892b0f5626368727e17b7b9aa2f28bc6384612f6e368994538eb5053a0f2.js": "c611349f1976e0eec3c3e33dd9dbb425",
"about/404.html": "59a6fae2e0933a2ad8204488d9e48c8b",
"about/favicon-dark.svg": "8348b400736d163b070c9747cf4fbe20",
"about/de.search.min.8efc9460bc5a17dc3941f52018e147e063ec54a6484f769794e55a5d2c900c94.js": "b88feb5adb8c4e9bbc4120a54c9d8e4b",
"about/docs/legends_search.jpg": "691ab742294dbb210268127a13695de7",
"about/docs/index.html": "4450c9cc33c93f81fed7e91c56e6e77d",
"about/docs/index.xml": "d7db125c5089609f724b177f8ae16e9b",
"about/docs/faq/index.html": "8c1304d6f44d3b0b130755ae1407ce34",
"about/docs/features/clans/index.html": "e0a5d695b2fa2a39a9cd332b3ff76f50",
"about/docs/features/clan_war_league/index.html": "693fa54aa9a18f00f417c98d51b039ad",
"about/docs/features/index.html": "12e66064305b55243bb4da48752da21d",
"about/docs/features/index.xml": "c48cc98c138887ca49910c21d5e2e4a9",
"about/docs/features/players/index.html": "40cee153586d9f6b722748c4a72e08ca",
"about/docs/features/clan_wars/index.html": "0d326b7f56a3fe619b3b56fc13c89573",
"about/docs/features/legend_league/index.html": "4afcfcca77bab604a6475b613322ca3d",
"about/docs/features/clan_tag.jpg": "afcbe4cfb94699e59aacb8ebcfb357d2",
"about/docs/features/player_tag.jpg": "5e9b77ea373d46f4168e8ece56681562",
"about/docs/features/clan_capital/index.html": "2d1011e491afd81619c8dee8c1062a75",
"about/docs/features/account/index.html": "37ece068b8d724be275efce2d6f3a5a0",
"about/legend_league_hu_b852ce37084a28a8.webp": "c344f7fa6755246e42b135d7b9d64de3",
"about/clans_hu_70914e941f261747.webp": "524814f6b4baf9941696df245e08caad",
"about/legend_league_hu_c9c8d16ee1fd755e.webp": "5baeea7afad4a027f1635736294aeb34",
"about/de.search.min.928ce2f957c8ca1f4f6959b7c1e329d36076b2d185d597f45cfa15201bd9913e.js": "d97cacabbcaee87b4fa022dbce2378c0",
"about/blog/raid_weekend_rewards/index.html": "363ce0852e616017ecbd2baf7089308f",
"about/blog/page/1/index.html": "0f8e29590a2fa7e5ff8769609b692f2d",
"about/blog/clan_war_league_medals/index.html": "64ef844e2136e34df0c923a149979835",
"about/blog/raid_weekend_rewards-copy/index.html": "553aa9e9e84bb140d78e6b39c372f891",
"about/blog/index.html": "d09c3ef52a391e012f3c648aa1544249",
"about/blog/index.xml": "a0e99969d30c956bf6eb0f6d97031776",
"about/blog/glossary-copy/index.html": "91af3bed9e9b8fca5a5d289653704f0d",
"about/blog/test/index.html": "c5ebbeefa0d786b23abd9ea6e792357b",
"about/blog/post_a/index.html": "3925f534fd752e5d87c73ccb8bee76e3",
"about/blog/post_b-copy/index.html": "310003c46ee3fc299fd6ce53e6f4f4f9",
"about/blog/post_c/index.html": "f112969b0ddee4f7dddb047eccf1910b",
"about/blog/guides/page/1/index.html": "1ca65ecfceb5396a172ed743ab2b981b",
"about/blog/guides/index.html": "ba213ebe4b43d0617657af59dca65c3d",
"about/blog/guides/index.xml": "c6334ef6961b6580ade8c89775945e43",
"about/blog/guides/glossary/index.html": "6b908e7a6c47f7c37fb7e7d66f67eaba",
"about/blog/post_b/index.html": "79b521428275597c1242d7df10998997",
"about/blog/post_a-copy/index.html": "f2bb2368d9e4bd967828ad4b26613219",
"about/blog/glossary/index.html": "9a95a09b116f8343ec569670a856d68d",
"about/blog/events/index.html": "cc96d17a6e247ea1823c7db729b8a8aa",
"about/clan_wars_hu_be4eab0e93002f67.webp": "632731f24ce3e3071e3099778b2d1c19",
"about/tags/guide/index.html": "ed1c5fcc9dc75c179f51947c38874f40",
"about/tags/guide/index.xml": "37e383862209e8f608e2b6e653403853",
"about/tags/index.html": "c27995624cd9ae6297694aec48c020e1",
"about/tags/index.xml": "83ed5d01300d262cffe1fda9f0f54434",
"about/tags/example/index.html": "9400f5b6b6cdfc43ab970077b665f779",
"about/tags/example/index.xml": "98bdf43e1028d574b30b05be2053573d",
"about/tags/markdown/index.html": "af0d7cf565ef30b79f9c997dbbbe3d25",
"about/tags/markdown/index.xml": "fc7ed588a996282ef8e0a16702af9bad",
"about/de.search.js": "861e7cdbdb18a16271e9fea1701109bb",
"about/clan_wars_hu_19ce4f867ea3dd6e.webp": "86e6e4997b7371800472983615577fcc",
"about/clans.jpg": "a763fd64c7629f221d74668de951050f",
"about/legend_league.jpg": "7e9df83a33e0d4b49c4483bbb00d8490",
"about/android-chrome-512x512.png": "983cf880c158180953f593e1af540ffa",
"about/site.webmanifest": "5c708dd9634089a157a410f9831d0632",
"about/lib/flexsearch/flexsearch.bundle.min.0425860527cc9968f9f049421c7a56b39327d475e2e3a8f550416be3a9134327.js": "ccdbea67f75ca683d752719f47b8294d",
"about/de/llms.txt": "5344376d7ffbce38880c86dc9eadcd4d",
"about/de/clan_war_league.jpg": "3b72415676bfbb2df5a5cdbd625e6955",
"about/de/clan_capital.jpg": "d984d99a9c76ffe28e340b768c1460d1",
"about/de/contact/index.html": "dac0487b4761dfb44ea11bc20e8caa50",
"about/de/players_hu_4b6db7b3cecdbabf.webp": "c8d26241e1a79b7757a9e89f30c94b6a",
"about/de/discord/index.html": "30278417999434c70b21451609d7baa9",
"about/de/index.html": "276b9aba25ad3790ad7c276ea8e1c53f",
"about/de/index.xml": "d35bf37b5064120c173c1af12c19f849",
"about/de/clan_wars.jpg": "2892c175e14f12903d066bebfb697c67",
"about/de/clan_capital_hu_80e4887b11d66bb8.webp": "5bc237589c3c3392dbfeac133b6919bd",
"about/de/clan_capital_hu_82b54e9e960fdd60.webp": "be305bb957eb9f86a321a990028643e0",
"about/de/images/logo.png": "a94b14bc7ffe98c619db34032a063517",
"about/de/clan_war_league_hu_83e694890ccd08f4.webp": "78100f6c5bdbbbf6f3bb268b1aa5b9c3",
"about/de/players.jpg": "ccb688737e3a334ecd8d84b4bceb15f8",
"about/de/404.html": "59a6fae2e0933a2ad8204488d9e48c8b",
"about/de/docs/index.html": "faaa4ccfb65bbfc11d78e697cf7322e8",
"about/de/docs/index.xml": "00cd499115d86d814d5418b824300ada",
"about/de/docs/faq/index.html": "fac3c8c92974799eccb9cefe660f4cc6",
"about/de/docs/features/clans/index.html": "87d7cf5952d54efaf9e12508e82f9992",
"about/de/docs/features/legends_search.jpg": "691ab742294dbb210268127a13695de7",
"about/de/docs/features/clan_war_league/index.html": "0600ff71eacabb5857e942bcb83851ae",
"about/de/docs/features/index.html": "496492c2c1cb46b899d5b031b9770f22",
"about/de/docs/features/index.xml": "c6d7668545cbb930bbb2d12db07d4477",
"about/de/docs/features/players/index.html": "248a964f0179803e365dbcf26e2c81b9",
"about/de/docs/features/clan_wars/index.html": "d920cae07ea4ea02e9cbb2bbe3033a7c",
"about/de/docs/features/legend_league/index.html": "5fe096a9f222243f57dbe7a9efea263f",
"about/de/docs/features/clan_tag.jpg": "afcbe4cfb94699e59aacb8ebcfb357d2",
"about/de/docs/features/player_tag.jpg": "5e9b77ea373d46f4168e8ece56681562",
"about/de/docs/features/clan_capital/index.html": "0fcb6bd232b508414907c734725894fb",
"about/de/docs/features/account/index.html": "a4b1fe423fa0964fc752eccd9245b9f3",
"about/de/legend_league_hu_b852ce37084a28a8.webp": "c344f7fa6755246e42b135d7b9d64de3",
"about/de/clans_hu_70914e941f261747.webp": "524814f6b4baf9941696df245e08caad",
"about/de/legend_league_hu_c9c8d16ee1fd755e.webp": "5baeea7afad4a027f1635736294aeb34",
"about/de/blog/raid_weekend_rewards/index.html": "519d3ad9ea1171aa9069a371a7b5dd62",
"about/de/blog/anleitungen/page/1/index.html": "a0b21ccfe13bd22edbe5032c0ae3b51f",
"about/de/blog/anleitungen/index.html": "dccb1c5591f41f457e65cd55a7863504",
"about/de/blog/anleitungen/index.xml": "a71644299dbe105d1dbf66f0b186edf2",
"about/de/blog/anleitungen/glossary/index.html": "fc3a9ab6f7f5a105b3fb300762a86a69",
"about/de/blog/page/1/index.html": "7853755a6a23bd5ff4bec59518f81686",
"about/de/blog/clan_war_league_medals/index.html": "9018429cd29dabfdf1df61873a17c3a3",
"about/de/blog/raid_weekend_rewards-copy/index.html": "1f3c284efb420b1d1b8f34d93848f6f7",
"about/de/blog/index.html": "ade28093f386c402b8e2d4b5e1e79df9",
"about/de/blog/index.xml": "d27a16160da6ab80cf25ae6b28c3ad47",
"about/de/blog/events-copy/index.html": "ef746cf472876a63d45080adc93566da",
"about/de/blog/guides/page/1/index.html": "c5838d1d6321bca6f43b48fa99c377da",
"about/de/blog/guides/index.html": "5bc3a74771c926e9f29c0a0ef61eb94c",
"about/de/blog/guides/index.xml": "ccd3b1eed033e93fe0f3e60d481b2a04",
"about/de/blog/guides/glossary/index.html": "7ef1a8cda42c5aee2bf8d0a422484770",
"about/de/blog/glossary/index.html": "8f46efadb9b557d0d7679d33fdf76ea0",
"about/de/blog/events/index.html": "29cb634c5d01d1707bca1571695aa6ab",
"about/de/clan_wars_hu_be4eab0e93002f67.webp": "632731f24ce3e3071e3099778b2d1c19",
"about/de/tags/guide/index.html": "068b1a492d6671bd809dd4986e9ec458",
"about/de/tags/guide/index.xml": "444ffbec978492d516b1409c1c9d0b62",
"about/de/tags/index.html": "0a56b25094f4b3f842a8b099995d3f8e",
"about/de/tags/index.xml": "f48e7b97abb70dbddde5e24718cc35f8",
"about/de/clan_wars_hu_19ce4f867ea3dd6e.webp": "86e6e4997b7371800472983615577fcc",
"about/de/clans.jpg": "a763fd64c7629f221d74668de951050f",
"about/de/legend_league.jpg": "7e9df83a33e0d4b49c4483bbb00d8490",
"about/de/sitemap.xml": "8b986bf7cec6f44af0e0260de25aaec7",
"about/de/clans_hu_992ee476efa91574.webp": "15751843eb951b19849f324a3892e11e",
"about/de/categories/index.html": "170ad4cb741681285b948519f8a67dc1",
"about/de/categories/index.xml": "76de89b71807e56db0f5fa2d4981431e",
"about/de/clan_war_league_hu_db5132222b2dcf86.webp": "cb94c8174ed5a5625ec901dbc86240cf",
"about/de/privacy_policy/index.html": "9ae63034220b80156f2a914856b65db5",
"about/de/players_hu_2ed330ceeb2ddd06.webp": "ec3b618135d90273d934ba6b7afaa5db",
"about/sitemap.xml": "4b140057dd6e808cc6425c0feadabc2d",
"about/clans_hu_992ee476efa91574.webp": "15751843eb951b19849f324a3892e11e",
"about/en/index.html": "9289a73002ef67c199a355b433b1cfd3",
"about/en/sitemap.xml": "47c92a314ba98ec8d68b490215fb43e6",
"about/fonts/Clash_Regular.otf": "f37da98a3139ccdedbcf639072777796",
"about/categories/index.html": "9466c93e350c84613caa5b887c703cc2",
"about/categories/index.xml": "d423f1730e1c2ba22989086f4d6faf70",
"about/favicon.svg": "8348b400736d163b070c9747cf4fbe20",
"about/clan_war_league_hu_db5132222b2dcf86.webp": "cb94c8174ed5a5625ec901dbc86240cf",
"about/privacy_policy/index.html": "3dd5c12e04481943468cc5ead8c96492",
"about/favicon-32x32.png": "9fc9fb4abc840e1783faa7c6131781a9",
"about/players_hu_2ed330ceeb2ddd06.webp": "ec3b618135d90273d934ba6b7afaa5db",
"README.md": "e81009d3ef17481bd6fd2aeae3b83f4d",
"main.dart.wasm.map": "32582cda34aac5c0e0be7d8164461b47",
"favicon.png": "89bf6a7ce8a86dec490ed8fecf017eb2",
"main.dart.mjs": "850ac096b63713797a9dab934e635fe0",
"icons/Icon-192.png": "89bf6a7ce8a86dec490ed8fecf017eb2",
"icons/Icon-512.png": "6448fea72d5bc4fc1a687ec764ec3e88",
"manifest.json": "3bd95746b51fad10ef5eff43574fad4b",
"main.dart.wasm": "3d3088327b5b2e9b88acafd6f83e1b57",
"assets/NOTICES": "573b99fdab309c55e95e4ea436d57949",
"assets/FontManifest.json": "7b3b848aed509ecd684cc2f89aaf4e31",
"assets/AssetManifest.bin.json": "5cba02d9cc0ac25250c438addd267822",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/shaders/stretch_effect.frag": "40d68efbbf360632f614c731219e95f0",
"assets/AssetManifest.bin": "ae6dac2c8848bf4ce2942e7b761fda57",
"assets/fonts/MaterialIcons-Regular.otf": "d9e1d084d755b692b47bfcb1ebffc49d",
"assets/fonts/CustomIcons.ttf": "b7f03824d0264f2da089de9254581b7f",
"assets/assets/images/preview_image.jpg": "d9bd7fa48a1c48f5a7213a0cb1516f8e",
"assets/assets/images/clan_capital_gold.webp": "dee81c4353875be9e04cbbce0f45f1a9",
"assets/assets/images/raid_medal.webp": "ff666a3e485654978ed39d9c6b2295e2",
"assets/assets/images/splash.png": "b9bcd50ab20787c2961d56714369d44c",
"assets/assets/images/app_icon_square.png": "492acf067427a22f9f3be55948d26c82",
"assets/assets/images/icons/creator_code.svg.vec": "f262e3222af287acd9027bcf961e29cc",
"assets/assets/images/icons/builder_base_trophy.svg.vec": "7bc862e7b07b8af190fcedf1321b6a09",
"assets/assets/images/icons/experience.svg.vec": "165726fb3252e08b9854f7c68b847425",
"assets/assets/images/icons/family_friendly.svg.vec": "c6f3ab042ae914089c982b0d30e1ce98",
"assets/assets/images/icons/not_family_friendly.svg.vec": "df38b35b1e4a82fe6d9a51f30eb85f92",
"assets/assets/ca/isrgrootx1.pem": "118ecd744d864b32ffdb48b2e29f1d7f",
"assets/assets/ca/lets-encrypt-r3.pem": "be77e5992c00fcd753d1b9c11d3768f2",
"translate.html": "fe29dd588c3a9b196e0d2d6d80003718",
"sitemap.txt": "9a5c0198197cfbc77fb0854e85daff69",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm.js": "8060d46e9a4901ca9991edd3a26be4f0",
"canvaskit/skwasm_heavy.js": "740d43a6b8240ef9e23eed8c48840da4",
"canvaskit/skwasm.js.symbols": "3a4aadf4e8141f284bd524976b1d6bdc",
"canvaskit/canvaskit.js.symbols": "a3c9f77715b642d0437d9c275caba91e",
"canvaskit/skwasm_heavy.js.symbols": "0755b4fb399918388d71b59ad390b055",
"canvaskit/skwasm.wasm": "7e5f3afdd3b0747a1fd4517cea239898",
"canvaskit/chromium/canvaskit.js.symbols": "e2d09f0e434bc118bf67dae526737d07",
"canvaskit/chromium/canvaskit.js": "a80c765aaa8af8645c9fb1aae53f9abf",
"canvaskit/chromium/canvaskit.wasm": "a726e3f75a84fcdf495a15817c63a35d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/canvaskit.js": "8331fe38e66b3a898c4f37648aaf7ee2",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "9b6a7830bf26959b200594729d73538e",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"canvaskit/skwasm_heavy.wasm": "b0be7910760d205ea4e011458df6ee01",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"main.dart.wasm",
"main.dart.mjs",
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
