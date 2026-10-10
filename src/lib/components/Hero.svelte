<script>
  import { Copy, Check } from "lucide-svelte";
  import { onMount } from "svelte";
  import { codeToHtml } from "shiki";
  import PipesCanvas from "$lib/components/PipesCanvas.svelte";
  let copied = $state(false);
  let highlightedCode = $state("");

  const installCmd =
    "curl -fsSL https://raw.githubusercontent.com/codetesla51/logos/main/install.sh | sh";

  const heroCode = `use "std/array"

let devs = [
  table{name: "Ama", lang: "Go", years: 2},
  table{name: "Bob", lang: "Python", years: 1},
]

let gophers = devs
  |> filter(fn(d) -> d.lang == "Go")
  |> map(fn(d) -> d.name)

print("gophers: \${gophers}")

spawn {
  let url = "https://api.example.com"
  let res = try httpGet(url)
  print(res.status)
}`;

  const usedFor = [
    {
      name: "logos2d",
      desc: "2D game engine. Games written in Logos, Go runs underneath.",
      href: "https://github.com/codetesla51/logos2d",
    },
    {
      name: "kyfram",
      desc: "Keyframe video renderer. Motion declared in Logos.",
      href: "https://gitlab.com/codetesla51/kyfram",
    },
  ];

  async function copyInstall() {
    await navigator.clipboard.writeText(installCmd);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000);
  }

  onMount(async () => {
    highlightedCode = await codeToHtml(heroCode, {
      lang: "javascript",
      theme: "github-dark",
    });
  });
</script>

<section class="px-4 py-16 sm:px-6 sm:py-24">
  <div class="mx-auto max-w-5xl">
    <div class="grid items-center gap-10 lg:grid-cols-2">
      <div>
        <p class="text-sm text-muted">logos v0.5.0</p>

        <h1
          class="mt-4 text-4xl leading-tight font-medium tracking-tight text-balance sm:text-5xl"
        >
          Scripts that read like thoughts.
        </h1>

        <p class="mt-4 max-w-xl text-base leading-relaxed text-muted">
          A small scripting language for automation and CLIs. Interpolation,
          pipes, and errors you can follow a week later.
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/docs/intro"
            class="inline-flex min-h-[44px] items-center justify-center rounded-md bg-text px-5 py-2.5 text-sm font-medium text-bg"
          >
            Read the docs
          </a>
          <a
            href="/playground"
            class="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border px-5 py-2.5 text-sm text-text"
          >
            Open playground
          </a>
        </div>
      </div>

      <PipesCanvas />
    </div>

    <div class="mt-8">
      <p class="text-sm text-muted">used in</p>
      <div class="mt-3 border-t border-border">
        {#each usedFor as project}
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            class="flex min-h-[44px] flex-col justify-center gap-0.5 border-b border-border py-3 sm:flex-row sm:items-baseline sm:gap-3"
          >
            <span class="shrink-0 text-sm text-text">{project.name}</span>
            <span class="text-sm text-muted">{project.desc}</span>
          </a>
        {/each}
      </div>
    </div>

    <div class="mt-8 border border-border bg-surface">
      <div class="border-b border-border px-4 py-2">
        <span class="text-xs text-muted">example.lgs</span>
      </div>
      <div class="overflow-x-auto">
        {#if highlightedCode}
          {@html highlightedCode}
        {:else}
          <pre class="p-4 text-sm leading-relaxed text-zinc-300"><code
              >{heroCode}</code
            ></pre>
        {/if}
      </div>
    </div>

    <div
      class="mt-4 flex items-center gap-2 border border-border px-3 py-2.5"
    >
      <code class="min-w-0 flex-1 truncate text-xs text-muted"
        >{installCmd}</code
      >
      <button
        onclick={copyInstall}
        aria-label="Copy install command"
        class="flex min-h-[44px] min-w-[44px] items-center justify-center px-2 text-xs text-muted"
      >
        {#if copied}
          <Check class="h-4 w-4" />
        {:else}
          <Copy class="h-4 w-4" />
        {/if}
      </button>
    </div>
  </div>
</section>

<style>
  :global(pre.shiki) {
    margin: 0;
    padding: 12px 16px;
    background-color: transparent;
    overflow-x: auto;
    font-size: 13px;
    line-height: 1.5;
    white-space: pre;
    tab-size: 2;
  }
  :global(pre.shiki code) {
    background: transparent;
    display: block;
  }
</style>
