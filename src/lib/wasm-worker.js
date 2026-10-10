// Runs inside a Web Worker. Hosts the single Logos WASM runtime so
// long executions never freeze the page. Terminate the worker to stop.
let ready = null;

function ensure() {
  if (!ready) {
    ready = (async () => {
      importScripts("/wasm_exec.js");
      const go = new Go();
      let instance;
      try {
        const streaming = await WebAssembly.instantiateStreaming(
          fetch("/logos.wasm"),
          go.importObject,
        );
        instance = streaming.instance;
      } catch {
        const buf = await fetch("/logos.wasm").then((r) => r.arrayBuffer());
        instance = (await WebAssembly.instantiate(buf, go.importObject))
          .instance;
      }
      go.run(instance);
    })();
  }
  return ready;
}

self.onmessage = async (e) => {
  const { id, kind, source, maxSteps } = e.data;
  try {
    await ensure();
    let result;
    if (kind === "run") result = globalThis.logosRun(source);
    else if (kind === "trace") result = globalThis.logosTrace(source, maxSteps);
    else if (kind === "lex") result = globalThis.logosLex(source);
    else if (kind === "parse") result = globalThis.logosParse(source);
    else if (kind === "format") result = globalThis.logosFormat(source);
    else throw new Error(`unknown kind: ${kind}`);
    self.postMessage({ id, ok: true, result });
  } catch (err) {
    self.postMessage({ id, ok: false, error: String((err && err.message) || err) });
  }
};
