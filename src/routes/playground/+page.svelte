<script>
  import PlaygroundEditor from "$lib/components/PlaygroundEditor.svelte";
  import { Shield, Github } from "lucide-svelte";
  import logo from "$lib/assets/logo.png";
</script>

<svelte:head>
  <title>Playground - Logos</title>
  <meta
    name="description"
    content="Try Logos in your browser. An interactive sandboxed playground for the Logos scripting language."
  />
</svelte:head>

<div class="flex min-h-screen flex-col">
  <header class="border-b border-border">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-14 items-center justify-between">
        <a href="/" class="flex min-h-[44px] items-center" aria-label="Logos home">
          <img src={logo} alt="Logos" class="h-5 w-auto" />
        </a>
        <div class="flex items-center gap-1 sm:gap-2">
          <a
            href="/docs"
            class="flex min-h-[44px] items-center px-2 text-sm text-muted"
          >
            Docs
          </a>
          <a
            href="https://github.com/codetesla51/logos"
            target="_blank"
            rel="noopener noreferrer"
            class="flex min-h-[44px] min-w-[44px] items-center justify-center text-muted"
            aria-label="GitHub"
          >
            <Github class="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </header>

  <div class="border-b border-border">
    <div class="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <div class="flex items-center gap-2.5">
        <Shield class="h-4 w-4 flex-shrink-0 text-muted" />
        <p class="text-xs text-muted">
          Runs in your browser — file I/O, shell, and exit are disabled.
        </p>
      </div>
    </div>
  </div>

  <main class="flex-1 p-4 sm:p-6 lg:p-8">
    <div
      class="mx-auto h-full max-w-7xl"
      style="min-height: calc(100vh - 180px);"
    >
      <PlaygroundEditor />
    </div>
  </main>
</div>
