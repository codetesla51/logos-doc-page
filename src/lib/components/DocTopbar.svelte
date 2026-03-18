<script>
	import { page } from '$app/stores';
	import { Menu, Github, Search } from 'lucide-svelte';
	import logo from '$lib/assets/logo.png';

	let { onMenuToggle, onSearchOpen } = $props();

	const pageNames = {
		'/docs': 'Introduction',
		'/docs/install': 'Installation',
		'/docs/syntax': 'Syntax & Types',
		'/docs/stdlib': 'Standard Library',
		'/docs/builtins': 'Builtins',
		'/docs/embedding': 'Embedding',
		'/docs/building': 'Building Binaries',
		'/docs/examples': 'Examples',
		'/docs/llm': 'LLM Reference',
		'/playground': 'Playground'
	};

	function getCurrentPageName() {
		const pathname = $page.url.pathname;
		const normalizedPath =
			pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
		return pageNames[normalizedPath] || 'Docs';
	}
</script>

<header class="bg-black border-b border-white/10 sticky top-0 z-40 lg:pl-[240px]">
	<div class="flex h-14 items-center justify-between px-4">
		<div class="flex items-center gap-3">
			<button
				onclick={onMenuToggle}
				class="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
				aria-label="Toggle sidebar"
			>
				<Menu class="h-5 w-5" />
			</button>

			<a href="/" class="flex items-center gap-2">
				<img src={logo} alt="Logos" class="h-5 w-auto" />
				<span class="text-white/30">/</span>
				<span class="text-sm font-medium text-white">Docs</span>
			</a>
			
			<span class="text-white/20">›</span>
			
			<span class="text-sm font-medium text-white">{getCurrentPageName()}</span>
		</div>

		<div class="flex items-center gap-2">
			<a
				href="/playground"
				class="hidden rounded border border-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-white/20 sm:inline-flex sm:items-center sm:gap-1.5"
			>
				Play
			</a>

			<a
				href="/docs/llm"
				class="rounded bg-white px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-white/90"
			>
				LLM Reference
			</a>

			<button
				onclick={onSearchOpen}
				class="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/50 transition-colors hover:border-white/20 hover:text-white"
			>
				<Search class="h-3.5 w-3.5" />
				<span class="hidden text-xs sm:inline">Search</span>
				<kbd class="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
			</button>

			<a
				href="https://github.com/codetesla51/logos"
				target="_blank"
				rel="noopener noreferrer"
				class="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
				aria-label="GitHub"
			>
				<Github class="h-4 w-4" />
			</a>
		</div>
	</div>
</header>
