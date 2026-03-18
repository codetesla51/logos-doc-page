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

<div class="bg-bg min-h-screen">
	<DocTopbar onMenuToggle={toggleSidebar} onSearchOpen={openSearch} />
	<DocSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
	<SearchModal isOpen={searchOpen} onClose={closeSearch} />

	<main class="lg:pl-[240px]">
		<div class="mx-auto max-w-[800px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
			<article
				class="prose prose-sm sm:prose-lg max-w-none prose-invert prose-headings:text-text prose-p:text-muted prose-a:text-white prose-a:underline-offset-2 hover:prose-a:text-white/80 prose-strong:text-text prose-code:text-white prose-code:bg-subtle prose-pre:bg-subtle prose-pre:rounded-lg"
			>
				{@render children()}
			</article>

			<PrevNext {prev} {next} />
		</div>
	</main>
</div>
