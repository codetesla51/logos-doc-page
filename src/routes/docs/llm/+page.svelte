<script>
  import DocLayout from "$lib/components/DocLayout.svelte";
  import { Copy, Check, Download } from "lucide-svelte";
  import { onMount } from "svelte";

  let skill = $state("");
  let copied = $state(false);

  onMount(async () => {
    try {
      const res = await fetch("/SKILL.md");
      skill = await res.text();
    } catch {
      skill = "";
    }
  });

  async function copySkill() {
    if (!skill) return;
    await navigator.clipboard.writeText(skill);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000);
  }

  function downloadSkill() {
    if (!skill) return;
    const blob = new Blob([skill], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SKILL.md";
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<svelte:head>
  <title>LLM Reference - Logos Documentation</title>
  <meta
    name="description"
    content="Copy the Logos skill file for AI code generation."
  />
  <link rel="canonical" href="https://logos-lang.vercel.app/docs/llm" />
</svelte:head>

<DocLayout prev={{ title: "Examples", href: "/docs/examples" }} next={null}>
  <h1>LLM Reference</h1>

  <p>
    One skill file with everything an AI needs to write Logos. Copy it into your
    prompt, or download it into your project's skills directory.
  </p>

  <div class="not-prose mt-8 flex flex-col gap-3 sm:flex-row">
    <button
      onclick={copySkill}
      disabled={!skill}
      class="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-text px-5 py-2.5 text-sm font-medium text-bg disabled:opacity-50"
    >
      {#if copied}
        <Check class="h-4 w-4" />
        Copied
      {:else}
        <Copy class="h-4 w-4" />
        Copy skill
      {/if}
    </button>
    <button
      onclick={downloadSkill}
      disabled={!skill}
      class="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm text-text disabled:opacity-50"
    >
      <Download class="h-4 w-4" />
      Download SKILL.md
    </button>
  </div>

  <p class="mt-8 text-sm">
    Prefer plain text? The full <a href="/llms.txt">llms.txt</a> reference is still
    available.
  </p>
</DocLayout>
