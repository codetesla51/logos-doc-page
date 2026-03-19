<script>
	import PlaygroundEditor from '$lib/components/PlaygroundEditor.svelte';
	import { ArrowLeft, Shield, ExternalLink } from 'lucide-svelte';
	import logo from '$lib/assets/logo.png';
</script>

<svelte:head>
	<title>Playground - Logos</title>
	<meta name="description" content="Try Logos in your browser. An interactive sandboxed playground for the Logos scripting language." />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<header class="border-b border-white/5 bg-black/50">
		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-5">
					<a
						href="/"
						class="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
					>
						<ArrowLeft class="h-4 w-4" />
						<span>Back</span>
					</a>
					<div class="h-4 w-px bg-white/10"></div>
					<div class="flex items-center gap-2.5">
						<img src={logo} alt="Logos" class="h-6 w-auto" />
						<span class="text-white/30 text-sm">/</span>
						<span class="text-sm font-medium">Playground</span>
					</div>
				</div>
				<div class="flex items-center gap-4">
					<a
						href="/docs"
						class="text-sm text-white/40 transition-colors hover:text-white/70"
					>
						Docs
					</a>
					<a
						href="https://github.com/codetesla51/logos"
						target="_blank"
						rel="noopener noreferrer"
						class="text-white/40 transition-colors hover:text-white/70"
					>
						<ExternalLink class="h-4 w-4" />
					</a>
				</div>
			</div>
		</div>
	</header>

	<div class="border-b border-white/5 bg-yellow-500/5">
		<div class="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
			<div class="flex items-center gap-2.5">
				<Shield class="h-4 w-4 text-yellow-500/80 flex-shrink-0" />
				<p class="text-xs text-yellow-500/70">
					Sandboxed — file I/O, shell, and network requests are disabled.
				</p>
			</div>
		</div>
	</div>

	<main class="flex-1 p-4 sm:p-6 lg:p-8">
		<div class="mx-auto max-w-7xl h-full" style="min-height: calc(100vh - 180px);">
			<PlaygroundEditor />
		</div>
	</main>
</div>
