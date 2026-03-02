<script>
	import { page } from '$app/stores';
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	const isDocsPage = $derived($page.url.pathname.startsWith('/docs'));
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
