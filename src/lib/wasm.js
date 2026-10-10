// Single Web Worker hosting the Logos WASM runtime.
//
// formatLogos / lexLogos / parseLogos / traceLogos / runLogos all RPC
// into it. Heavy calls (run, trace) execute off the page thread, so a
// runaway loop freezes nothing and can be killed:
//
//	stopRun()            terminate immediately (Stop button)
//	run timeout (30s)    auto-terminate, reports "exceeded 30s"
//
// Terminating drops the shared module cache; the next call respawns
// a clean worker automatically.
let worker = null;
let seq = 0;
const pending = new Map();

function spawn() {
  worker = new Worker(new URL("./wasm-worker.js", import.meta.url));
  worker.onmessage = (e) => {
    const { id, ok, result, error } = e.data;
    const p = pending.get(id);
    if (!p) return;
    pending.delete(id);
    if (ok) p.resolve(result);
    else p.reject(new Error(error || "worker error"));
  };
  worker.onerror = () => {
    const ps = [...pending.values()];
    pending.clear();
    for (const p of ps) p.reject(new Error("worker crashed"));
    worker = null;
  };
}

export function stopRun(reason = "Stopped") {
  if (worker) {
    worker.terminate();
    worker = null;
  }
  const ps = [...pending.values()];
  pending.clear();
  for (const p of ps) p.reject(new Error(reason));
}

function call(kind, payload, timeoutMs = 0) {
  if (!worker) spawn();
  return new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    let timer = null;
    if (timeoutMs > 0) {
      timer = setTimeout(() => {
        if (pending.has(id)) {
          stopRun("Stopped: run exceeded 30s");
        }
      }, timeoutMs);
    }
    const origResolve = resolve;
    pending.set(id, {
      resolve: (v) => {
        if (timer) clearTimeout(timer);
        origResolve(v);
      },
      reject: (e) => {
        if (timer) clearTimeout(timer);
        reject(e);
      },
    });
    worker.postMessage({ id, kind, ...payload });
  });
}

export function formatLogos(source) {
  return call("format", { source });
}

export function lexLogos(source) {
  return call("lex", { source });
}

export function parseLogos(source) {
  return call("parse", { source });
}

export function traceLogos(source, maxSteps = 2000) {
  return call("trace", { source, maxSteps }, 30000);
}

export function runLogos(source) {
  return call("run", { source }, 30000);
}
