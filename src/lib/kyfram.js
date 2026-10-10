// Web Worker hosting the kyfram WASM still renderer.
//
// renderStill(source) -> { ok, pngBase64?, w, h, t, error? }
// Renders the FINAL frame (t = timeline duration). Image-only: no
// ffmpeg, audio, local files, or TTS. 30s kill switch like the runner.
let worker = null;
let seq = 0;
const pending = new Map();

function spawn() {
  worker = new Worker(new URL("./kyfram-worker.js", import.meta.url));
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

export function stopRender(reason = "Stopped") {
  if (worker) {
    worker.terminate();
    worker = null;
  }
  const ps = [...pending.values()];
  pending.clear();
  for (const p of ps) p.reject(new Error(reason));
}

export function renderStill(source) {
  if (!worker) spawn();
  return new Promise((resolve, reject) => {
    const id = ++seq;
    const timer = setTimeout(() => {
      if (pending.has(id)) {
        stopRender("Stopped: render exceeded 30s");
      }
    }, 30000);
    pending.set(id, {
      resolve: (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      reject: (e) => {
        clearTimeout(timer);
        reject(e);
      },
    });
    worker.postMessage({ id, kind: "render", source });
  });
}
