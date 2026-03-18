<script>
	import { page } from '$app/stores';
	import { Menu, Github, Search, Sparkles } from 'lucide-svelte';
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
		'/docs/llm': 'LLM Reference'
	};

	function getCurrentPageName() {
		const pathname = $page.url.pathname;
		const normalizedPath =
			pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
		return pageNames[normalizedPath] || 'Docs';
	}
</script>

<header class="bg-bg/80 border-border sticky top-0 z-40 border-b backdrop-blur-md lg:pl-[240px]">
	<div class="flex h-14 items-center justify-between px-4">
		<div class="flex items-center gap-4">
			<button
				onclick={onMenuToggle}
				class="text-muted hover:text-text -ml-2 rounded-lg p-2 transition-colors hover:bg-subtle lg:hidden"
				aria-label="Toggle sidebar"
			>
				<Menu class="h-5 w-5" />
			</button>

			<a href="/" class="flex items-center gap-2">
				<img src={logo} alt="Logos" class="h-6 w-auto" />
				<span class="text-muted text-sm">/</span>
				<span class="text-text text-sm font-medium">Docs</span>
			</a>
			
			<svg class="text-muted/30 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
			
			<span class="text-text text-sm font-medium">{getCurrentPageName()}</span>
		</div>

		<div class="flex items-center gap-2">
			<a
				href="/docs/llm"
				class="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-3 py-1.5 text-xs font-medium text-purple-400 transition-all hover:from-purple-500/20 hover:to-blue-500/20"
			>
				<Sparkles class="h-3 w-3" />
				<span class="hidden sm:inline">LLM Reference</span>
			</a>

			<button
				onclick={onSearchOpen}
				class="border-border text-muted hover:border-muted/50 hover:text-text flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors"
			>
				<Search class="h-3.5 w-3.5" />
				<span class="hidden text-xs sm:inline">Search...</span>
				<kbd class="bg-subtle border-border hidden rounded border px-1.5 py-0.5 text-[10px] md:inline-flex">
					⌘K
				</kbd>
			</button>

			<a
				href="https://github.com/codetesla51/logos"
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted hover:text-text rounded-lg p-2 transition-colors hover:bg-subtle"
				aria-label="GitHub"
			>
				<Github class="h-4 w-4" />
			</a>
		</div>
	</div>
</header>
