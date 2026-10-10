<script>
  import { Copy, Check } from "lucide-svelte";

  let copied = $state(false);

  const command =
    "curl -fsSL https://raw.githubusercontent.com/codetesla51/logos/main/install.sh | sh";

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000);
  }
</script>

<div class="not-prose">
  <div class="flex items-center gap-2 border border-border px-3 py-2.5">
    <span class="shrink-0 text-xs text-muted select-none">$</span>
    <code
      class="min-w-0 flex-1 overflow-x-auto text-xs whitespace-nowrap text-text"
      >{command}</code
    >
    <button
      onclick={copyCommand}
      class="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center text-muted"
      aria-label="Copy command"
    >
      {#if copied}
        <Check class="h-4 w-4" />
      {:else}
        <Copy class="h-4 w-4" />
      {/if}
    </button>
  </div>
  <p class="mt-2 text-xs text-muted">Works on Linux and macOS</p>
</div>
