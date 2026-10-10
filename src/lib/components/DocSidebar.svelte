<script>
  import { page } from "$app/stores";
  import { X, Search, ExternalLink } from "lucide-svelte";
  import logo from "$lib/assets/logo.png";
  import { toc } from "$lib/toc.js";

  let { isOpen = false, onClose, onSearchOpen } = $props();

  const navSections = [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs" },
        { title: "Installation", href: "/docs/install" },
      ],
    },
    {
      title: "Language",
      items: [
        { title: "Syntax & Types", href: "/docs/syntax" },
        { title: "Standard Library", href: "/docs/stdlib" },
        { title: "Builtins", href: "/docs/builtins" },
      ],
    },
    {
      title: "Advanced",
      items: [
        { title: "Embedding", href: "/docs/embedding" },
        { title: "Building Binaries", href: "/docs/building" },
        { title: "Examples", href: "/docs/examples" },
      ],
    },
    {
      title: "Resources",
      items: [
        { title: "LLM Reference", href: "/docs/llm" },
        { title: "Changelog", href: "/docs/changelog" },
        { title: "Playground", href: "/playground", external: true },
      ],
    },
  ];

  function isActive(href) {
    const pathname = $page.url.pathname;
    if (href === "/docs") {
      return pathname === "/docs" || pathname === "/docs/";
    }
    return pathname.startsWith(href);
  }

  function linkClass(href) {
    return isActive(href)
      ? "bg-text/10 text-text"
      : "text-muted hover:bg-text/5 hover:text-text";
  }
</script>

<!-- Desktop Sidebar -->
<aside
  class="fixed top-14 left-[max(1.5rem,calc(50%-36rem))] z-30 hidden h-[calc(100vh-3.5rem)] w-56 border-r border-border bg-bg lg:block"
>
  <nav class="h-full overflow-y-auto p-4">
    <a
      href="/"
      class="mb-6 flex min-h-[44px] items-center px-2"
      aria-label="Logos home"
    >
      <img src={logo} alt="Logos" class="h-6 w-auto" />
    </a>

    {#each navSections as section}
      <div class="mb-6">
        <h3
          class="mb-2 px-2 text-[11px] font-medium tracking-wider text-muted uppercase"
        >
          {section.title}
        </h3>
        <ul class="space-y-0.5">
          {#each section.items as item}
            <li>
              <a
                href={item.href}
                class="flex min-h-[44px] items-center gap-2 rounded-md px-3 text-sm transition-colors {linkClass(
                  item.href,
                )}"
              >
                {item.title}
                {#if item.external}
                  <ExternalLink class="h-3.5 w-3.5 text-faint" />
                {/if}
              </a>
              {#if isActive(item.href) && $toc.length > 0}
                <ul
                  class="mt-0.5 mb-1 ml-3 space-y-0.5 border-l border-border pl-3"
                >
                  {#each $toc as sub}
                    <li>
                      <a
                        href="#{sub.id}"
                        class="flex min-h-[36px] items-center text-[13px] text-muted"
                      >
                        {sub.title}
                      </a>
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </nav>
</aside>

<!-- Mobile Sidebar Overlay -->
{#if isOpen}
  <div
    class="fixed inset-0 z-50 bg-black/80 lg:hidden"
    onclick={onClose}
    onkeydown={(e) => e.key === "Escape" && onClose()}
    role="button"
    tabindex="0"
    aria-label="Close sidebar"
  ></div>

  <aside
    class="fixed top-0 left-0 z-50 h-full w-[85vw] max-w-[320px] border-r border-border bg-bg lg:hidden"
  >
    <div class="flex h-full flex-col">
      <div
        class="flex items-center justify-between border-b border-border px-4 py-3"
      >
        <a
          href="/"
          class="flex min-h-[44px] items-center"
          onclick={onClose}
          aria-label="Logos home"
        >
          <img src={logo} alt="Logos" class="h-6 w-auto" />
        </a>
        <button
          onclick={onClose}
          class="flex min-h-[44px] min-w-[44px] items-center justify-center text-muted"
          aria-label="Close menu"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <div class="border-b border-border p-4">
        <button
          onclick={() => {
            onClose();
            onSearchOpen?.();
          }}
          class="flex min-h-[44px] w-full items-center gap-2 border border-border px-3 text-sm text-muted"
        >
          <Search class="h-4 w-4" />
          <span>Search docs</span>
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto p-4">
        {#each navSections as section}
          <div class="mb-6">
            <h3
              class="mb-2 px-2 text-[11px] font-medium tracking-wider text-muted uppercase"
            >
              {section.title}
            </h3>
            <ul class="space-y-0.5">
              {#each section.items as item}
                <li>
                  <a
                    href={item.href}
                    onclick={onClose}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    class="flex min-h-[44px] items-center gap-2 rounded-md px-3 text-sm transition-colors {linkClass(
                      item.href,
                    )}"
                  >
                    <span class="flex-1">{item.title}</span>
                    {#if item.external}
                      <ExternalLink class="h-3.5 w-3.5 text-faint" />
                    {/if}
                  </a>
                  {#if isActive(item.href) && $toc.length > 0}
                    <ul
                      class="mt-0.5 mb-1 ml-3 space-y-0.5 border-l border-border pl-3"
                    >
                      {#each $toc as sub}
                        <li>
                          <a
                            href="#{sub.id}"
                            onclick={onClose}
                            class="flex min-h-[36px] items-center text-[13px] text-muted"
                          >
                            {sub.title}
                          </a>
                        </li>
                      {/each}
                    </ul>
                  {/if}
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </nav>
    </div>
  </aside>
{/if}
