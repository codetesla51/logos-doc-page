<script>
	import { onMount } from 'svelte';
	import DocTopbar from './DocTopbar.svelte';
	import DocSidebar from './DocSidebar.svelte';
	import PrevNext from './PrevNext.svelte';
	import SearchModal from './SearchModal.svelte';

	let { prev = null, next = null, children } = $props();

	let sidebarOpen = $state(false);
	let searchOpen = $state(false);

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

	onMount(() => {
		function handleKeydown(e) {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				searchOpen = !searchOpen;
			}
		}

		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});
</script>

<div class="min-h-screen bg-zinc-950">
	<DocTopbar onMenuToggle={toggleSidebar} onSearchOpen={openSearch} />
	<DocSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
	<SearchModal isOpen={searchOpen} onClose={closeSearch} />

	<main class="lg:pl-60">
		<div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
			<article class="prose prose-sm sm:prose-base max-w-none prose-invert prose-headings:font-semibold prose-headings:text-white prose-h1:text-3xl prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-2 prose-h3:text-lg prose-p:text-zinc-400 prose-a:text-white prose-a:no-underline hover:prose-a:underline prose-code:text-emerald-400 prose-code:bg-emerald-500/10 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:bg-zinc-900/80 prose-pre:border prose-pre:border-white/5 prose-pre:shadow-xl prose-ul:text-zinc-400 prose-ol:text-zinc-400 prose-li:text-zinc-400 prose-strong:text-white prose-strong:font-medium">
				{@render children()}
			</article>

			<PrevNext {prev} {next} />
		</div>
	</main>
</div>
