<script>
  import { ChevronRight } from "lucide-svelte";
  import TreeNode from "$lib/components/TreeNode.svelte";

  let { value, defaultOpen = false, depth = 0 } = $props();
  let open = $state(defaultOpen || depth < 2);

  function lineOf(v) {
    const tok = v?.Token;
    if (tok && typeof tok.Line === "number" && tok.Line > 0) return tok.Line;
    return null;
  }

  function summary(v) {
    // One-line human summary for common nodes, shown in the header.
    try {
      switch (v.t) {
        case "LetStatement":
          return `${v.Name?.Value ?? "?"} = …`;
        case "Identifier":
          return v.Value ?? "";
        case "IntegerLiteral":
        case "FloatLiteral":
          return v.Token?.Literal ?? "";
        case "StringLiteral":
          return `"${(v.Value ?? "").slice(0, 24)}"`;
        case "BooleanLiteral":
          return String(v.Value);
        case "InfixExpression":
          return v.Operator ?? "";
        case "CallExpression":
          return `${v.Function?.Value ?? "fn"}(…)`;
        case "Program":
          return `${(v.Statements ?? []).length} statements`;
        default:
          return "";
      }
    } catch {
      return "";
    }
  }
</script>

{#if Array.isArray(value)}
  {#if value.length === 0}
    <span class="text-zinc-600">[]</span>
  {:else}
    <div>
      <button
        onclick={() => (open = !open)}
        class="flex min-h-[32px] items-center gap-1.5 text-zinc-500"
        aria-expanded={open}
      >
        <ChevronRight
          class="h-3 w-3 transition-transform duration-200 {open
            ? 'rotate-90'
            : ''}"
        />
        <span>[{value.length}]</span>
      </button>
      <div class="collapser {open ? 'open' : ''}">
        <div>
          <div class="border-l border-white/10 pl-3">
            {#each value as item}
              <TreeNode value={item} {defaultOpen} depth={depth + 1} />
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
{:else if value !== null && typeof value === "object"}
  {#if value.t === "Token"}
    <div class="py-px text-zinc-600">
      {value.Type} <span class="text-zinc-300">{value.Literal}</span>
    </div>
  {:else}
    {@const line = lineOf(value)}
    {@const sum = summary(value)}
    <div class="py-px">
      <button
        onclick={() => (open = !open)}
        class="flex min-h-[32px] items-center gap-1.5"
        aria-expanded={open}
      >
        <ChevronRight
          class="h-3 w-3 shrink-0 text-zinc-500 transition-transform duration-200 {open
            ? 'rotate-90'
            : ''}"
        />
        <span class="text-zinc-200">{value.t ?? "obj"}</span>
        {#if line !== null}
          <span class="text-[10px] text-zinc-600 tabular-nums">L{line}</span>
        {/if}
        {#if sum}
          <span class="truncate text-[11px] text-zinc-500">{sum}</span>
        {/if}
      </button>
      <div class="collapser {open ? 'open' : ''}">
        <div>
          <div class="border-l border-white/10 pl-3">
            {#each Object.entries(value) as [k, val]}
              {#if k !== "t" && k !== "Token"}
                <div class="flex gap-2">
                  <span class="shrink-0 text-zinc-600">{k}</span>
                  <div class="min-w-0 flex-1">
                    <TreeNode value={val} {defaultOpen} depth={depth + 1} />
                  </div>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
{:else if typeof value === "string"}
  <span class="text-zinc-300">{value === "" ? '""' : value}</span>
{:else}
  <span class="text-zinc-500">{String(value)}</span>
{/if}

<style>
  .collapser {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.25s ease;
  }
  .collapser.open {
    grid-template-rows: 1fr;
  }
  .collapser > div {
    overflow: hidden;
    min-height: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .collapser {
      transition: none;
    }
    .collapser:not(.open) {
      display: none;
    }
  }
</style>
