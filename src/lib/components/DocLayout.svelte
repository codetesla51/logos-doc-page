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
		<div class="mx-auto max-w-[800px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
			<article
				class="prose-headings:text-text prose-p:text-muted prose-a:text-accent prose-strong:text-text prose-code:text-accent prose-code:bg-subtle prose prose-lg max-w-none prose-invert prose-code:rounded prose-code:px-1.5 prose-code:py-1 prose-code:before:content-[''] prose-code:after:content-['']"
			>
				{@render children()}
			</article>

			<PrevNext {prev} {next} />
		</div>
	</main>
</div>
