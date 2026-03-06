<script>
	import PlaygroundEditor from '$lib/components/PlaygroundEditor.svelte';
	import { ArrowLeft, Shield, AlertCircle } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Playground - Logos</title>
	<meta name="description" content="Try Logos in your browser. An interactive sandboxed playground for the Logos scripting language." />
</svelte:head>

<div class="min-h-screen bg-bg flex flex-col">
	<!-- Header -->
	<header class="border-b border-border bg-subtle/30">
		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<a
						href="/"
						class="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
					>
						<ArrowLeft class="h-4 w-4" />
						Back
					</a>
					<div class="h-4 w-px bg-border"></div>
					<h1 class="text-lg font-semibold text-text">Logos Playground</h1>
				</div>
				<a
					href="/docs"
					class="text-sm text-muted hover:text-text transition-colors"
				>
					Docs
				</a>
			</div>
		</div>
	</header>

	<!-- Sandbox Warning -->
	<div class="border-b border-border bg-yellow-500/5">
		<div class="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
			<div class="flex items-start gap-3">
				<Shield class="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
				<div class="flex-1">
					<p class="text-sm text-yellow-500 font-medium">Sandboxed Environment</p>
					<p class="text-xs text-muted mt-0.5">
						This playground runs in a restricted sandbox. Some functions are disabled for security:
						<span class="text-text/70">file I/O, shell execution, network requests to external URLs, and system commands.</span>
					</p>
				</div>
				<AlertCircle class="h-4 w-4 text-yellow-500/50 flex-shrink-0" />
			</div>
		</div>
	</div>

	<!-- Editor Area -->
	<main class="flex-1 p-4 sm:p-6 lg:p-8">
		<div class="mx-auto max-w-7xl h-full" style="min-height: calc(100vh - 200px);">
			<PlaygroundEditor />
		</div>
	</main>
</div>
