<script>
  import { onMount, onDestroy } from "svelte";
  import {
    Play,
    Loader2,
    AlertTriangle,
    RotateCcw,
    Share2,
    Check,
    X,
    Square,
  } from "lucide-svelte";
  import {
    EditorView,
    keymap,
    lineNumbers,
    highlightActiveLine,
    highlightActiveLineGutter,
  } from "@codemirror/view";
  import { EditorState } from "@codemirror/state";
  import {
    StreamLanguage,
    syntaxHighlighting,
    bracketMatching,
    HighlightStyle,
  } from "@codemirror/language";
  import { tags } from "@lezer/highlight";
  import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
  import {
    closeBrackets,
    closeBracketsKeymap,
    autocompletion,
    completionKeymap,
    startCompletion,
    snippetCompletion,
    completeFromList,
  } from "@codemirror/autocomplete";
  import {
    formatLogos,
    runLogos,
    lexLogos,
    parseLogos,
    traceLogos,
    stopRun,
  } from "$lib/wasm.js";
  import { renderStill, stopRender } from "$lib/kyfram.js";
  import TraceSteps from "$lib/components/TraceSteps.svelte";
  import TreeNode from "$lib/components/TreeNode.svelte";

  const defaultCode = `// Logos runs entirely in your browser.
// Pipes, tables, errors — the good parts in a few lines.
use "std/array"

let devs = [
  table{name: "Ama", lang: "Go", years: 2},
  table{name: "Bob", lang: "Python", years: 1},
  table{name: "Zoe", lang: "Go", years: 4}
]

let gophers = devs
  |> filter(fn(d) -> d.lang == "Go")
  |> map(fn(d) -> "\${d.name} - \${d.years}yrs")

print(gophers)

let data = try parseJson(\`{"ok": true}\`)
print("parsed: " + str(data.ok))

spawn {
    print("concurrent, no threads to manage")
}`;

  const graphicsDefault = `// kyfram in your browser — stills only
// scene(seconds, fps), then draw at keyframed times

scene(2, 30)

shape("chev1", "line", table{
    "0": table{x1: 272, y1: 108, x2: 316, y2: 152, width: 11, color: "#f5f5f0"},
})

shape("chev2", "line", table{
    "0": table{x1: 316, y1: 152, x2: 272, y2: 196, width: 11, color: "#f5f5f0"},
})

shape("cursor", "line", table{
    "0": table{x1: 336, y1: 188, x2: 392, y2: 188, width: 11, color: "#f5f5f0"},
})

text("word", table{
    "0": table{content: "logos", x: 320, y: 290, size: 56, color: "#f5f5f0"},
})`;

  const KEYWORDS =
    /^(let|const|fn|return|if|else|for|in|switch|case|default|break|continue|spawn|use|try|table)\b/;
  const BOOLS = /^(true|false|null)\b/;
  const BUILTIN_NAMES = [
    "args", "clear", "colorBlue", "colorBold", "colorCyan", "colorGreen",
    "colorMagenta", "colorRed", "colorWhite", "colorYellow", "confirm",
    "contains", "dateStr", "dateTimeStr", "endsWith", "env", "exit",
    "fileAppend", "fileChmod", "fileCopy", "fileDelete", "fileDeleteAll",
    "fileExists", "fileExt", "fileGlob", "fileMkdir", "fileMove", "fileRead",
    "fileReadDir", "fileRename", "fileRmdir", "fileWrite", "first", "float",
    "format", "has", "httpDelete", "httpGet", "httpPatch", "httpPost",
    "httpPut", "indexOf", "input", "int", "join", "keys", "last", "len",
    "lower", "mathAbs", "mathCeil", "mathFloor", "mathMax", "mathMin",
    "mathPi", "mathPow", "mathRandom", "mathRandomInt", "mathRound",
    "mathSqrt", "merge", "osname", "parseJson", "pop", "prepend",
    "prettyJson", "print", "printn", "prompt", "push", "pwd", "range",
    "reFind", "reFindAll", "reGroups", "reMatch", "repeat", "replace",
    "reReplace", "reSplit", "reverse", "run", "select", "setenv", "shell",
    "sleep", "slice", "sort", "split", "startsWith", "str", "tableDelete",
    "tail", "timeFormat", "timeMs", "timeNow", "timeStr", "toBool",
    "toFloat", "toInt", "toJson", "toStr", "trim", "type", "upper", "values",
  ];
  const KYFRAM_NAMES = [
    "scene", "shape", "text", "group", "audio", "camera",
    "transparent", "text_file", "tts",
  ];
  const OPERATORS =
    /^(\|>|->|==|!=|<=|>=|&&|\|\||\+\+|--|\+=|-=|\*=|\/=|%=|[=<>!+\-*/%|&])/;

  function baseToken(stream, fnRegex) {
    if (stream.match(/^[0-9][0-9_]*(?:\.[0-9]+)?/)) return "number";
    if (stream.match(KEYWORDS)) return "keyword";
    if (stream.match(BOOLS)) return "bool";
    if (stream.match(fnRegex)) return "function";
    if (stream.match(/^[A-Za-z_][A-Za-z0-9_]*/)) return "variableName";
    if (stream.match(OPERATORS)) return "operator";
    stream.next();
    return "punctuation";
  }

  function makeLang(extraBuiltins) {
    const fnRegex = new RegExp(
      `^(${[...BUILTIN_NAMES, ...extraBuiltins].join("|")})\\b`,
    );
    return StreamLanguage.define({
      name: "logos",
      startState: () => ({ inString: null, interp: 0 }),
      token(stream, state) {
        if (state.inString) {
          let escaped = false;
          while (!stream.eol()) {
            const ch = stream.next();
            if (escaped) {
              escaped = false;
              continue;
            }
            if (ch === "\\") {
              escaped = true;
              continue;
            }
            if (ch === "$" && stream.peek() === "{") {
              stream.next();
              state.interp++;
              return "string";
            }
            if (ch === state.inString) {
              state.inString = null;
              break;
            }
          }
          return "string";
        }
        if (state.interp > 0) {
          if (stream.eatSpace()) return null;
          if (stream.match("//")) {
            stream.skipToEnd();
            return "comment";
          }
          if (stream.eat("{")) {
            state.interp++;
            return null;
          }
          if (stream.eat("}")) {
            state.interp--;
            return "string";
          }
          return baseToken(stream, fnRegex);
        }
        if (stream.eatSpace()) return null;
        if (stream.match("//")) {
          stream.skipToEnd();
          return "comment";
        }
        const q = stream.peek();
        if (q === '"' || q === "`") {
          stream.next();
          state.inString = q;
          return "string";
        }
        return baseToken(stream, fnRegex);
      },
    });
  }

  function sharedSnippets() {
    return [
      snippetCompletion("fn ${name}(${params}) {\n\t${}\n}", {
        label: "fn",
        detail: "function",
        type: "snippet",
      }),
      snippetCompletion("for ${item} in ${collection} {\n\t${}\n}", {
        label: "for-in",
        detail: "loop",
        type: "snippet",
      }),
      snippetCompletion("for ${i} in range(${0}, ${10}) {\n\t${}\n}", {
        label: "for-range",
        detail: "loop",
        type: "snippet",
      }),
      snippetCompletion("if ${cond} {\n\t${}\n} else {\n\t\n}", {
        label: "if-else",
        detail: "branch",
        type: "snippet",
      }),
      snippetCompletion("spawn {\n\t${}\n}", {
        label: "spawn",
        detail: "concurrency",
        type: "snippet",
      }),
      snippetCompletion("try ${call}", {
        label: "try",
        detail: "unwrap result",
        type: "snippet",
      }),
      snippetCompletion("table{ ${key}: ${value} }", {
        label: "table",
        detail: "literal",
        type: "snippet",
      }),
      snippetCompletion('use "std/${module}"', {
        label: "use",
        detail: "import",
        type: "snippet",
      }),
    ];
  }

  function makeCompletions(extraFns) {
    return completeFromList([
      ...[
        "let", "const", "fn", "return", "if", "else", "for", "in",
        "switch", "case", "default", "break", "continue", "spawn",
        "use", "try", "table", "true", "false", "null",
      ].map((label) => ({ label, type: "keyword" })),
      ...BUILTIN_NAMES.map((label) => ({ label, type: "function" })),
      ...extraFns.map(([label, detail]) => ({
        label,
        detail,
        type: "function",
      })),
      ...sharedSnippets(),
    ]);
  }

  const logosLang = makeLang([]);
  const kyframLang = makeLang(KYFRAM_NAMES);
  const logosCompletions = makeCompletions([]);
  const kyframCompletions = makeCompletions([
    ["scene", "declare timeline"],
    ["shape", "draw entity"],
    ["text", "draw text"],
    ["group", "transform group"],
    ["audio", "sound track"],
    ["camera", "pan/zoom"],
    ["transparent", "alpha canvas"],
  ]);
  const logosAutocomplete = logosLang.data.of({
    autocomplete: logosCompletions,
  });
  const kyframAutocomplete = kyframLang.data.of({
    autocomplete: kyframCompletions,
  });

  const logosTheme = EditorView.theme(
    {
      "&": {
        height: "100%",
        fontSize: "13px",
        backgroundColor: "#151515",
        color: "#e6edf3",
      },
      "&.cm-focused": {
        outline: "none",
      },
      ".cm-content": {
        fontFamily: "'Geist Mono', ui-monospace, monospace",
        caretColor: "#f5f5f0",
        lineHeight: "1.5",
      },
      ".cm-line": {
        padding: "0 16px",
      },
      ".cm-scroller": {
        fontFamily: "'Geist Mono', ui-monospace, monospace",
        overflow: "auto",
      },
      ".cm-gutters": {
        backgroundColor: "#151515",
        color: "#636c76",
        border: "none",
      },
      ".cm-lineNumbers .cm-gutterElement": {
        padding: "0 4px 0 16px",
        fontSize: "12px",
      },
      ".cm-activeLineGutter": {
        backgroundColor: "transparent",
        color: "#e6edf3",
      },
      ".cm-activeLine": {
        backgroundColor: "rgba(255, 255, 255, 0.04)",
      },
      ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
      },
      ".cm-cursor, .cm-dropCursor": {
        borderLeftColor: "#f5f5f0",
      },
      ".cm-tooltip": {
        backgroundColor: "#151515",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        color: "#e6edf3",
      },
      ".cm-tooltip-autocomplete .cm-completionDetail": {
        color: "#636c76",
        fontStyle: "normal",
      },
      ".cm-tooltip-autocomplete > ul > li[aria-selected]": {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        color: "#f5f5f0",
      },
    },
    { dark: true },
  );

  const logosHighlight = HighlightStyle.define([
    { tag: tags.keyword, color: "#ff7b72" },
    { tag: tags.string, color: "#a5d6ff" },
    { tag: tags.comment, color: "#8b949e" },
    { tag: tags.number, color: "#79c0ff" },
    { tag: tags.bool, color: "#79c0ff" },
    { tag: tags.variableName, color: "#e6edf3" },
    { tag: tags.function, color: "#d2a8ff" },
    { tag: tags.operator, color: "#ff7b72" },
    { tag: tags.punctuation, color: "#e6edf3" },
  ]);

  function decodeCode(hash) {
    try {
      return decodeURIComponent(hash);
    } catch {
      return null;
    }
  }

  function encodeCode(code) {
    return encodeURIComponent(code);
  }

  function loadFromHash() {
    const hash = window.location.hash.slice(1);
    if (!hash) return { mode: "logos", code: null };
    if (hash.startsWith("g:")) {
      return { mode: "graphics", code: decodeCode(hash.slice(2)) };
    }
    return { mode: "logos", code: decodeCode(hash) };
  }

  function groupByLine(tokens) {
    const lines = new Map();
    for (const tok of tokens) {
      const line = tok.line ?? 0;
      if (!lines.has(line)) lines.set(line, []);
      lines.get(line).push(tok);
    }
    return [...lines.entries()];
  }

  let editorContainer = $state(null);
  let editorView = $state(null);
  let mode = $state("logos");
  let savedCode = $state({ logos: null, graphics: null });
  let output = $state("");
  let isRunning = $state(false);
  let isFormatting = $state(false);
  let isTracing = $state(false);
  let hasError = $state(false);
  let tab = $state("output");
  let lexTokens = $state(null);
  let parseTree = $state(null);
  let treeExpanded = $state(false);
  let traceSteps = $state(null);
  let traceTruncated = $state(false);
  let inspectError = $state("");
  let runMs = $state(null);
  let imgSrc = $state("");
  let imgMeta = $state("");
  let shareSuccess = $state(false);
  let copyTimeout = $state(null);
  let cursor = $state({ line: 1, col: 1 });

  const isGraphics = $derived(mode === "graphics");
  const filename = $derived(isGraphics ? "scene.lgv" : "main.lgs");

  const cursorListener = EditorView.updateListener.of((u) => {
    if (u.selectionSet || u.docChanged) {
      const pos = u.state.selection.main.head;
      const line = u.state.doc.lineAt(pos);
      cursor = { line: line.number, col: pos - line.from + 1 };
    }
  });

  function createEditor(doc) {
    if (editorView) editorView.destroy();
    const lang = isGraphics ? kyframLang : logosLang;
    const ac = isGraphics ? kyframAutocomplete : logosAutocomplete;
    const state = EditorState.create({
      doc,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        history(),
        bracketMatching(),
        closeBrackets(),
        lang,
        ac,
        autocompletion({
          activateOnTyping: true,
          closeOnBlur: true,
          maxRenderedOptions: 12,
        }),
        logosTheme,
        syntaxHighlighting(logosHighlight),
        cursorListener,
        keymap.of([
          ...defaultKeymap,
          ...historyKeymap,
          ...closeBracketsKeymap,
          ...completionKeymap,
          { key: "Ctrl-Space", run: startCompletion },
        ]),
        EditorView.lineWrapping,
      ],
    });

    editorView = new EditorView({
      state,
      parent: editorContainer,
    });

    // Ctrl+Enter to run code
    editorView.dom.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }
    });
  }

  function setMode(next) {
    if (next === mode) return;
    if (editorView) savedCode[mode] = editorView.state.doc.toString();
    mode = next;
    output = "";
    hasError = false;
    runMs = null;
    imgSrc = "";
    imgMeta = "";
    tab = "output";
    invalidateInspect();
    createEditor(
      savedCode[next] ?? (next === "graphics" ? graphicsDefault : defaultCode),
    );
  }

  onMount(() => {
    const initial = loadFromHash();
    mode = initial.mode;
    createEditor(
      initial.code ??
        (mode === "graphics" ? graphicsDefault : defaultCode),
    );
  });

  onDestroy(() => {
    if (editorView) {
      editorView.destroy();
    }
  });

  function getCode() {
    if (editorView) {
      return editorView.state.doc.toString();
    }
    return "";
  }

  // Lets the browser paint before a blocking call so loading states appear.
  function nextFrame() {
    return new Promise((resolve) =>
      requestAnimationFrame(() => setTimeout(resolve, 0)),
    );
  }

  async function runCode() {
    if (isRunning) return;
    const source = getCode();
    if (!source.trim()) {
      output = "No code to run.";
      return;
    }

    isRunning = true;
    hasError = false;
    runMs = null;
    output = "";
    imgSrc = "";
    imgMeta = "";
    await nextFrame();

    const started = performance.now();
    try {
      if (isGraphics) {
        const result = await renderStill(source);
        runMs = Math.round(performance.now() - started);
        if (result.ok) {
          imgSrc = `data:image/png;base64,${result.pngBase64}`;
          imgMeta = `final frame · t=${result.t}s · ${result.w}×${result.h}`;
        } else {
          hasError = true;
          output = result.error || "Render failed.";
        }
      } else {
        const result = await runLogos(source);
        runMs = Math.round(performance.now() - started);
        output = result.output || "(No output)";
        if (!result.ok) {
          hasError = true;
          if (result.error) {
            output = result.error + (output ? "\n" + output : "");
          }
        }
      }
    } catch (err) {
      runMs = Math.round(performance.now() - started);
      const stopped =
        err instanceof Error && err.message.startsWith("Stopped");
      hasError = !stopped;
      output = stopped ? err.message + "." : `Error: ${err.message}`;
    } finally {
      isRunning = false;
      invalidateInspect();
      if (tab !== "output") await openTab(tab);
    }
  }

  function stop() {
    if (isGraphics) stopRender("Stopped");
    else stopRun("Stopped");
  }

  function clearOutput() {
    output = "";
    hasError = false;
    runMs = null;
    imgSrc = "";
    imgMeta = "";
  }

  function invalidateInspect() {
    lexTokens = null;
    parseTree = null;
    traceSteps = null;
    traceTruncated = false;
    inspectError = "";
  }

  async function openTab(name) {
    tab = name;
    if (name === "output" || isTracing) return;
    if (name === "steps" && isGraphics) return;
    const source = getCode();
    if (!source.trim()) return;
    isTracing = true;
    inspectError = "";
    await nextFrame();
    try {
      if (name === "lex") {
        const res = await lexLogos(source);
        if (res.ok) lexTokens = res.tokens;
        else inspectError = res.error;
      } else if (name === "tree") {
        const res = await parseLogos(source);
        if (res.ok) parseTree = res.tree;
        else inspectError = res.error;
      } else if (name === "steps") {
        const res = await traceLogos(source, 2000);
        if (res.steps) {
          traceSteps = res.steps;
          traceTruncated = !!res.truncated;
        }
        if (!res.ok && res.error) inspectError = res.error;
      }
    } catch (err) {
      inspectError = err.message;
    } finally {
      isTracing = false;
    }
  }

  async function formatCode() {
    const source = getCode();
    if (!source.trim() || isFormatting) return;
    isFormatting = true;
    await nextFrame();
    try {
      const result = await formatLogos(source);
      if (result.ok) {
        editorView.dispatch({
          changes: {
            from: 0,
            to: editorView.state.doc.length,
            insert: result.output,
          },
        });
        invalidateInspect();
        if (tab !== "output") await openTab(tab);
      } else {
        hasError = true;
        runMs = null;
        output = result.error;
      }
    } catch (err) {
      if (err instanceof Error && err.message.startsWith("Stopped")) {
        hasError = false;
        output = err.message + ".";
      } else {
        hasError = true;
        output = `Formatter failed to load: ${err.message}`;
      }
    } finally {
      isFormatting = false;
    }
  }

  function resetCode() {
    if (editorView) {
      editorView.dispatch({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: isGraphics ? graphicsDefault : defaultCode,
        },
      });
    }
    clearOutput();
    window.location.hash = "";
  }

  async function shareCode() {
    const code = getCode();
    const prefix = isGraphics ? "g:" : "";
    const url = `${window.location.origin}${window.location.pathname}#${prefix}${encodeCode(code)}`;

    try {
      await navigator.clipboard.writeText(url);
      shareSuccess = true;
      if (copyTimeout) clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        shareSuccess = false;
      }, 2000);
    } catch {
      window.prompt("Copy this URL:", url);
    }
  }
