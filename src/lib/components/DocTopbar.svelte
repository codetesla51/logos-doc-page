<script>
  import { page } from "$app/stores";
  import { Menu, Github, Search } from "lucide-svelte";

  let { onMenuToggle, onSearchOpen } = $props();

  const pageNames = {
    "/docs": "Introduction",
    "/docs/install": "Installation",
    "/docs/syntax": "Syntax & Types",
    "/docs/stdlib": "Standard Library",
    "/docs/builtins": "Builtins",
    "/docs/embedding": "Embedding",
    "/docs/building": "Building Binaries",
    "/docs/examples": "Examples",
    "/docs/llm": "LLM Reference",
    "/playground": "Playground",
  };

  function getCurrentPageName() {
    const pathname = $page.url.pathname;
    const normalizedPath =
      pathname.endsWith("/") && pathname !== "/"
        ? pathname.slice(0, -1)
        : pathname;
    return pageNames[normalizedPath] || "Docs";
  }
</script>

<header class="sticky top-0 z-40 border-b border-border bg-bg">
  <div
    class="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:gap-3 sm:px-6"
  >
    <button
      onclick={onMenuToggle}
      class="flex min-h-[44px] min-w-[44px] items-center justify-center text-muted hover:text-text lg:hidden"
      aria-label="Toggle sidebar"
    >
      <Menu class="h-5 w-5" />
    </button>

    <a
      href="/docs"
      class="flex min-h-[44px] items-center text-sm text-muted hover:text-text"
    >
      docs
    </a>
    <span class="text-faint">/</span>
    <span class="min-w-0 flex-1 truncate text-sm text-text"
      >{getCurrentPageName()}</span
    >

    <button
      onclick={onSearchOpen}
      class="flex min-h-[44px] shrink-0 items-center gap-2 border border-border px-3 text-xs text-muted hover:border-border hover:text-text sm:w-64 sm:justify-start"
      aria-label="Search docs"
    >
      <Search class="h-3.5 w-3.5 shrink-0" />
      <span class="hidden text-muted sm:inline">Search docs</span>
      <kbd
        class="ml-auto hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted lg:inline"
        >⌘K</kbd
      >
    </button>

    <a
      href="https://github.com/codetesla51/logos"
      target="_blank"
      rel="noopener noreferrer"
      class="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center text-muted hover:text-text"
      aria-label="GitHub"
    >
      <Github class="h-4 w-4" />
    </a>
  </div>
</header>
