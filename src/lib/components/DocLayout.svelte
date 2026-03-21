<script>
	import { onMount } from 'svelte';
	import { ArrowUp } from 'lucide-svelte';
	import DocTopbar from './DocTopbar.svelte';
	import DocSidebar from './DocSidebar.svelte';
	import PrevNext from './PrevNext.svelte';
	import SearchModal from './SearchModal.svelte';

	let { prev = null, next = null, children } = $props();

	let sidebarOpen = $state(false);
	let sidebarCollapsed = $state(false);
	let searchOpen = $state(false);
	let scrollProgress = $state(0);
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
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMount(() => {
		function handleKeydown(e) {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				searchOpen = !searchOpen;
			}
		}

		function handleScroll() {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
			showScrollTop = scrollTop > 400;
		}

		document.addEventListener('keydown', handleKeydown);
		window.addEventListener('scroll', handleScroll, { passive: true });
		
		return () => {
			document.removeEventListener('keydown', handleKeydown);
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<a 
	href="#main-content" 
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-900"
>
	Skip to content
</a>

<div class="min-h-screen bg-zinc-950">
	<div 
		class="fixed top-0 left-0 h-0.5 bg-white/20 z-50 transition-all duration-150"
		style="width: {scrollProgress}%"
	></div>

	<DocTopbar onMenuToggle={toggleSidebar} onSearchOpen={openSearch} />
	<DocSidebar isOpen={sidebarOpen} bind:collapsed={sidebarCollapsed} onClose={closeSidebar} onSearchOpen={openSearch} />
	<SearchModal isOpen={searchOpen} onClose={closeSearch} />

	<main class="lg:transition-all lg:duration-300 {sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'}" id="main-content">
		<div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
			<article class="prose prose-sm sm:prose-base max-w-none prose-invert prose-headings:font-semibold prose-headings:text-white prose-h1:text-3xl prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-2 prose-h3:text-lg prose-p:text-zinc-400 prose-a:text-white prose-a:no-underline hover:prose-a:underline prose-code:text-emerald-400 prose-code:bg-emerald-500/10 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:bg-zinc-900/80 prose-pre:border prose-pre:border-white/5 prose-pre:shadow-xl prose-ul:text-zinc-400 prose-ol:text-zinc-400 prose-li:text-zinc-400 prose-strong:text-white prose-strong:font-medium">
				{@render children()}
			</article>

			<PrevNext {prev} {next} />
		</div>
	</main>

	{#if showScrollTop}
		<button
			onclick={scrollToTop}
			class="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/10 text-white shadow-lg transition-all hover:bg-white/20 hover:scale-110"
			aria-label="Scroll to top"
		>
			<ArrowUp class="h-5 w-5" />
		</button>
	{/if}
</div>
