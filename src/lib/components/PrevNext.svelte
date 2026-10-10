<script>
  import { ChevronLeft, ChevronRight } from "lucide-svelte";

  let { prev = null, next = null } = $props();
</script>

<nav
  class="mt-16 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:justify-between"
>
  <div class="flex-1">
    {#if prev}
      <a
        href={prev.href}
        class="flex flex-col gap-1 border border-border p-4"
      >
        <span class="flex items-center gap-1.5 text-xs text-muted">
          <ChevronLeft class="h-3 w-3" />
          Previous
        </span>
        <span class="text-sm text-text">
          {prev.title}
        </span>
      </a>
    {/if}
  </div>

  <div class="flex-1 sm:text-right">
    {#if next}
      <a
        href={next.href}
        class="flex flex-col gap-1 border border-border p-4 sm:ml-auto sm:max-w-[280px]"
      >
        <span
          class="flex items-center gap-1.5 text-xs text-muted sm:justify-end"
        >
          Next
          <ChevronRight class="h-3 w-3" />
        </span>
        <span class="text-sm text-text">
          {next.title}
        </span>
      </a>
    {/if}
  </div>
</nav>
