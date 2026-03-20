<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SearchModal from '$lib/components/SearchModal.svelte';

	let { children } = $props();

	const isDocsPage = $derived($page.url.pathname.startsWith('/docs'));
	let searchOpen = $state(false);

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

		function handleOpenSearch() {
			searchOpen = true;
		}

		document.addEventListener('keydown', handleKeydown);
		document.addEventListener('open-search', handleOpenSearch);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
			document.removeEventListener('open-search', handleOpenSearch);
		};
	});
</script>

{#if isDocsPage}
	{@render children()}
{:else}
	<div class="bg-bg flex min-h-screen flex-col">
		<Navbar />
		<main class="flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>
{/if}

<SearchModal isOpen={searchOpen} onClose={closeSearch} />
