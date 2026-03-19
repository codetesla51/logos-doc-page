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

<header class="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl lg:pl-60">
	<div class="flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6">
		<!-- Left side -->
		<div class="flex items-center gap-4">
			<!-- Mobile menu button -->
			<button
				onclick={onMenuToggle}
				class="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
				aria-label="Toggle sidebar"
			>
				<Menu class="h-5 w-5" />
			</button>

			<!-- Breadcrumb -->
			<div class="flex items-center gap-2">
				<a href="/" class="flex items-center gap-2">
					<img src={logo} alt="Logos" class="h-5 w-auto" />
				</a>
				<span class="text-zinc-600">/</span>
				<span class="text-sm font-medium text-white">{getCurrentPageName()}</span>
			</div>
		</div>

		<!-- Right side -->
		<div class="flex items-center gap-2">
			<!-- Search button -->
			<button
				onclick={onSearchOpen}
				class="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 transition-all hover:border-white/10 hover:bg-white/10 hover:text-white sm:px-4"
			>
				<Search class="h-3.5 w-3.5" />
				<span class="hidden sm:inline">Search</span>
				<kbd class="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] sm:inline">⌘K</kbd>
			</button>

			<!-- LLM Ref -->
			<a
				href="/docs/llm"
				class="hidden rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-white/10 sm:inline-flex sm:items-center sm:gap-1.5"
			>
				LLM Ref
			</a>

			<!-- GitHub -->
			<a
				href="https://github.com/codetesla51/logos"
				target="_blank"
				rel="noopener noreferrer"
				class="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
				aria-label="GitHub"
			>
				<Github class="h-4 w-4" />
			</a>
		</div>
	</div>
</header>
