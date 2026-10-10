<script>
  import { onMount } from "svelte";
  import { ArrowUp } from "lucide-svelte";
  import DocTopbar from "./DocTopbar.svelte";
  import DocSidebar from "./DocSidebar.svelte";
  import PrevNext from "./PrevNext.svelte";
  import SearchModal from "./SearchModal.svelte";
  import { toc } from "$lib/toc.js";

  let { prev = null, next = null, children } = $props();

  let sidebarOpen = $state(false);
  let searchOpen = $state(false);
  let showScrollTop = $state(false);

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }

  function closeSidebar() {
    sidebarOpen = false;
  }

  function openSearch() {
    searchOpen = true;
  }

  function closeSearch() {
    searchOpen = false;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  onMount(() => {
    const article = document.querySelector("#main-content article");
    if (article) {
      toc.set(
        [...article.querySelectorAll("h2[id]")].map((h) => ({
          id: h.id,
          title: (h.firstChild?.textContent || h.textContent).trim(),
        })),
      );
    } else {
      toc.set([]);
    }

    function handleKeydown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchOpen = !searchOpen;
      }
    }

    function handleScroll() {
      showScrollTop = window.scrollY > 400;
    }

    document.addEventListener("keydown", handleKeydown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-900"
>
  Skip to content
</a>

<div class="min-h-screen bg-bg">
  <DocTopbar onMenuToggle={toggleSidebar} onSearchOpen={openSearch} />
  <SearchModal isOpen={searchOpen} onClose={closeSearch} />

  <div class="mx-auto flex max-w-6xl items-start px-4 sm:px-6">
    <DocSidebar
      isOpen={sidebarOpen}
      onClose={closeSidebar}
      onSearchOpen={openSearch}
    />
    <main class="min-w-0 flex-1 lg:pl-64" id="main-content">
      <div class="max-w-3xl py-8 sm:py-12">
        <article
          class="prose prose-sm max-w-none prose-invert sm:prose-base prose-headings:font-medium prose-headings:text-text prose-h1:mb-4 prose-h1:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2 prose-h2:text-2xl prose-h3:text-lg prose-p:text-muted prose-a:text-text prose-a:no-underline hover:prose-a:underline prose-strong:font-medium prose-strong:text-text prose-code:rounded prose-code:bg-text/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-text prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-md prose-pre:border prose-pre:border-white/10 prose-pre:bg-[#151515] prose-ol:text-muted prose-ul:text-muted prose-li:text-muted"
        >
          {@render children()}
        </article>

        <PrevNext {prev} {next} />
      </div>
    </main>
  </div>

  {#if showScrollTop}
    <button
      onclick={scrollToTop}
      class="fixed right-6 bottom-6 z-40 flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface text-muted"
      aria-label="Scroll to top"
    >
      <ArrowUp class="h-5 w-5" />
    </button>
  {/if}
</div>
