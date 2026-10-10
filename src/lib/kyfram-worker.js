// Runs inside a Web Worker. Hosts the kyfram still renderer (WASM)
// so frame renders never freeze the page. Terminate to stop.
let ready = null;

function ensure() {
  if (!ready) {
    ready = (async () => {
      importScripts("/wasm_exec.js");
      const go = new Go();
      let instance;
      try {
        const streaming = await WebAssembly.instantiateStreaming(
          fetch("/kyfram.wasm"),
          go.importObject,
        );
        instance = streaming.instance;
      } catch {
        const buf = await fetch("/kyfram.wasm").then((r) => r.arrayBuffer());
        instance = (await WebAssembly.instantiate(buf, go.importObject))
          .instance;
      }
      go.run(instance);
    })();
  }
  return ready;
}

self.onmessage = async (e) => {
  const { id, kind, source } = e.data;
  try {
    await ensure();
    if (kind !== "render") throw new Error(`unknown kind: ${kind}`);
    self.postMessage({ id, ok: true, result: globalThis.kyframRender(source, -1) });
  } catch (err) {
    self.postMessage({ id, ok: false, error: String((err && err.message) || err) });
  }
};
