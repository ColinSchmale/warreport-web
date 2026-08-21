// Compiles a dart2wasm-generated main module from `source` which can then
// be instantiated via the `instantiate` method.
//
// `source` needs to be a `Response` object (or promise thereof) e.g. created
// via the `fetch()` JS API.
export async function compileStreaming(source) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(
      await WebAssembly.compileStreaming(source, builtins), builtins);
}

// Compiles a dart2wasm-generated wasm module from `bytes` which is then
// instantiable via the `instantiate` method.
export async function compile(bytes) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(await WebAssembly.compile(bytes, builtins), builtins);
}

class CompiledApp {
  constructor(module, builtins) {
    this.module = module;
    this.builtins = builtins;
  }

  // The second argument is an options object containing:
  // `loadDeferredModules` is a JS function that takes an array of module names
  //   matching wasm files produced by the dart2wasm compiler. It also takes a
  //   callback that should be invoked for each loaded module with 2 arguments:
  //   (1) the module name, (2) the loaded module in a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`. The callback
  //   returns a Promise that resolves when the module is instantiated.
  //   loadDeferredModules should return a Promise that resolves when all the
  //   modules have been loaded and the callback promises have resolved.
  // `loadDeferredId` is a JS function that takes load ID produced by the
  //   compiler when the `use-load-ids` option is passed. Each load ID maps to
  //   one or more wasm files as specified in the emitted JSON file. It also
  //   takes a callback that should be invoked for each loaded module with 2
  //   arguments: (1) the module name, (2) the loaded module in a format
  //   supported by `WebAssembly.compile` or `WebAssembly.compileStreaming`.
  //   The callback returns a Promise that resolves when the module is
  //   instantiated.
  //   loadDeferredId should return a Promise that resolves when all the
  //   modules have been loaded and the callback promises have resolved.
  async instantiate(additionalImports, {loadDeferredModules, loadDeferredId} = {}) {
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
            AB: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      AC: Function.prototype.call.bind(DataView.prototype.setInt16),
      AD: x0 => x0.height,
      AE: (x0,x1) => x0.observe(x1),
      AF: x0 => x0.wheelDeltaY,
      AG: (o, p) => p in o,
      AH: (x0,x1) => x0.adoptText(x1),
      AI: x0 => x0.selectionStart,
      AJ: x0 => x0.navigator,
      AK: (x0,x1) => x0.createImageBitmap(x1),
      AL: (x0,x1) => x0.objectStore(x1),
      AM: x0 => x0.deviceMemory,
      AN: (x0,x1) => x0.getModifierState(x1),
      AO: x0 => x0.code,
      B: s => printToConsole(s),
      BB: b => !!b,
      BC: Function.prototype.call.bind(DataView.prototype.setUint16),
      BD: x0 => x0.width,
      BE: (wasmFunction,f) => finalizeWrapper(f, function(x0,x1) { return wasmFunction(f,arguments.length,x0,x1) }),
      BF: x0 => x0.wheelDeltaX,
      BG: x0 => x0.groups,
      BH: x0 => x0.first(),
      BI: x0 => x0.selectionEnd,
      BJ: () => globalThis.window,
      BK: (x0,x1,x2) => x0.createImageBitmap(x1,x2),
      BL: (x0,x1) => x0.getAll(x1),
      BM: x0 => x0.onLine,
      BN: x0 => x0.metaKey,
      BO: (x0,x1) => globalThis.firebase_messaging.getToken(x0,x1),
      C: Function.prototype.call.bind(Number.prototype.toString),
      CB: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      CC: Function.prototype.call.bind(DataView.prototype.setUint8),
      CD: x0 => x0.screen,
      CE: x0 => new ResizeObserver(x0),
      CF: x0 => x0.key,
      CG: () => {
        return typeof process != "undefined" &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
      CH: x0 => x0.next(),
      CI: x0 => x0.keyCode,
      CJ: (x0,x1) => x0.getRandomValues(x1),
      CK: (x0,x1) => x0.removeAttribute(x1),
      CL: x0 => x0.value,
      CM: x0 => x0.pathname,
      CN: x0 => x0.altKey,
      CO: x0 => x0.link,
      D: Function.prototype.call.bind(BigInt.prototype.toString),
      DB: (x0,x1) => x0.focus(x1),
      DC: Function.prototype.call.bind(DataView.prototype.setInt8),
      DD: o => {
        if (o === null || o === undefined) return 0;
        if (typeof(o) === 'string') return 1;
        return 2;
      },
      DE: (x0,x1) => x0.getPropertyValue(x1),
      DF: x0 => x0.identifier,
      DG: () => new AbortController(),
      DH: x0 => x0.current(),
      DI: (x0,x1) => x0.scrollIntoView(x1),
      DJ: () => globalThis.crypto,
      DK: x0 => x0.close(),
      DL: x0 => x0.openCursor(),
      DM: x0 => x0.userAgent,
      DN: x0 => x0.ctrlKey,
      DO: x0 => x0.analyticsLabel,
      E: (exn) => {
        let stackString = exn.toString();
        let frames = stackString.split('\n');
        let drop = 4;
        if (frames[0].startsWith('Error')) {
            drop += 1;
        }
        return frames.slice(drop).join('\n');
      },
      EB: () => ({}),
      EC: Function.prototype.call.bind(DataView.prototype.getInt8),
      ED: x0 => x0.tabIndex,
      EE: x0 => globalThis.parseFloat(x0),
      EF: x0 => x0.touches,
      EG: x0 => x0.getReader(),
      EH: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
      EI: x0 => x0.multiViewEnabled,
      EJ: l => new DataView(new ArrayBuffer(l)),
      EK: x0 => x0.height,
      EL: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      EM: (x0,x1) => x0.matchMedia(x1),
      EN: x0 => x0.isComposing,
      EO: x0 => x0.image,
      F: () => new Error().stack,
      FB: (o, p, v) => o[p] = v,
      FC: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int8Array) return 1;
        return 2;
      },
      FD: (x0,x1) => x0.contains(x1),
      FE: (x0,x1) => x0.getComputedStyle(x1),
      FF: x0 => x0.pressure,
      FG: (x0,x1) => x0.get(x1),
      FH: x0 => x0.v8BreakIterator,
      FI: (x0,x1) => x0.replaceWith(x1),
      FJ: x0 => new WeakRef(x0),
      FK: x0 => x0.width,
      FL: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      FM: x0 => x0.matches,
      FN: x0 => x0.code,
      FO: x0 => x0.body,
      G: s => JSON.stringify(s),
      GB: () => [],
      GC: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      GD: x0 => x0.activeElement,
      GE: x0 => x0.documentElement,
      GF: x0 => x0.tiltY,
      GG: x0 => x0.statusText,
      GH: () => globalThis.Intl,
      GI: (x0,x1) => { x0.type = x1 },
      GJ: x0 => x0.deref(),
      GK: x0 => ({resizeQuality: x0}),
      GL: (x0,x1) => { x0.onerror = x1 },
      GM: x0 => x0.platform,
      GN: x0 => x0.repeat,
      GO: x0 => x0.title,
      H: Function.prototype.call.bind(Number.prototype.toString),
      HB: (a, i) => a.push(i),
      HC: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      HD: x0 => x0.parentNode,
      HE: x0 => x0.computedStyleMap(),
      HF: x0 => x0.tiltX,
      HG: x0 => x0.entries(),
      HH: (x0,x1) => x0.segment(x1),
      HI: (x0,x1) => { x0.className = x1 },
      HJ: () => globalThis.WeakRef,
      HK: (x0,x1) => { x0.resizeHeight = x1 },
      HL: x0 => x0.error,
      HM: (x0,x1) => x0.sendEnvelope(x1),
      HN: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      HO: x0 => x0.fcmOptions,
      I: Function.prototype.call.bind(String.prototype.indexOf),
      IB: x0 => new Int8Array(x0),
      IC: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      ID: x0 => x0.tagName,
      IE: (x0,x1) => x0.get(x1),
      IF: x0 => x0.pointerType,
      IG: x0 => x0.done,
      IH: x0 => x0.index,
      II: (x0,x1) => { x0.tabIndex = x1 },
      IJ: x0 => globalThis.URL.createObjectURL(x0),
      IK: (x0,x1) => { x0.resizeWidth = x1 },
      IL: (x0,x1) => { x0.onsuccess = x1 },
      IM: x0 => x0.body,
      IN: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      IO: x0 => x0.notification,
      J: (s, p, i) => s.lastIndexOf(p, i),
      JB: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      JC: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      JD: x0 => x0.target,
      JE: (o, p) => p in o,
      JF: x0 => x0.pointerId,
      JG: x0 => x0.value,
      JH: x0 => x0.next(),
      JI: (x0,x1) => { x0.name = x1 },
      JJ: x0 => ({type: x0}),
      JK: x0 => x0.naturalHeight,
      JL: x0 => x0.continue(),
      JM: () => globalThis.window._flutter_skwasmInstance,
      JN: (x0,x1) => x0.getItem(x1),
      JO: x0 => x0.messageId,
      K: o => o,
      KB: x0 => new Uint8Array(x0),
      KC: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      KD: x0 => x0.clientY,
      KE: (x0,x1) => { x0.textContent = x1 },
      KF: x0 => x0.getCoalescedEvents(),
      KG: (x0,x1) => x0.bind(x1),
      KH: x0 => x0.value,
      KI: (x0,x1) => { x0.placeholder = x1 },
      KJ: (x0,x1) => new Blob(x0,x1),
      KK: x0 => x0.naturalWidth,
      KL: x0 => x0.result,
      KM: () => globalThis.window.flutterCanvasKit,
      KN: x0 => x0.localStorage,
      KO: x0 => x0.from,
      L: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'number') return 1;
        return 2;
      },
      LB: x0 => new Uint8ClampedArray(x0),
      LC: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      LD: x0 => x0.clientX,
      LE: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      LF: (x0,x1) => x0.getModifierState(x1),
      LG: (x0,x1) => x0.call(x1),
      LH: x0 => x0.done,
      LI: (x0,x1) => { x0.autocomplete = x1 },
      LJ: (x0,x1) => x0.revokeObjectURL(x1),
      LK: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      LL: x0 => x0.target,
      LM: () => globalThis.globalThis,
      LN: (x0,x1) => x0.key(x1),
      LO: x0 => x0.collapseKey,
      M: x0 => x0.index,
      MB: x0 => new Int16Array(x0),
      MC: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      MD: (x0,x1,x2) => x0.setAttribute(x1,x2),
      ME: x0 => x0.matches,
      MF: s => s.trimLeft(),
      MG: (x0,x1,x2) => x0.call(x1,x2),
      MH: (o, m, a) => o[m].apply(o, a),
      MI: (x0,x1) => { x0.name = x1 },
      MJ: (x0,x1) => { x0.src = x1 },
      MK: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      ML: (x0,x1) => x0.getAllKeys(x1),
      MM: x0 => x0.remove(),
      MN: x0 => x0.length,
      MO: x0 => x0.data,
      N: o => String(o),
      NB: x0 => new Uint16Array(x0),
      NC: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
      ND: x0 => x0.getBoundingClientRect(),
      NE: (x0,x1) => x0.matchMedia(x1),
      NF: s => s.toUpperCase(),
      NG: x0 => x0.next,
      NH: x0 => x0.iterator,
      NI: (x0,x1) => { x0.placeholder = x1 },
      NJ: (x0,x1,x2,x3,x4) => globalThis.createImageBitmap(x0,x1,x2,x3,x4),
      NK: (x0,x1,x2) => x0.addEventListener(x1,x2),
      NL: x0 => x0.key,
      NM: (x0,x1) => x0.querySelectorAll(x1),
      NN: (x0,x1) => x0.removeItem(x1),
      NO: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      O: o => o === undefined,
      OB: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI16ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      OC: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
      OD: (ms, c) =>
      setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
      OE: x0 => x0.matches,
      OF: x0 => x0.pop(),
      OG: x0 => x0.redirected,
      OH: () => globalThis.Symbol,
      OI: (x0,x1) => { x0.action = x1 },
      OJ: x0 => x0.naturalHeight,
      OK: (x0,x1,x2) => x0.removeEventListener(x1,x2),
      OL: (o, t) => typeof o === t,
      OM: (x0,x1) => x0.item(x1),
      ON: (x0,x1,x2) => x0.setItem(x1,x2),
      OO: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      P: (x0,x1) => x0.exec(x1),
      PB: x0 => new Int32Array(x0),
      PC: (x0,x1) => x0.querySelector(x1),
      PD: s => new Date(s * 1000).getTimezoneOffset() * 60,
      PE: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      PF: x0 => x0.flags,
      PG: x0 => x0.url,
      PH: (x0,x1) => new Intl.Segmenter(x0,x1),
      PI: (x0,x1) => { x0.method = x1 },
      PJ: x0 => x0.naturalWidth,
      PK: (x0,x1) => { x0.src = x1 },
      PL: x0 => x0.close(),
      PM: x0 => x0.length,
      PN: (x0,x1) => x0.canShare(x1),
      PO: (x0,x1) => ({next: x0,error: x1}),
      Q: (x0,x1) => { x0.lastIndex = x1 },
      QB: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      QC: (x0,x1) => x0.item(x1),
      QD: Date.now,
      QE: f => f.dartFunction,
      QF: (a, s) => a.join(s),
      QG: x0 => x0.abort(),
      QH: x0 => x0.Segmenter,
      QI: (x0,x1) => { x0.noValidate = x1 },
      QJ: x0 => x0.decode(),
      QK: (x0,x1) => { x0.crossOrigin = x1 },
      QL: (x0,x1) => x0.createObjectStore(x1),
      QM: () => globalThis.Sentry.close(),
      QN: (x0,x1) => x0.share(x1),
      QO: (x0,x1) => globalThis.firebase_messaging.onMessage(x0,x1),
      R: o => o,
      RB: x0 => new Uint32Array(x0),
      RC: x0 => x0.length,
      RD: (handle) => clearTimeout(handle),
      RE: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      RF: (x0,x1) => x0.error(x1),
      RG: (x0,x1) => x0.cancel(x1),
      RH: x0 => x0.buffer,
      RI: (x0,x1) => x0.removeAttribute(x1),
      RJ: (x0,x1) => { x0.decoding = x1 },
      RK: (x0,x1) => x0.createElement(x1),
      RL: x0 => x0.version,
      RM: (o, p, v) => o[p] = v,
      RN: x0 => x0.message,
      RO: x0 => globalThis.firebase_messaging.getMessaging(x0),
      S: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      SB: x0 => new Float32Array(x0),
      SC: (x0,x1) => x0.querySelectorAll(x1),
      SD: (x0,x1) => x0.closest(x1),
      SE: (wasmFunction,f) => finalizeWrapper(f, function(x0,x1) { return wasmFunction(f,arguments.length,x0,x1) }),
      SF: () => globalThis.console,
      SG: x0 => x0.done,
      SH: x0 => x0.wasmMemory,
      SI: x0 => x0.isConnected,
      SJ: (x0,x1) => { x0.crossOrigin = x1 },
      SK: () => globalThis.document,
      SL: x0 => x0.objectStoreNames,
      SM: (wasmFunction,f) => finalizeWrapper(f, function(x0,x1) { return wasmFunction(f,arguments.length,x0,x1) }),
      SN: x0 => x0.click(),
      SO: x0 => globalThis.firebase_core.getApp(x0),
      T: o => o instanceof RegExp,
      TB: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      TC: (x0,x1) => x0.getAttribute(x1),
      TD: x0 => x0.bottom,
      TE: (p, s, f) => p.then(s, (e) => f(e, e === undefined)),
      TF: s => s.trimRight(),
      TG: x0 => x0.value,
      TH: () => globalThis.window._flutter_skwasmInstance,
      TI: x0 => x0.click(),
      TJ: (x0,x1) => x0.createObjectURL(x1),
      TK: x0 => x0.decode(),
      TL: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      TM: x0 => globalThis.Sentry.init(x0),
      TN: (o, a) => o + a,
      TO: x0 => x0.name,
      U: (string, times) => string.repeat(times),
      UB: x0 => new Float64Array(x0),
      UC: x0 => x0.remove(),
      UD: x0 => x0.top,
      UE: (o, i) => o[i],
      UF: x0 => x0.blur(),
      UG: x0 => x0.read(),
      UH: () => new TextDecoder(),
      UI: (x0,x1) => x0.getElementsByClassName(x1),
      UJ: x0 => x0.URL,
      UK: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      UL: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      UM: () => new Sentry.getClient(),
      UN: x0 => x0.children,
      UO: () => globalThis.Notification.requestPermission(),
      V: o => o,
      VB: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF64ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      VC: (x0,x1) => x0.appendChild(x1),
      VD: x0 => x0.right,
      VE: o => o.length,
      VF: x0 => x0.button,
      VG: x0 => x0.headers,
      VH: x0 => x0.debugSkipFontRetryDelay,
      VI: (x0,x1) => x0.dispatchEvent(x1),
      VJ: x0 => new Blob(x0),
      VK: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      VL: (x0,x1) => { x0.onupgradeneeded = x1 },
      VM: x0 => x0.getOptions(),
      VN: (x0,x1) => { x0.download = x1 },
      VO: () => globalThis.Notification.permission,
      W: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'boolean') return 1;
        return 2;
      },
      WB: x0 => new ArrayBuffer(x0),
      WC: (x0,x1) => x0.append(x1),
      WD: x0 => x0.left,
      WE: o => {
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
      WF: x0 => x0.innerHeight,
      WG: x0 => x0.body,
      WH: x0 => x0.status,
      WI: (x0,x1) => x0.createEvent(x1),
      WJ: x0 => x0.close(),
      WK: (x0,x1,x2) => x0.addEventListener(x1,x2),
      WL: x0 => x0.indexedDB,
      WM: (x0,x1) => { x0.name = x1 },
      WN: (x0,x1) => { x0.display = x1 },
      WO: x0 => x0.name,
      X: x0 => x0.dotAll,
      XB: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      XC: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
      XD: x0 => x0.clientY,
      XE: x0 => x0.language,
      XF: x0 => x0.innerWidth,
      XG: x0 => x0.status,
      XH: (x0,x1,x2) => x0.set(x1,x2),
      XI: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
      XJ: (x0,x1) => ({frameIndex: x0,completeFramesOnly: x1}),
      XK: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      XL: x0 => x0.self,
      XM: (x0,x1) => { x0.sdk = x1 },
      XN: x0 => x0.style,
      XO: x0 => x0.measurementId,
      Y: x0 => x0.unicode,
      YB: (x0,x1,x2) => new DataView(x0,x1,x2),
      YC: x0 => x0.style,
      YD: x0 => x0.clientX,
      YE: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
      YF: x0 => x0.height,
      YG: (x0,x1) => globalThis.fetch(x0,x1),
      YH: x0 => x0.arrayBuffer(),
      YI: x0 => x0.readText(),
      YJ: (x0,x1) => x0.decode(x1),
      YK: x0 => x0.send(),
      YL: () => new AbortController(),
      YM: x0 => x0.sdk,
      YN: (x0,x1) => { x0.href = x1 },
      YO: x0 => x0.appId,
      Z: x0 => x0.ignoreCase,
      ZB: (o, p) => o[p],
      ZC: x0 => x0.debugShowSemanticsNodes,
      ZD: x0 => x0.changedTouches,
      ZE: () => globalThis.window.FinalizationRegistry,
      ZF: x0 => x0.width,
      ZG: (x0,x1) => { x0.method = x1 },
      ZH: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof ArrayBuffer) return 1;
        if (globalThis.SharedArrayBuffer !== undefined &&
            o instanceof SharedArrayBuffer) {
          return 2;
        }
        return 3;
      },
      ZI: x0 => x0.clipboard,
      ZJ: x0 => x0.displayHeight,
      ZK: x0 => x0.status,
      ZL: (x0,x1,x2,x3,x4,x5) => ({method: x0,headers: x1,body: x2,credentials: x3,redirect: x4,signal: x5}),
      ZM: () => globalThis.Sentry.globalHandlersIntegration(),
      ZN: x0 => ({url: x0}),
      ZO: x0 => x0.messagingSenderId,
      a: x0 => x0.multiline,
      aB: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      aC: (x0,x1) => x0.warn(x1),
      aD: x0 => x0.offsetY,
      aE: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      aF: x0 => x0.clientHeight,
      aG: (x0,x1) => { x0.redirect = x1 },
      aH: (x0,x1) => x0.fetch(x1),
      aI: (x0,x1) => x0.writeText(x1),
      aJ: x0 => x0.displayWidth,
      aK: x0 => x0.response,
      aL: (x0,x1) => globalThis.fetch(x0,x1),
      aM: () => globalThis.Sentry.dedupeIntegration(),
      aN: x0 => ({files: x0}),
      aO: x0 => x0.storageBucket,
      b: (exn) => {
        if (exn instanceof Error) {
          return exn.stack;
        } else {
          return null;
        }
      },
      bB: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      bC: x0 => x0.console,
      bD: x0 => x0.offsetX,
      bE: x0 => new window.FinalizationRegistry(x0),
      bF: x0 => x0.clientWidth,
      bG: x0 => x0.type,
      bH: x0 => x0.fontFallbackBaseUrl,
      bI: x0 => x0.unlock(),
      bJ: x0 => x0.duration,
      bK: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
      bL: (x0,x1) => x0.get(x1),
      bM: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      bN: () => ({}),
      bO: x0 => x0.databaseURL,
      c: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      cB: o => o.byteOffset,
      cC: () => globalThis.window,
      cD: x0 => x0.type,
      cE: (x0,x1) => x0.unregister(x1),
      cF: (x0,x1) => { x0.content = x1 },
      cG: x0 => x0.reason,
      cH: (handle) => clearInterval(handle),
      cI: (x0,x1) => x0.lock(x1),
      cJ: x0 => x0.image,
      cK: (x0,x1) => { x0.responseType = x1 },
      cL: (wasmFunction,f) => finalizeWrapper(f, function(x0,x1,x2) { return wasmFunction(f,arguments.length,x0,x1,x2) }),
      cM: x0 => ({createScriptURL: x0}),
      cN: (x0,x1,x2) => new File(x0,x1,x2),
      cO: x0 => x0.authDomain,
      d: (x0,x1) => x0.didCreateEngineInitializer(x1),
      dB: o => o.buffer,
      dC: (o, c) => o instanceof c,
      dD: x0 => x0.maxTouchPoints,
      dE: (x0,x1) => x0.contains(x1),
      dF: (x0,x1) => { x0.name = x1 },
      dG: x0 => x0.aborted,
      dH: (ms, c) =>
      setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
      dI: x0 => x0.orientation,
      dJ: (x0,x1,x2,x3,x4) => ({type: x0,data: x1,premultiplyAlpha: x2,colorSpaceConversion: x3,preferAnimation: x4}),
      dK: () => new XMLHttpRequest(),
      dL: (x0,x1) => x0.forEach(x1),
      dM: (x0,x1,x2) => x0.createPolicy(x1,x2),
      dN: (x0,x1) => { x0.type = x1 },
      dO: x0 => x0.projectId,
      e: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      eB: Function.prototype.call.bind(DataView.prototype.getUint8),
      eC: (x0,x1) => x0[x1],
      eD: x0 => x0.platform,
      eE: (s) => +s,
      eF: x0 => x0.head,
      eG: (x0,x1) => x0.abort(x1),
      eH: () => Date.now(),
      eI: (x0,x1) => x0.querySelector(x1),
      eJ: x0 => new window.ImageDecoder(x0),
      eK: (x0,x1,x2) => x0.insertBefore(x1,x2),
      eL: x0 => x0.name,
      eM: (x0,x1,x2) => x0.createScriptURL(x1,x2),
      eN: x0 => x0.permissions,
      eO: x0 => x0.apiKey,
      f: (wasmFunction,f) => finalizeWrapper(f, function() { return wasmFunction(f,arguments.length) }),
      fB: (b, o) => new DataView(b, o),
      fC: x0 => x0.length,
      fD: x0 => x0.body,
      fE: s => {
        if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
          return NaN;
        }
        return parseFloat(s);
      },
      fF: (x0,x1) => x0.removeChild(x1),
      fG: (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11) => ({method: x0,headers: x1,body: x2,mode: x3,credentials: x4,cache: x5,redirect: x6,referrer: x7,referrerPolicy: x8,integrity: x9,keepalive: x10,signal: x11}),
      fH: x0 => x0.parentElement,
      fI: (x0,x1) => { x0.title = x1 },
      fJ: x0 => x0.name,
      fK: x0 => x0.id,
      fL: x0 => x0.statusText,
      fM: x0 => x0.hasChildNodes(),
      fN: x0 => x0.geolocation,
      fO: x0 => x0.options,
      g: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
      gB: (b, o, l) => new DataView(b, o, l),
      gC: (string, token) => string.split(token),
      gD: () => globalThis.document,
      gE: s => s.trim(),
      gF: x0 => x0.firstChild,
      gG: x0 => x0.signal,
      gH: (x0,x1) => x0.querySelectorAll(x1),
      gI: (x0,x1) => x0.vibrate(x1),
      gJ: x0 => x0.repetitionCount,
      gK: x0 => x0.offsetHeight,
      gL: x0 => x0.url,
      gM: (x0,x1,x2) => x0.insertBefore(x1,x2),
      gN: x0 => x0.mediaDevices,
      gO: x0 => x0.length,
      h: (wasmFunction,f) => finalizeWrapper(f, function(x0,x1) { return wasmFunction(f,arguments.length,x0,x1) }),
      hB: Function.prototype.call.bind(DataView.prototype.getFloat64),
      hC: o => o instanceof Array,
      hD: (x0,x1,x2) => x0.addEventListener(x1,x2),
      hE: x0 => x0.classList,
      hF: x0 => x0.viewConstraints,
      hG: x0 => new Headers(x0),
      hH: (d, digits) => d.toFixed(digits),
      hI: x0 => x0.content,
      hJ: x0 => x0.frameCount,
      hK: x0 => x0.offsetWidth,
      hL: x0 => x0.status,
      hM: (x0,x1) => x0.append(x1),
      hN: x0 => x0.baseURI,
      hO: x0 => x0.getReader(),
      i: x0 => new Promise(x0),
      iB: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float64Array) return 1;
        return 2;
      },
      iC: (a, i) => a[i],
      iD: x0 => x0.hasFocus(),
      iE: x0 => x0.preventDefault(),
      iF: x0 => x0.hostElement,
      iG: () => typeof dartUseDateNowForTicks !== "undefined",
      iH: x0 => x0.maxHeight,
      iI: x0 => x0.document,
      iJ: x0 => x0.selectedTrack,
      iK: x0 => x0.stopPropagation(),
      iL: x0 => x0.getReader(),
      iM: x0 => x0.firstChild,
      iN: x0 => x0.document,
      iO: x0 => x0.value,
      j: (x0,x1,x2) => x0.call(x1,x2),
      jB: Function.prototype.call.bind(DataView.prototype.setFloat64),
      jC: a => a.length,
      jD: x0 => x0.relatedTarget,
      jE: x0 => x0.parent,
      jF: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      jG: () => Date.now(),
      jH: x0 => x0.maxWidth,
      jI: (a, i) => a.splice(i, 1),
      jJ: x0 => x0.completed,
      jK: x0 => x0.disabled,
      jL: x0 => x0.read(),
      jM: x0 => x0.head,
      jN: x0 => x0.data,
      jO: x0 => x0.done,
      k: (constructor, args) => {
        const factoryFunction = constructor.bind.apply(
            constructor, [null, ...args]);
        return new factoryFunction();
      },
      kB: (t, s) => t.set(s),
      kC: (x0,x1) => x0.test(x1),
      kD: x0 => x0.shiftKey,
      kE: x0 => x0.timeStamp,
      kF: x0 => ({runApp: x0}),
      kG: () => 1000 * performance.now(),
      kH: x0 => x0.minHeight,
      kI: a => a.pop(),
      kJ: x0 => x0.ready,
      kK: (x0,x1) => { x0.min = x1 },
      kL: x0 => x0.value,
      kM: (x0,x1) => { x0.integrity = x1 },
      kN: x0 => x0.origin,
      kO: x0 => x0.read(),
      l: x0 => new Array(x0),
      lB: Function.prototype.call.bind(DataView.prototype.setFloat32),
      lC: x0 => x0.userAgent,
      lD: (decoder, codeUnits) => decoder.decode(codeUnits),
      lE: (x0,x1) => x0.hasAttribute(x1),
      lF: s => {
        if (/[[\]{}()*+?.\\^$|]/.test(s)) {
            s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
        }
        return s;
      },
      lG: (map, o, v) => map.set(o, v),
      lH: x0 => x0.minWidth,
      lI: o => o.byteLength,
      lJ: x0 => x0.tracks,
      lK: (x0,x1) => { x0.max = x1 },
      lL: x0 => x0.done,
      lM: (x0,x1) => { x0.src = x1 },
      lN: (x0,x1) => { x0.src = x1 },
      lO: (x0,x1) => new OffscreenCanvas(x0,x1),
      m: o => [o],
      mB: Function.prototype.call.bind(DataView.prototype.getFloat32),
      mC: x0 => x0.navigator,
      mD: () => new TextDecoder("utf-8", {fatal: true}),
      mE: x0 => x0.buttons,
      mF: (o, offsetInBytes, lengthInBytes) => {
        var dst = new ArrayBuffer(lengthInBytes);
        new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
        return new DataView(dst);
      },
      mG: () => new WeakMap(),
      mH: (x0,x1) => x0.removeProperty(x1),
      mI: () => new FileReader(),
      mJ: () => globalThis.window.ImageDecoder,
      mK: (x0,x1) => { x0.disabled = x1 },
      mL: x0 => x0.cancel(),
      mM: x0 => x0.trustedTypes,
      mN: (x0,x1,x2,x3) => x0.decrypt(x1,x2,x3),
      mO: x0 => x0.assetBase,
      n: (o0, o1) => [o0, o1],
      nB: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float32Array) return 1;
        return 2;
      },
      nC: Function.prototype.call.bind(String.prototype.toLowerCase),
      nD: () => new TextDecoder("utf-8", {fatal: false}),
      nE: x0 => x0.ctrlKey,
      nF: (a, s, e) => a.slice(s, e),
      nG: (map, o) => map.get(o),
      nH: (x0,x1) => x0.add(x1),
      nI: (x0,x1) => x0.readAsArrayBuffer(x1),
      nJ: (x0,x1) => x0.get(x1),
      nK: (x0,x1) => { x0.scrollLeft = x1 },
      nL: x0 => x0.body,
      nM: (x0,x1) => { x0.crossOrigin = x1 },
      nN: x0 => x0.subtle,
      nO: x0 => x0.loader,
      o: (o0, o1, o2) => [o0, o1, o2],
      oB: Function.prototype.call.bind(DataView.prototype.getUint32),
      oC: Object.is,
      oD: (a, i, v) => a[i] = v,
      oE: x0 => x0.y,
      oF: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
      oG: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      oH: x0 => x0.data,
      oI: x0 => x0.result,
      oJ: x0 => x0.body,
      oK: (x0,x1) => { x0.spellcheck = x1 },
      oL: x0 => x0.headers,
      oM: (x0,x1) => x0.transferFromImageBitmap(x1),
      oN: x0 => x0.crypto,
      oO: () => globalThis._flutter,
      p: (o0, o1, o2, o3) => [o0, o1, o2, o3],
      pB: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint32Array) return 1;
        return 2;
      },
      pC: x0 => x0.vendor,
      pD: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI8ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      pE: x0 => x0.x,
      pF: x0 => x0.history,
      pG: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF64ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      pH: (x0,x1) => { x0.scrollTop = x1 },
      pI: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      pJ: x0 => x0.headers,
      pK: (x0,x1) => { x0.disabled = x1 },
      pL: x0 => x0.signal,
      pM: (x0,x1) => x0.getContext(x1),
      pN: x0 => x0.isSecureContext,
      q: (x0,x1,x2) => { x0[x1] = x2 },
      qB: Function.prototype.call.bind(DataView.prototype.getInt32),
      qC: (x0,x1) => x0.createTextNode(x1),
      qD: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI16ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      qE: x0 => x0.scrollTop,
      qF: o => {
        const proto = Object.getPrototypeOf(o);
        return proto === Object.prototype || proto === null;
      },
      qG: Function.prototype.call.bind(DataView.prototype.setBigInt64),
      qH: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      qI: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      qJ: x0 => x0.naturalHeight,
      qK: (a, l) => a.length = l,
      qL: x0 => x0.abort(),
      qM: (x0,x1) => { x0.height = x1 },
      qN: (x0,x1,x2,x3,x4,x5,x6,x7) => x0.unwrapKey(x1,x2,x3,x4,x5,x6,x7),
      r: (o, p) => o[p],
      rB: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int32Array) return 1;
        return 2;
      },
      rC: (x0,x1) => { x0.id = x1 },
      rD: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      rE: x0 => x0.offsetTop,
      rF: o => Object.keys(o),
      rG: Function.prototype.call.bind(DataView.prototype.getBigInt64),
      rH: (x0,x1) => { x0.value = x1 },
      rI: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
      rJ: x0 => x0.naturalWidth,
      rK: () => {
        // On browsers return `globalThis.location.href`
        if (globalThis.location != null) {
          return globalThis.location.href;
        }
        return null;
      },
      rL: x0 => x0.origin,
      rM: (x0,x1) => { x0.width = x1 },
      rN: (x0,x1,x2,x3,x4,x5) => x0.importKey(x1,x2,x3,x4,x5),
      s: () => globalThis,
      sB: o => o instanceof Uint16Array,
      sC: (x0,x1) => { x0.nonce = x1 },
      sD: x0 => x0.visibilityState,
      sE: x0 => x0.scrollLeft,
      sF: x0 => x0.state,
      sG: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
      sH: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      sI: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      sJ: (x0,x1) => x0.createElement(x1),
      sK: x0 => x0.baseURI,
      sL: x0 => x0.location,
      sM: x0 => x0.rasterEndMilliseconds,
      sN: (x0,x1,x2,x3) => x0.generateKey(x1,x2,x3),
      t: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      tB: Function.prototype.call.bind(DataView.prototype.getUint16),
      tC: x0 => x0.nonce,
      tD: (x0,x1,x2) => x0.removeEventListener(x1,x2),
      tE: x0 => x0.offsetLeft,
      tF: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
      tG: (x0,x1) => x0.requestAnimationFrame(x1),
      tH: (x0,x1) => { x0.value = x1 },
      tI: () => new XMLHttpRequest(),
      tJ: (x0,x1) => { x0.pointerEvents = x1 },
      tK: (x0,x1,x2) => x0.open(x1,x2),
      tL: secondsSinceEpoch => {
        const date = new Date(secondsSinceEpoch * 1000);
        const match = /\((.*)\)/.exec(date.toString());
        if (match == null) {
            // This should never happen on any recent browser.
            return '';
        }
        return match[1];
      },
      tM: x0 => x0.rasterStartMilliseconds,
      tN: (x0,x1,x2,x3,x4) => x0.wrapKey(x1,x2,x3,x4),
      u: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      uB: o => o instanceof Int16Array,
      uC: () => globalThis.window.flutterConfiguration,
      uD: x0 => x0.disconnect(),
      uE: x0 => x0.offsetParent,
      uF: (x0,x1) => x0.go(x1),
      uG: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      uH: x0 => x0.value,
      uI: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      uJ: (x0,x1) => { x0.height = x1 },
      uK: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      uL: x0 => x0.devicePixelRatio,
      uM: x0 => x0.imageBitmaps,
      uN: (x0,x1,x2) => x0.exportKey(x1,x2),
      v: (x0,x1) => ({addView: x0,removeView: x1}),
      vB: Function.prototype.call.bind(DataView.prototype.getInt16),
      vC: (x0,x1) => x0.attachShadow(x1),
      vD: x0 => new Intl.Locale(x0),
      vE: (o, p, r) => o.replace(p, () => r),
      vF: x0 => x0.state,
      vG: x0 => x0.now(),
      vH: x0 => x0.selectionDirection,
      vI: x0 => x0.send(),
      vJ: (x0,x1) => { x0.width = x1 },
      vK: (x0,x1) => x0.contains(x1),
      vL: x0 => x0.availWidth,
      vM: x0 => x0.canvasKitMaximumSurfaces,
      vN: x0 => x0.sessionStorage,
      w: (l, r) => l === r,
      wB: o => o instanceof Uint8ClampedArray,
      wC: (x0,x1) => x0.createElement(x1),
      wD: x0 => x0.region,
      wE: (o, p, r) => o.replaceAll(p, () => r),
      wF: x0 => x0.search,
      wG: x0 => x0.performance,
      wH: x0 => x0.selectionStart,
      wI: x0 => x0.type,
      wJ: x0 => x0.style,
      wK: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      wL: x0 => x0.availHeight,
      wM: x0 => x0.nextSibling,
      wN: (x0,x1) => x0.getRandomValues(x1),
      x: x0 => x0.random(),
      xB: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint8Array) return 1;
        return 2;
      },
      xC: x0 => x0.scale,
      xD: x0 => x0.script,
      xE: x0 => x0.deltaMode,
      xF: x0 => x0.location,
      xG: x0 => new Uint8Array(x0),
      xH: x0 => x0.selectionEnd,
      xI: x0 => x0.response,
      xJ: (x0,x1) => { x0.src = x1 },
      xK: (x0,x1) => x0.delete(x1),
      xL: x0 => x0.screen,
      xM: (x0,x1) => x0.debug(x1),
      xN: (x0,x1,x2,x3) => x0.encrypt(x1,x2,x3),
      y: () => globalThis.Math,
      yB: Function.prototype.call.bind(DataView.prototype.setInt32),
      yC: x0 => x0.visualViewport,
      yD: x0 => x0.language,
      yE: x0 => x0.deltaY,
      yF: x0 => x0.pathname,
      yG: (x0,x1,x2) => x0.slice(x1,x2),
      yH: x0 => x0.value,
      yI: (x0,x1) => { x0.responseType = x1 },
      yJ: () => globalThis.document,
      yK: (x0,x1,x2) => x0.put(x1,x2),
      yL: x0 => x0.type,
      yM: x0 => x0.hostElement,
      yN: () => globalThis.removeSplashFromWeb(),
      z: (x0,x1) => x0.prepend(x1),
      zB: Function.prototype.call.bind(DataView.prototype.setUint32),
      zC: x0 => x0.devicePixelRatio,
      zD: x0 => x0.languages,
      zE: x0 => x0.deltaX,
      zF: x0 => x0.hash,
      zG: (x0,x1) => x0.decode(x1),
      zH: x0 => x0.selectionDirection,
      zI: x0 => x0.vendor,
      zJ: x0 => x0.src,
      zK: (x0,x1,x2) => x0.transaction(x1,x2),
      zL: x0 => x0.orientation,
      zM: x0 => x0.location,
      zN: x0 => x0.message,

    };

    const baseImports = {
      _: dart2wasm,
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
