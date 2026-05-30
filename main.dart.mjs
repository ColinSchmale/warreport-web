// Compiles a dart2wasm-generated main module from `source` which can then
// instantiatable via the `instantiate` method.
//
// `source` needs to be a `Response` object (or promise thereof) e.g. created
// via the `fetch()` JS API.
export async function compileStreaming(source) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(
      await WebAssembly.compileStreaming(source, builtins), builtins);
}

// Compiles a dart2wasm-generated wasm modules from `bytes` which is then
// instantiatable via the `instantiate` method.
export async function compile(bytes) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(await WebAssembly.compile(bytes, builtins), builtins);
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export async function instantiate(modulePromise, importObjectPromise) {
  var moduleOrCompiledApp = await modulePromise;
  if (!(moduleOrCompiledApp instanceof CompiledApp)) {
    moduleOrCompiledApp = new CompiledApp(moduleOrCompiledApp);
  }
  const instantiatedApp = await moduleOrCompiledApp.instantiate(await importObjectPromise);
  return instantiatedApp.instantiatedModule;
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export const invoke = (moduleInstance, ...args) => {
  moduleInstance.exports.$invokeMain(args);
}

class CompiledApp {
  constructor(module, builtins) {
    this.module = module;
    this.builtins = builtins;
  }

  // The second argument is an options object containing:
  // `loadDeferredModules` is a JS function that takes an array of module names
  //   matching wasm files produced by the dart2wasm compiler. It also takes a
  //   callback that should be invoked for each loaded module with 2 arugments:
  //   (1) the module name, (2) the loaded module in a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`. The callback
  //   returns a Promise that resolves when the module is instantiated.
  //   loadDeferredModules should return a Promise that resolves when all the
  //   modules have been loaded and the callback promises have resolved.
  // `loadDeferredId` is a JS function that takes load ID produced by the
  //   compiler when the `load-ids` option is passed. Each load ID maps to one
  //   or more wasm files as specified in the emitted JSON file. It also takes a
  //   callback that should be invoked for each loaded module with 2 arugments:
  //   (1) the module name, (2) the loaded module in a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`. The callback
  //   returns a Promise that resolves when the module is instantiated.
  //   loadDeferredModules should return a Promise that resolves when all the
  //   modules have been loaded and the callback promises have resolved.
  // `loadDynamicModule` is a JS function that takes two string names matching,
  //   in order, a wasm file produced by the dart2wasm compiler during dynamic
  //   module compilation and a corresponding js file produced by the same
  //   compilation. It also takes a callback that should be invoked with the
  //   loaded module in a format supported by `WebAssembly.compile` or
  //   `WebAssembly.compileStreaming` and the result of using the JS 'import'
  //   API on the js file path. It should return a Promise that resolves when
  //   all the modules have been loaded and the callback promises have resolved.
  async instantiate(additionalImports,
      {loadDeferredModules, loadDynamicModule, loadDeferredId} = {}) {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + value;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {
            _1: (decoder, codeUnits) => decoder.decode(codeUnits),
      _2: () => new TextDecoder("utf-8", {fatal: true}),
      _3: () => new TextDecoder("utf-8", {fatal: false}),
      _4: (s) => +s,
      _5: x0 => new Uint8Array(x0),
      _6: (x0,x1,x2) => x0.set(x1,x2),
      _7: (x0,x1) => x0.transferFromImageBitmap(x1),
      _9: (x0,x1,x2) => x0.slice(x1,x2),
      _10: (x0,x1) => x0.decode(x1),
      _11: (x0,x1) => x0.segment(x1),
      _12: () => new TextDecoder(),
      _13: (x0,x1) => x0.get(x1),
      _14: x0 => x0.buffer,
      _15: x0 => x0.wasmMemory,
      _16: () => globalThis.window._flutter_skwasmInstance,
      _17: x0 => x0.rasterStartMilliseconds,
      _18: x0 => x0.rasterEndMilliseconds,
      _19: x0 => x0.imageBitmaps,
      _135: (x0,x1) => x0.appendChild(x1),
      _166: (x0,x1,x2) => x0.addEventListener(x1,x2),
      _167: (x0,x1,x2) => x0.removeEventListener(x1,x2),
      _168: (x0,x1) => new OffscreenCanvas(x0,x1),
      _169: x0 => x0.remove(),
      _170: (x0,x1) => x0.append(x1),
      _172: x0 => x0.unlock(),
      _173: x0 => x0.getReader(),
      _174: (x0,x1) => x0.item(x1),
      _175: x0 => x0.next(),
      _176: x0 => x0.now(),
      _177: (x0,x1) => x0.revokeObjectURL(x1),
      _178: x0 => x0.close(),
      _179: (x0,x1,x2,x3,x4) => ({type: x0,data: x1,premultiplyAlpha: x2,colorSpaceConversion: x3,preferAnimation: x4}),
      _180: x0 => new window.ImageDecoder(x0),
      _181: (x0,x1) => ({frameIndex: x0,completeFramesOnly: x1}),
      _182: (x0,x1) => x0.decode(x1),
      _183: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._183(f,arguments.length,x0) }),
      _184: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _186: (x0,x1) => x0.getModifierState(x1),
      _187: x0 => x0.preventDefault(),
      _188: x0 => x0.stopPropagation(),
      _189: (x0,x1) => x0.removeProperty(x1),
      _190: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._190(f,arguments.length,x0) }),
      _191: x0 => new window.FinalizationRegistry(x0),
      _192: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
      _194: (x0,x1) => x0.unregister(x1),
      _195: (x0,x1) => x0.prepend(x1),
      _196: x0 => new Intl.Locale(x0),
      _197: (x0,x1) => x0.observe(x1),
      _198: x0 => x0.disconnect(),
      _199: (x0,x1) => x0.getAttribute(x1),
      _200: (x0,x1) => x0.contains(x1),
      _201: (x0,x1) => x0.querySelector(x1),
      _202: (x0,x1) => x0.matchMedia(x1),
      _203: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._203(f,arguments.length,x0) }),
      _204: (x0,x1,x2) => x0.call(x1,x2),
      _205: x0 => x0.blur(),
      _206: x0 => x0.hasFocus(),
      _207: (x0,x1) => x0.removeAttribute(x1),
      _208: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _209: (x0,x1) => x0.hasAttribute(x1),
      _210: (x0,x1) => x0.getModifierState(x1),
      _211: (x0,x1) => x0.createTextNode(x1),
      _212: x0 => x0.getBoundingClientRect(),
      _213: (x0,x1) => x0.replaceWith(x1),
      _214: (x0,x1) => x0.contains(x1),
      _215: (x0,x1) => x0.closest(x1),
      _653: x0 => new Uint8Array(x0),
      _656: () => globalThis.window.flutterConfiguration,
      _658: x0 => x0.assetBase,
      _663: x0 => x0.canvasKitMaximumSurfaces,
      _664: x0 => x0.debugShowSemanticsNodes,
      _665: x0 => x0.hostElement,
      _666: x0 => x0.multiViewEnabled,
      _667: x0 => x0.nonce,
      _669: x0 => x0.fontFallbackBaseUrl,
      _679: x0 => x0.console,
      _680: x0 => x0.devicePixelRatio,
      _681: x0 => x0.document,
      _682: x0 => x0.history,
      _683: x0 => x0.innerHeight,
      _684: x0 => x0.innerWidth,
      _685: x0 => x0.location,
      _686: x0 => x0.navigator,
      _687: x0 => x0.visualViewport,
      _688: x0 => x0.performance,
      _689: x0 => x0.parent,
      _691: x0 => x0.URL,
      _693: (x0,x1) => x0.getComputedStyle(x1),
      _694: x0 => x0.screen,
      _695: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._695(f,arguments.length,x0) }),
      _696: (x0,x1) => x0.requestAnimationFrame(x1),
      _700: (x0,x1) => x0.warn(x1),
      _702: (x0,x1) => x0.debug(x1),
      _703: x0 => globalThis.parseFloat(x0),
      _704: () => globalThis.window,
      _705: () => globalThis.Intl,
      _706: () => globalThis.Symbol,
      _707: (x0,x1,x2,x3,x4) => globalThis.createImageBitmap(x0,x1,x2,x3,x4),
      _709: x0 => x0.clipboard,
      _710: x0 => x0.maxTouchPoints,
      _711: x0 => x0.vendor,
      _712: x0 => x0.language,
      _713: x0 => x0.platform,
      _714: x0 => x0.userAgent,
      _715: (x0,x1) => x0.vibrate(x1),
      _716: x0 => x0.languages,
      _717: x0 => x0.documentElement,
      _718: (x0,x1) => x0.querySelector(x1),
      _719: (x0,x1) => x0.querySelectorAll(x1),
      _721: (x0,x1) => x0.createElement(x1),
      _724: (x0,x1) => x0.createEvent(x1),
      _725: x0 => x0.activeElement,
      _728: x0 => x0.head,
      _729: x0 => x0.body,
      _731: (x0,x1) => { x0.title = x1 },
      _734: x0 => x0.visibilityState,
      _735: () => globalThis.document,
      _736: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._736(f,arguments.length,x0) }),
      _737: (x0,x1) => x0.dispatchEvent(x1),
      _745: x0 => x0.target,
      _747: x0 => x0.timeStamp,
      _748: x0 => x0.type,
      _750: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
      _756: x0 => x0.baseURI,
      _757: x0 => x0.firstChild,
      _761: x0 => x0.parentElement,
      _763: (x0,x1) => { x0.textContent = x1 },
      _764: x0 => x0.parentNode,
      _765: x0 => x0.nextSibling,
      _766: (x0,x1) => x0.removeChild(x1),
      _767: x0 => x0.isConnected,
      _775: x0 => x0.clientHeight,
      _776: x0 => x0.clientWidth,
      _777: x0 => x0.offsetHeight,
      _778: x0 => x0.offsetWidth,
      _779: x0 => x0.id,
      _780: (x0,x1) => { x0.id = x1 },
      _783: (x0,x1) => { x0.spellcheck = x1 },
      _784: x0 => x0.tagName,
      _785: x0 => x0.style,
      _787: (x0,x1) => x0.querySelectorAll(x1),
      _788: (x0,x1,x2) => x0.setAttribute(x1,x2),
      _789: x0 => x0.tabIndex,
      _790: (x0,x1) => { x0.tabIndex = x1 },
      _791: (x0,x1) => x0.focus(x1),
      _792: x0 => x0.scrollTop,
      _793: (x0,x1) => { x0.scrollTop = x1 },
      _794: (x0,x1) => { x0.scrollLeft = x1 },
      _795: x0 => x0.scrollLeft,
      _796: x0 => x0.classList,
      _797: (x0,x1) => x0.scrollIntoView(x1),
      _800: (x0,x1) => { x0.className = x1 },
      _802: (x0,x1) => x0.getElementsByClassName(x1),
      _803: x0 => x0.click(),
      _804: (x0,x1) => x0.attachShadow(x1),
      _807: x0 => x0.computedStyleMap(),
      _808: (x0,x1) => x0.get(x1),
      _814: (x0,x1) => x0.getPropertyValue(x1),
      _815: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
      _816: x0 => x0.offsetLeft,
      _817: x0 => x0.offsetTop,
      _818: x0 => x0.offsetParent,
      _820: (x0,x1) => { x0.name = x1 },
      _821: x0 => x0.content,
      _822: (x0,x1) => { x0.content = x1 },
      _826: (x0,x1) => { x0.src = x1 },
      _827: x0 => x0.naturalWidth,
      _828: x0 => x0.naturalHeight,
      _832: (x0,x1) => { x0.crossOrigin = x1 },
      _834: (x0,x1) => { x0.decoding = x1 },
      _835: x0 => x0.decode(),
      _840: (x0,x1) => { x0.nonce = x1 },
      _845: (x0,x1) => { x0.width = x1 },
      _847: (x0,x1) => { x0.height = x1 },
      _850: (x0,x1) => x0.getContext(x1),
      _918: x0 => x0.width,
      _919: x0 => x0.height,
      _921: (x0,x1) => x0.fetch(x1),
      _922: x0 => x0.status,
      _923: x0 => x0.headers,
      _924: x0 => x0.body,
      _925: x0 => x0.arrayBuffer(),
      _928: x0 => x0.read(),
      _929: x0 => x0.value,
      _930: x0 => x0.done,
      _937: x0 => x0.name,
      _938: x0 => x0.x,
      _939: x0 => x0.y,
      _942: x0 => x0.top,
      _943: x0 => x0.right,
      _944: x0 => x0.bottom,
      _945: x0 => x0.left,
      _955: x0 => x0.height,
      _956: x0 => x0.width,
      _957: x0 => x0.scale,
      _958: (x0,x1) => { x0.value = x1 },
      _961: (x0,x1) => { x0.placeholder = x1 },
      _963: (x0,x1) => { x0.name = x1 },
      _964: x0 => x0.selectionDirection,
      _965: x0 => x0.selectionStart,
      _966: x0 => x0.selectionEnd,
      _969: x0 => x0.value,
      _971: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      _972: x0 => x0.readText(),
      _973: (x0,x1) => x0.writeText(x1),
      _975: x0 => x0.altKey,
      _976: x0 => x0.code,
      _977: x0 => x0.ctrlKey,
      _978: x0 => x0.key,
      _979: x0 => x0.keyCode,
      _980: x0 => x0.location,
      _981: x0 => x0.metaKey,
      _982: x0 => x0.repeat,
      _983: x0 => x0.shiftKey,
      _984: x0 => x0.isComposing,
      _986: x0 => x0.state,
      _987: (x0,x1) => x0.go(x1),
      _989: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
      _990: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
      _991: x0 => x0.pathname,
      _992: x0 => x0.search,
      _993: x0 => x0.hash,
      _997: x0 => x0.state,
      _1000: (x0,x1) => x0.createObjectURL(x1),
      _1002: x0 => new Blob(x0),
      _1012: x0 => x0.matches,
      _1016: x0 => x0.matches,
      _1020: x0 => x0.relatedTarget,
      _1022: x0 => x0.clientX,
      _1023: x0 => x0.clientY,
      _1024: x0 => x0.offsetX,
      _1025: x0 => x0.offsetY,
      _1028: x0 => x0.button,
      _1029: x0 => x0.buttons,
      _1030: x0 => x0.ctrlKey,
      _1034: x0 => x0.pointerId,
      _1035: x0 => x0.pointerType,
      _1036: x0 => x0.pressure,
      _1037: x0 => x0.tiltX,
      _1038: x0 => x0.tiltY,
      _1039: x0 => x0.getCoalescedEvents(),
      _1042: x0 => x0.deltaX,
      _1043: x0 => x0.deltaY,
      _1044: x0 => x0.wheelDeltaX,
      _1045: x0 => x0.wheelDeltaY,
      _1046: x0 => x0.deltaMode,
      _1053: x0 => x0.changedTouches,
      _1056: x0 => x0.clientX,
      _1057: x0 => x0.clientY,
      _1060: x0 => x0.data,
      _1063: (x0,x1) => { x0.disabled = x1 },
      _1065: (x0,x1) => { x0.type = x1 },
      _1066: (x0,x1) => { x0.max = x1 },
      _1067: (x0,x1) => { x0.min = x1 },
      _1068: x0 => x0.value,
      _1069: (x0,x1) => { x0.value = x1 },
      _1070: x0 => x0.disabled,
      _1071: (x0,x1) => { x0.disabled = x1 },
      _1073: (x0,x1) => { x0.placeholder = x1 },
      _1075: (x0,x1) => { x0.name = x1 },
      _1076: (x0,x1) => { x0.autocomplete = x1 },
      _1078: x0 => x0.selectionDirection,
      _1079: x0 => x0.selectionStart,
      _1081: x0 => x0.selectionEnd,
      _1084: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      _1085: (x0,x1) => x0.add(x1),
      _1087: (x0,x1) => { x0.noValidate = x1 },
      _1088: (x0,x1) => { x0.method = x1 },
      _1089: (x0,x1) => { x0.action = x1 },
      _1114: x0 => x0.orientation,
      _1115: x0 => x0.width,
      _1116: x0 => x0.height,
      _1117: (x0,x1) => x0.lock(x1),
      _1136: x0 => new ResizeObserver(x0),
      _1139: (module,f) => finalizeWrapper(f, function(x0,x1) { return module.exports._1139(f,arguments.length,x0,x1) }),
      _1147: x0 => x0.length,
      _1148: x0 => x0.iterator,
      _1149: x0 => x0.Segmenter,
      _1150: x0 => x0.v8BreakIterator,
      _1151: (x0,x1) => new Intl.Segmenter(x0,x1),
      _1154: x0 => x0.language,
      _1155: x0 => x0.script,
      _1156: x0 => x0.region,
      _1174: x0 => x0.done,
      _1175: x0 => x0.value,
      _1176: x0 => x0.index,
      _1180: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
      _1181: (x0,x1) => x0.adoptText(x1),
      _1182: x0 => x0.first(),
      _1183: x0 => x0.next(),
      _1184: x0 => x0.current(),
      _1186: () => globalThis.window.FinalizationRegistry,
      _1197: x0 => x0.hostElement,
      _1198: x0 => x0.viewConstraints,
      _1201: x0 => x0.maxHeight,
      _1202: x0 => x0.maxWidth,
      _1203: x0 => x0.minHeight,
      _1204: x0 => x0.minWidth,
      _1205: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1205(f,arguments.length,x0) }),
      _1206: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1206(f,arguments.length,x0) }),
      _1207: (x0,x1) => ({addView: x0,removeView: x1}),
      _1210: x0 => x0.loader,
      _1211: () => globalThis._flutter,
      _1212: (x0,x1) => x0.didCreateEngineInitializer(x1),
      _1213: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1213(f,arguments.length,x0) }),
      _1214: (module,f) => finalizeWrapper(f, function() { return module.exports._1214(f,arguments.length) }),
      _1215: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
      _1218: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1218(f,arguments.length,x0) }),
      _1219: x0 => ({runApp: x0}),
      _1221: (module,f) => finalizeWrapper(f, function(x0,x1) { return module.exports._1221(f,arguments.length,x0,x1) }),
      _1222: x0 => new Promise(x0),
      _1223: x0 => x0.length,
      _1224: () => globalThis.window.ImageDecoder,
      _1225: x0 => x0.tracks,
      _1227: x0 => x0.completed,
      _1229: x0 => x0.image,
      _1235: x0 => x0.displayWidth,
      _1236: x0 => x0.displayHeight,
      _1237: x0 => x0.duration,
      _1240: x0 => x0.ready,
      _1241: x0 => x0.selectedTrack,
      _1242: x0 => x0.repetitionCount,
      _1243: x0 => x0.frameCount,
      _1290: (x0,x1) => x0.createElement(x1),
      _1296: (x0,x1,x2) => x0.addEventListener(x1,x2),
      _1297: x0 => x0.remove(),
      _1298: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1298(f,arguments.length,x0) }),
      _1299: x0 => ({createScriptURL: x0}),
      _1300: (x0,x1,x2) => x0.createPolicy(x1,x2),
      _1301: (x0,x1,x2) => x0.createScriptURL(x1,x2),
      _1302: x0 => x0.hasChildNodes(),
      _1303: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _1304: (x0,x1) => x0.append(x1),
      _1305: (x0,x1) => x0.querySelectorAll(x1),
      _1306: (x0,x1) => x0.item(x1),
      _1307: (module,f) => finalizeWrapper(f, function(x0,x1) { return module.exports._1307(f,arguments.length,x0,x1) }),
      _1308: x0 => globalThis.Sentry.init(x0),
      _1309: () => new Sentry.getClient(),
      _1310: x0 => x0.getOptions(),
      _1314: () => globalThis.Sentry.globalHandlersIntegration(),
      _1315: () => globalThis.Sentry.dedupeIntegration(),
      _1316: () => globalThis.Sentry.close(),
      _1317: (x0,x1) => x0.sendEnvelope(x1),
      _1320: () => globalThis.globalThis,
      _1321: x0 => x0.sdk,
      _1322: (x0,x1) => { x0.sdk = x1 },
      _1323: (x0,x1) => { x0.name = x1 },
      _1324: (x0,x1) => x0.createElement(x1),
      _1325: (x0,x1) => x0.removeItem(x1),
      _1326: (x0,x1) => x0.getItem(x1),
      _1328: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _1329: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
      _1336: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      _1337: (x0,x1) => x0.canShare(x1),
      _1338: (x0,x1) => x0.share(x1),
      _1339: x0 => ({url: x0}),
      _1349: () => globalThis.Notification.requestPermission(),
      _1350: x0 => x0.decode(),
      _1351: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      _1352: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
      _1353: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1353(f,arguments.length,x0) }),
      _1354: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1354(f,arguments.length,x0) }),
      _1355: x0 => x0.send(),
      _1356: () => new XMLHttpRequest(),
      _1357: (x0,x1,x2) => x0.setItem(x1,x2),
      _1374: x0 => globalThis.firebase_core.getApp(x0),
      _1378: x0 => globalThis.firebase_messaging.getMessaging(x0),
      _1380: (x0,x1) => globalThis.firebase_messaging.getToken(x0,x1),
      _1382: (x0,x1) => globalThis.firebase_messaging.onMessage(x0,x1),
      _1383: (x0,x1) => ({next: x0,error: x1}),
      _1388: x0 => x0.title,
      _1389: x0 => x0.body,
      _1390: x0 => x0.image,
      _1391: x0 => x0.messageId,
      _1392: x0 => x0.collapseKey,
      _1393: x0 => x0.fcmOptions,
      _1394: x0 => x0.notification,
      _1395: x0 => x0.data,
      _1396: x0 => x0.from,
      _1397: x0 => x0.analyticsLabel,
      _1398: x0 => x0.link,
      _1399: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1399(f,arguments.length,x0) }),
      _1400: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1400(f,arguments.length,x0) }),
      _1408: x0 => x0.apiKey,
      _1410: x0 => x0.authDomain,
      _1412: x0 => x0.databaseURL,
      _1414: x0 => x0.projectId,
      _1416: x0 => x0.storageBucket,
      _1418: x0 => x0.messagingSenderId,
      _1420: x0 => x0.measurementId,
      _1422: x0 => x0.appId,
      _1424: x0 => x0.name,
      _1425: x0 => x0.options,
      _1435: (x0,x1) => x0.key(x1),
      _1436: (x0,x1,x2,x3,x4,x5,x6,x7) => x0.unwrapKey(x1,x2,x3,x4,x5,x6,x7),
      _1437: (x0,x1,x2,x3,x4,x5) => x0.importKey(x1,x2,x3,x4,x5),
      _1438: (x0,x1,x2,x3) => x0.generateKey(x1,x2,x3),
      _1439: (x0,x1,x2,x3,x4) => x0.wrapKey(x1,x2,x3,x4),
      _1440: (x0,x1,x2) => x0.exportKey(x1,x2),
      _1441: (x0,x1) => x0.getRandomValues(x1),
      _1442: (x0,x1,x2,x3) => x0.encrypt(x1,x2,x3),
      _1443: (x0,x1,x2,x3) => x0.decrypt(x1,x2,x3),
      _1444: () => globalThis.removeSplashFromWeb(),
      _1446: Date.now,
      _1447: secondsSinceEpoch => {
        const date = new Date(secondsSinceEpoch * 1000);
        const match = /\((.*)\)/.exec(date.toString());
        if (match == null) {
            // This should never happen on any recent browser.
            return '';
        }
        return match[1];
      },
      _1448: s => new Date(s * 1000).getTimezoneOffset() * 60,
      _1449: s => {
        if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
          return NaN;
        }
        return parseFloat(s);
      },
      _1450: () => typeof dartUseDateNowForTicks !== "undefined",
      _1451: () => 1000 * performance.now(),
      _1452: () => Date.now(),
      _1453: () => {
        // On browsers return `globalThis.location.href`
        if (globalThis.location != null) {
          return globalThis.location.href;
        }
        return null;
      },
      _1454: () => {
        return typeof process != "undefined" &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
      _1455: () => new WeakMap(),
      _1456: (map, o) => map.get(o),
      _1457: (map, o, v) => map.set(o, v),
      _1458: x0 => new WeakRef(x0),
      _1459: x0 => x0.deref(),
      _1466: () => globalThis.WeakRef,
      _1470: s => JSON.stringify(s),
      _1471: s => printToConsole(s),
      _1472: o => {
        if (o === null || o === undefined) return 0;
        if (typeof(o) === 'string') return 1;
        return 2;
      },
      _1473: (o, p, r) => o.replaceAll(p, () => r),
      _1474: (o, p, r) => o.replace(p, () => r),
      _1475: Function.prototype.call.bind(String.prototype.toLowerCase),
      _1476: s => s.toUpperCase(),
      _1477: s => s.trim(),
      _1478: s => s.trimLeft(),
      _1479: s => s.trimRight(),
      _1480: (string, times) => string.repeat(times),
      _1481: Function.prototype.call.bind(String.prototype.indexOf),
      _1482: (s, p, i) => s.lastIndexOf(p, i),
      _1483: (string, token) => string.split(token),
      _1484: Object.is,
      _1488: (o, t) => typeof o === t,
      _1489: (o, c) => o instanceof c,
      _1490: o => Object.keys(o),
      _1544: x0 => new Array(x0),
      _1546: x0 => x0.length,
      _1548: (x0,x1) => x0[x1],
      _1549: (x0,x1,x2) => { x0[x1] = x2 },
      _1552: (x0,x1,x2) => new DataView(x0,x1,x2),
      _1554: x0 => new Int8Array(x0),
      _1555: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      _1557: x0 => new Uint8ClampedArray(x0),
      _1559: x0 => new Int16Array(x0),
      _1561: x0 => new Uint16Array(x0),
      _1563: x0 => new Int32Array(x0),
      _1565: x0 => new Uint32Array(x0),
      _1567: x0 => new Float32Array(x0),
      _1569: x0 => new Float64Array(x0),
      _1593: x0 => x0.random(),
      _1594: (x0,x1) => x0.getRandomValues(x1),
      _1595: () => globalThis.crypto,
      _1596: () => globalThis.Math,
      _1609: (ms, c) =>
      setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
      _1610: (handle) => clearTimeout(handle),
      _1611: (ms, c) =>
      setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
      _1612: (handle) => clearInterval(handle),
      _1613: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      _1614: () => Date.now(),
      _1615: () => new Error().stack,
      _1616: (exn) => {
        let stackString = exn.toString();
        let frames = stackString.split('\n');
        let drop = 4;
        if (frames[0].startsWith('Error')) {
            drop += 1;
        }
        return frames.slice(drop).join('\n');
      },
      _1617: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      _1618: (x0,x1) => x0.exec(x1),
      _1619: (x0,x1) => x0.test(x1),
      _1620: x0 => x0.pop(),
      _1622: o => o === undefined,
      _1624: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      _1626: o => {
        const proto = Object.getPrototypeOf(o);
        return proto === Object.prototype || proto === null;
      },
      _1627: o => o instanceof RegExp,
      _1628: (l, r) => l === r,
      _1629: o => o,
      _1630: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'number') return 1;
        return 2;
      },
      _1631: o => o,
      _1632: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'boolean') return 1;
        return 2;
      },
      _1633: o => o,
      _1634: b => !!b,
      _1635: o => o.length,
      _1637: (o, i) => o[i],
      _1638: f => f.dartFunction,
      _1639: () => ({}),
      _1640: () => [],
      _1642: () => globalThis,
      _1643: (constructor, args) => {
        const factoryFunction = constructor.bind.apply(
            constructor, [null, ...args]);
        return new factoryFunction();
      },
      _1644: (o, p) => p in o,
      _1645: (o, p) => o[p],
      _1646: (o, p, v) => o[p] = v,
      _1647: (o, m, a) => o[m].apply(o, a),
      _1649: o => String(o),
      _1650: (p, s, f) => p.then(s, (e) => f(e, e === undefined)),
      _1651: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1651(f,arguments.length,x0) }),
      _1652: (module,f) => finalizeWrapper(f, function(x0,x1) { return module.exports._1652(f,arguments.length,x0,x1) }),
      _1653: o => {
        if (o === undefined) return 1;
        var type = typeof o;
        if (type === 'boolean') return 2;
        if (type === 'number') return 3;
        if (type === 'string') return 4;
        if (o instanceof Array) return 5;
        if (ArrayBuffer.isView(o)) {
          if (o instanceof Int8Array) return 6;
          if (o instanceof Uint8Array) return 7;
          if (o instanceof Uint8ClampedArray) return 8;
          if (o instanceof Int16Array) return 9;
          if (o instanceof Uint16Array) return 10;
          if (o instanceof Int32Array) return 11;
          if (o instanceof Uint32Array) return 12;
          if (o instanceof Float32Array) return 13;
          if (o instanceof Float64Array) return 14;
          if (o instanceof DataView) return 15;
        }
        if (o instanceof ArrayBuffer) return 16;
        // Feature check for `SharedArrayBuffer` before doing a type-check.
        if (globalThis.SharedArrayBuffer !== undefined &&
            o instanceof SharedArrayBuffer) {
            return 17;
        }
        if (o instanceof Promise) return 18;
        return 19;
      },
      _1654: o => [o],
      _1655: (o0, o1) => [o0, o1],
      _1656: (o0, o1, o2) => [o0, o1, o2],
      _1657: (o0, o1, o2, o3) => [o0, o1, o2, o3],
      _1658: (exn) => {
        if (exn instanceof Error) {
          return exn.stack;
        } else {
          return null;
        }
      },
      _1659: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _1660: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI8ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _1661: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI16ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _1662: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI16ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _1663: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _1664: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _1665: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _1666: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _1667: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF64ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _1668: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF64ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _1669: x0 => new ArrayBuffer(x0),
      _1670: s => {
        if (/[[\]{}()*+?.\\^$|]/.test(s)) {
            s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
        }
        return s;
      },
      _1672: x0 => x0.index,
      _1673: x0 => x0.groups,
      _1674: x0 => x0.flags,
      _1675: x0 => x0.multiline,
      _1676: x0 => x0.ignoreCase,
      _1677: x0 => x0.unicode,
      _1678: x0 => x0.dotAll,
      _1679: (x0,x1) => { x0.lastIndex = x1 },
      _1680: (o, p) => p in o,
      _1681: (o, p) => o[p],
      _1682: (o, p, v) => o[p] = v,
      _1687: (x0,x1) => x0.bind(x1),
      _1688: x0 => x0.next,
      _1695: x0 => new Headers(x0),
      _1698: x0 => x0.entries(),
      _1699: (x0,x1) => x0.get(x1),
      _1729: x0 => x0.getReader(),
      _1733: (x0,x1) => x0.cancel(x1),
      _1734: x0 => x0.read(),
      _1737: x0 => x0.value,
      _1739: x0 => x0.done,
      _1742: (x0,x1) => globalThis.fetch(x0,x1),
      _1743: () => new AbortController(),
      _1744: (x0,x1) => x0.abort(x1),
      _1745: x0 => x0.abort(),
      _1773: x0 => x0.body,
      _1775: x0 => x0.headers,
      _1777: x0 => x0.redirected,
      _1778: x0 => x0.status,
      _1779: x0 => x0.statusText,
      _1780: x0 => x0.type,
      _1781: x0 => x0.url,
      _1788: (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11) => ({method: x0,headers: x1,body: x2,mode: x3,credentials: x4,cache: x5,redirect: x6,referrer: x7,referrerPolicy: x8,integrity: x9,keepalive: x10,signal: x11}),
      _1790: (x0,x1) => { x0.method = x1 },
      _1802: (x0,x1) => { x0.redirect = x1 },
      _1826: (x0,x1) => x0.call(x1),
      _1827: (x0,x1,x2) => x0.call(x1,x2),
      _1830: x0 => x0.done,
      _1832: x0 => x0.value,
      _1834: (x0,x1,x2) => x0.transaction(x1,x2),
      _1835: (x0,x1) => x0.objectStore(x1),
      _1836: (x0,x1) => x0.getAllKeys(x1),
      _1837: (x0,x1) => x0.getAll(x1),
      _1838: (x0,x1) => x0.get(x1),
      _1839: (x0,x1) => x0.delete(x1),
      _1840: (x0,x1,x2) => x0.put(x1,x2),
      _1842: x0 => x0.close(),
      _1844: (x0,x1,x2) => x0.open(x1,x2),
      _1845: (x0,x1) => x0.contains(x1),
      _1848: (x0,x1) => x0.createObjectStore(x1),
      _1849: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1849(f,arguments.length,x0) }),
      _1850: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1850(f,arguments.length,x0) }),
      _1867: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1867(f,arguments.length,x0) }),
      _1868: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1868(f,arguments.length,x0) }),
      _1877: x0 => x0.aborted,
      _1878: x0 => x0.reason,
      _1879: x0 => x0.signal,
      _1889: x0 => x0.deviceMemory,
      _1890: (x0,x1) => x0.matchMedia(x1),
      _1891: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1891(f,arguments.length,x0) }),
      _1892: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1892(f,arguments.length,x0) }),
      _1893: x0 => x0.openCursor(),
      _1894: x0 => x0.continue(),
      _1895: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1895(f,arguments.length,x0) }),
      _1896: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._1896(f,arguments.length,x0) }),
      _1897: () => new AbortController(),
      _1898: x0 => x0.abort(),
      _1899: (x0,x1,x2,x3,x4,x5) => ({method: x0,headers: x1,body: x2,credentials: x3,redirect: x4,signal: x5}),
      _1900: (x0,x1) => globalThis.fetch(x0,x1),
      _1901: (x0,x1) => x0.get(x1),
      _1902: (module,f) => finalizeWrapper(f, function(x0,x1,x2) { return module.exports._1902(f,arguments.length,x0,x1,x2) }),
      _1903: (x0,x1) => x0.forEach(x1),
      _1904: x0 => x0.getReader(),
      _1905: x0 => x0.cancel(),
      _1906: x0 => x0.read(),
      _1909: o => o instanceof Array,
      _1912: (a, l) => a.length = l,
      _1913: a => a.pop(),
      _1914: (a, i) => a.splice(i, 1),
      _1915: (a, s) => a.join(s),
      _1916: (a, s, e) => a.slice(s, e),
      _1918: (a, b) => a == b ? 0 : (a > b ? 1 : -1),
      _1919: a => a.length,
      _1921: (a, i) => a[i],
      _1922: (a, i, v) => a[i] = v,
      _1924: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof ArrayBuffer) return 1;
        if (globalThis.SharedArrayBuffer !== undefined &&
            o instanceof SharedArrayBuffer) {
          return 2;
        }
        return 3;
      },
      _1925: (o, offsetInBytes, lengthInBytes) => {
        var dst = new ArrayBuffer(lengthInBytes);
        new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
        return new DataView(dst);
      },
      _1927: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint8Array) return 1;
        return 2;
      },
      _1928: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
      _1929: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int8Array) return 1;
        return 2;
      },
      _1930: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
      _1931: o => o instanceof Uint8ClampedArray,
      _1932: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      _1933: o => o instanceof Uint16Array,
      _1934: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      _1935: o => o instanceof Int16Array,
      _1936: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      _1937: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint32Array) return 1;
        return 2;
      },
      _1938: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      _1939: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int32Array) return 1;
        return 2;
      },
      _1940: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      _1942: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
      _1943: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float32Array) return 1;
        return 2;
      },
      _1944: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      _1945: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float64Array) return 1;
        return 2;
      },
      _1946: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      _1947: (a, i) => a.push(i),
      _1948: (t, s) => t.set(s),
      _1949: l => new DataView(new ArrayBuffer(l)),
      _1950: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      _1952: o => o.buffer,
      _1953: o => o.byteOffset,
      _1954: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      _1955: (b, o) => new DataView(b, o),
      _1956: (b, o, l) => new DataView(b, o, l),
      _1957: Function.prototype.call.bind(DataView.prototype.getUint8),
      _1958: Function.prototype.call.bind(DataView.prototype.setUint8),
      _1959: Function.prototype.call.bind(DataView.prototype.getInt8),
      _1960: Function.prototype.call.bind(DataView.prototype.setInt8),
      _1961: Function.prototype.call.bind(DataView.prototype.getUint16),
      _1962: Function.prototype.call.bind(DataView.prototype.setUint16),
      _1963: Function.prototype.call.bind(DataView.prototype.getInt16),
      _1964: Function.prototype.call.bind(DataView.prototype.setInt16),
      _1965: Function.prototype.call.bind(DataView.prototype.getUint32),
      _1966: Function.prototype.call.bind(DataView.prototype.setUint32),
      _1967: Function.prototype.call.bind(DataView.prototype.getInt32),
      _1968: Function.prototype.call.bind(DataView.prototype.setInt32),
      _1971: Function.prototype.call.bind(DataView.prototype.getBigInt64),
      _1972: Function.prototype.call.bind(DataView.prototype.setBigInt64),
      _1973: Function.prototype.call.bind(DataView.prototype.getFloat32),
      _1974: Function.prototype.call.bind(DataView.prototype.setFloat32),
      _1975: Function.prototype.call.bind(DataView.prototype.getFloat64),
      _1976: Function.prototype.call.bind(DataView.prototype.setFloat64),
      _1977: Function.prototype.call.bind(Number.prototype.toString),
      _1978: Function.prototype.call.bind(BigInt.prototype.toString),
      _1979: Function.prototype.call.bind(Number.prototype.toString),
      _1980: (d, digits) => d.toFixed(digits),
      _2132: x0 => x0.style,
      _2609: (x0,x1) => { x0.src = x1 },
      _3369: (x0,x1) => { x0.src = x1 },
      _3379: (x0,x1) => { x0.crossOrigin = x1 },
      _3383: (x0,x1) => { x0.integrity = x1 },
      _3838: () => globalThis.window,
      _3876: x0 => x0.self,
      _3877: x0 => x0.document,
      _3880: x0 => x0.location,
      _3899: x0 => x0.navigator,
      _3903: x0 => x0.screen,
      _3915: x0 => x0.devicePixelRatio,
      _4154: x0 => x0.isSecureContext,
      _4156: x0 => x0.indexedDB,
      _4157: x0 => x0.crypto,
      _4161: x0 => x0.trustedTypes,
      _4162: x0 => x0.sessionStorage,
      _4163: x0 => x0.localStorage,
      _4173: x0 => x0.origin,
      _4182: x0 => x0.pathname,
      _4267: x0 => x0.geolocation,
      _4270: x0 => x0.mediaDevices,
      _4272: x0 => x0.permissions,
      _4283: x0 => x0.platform,
      _4286: x0 => x0.userAgent,
      _4292: x0 => x0.onLine,
      _4337: x0 => x0.data,
      _4338: x0 => x0.origin,
      _4494: x0 => x0.length,
      _6399: x0 => x0.target,
      _6439: x0 => x0.signal,
      _6448: x0 => x0.length,
      _6491: x0 => x0.baseURI,
      _6497: x0 => x0.firstChild,
      _6508: () => globalThis.document,
      _6589: x0 => x0.body,
      _6591: x0 => x0.head,
      _8267: x0 => x0.value,
      _8269: x0 => x0.done,
      _8688: () => globalThis.Notification.permission,
      _8966: x0 => x0.url,
      _8968: x0 => x0.status,
      _8970: x0 => x0.statusText,
      _8971: x0 => x0.headers,
      _8972: x0 => x0.body,
      _9239: x0 => x0.type,
      _9254: x0 => x0.matches,
      _9265: x0 => x0.availWidth,
      _9266: x0 => x0.availHeight,
      _9271: x0 => x0.orientation,
      _10423: x0 => x0.result,
      _10424: x0 => x0.error,
      _10429: (x0,x1) => { x0.onsuccess = x1 },
      _10431: (x0,x1) => { x0.onerror = x1 },
      _10435: (x0,x1) => { x0.onupgradeneeded = x1 },
      _10453: x0 => x0.version,
      _10454: x0 => x0.objectStoreNames,
      _10521: x0 => x0.key,
      _10524: x0 => x0.value,
      _11362: (x0,x1) => { x0.display = x1 },
      _12584: x0 => x0.name,
      _12585: x0 => x0.message,
      _12588: x0 => x0.subtle,
      _13316: () => globalThis.document,
      _13318: () => globalThis.console,
      _13323: (x0,x1) => { x0.height = x1 },
      _13325: (x0,x1) => { x0.width = x1 },
      _13327: (x0,x1) => { x0.pointerEvents = x1 },
      _13336: x0 => x0.style,
      _13339: x0 => x0.src,
      _13340: (x0,x1) => { x0.src = x1 },
      _13341: x0 => x0.naturalWidth,
      _13342: x0 => x0.naturalHeight,
      _13357: (x0,x1) => x0.error(x1),
      _13362: x0 => x0.status,
      _13363: (x0,x1) => { x0.responseType = x1 },
      _13365: x0 => x0.response,
      _13368: () => globalThis.window.flutterCanvasKit,
      _13369: () => globalThis.window._flutter_skwasmInstance,
      _13370: x0 => x0.name,
      _13371: x0 => x0.message,
      _13372: x0 => x0.code,

    };

    const baseImports = {
      dart2wasm: dart2wasm,
      Math: Math,
      Date: Date,
      Object: Object,
      Array: Array,
      Reflect: Reflect,
      WebAssembly: {
        JSTag: WebAssembly.JSTag,
      },
      "": new Proxy({}, { get(_, prop) { return prop; } }),

    };

    const jsStringPolyfill = {
      "charCodeAt": (s, i) => s.charCodeAt(i),
      "compare": (s1, s2) => {
        if (s1 < s2) return -1;
        if (s1 > s2) return 1;
        return 0;
      },
      "concat": (s1, s2) => s1 + s2,
      "equals": (s1, s2) => s1 === s2,
      "fromCharCode": (i) => String.fromCharCode(i),
      "length": (s) => s.length,
      "substring": (s, a, b) => s.substring(a, b),
      "fromCharCodeArray": (a, start, end) => {
        if (end <= start) return '';

        const read = dartInstance.exports.$wasmI16ArrayGet;
        let result = '';
        let index = start;
        const chunkLength = Math.min(end - index, 500);
        let array = new Array(chunkLength);
        while (index < end) {
          const newChunkLength = Math.min(end - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(a, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      },
      "intoCharCodeArray": (s, a, start) => {
        if (s === '') return 0;

        const write = dartInstance.exports.$wasmI16ArraySet;
        for (var i = 0; i < s.length; ++i) {
          write(a, start++, s.charCodeAt(i));
        }
        return s.length;
      },
      "test": (s) => typeof s == "string",
    };


    

    dartInstance = await WebAssembly.instantiate(this.module, {
      ...baseImports,
      ...additionalImports,
      
      "wasm:js-string": jsStringPolyfill,
    });
    dartInstance.exports.$setThisModule(dartInstance);

    return new InstantiatedApp(this, dartInstance);
  }
}

class InstantiatedApp {
  constructor(compiledApp, instantiatedModule) {
    this.compiledApp = compiledApp;
    this.instantiatedModule = instantiatedModule;
  }

  // Call the main function with the given arguments.
  invokeMain(...args) {
    this.instantiatedModule.exports.$invokeMain(args);
  }
}