</script>

<div class="mb-4 flex items-center gap-1">
  {#each [["logos", "Logos"], ["graphics", "Graphics"]] as [id, label]}
    <button
      onclick={() => setMode(id)}
      class="flex min-h-[44px] items-center px-3 text-sm {mode === id
        ? 'text-zinc-100'
        : 'text-zinc-500'}"
    >
      {label}
    </button>
  {/each}
  <span class="ml-1 hidden text-xs text-zinc-600 sm:inline">
    {#if isGraphics}
      powered by
      <a
        href="https://kyfram-site-68056d.gitlab.io/docs/index.html"
        target="_blank"
        rel="noopener noreferrer"
        class="underline decoration-zinc-700 underline-offset-2"
        >kyfram</a
      >
    {:else}
      runs in your browser
    {/if}
  </span>
</div>

<div class="grid gap-4 xl:grid-cols-2">
  <section class="border border-white/10 bg-[#151515]">
    <div
      class="flex items-center justify-between border-b border-white/10 px-4 py-2"
    >
      <span class="text-xs text-zinc-500">{filename}</span>
      <div class="flex items-center">
        <button
          onclick={shareCode}
          class="flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 px-2 text-xs text-zinc-400"
          title="Share code"
        >
          {#if shareSuccess}
            <Check class="h-3.5 w-3.5" />
          {:else}
            <Share2 class="h-3.5 w-3.5" />
          {/if}
        </button>
        <button
          onclick={resetCode}
          class="flex min-h-[44px] min-w-[44px] items-center justify-center px-2 text-xs text-zinc-400"
          title="Reset code"
        >
          <RotateCcw class="h-3.5 w-3.5" />
        </button>
        <button
          onclick={formatCode}
          disabled={isFormatting || isRunning}
          class="flex min-h-[44px] items-center px-2 text-xs text-zinc-400 disabled:opacity-50"
          title="Format with lgs fmt"
        >
          {#if isFormatting}
            <Loader2 class="h-3.5 w-3.5 animate-spin" />
          {:else}
            Format
          {/if}
        </button>
        <button
          onclick={isRunning ? stop : runCode}
          class="ml-1 inline-flex min-h-[36px] w-[76px] items-center justify-center gap-1.5 rounded-md px-3 text-xs font-medium {isRunning
            ? 'border border-white/15 text-zinc-300'
            : 'bg-[#f5f5f0] text-[#0a0a0a]'}"
        >
          {#if isRunning}
            <Square class="h-3.5 w-3.5" />
            Stop
          {:else}
            <Play class="h-3.5 w-3.5" />
            Run
          {/if}
        </button>
      </div>
    </div>
    <div
      bind:this={editorContainer}
      class="max-h-[60vh] min-h-[320px] overflow-auto"
    ></div>
    <div
      class="flex items-center justify-between border-t border-white/10 px-4 py-2 text-xs text-zinc-500"
    >
      <span>Ln {cursor.line}, Col {cursor.col}</span>
      <span>Ctrl+Enter to run</span>
    </div>
  </section>

  <section class="border border-white/10 bg-[#151515]">
    <div
      class="flex items-center justify-between border-b border-white/10 px-4 py-2"
    >
      {#if isGraphics}
        <span class="flex min-h-[44px] items-center text-xs text-zinc-500">
          Output
          {#if runMs !== null && !isRunning}
            <span class="ml-2 text-zinc-600">· {runMs} ms</span>
          {/if}
        </span>
      {:else}
        <div class="flex items-center gap-1 text-xs">
          {#each [["output", "Output"], ["lex", "Lex"], ["tree", "Tree"], ["steps", "Steps"]] as [id, label]}
            <button
              onclick={() => openTab(id)}
              class="flex min-h-[44px] items-center px-2 {tab === id
                ? 'text-zinc-100'
                : 'text-zinc-500'}"
            >
              {label}
            </button>
          {/each}
          {#if tab === "output" && runMs !== null && !isRunning}
            <span class="text-zinc-600">· {runMs} ms</span>
          {/if}
        </div>
      {/if}
      <div class="flex items-center gap-2">
        {#if tab === "output" && hasError}
          <span class="flex items-center gap-1.5 text-xs text-zinc-400">
            <AlertTriangle class="h-3 w-3" />
            Error
          </span>
        {/if}
        {#if tab === "output"}
          <button
            onclick={clearOutput}
            class="flex min-h-[44px] min-w-[44px] items-center justify-center px-2 text-xs text-zinc-400"
            title="Clear output"
            aria-label="Clear output"
          >
            <X class="h-3.5 w-3.5" />
          </button>
        {/if}
      </div>
    </div>
    {#if tab === "output"}
      {#if isGraphics}
        <div class="min-h-[320px] p-4">
          {#if imgSrc}
            <img
              src={imgSrc}
              alt="Rendered frame"
              class="w-full border border-white/10"
            />
            <p class="mt-2 text-xs text-zinc-500">{imgMeta}</p>
            <p class="mt-1 text-xs text-zinc-600">
              Stills only — video needs ffmpeg, which doesn't run in the
              browser.
            </p>
          {:else}
            <p class="font-mono text-[13px] leading-[1.5] text-zinc-300">
              {output || 'Click "Run" to render the final frame.'}
            </p>
          {/if}
        </div>
      {:else}
        <div class="min-h-[320px] overflow-auto p-4">
          <pre
            class="font-mono text-[13px] leading-[1.5] whitespace-pre-wrap text-zinc-300">{output ||
              'Click "Run" to execute your code.'}</pre>
        </div>
      {/if}
    {:else if isTracing}
      <div class="flex min-h-[320px] items-center justify-center">
        <Loader2 class="h-5 w-5 animate-spin text-zinc-500" />
      </div>
    {:else if inspectError}
      <div class="min-h-[320px] overflow-auto p-4">
        <pre
          class="font-mono text-[13px] leading-[1.5] whitespace-pre-wrap text-zinc-300">{inspectError}</pre>
      </div>
    {:else if tab === "lex" && lexTokens}
      <div class="max-h-[420px] min-h-[320px] overflow-auto p-4 font-mono text-xs">
        {#each groupByLine(lexTokens) as [line, toks]}
          <div class="flex gap-3 border-b border-white/5 py-1.5 last:border-0">
            <span
              class="w-8 shrink-0 pt-1 text-right text-zinc-600 tabular-nums select-none"
              >{line}</span
            >
            <div class="flex min-w-0 flex-1 flex-wrap gap-x-3 gap-y-1">
              {#each toks as tok, i}
                <span
                  class="tok-in"
                  style="animation-delay: {Math.min(i, 60) * 15}ms"
                  title={tok.t}
                >
                  <span class="text-zinc-200">{tok.s === "" ? "∅" : tok.s}</span>
                  <span class="ml-1 text-[10px] text-zinc-600">{tok.t}</span>
                </span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {:else if tab === "tree" && parseTree}
      <div
        class="max-h-[420px] min-h-[320px] overflow-auto p-4 font-mono text-xs"
      >
        <button
          onclick={() => (treeExpanded = !treeExpanded)}
          class="mb-2 flex min-h-[36px] items-center text-xs text-zinc-500"
        >
          {treeExpanded ? "Collapse all" : "Expand all"}
        </button>
        {#key treeExpanded}
          <div class="tree-in">
            <TreeNode value={parseTree} defaultOpen={treeExpanded} />
          </div>
        {/key}
      </div>
    {:else if tab === "steps" && traceSteps}
      <div class="max-h-[480px] min-h-[320px] overflow-auto">
        <TraceSteps steps={traceSteps} truncated={traceTruncated} />
      </div>
    {/if}
  </section>
</div>

<style>
  .tok-in {
    opacity: 0;
    animation: tok-in 0.25s ease-out forwards;
  }
  @keyframes tok-in {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .tree-in {
    animation: tree-in 0.25s ease-out;
  }
  @keyframes tree-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .tok-in {
      opacity: 1;
      animation: none;
    }
    .tree-in {
      animation: none;
    }
  }
</style>
