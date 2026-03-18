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
	<div class="flex h-12 items-center justify-between px-3 sm:h-14 sm:px-4">
		<div class="flex items-center gap-2 sm:gap-3">
			<button
				onclick={onMenuToggle}
				class="rounded p-1.5 text-white/50 transition-colors hover:bg-white/5 hover:text-white sm:rounded-lg sm:p-2 lg:hidden"
				aria-label="Toggle sidebar"
			>
				<Menu class="h-4 w-4 sm:h-5 sm:w-5" />
			</button>

			<a href="/" class="flex items-center gap-1.5 sm:gap-2">
				<img src={logo} alt="Logos" class="h-4 w-auto sm:h-5" />
				<span class="hidden text-white/30 sm:inline">/</span>
				<span class="text-xs font-medium text-white sm:text-sm">Docs</span>
			</a>
			
			<span class="hidden text-white/20 sm:inline">›</span>
			
			<span class="hidden text-xs font-medium text-white sm:text-sm sm:inline">{getCurrentPageName()}</span>
		</div>

		<div class="flex items-center gap-1 sm:gap-2">
			<a
				href="/playground"
				class="hidden rounded border border-white/10 px-2 py-1 text-[10px] font-medium text-white transition-colors hover:border-white/20 sm:inline-flex sm:items-center sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
			>
				Play
			</a>

			<a
				href="/docs/llm"
				class="hidden rounded bg-white px-2 py-1 text-[10px] font-medium text-black transition-colors hover:bg-white/90 sm:px-3 sm:py-1.5 sm:text-xs"
			>
				LLM Ref
			</a>

			<button
				onclick={onSearchOpen}
				class="flex items-center gap-1 rounded border border-white/10 px-1.5 py-1 text-white/50 transition-colors hover:border-white/20 hover:text-white sm:gap-2 sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-sm"
			>
				<Search class="h-3 w-3 sm:h-3.5 sm:w-3.5" />
				<span class="hidden text-[10px] sm:inline sm:text-xs">Search</span>
				<kbd class="hidden rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[9px] sm:inline sm:text-[10px]">⌘K</kbd>
			</button>

			<a
				href="https://github.com/codetesla51/logos"
				target="_blank"
				rel="noopener noreferrer"
				class="rounded p-1 text-white/50 transition-colors hover:bg-white/5 hover:text-white sm:rounded-lg sm:p-2"
				aria-label="GitHub"
			>
				<Github class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
			</a>
		</div>
	</div>
</header>
