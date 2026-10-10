<script>
  import { Copy, Check } from "lucide-svelte";
  import { browser } from "$app/environment";

  let { code, language = "javascript", filename = "" } = $props();

  let highlightedCode = $state("");
  let copied = $state(false);

  const langLabels = {
    javascript: "logos",
    go: "go",
    bash: "bash",
    text: "text",
  };

  async function highlight() {
    if (!browser) return;
    try {
      const { codeToHtml } = await import("shiki");
      highlightedCode = await codeToHtml(code, {
        lang: language,
        theme: "github-dark",
      });
    } catch (e) {
      console.error("Shiki error:", e);
    }
  }

  $effect(() => {
    highlight();
  });

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
</script>

<div
  class="group not-prose relative overflow-hidden border border-white/10 bg-[#151515]"
>
  <div
    class="flex items-center justify-between border-b border-white/10 px-4 py-2"
  >
    {#if filename}
      <span class="text-xs text-zinc-500">{filename}</span>
    {:else}
      <span class="text-xs text-zinc-500"
        >{langLabels[language] || language}</span
      >
    {/if}

    <button
      onclick={copyCode}
      class="flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 px-2 text-xs text-zinc-400"
      aria-label="Copy code"
    >
      {#if copied}
        <Check class="h-3.5 w-3.5" />
      {:else}
        <Copy class="h-3.5 w-3.5" />
      {/if}
    </button>
  </div>

  <div class="overflow-x-auto">
    {#if highlightedCode}
      {@html highlightedCode}
    {:else}
      <pre class="p-4 text-[13px] leading-[1.5] text-zinc-300"><code
          >{code}</code
        ></pre>
    {/if}
  </div>
</div>

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
