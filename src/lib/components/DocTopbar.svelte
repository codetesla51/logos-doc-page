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
		'/docs/embedding': 'Embedding',
		'/docs/building': 'Building Binaries',
		'/docs/examples': 'Examples'
	};

	function getCurrentPageName() {
		const pathname = $page.url.pathname;
		const normalizedPath =
			pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
		return pageNames[normalizedPath] || 'Docs';
	}
</script>

<header class="bg-bg border-border sticky top-0 z-40 border-b lg:pl-[240px]">
	<div class="flex h-14 items-center justify-between px-3 sm:px-4">
		<div class="flex items-center gap-3">
			<!-- Mobile menu button -->
			<button
				onclick={onMenuToggle}
				class="text-muted hover:text-text -ml-1 p-1.5 transition-colors lg:hidden"
				aria-label="Toggle sidebar"
			>
				<Menu class="h-5 w-5" />
			</button>

			<!-- Logo + Breadcrumb -->
			<div class="flex items-center gap-2">
				<a href="/" class="flex items-center">
					<img src={logo} alt="Logos" class="h-5 w-auto sm:h-6" />
				</a>
				<span class="text-muted/50">/</span>
				<span class="text-muted text-xs sm:text-sm">Docs</span>
				<span class="text-muted/50 hidden sm:inline">/</span>
				<span class="text-text hidden text-xs sm:inline sm:text-sm">{getCurrentPageName()}</span>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<!-- Search -->
			<button
				onclick={onSearchOpen}
				class="border-border text-muted hover:border-muted/50 hover:text-text flex items-center gap-2 rounded border px-2 py-1 text-sm transition-colors sm:px-3 sm:py-1.5"
			>
				<Search class="h-3.5 w-3.5" />
				<span class="hidden text-xs sm:inline">Search...</span>
				<kbd
					class="bg-subtle border-border hidden items-center gap-0.5 rounded border px-1 py-0.5 text-[10px] md:inline-flex"
				>
					<span>⌘</span><span>K</span>
				</kbd>
			</button>

			<!-- GitHub -->
			<a
				href="https://github.com/codetesla51/logos"
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted hover:text-text p-1.5 transition-colors"
				aria-label="GitHub"
			>
				<Github class="h-4 w-4" />
			</a>
		</div>
	</div>
</header>
