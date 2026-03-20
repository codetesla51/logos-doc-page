<script>
	import { page } from '$app/stores';
	import { ArrowLeft, Home, Search } from 'lucide-svelte';
</script>

<svelte:head>
	<title>{$page.status} - Logos</title>
</svelte:head>

<div class="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
	<div class="text-center max-w-md">
		<div class="mb-8">
			<span class="text-8xl font-bold text-white/10">{$page.status}</span>
		</div>
		
		<h1 class="text-2xl font-semibold text-white mb-3">
			{#if $page.status === 404}
				Page not found
			{:else}
				Something went wrong
			{/if}
		</h1>
		
		<p class="text-zinc-400 mb-8">
			{#if $page.status === 404}
				The page you're looking for doesn't exist. Maybe it was moved or deleted.
			{:else}
				An unexpected error occurred. Please try again later.
			{/if}
		</p>
		
		<div class="flex flex-col sm:flex-row items-center justify-center gap-3">
			<a
				href="/"
				class="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
			>
				<Home class="h-4 w-4" />
				Go Home
			</a>
			<a
				href="/docs"
				class="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
			>
				<ArrowLeft class="h-4 w-4" />
				Browse Docs
			</a>
		</div>
	</div>
</div>
