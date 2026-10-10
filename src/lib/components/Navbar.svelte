<script>
  import logo from "$lib/assets/logo.png";
  import { Github, Star } from "lucide-svelte";
  import { onMount } from "svelte";

  let stars = $state(0);

  onMount(async () => {
    try {
      const res = await fetch("https://api.github.com/repos/codetesla51/logos");
      const data = await res.json();
      stars = data.stargazers_count || 0;
    } catch {
      stars = 0;
    }
  });
</script>

<div class="px-4 sm:px-6">
  <div class="mx-auto flex h-14 max-w-2xl items-center justify-between">
    <a href="/" class="flex min-h-[44px] items-center" aria-label="Logos home">
      <img src={logo} alt="Logos" class="h-5 w-auto" />
    </a>
    <div class="flex items-center gap-3 text-sm sm:gap-5">
      <a
        href="/docs/intro"
        class="inline-flex min-h-[44px] items-center text-muted">docs</a
      >
      <a
        href="/playground"
        class="inline-flex min-h-[44px] items-center text-muted"
        >playground</a
      >
      <a
        href="https://github.com/codetesla51/logos"
        target="_blank"
        rel="noopener noreferrer"
        class="flex min-h-[44px] items-center gap-1.5 text-text"
        aria-label="Logos on GitHub"
      >
        <Github class="h-4 w-4" />
        {#if stars > 0}
          <span class="flex items-center gap-1 text-xs text-muted">
            <Star class="h-3 w-3" />
            {stars}
          </span>
        {/if}
      </a>
    </div>
  </div>
</div>
