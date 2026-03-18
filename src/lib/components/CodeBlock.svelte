<script>
	import { Copy, Check } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { codeToHtml } from 'shiki';

	let { code, language = 'javascript', filename = '' } = $props();

	let highlightedCode = $state('');
	let copied = $state(false);

	onMount(async () => {
		highlightedCode = await codeToHtml(code, {
			lang: language,
			theme: 'github-dark'
		});
	});

	async function copyCode() {
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

<div class="group border-border bg-subtle relative overflow-hidden rounded-lg border">
	{#if filename}
		<div class="bg-border/30 border-border flex items-center justify-between border-b px-3 py-2">
			<span class="text-muted font-code text-sm">{filename}</span>
			<button
				onclick={copyCode}
				class="text-muted hover:text-text hover:bg-border rounded p-1 transition-colors"
				aria-label="Copy code"
			>
				{#if copied}
					<Check class="h-3.5 w-3.5 text-green-500" />
				{:else}
					<Copy class="h-3.5 w-3.5" />
				{/if}
			</button>
		</div>
	{:else}
		<button
			onclick={copyCode}
			class="text-muted hover:text-text hover:bg-border absolute top-2 right-2 rounded p-1 opacity-0 transition-colors group-hover:opacity-100"
			aria-label="Copy code"
		>
			{#if copied}
				<Check class="h-3.5 w-3.5 text-green-500" />
			{:else}
				<Copy class="h-3.5 w-3.5" />
			{/if}
		</button>
	{/if}

	<div class="font-code overflow-x-auto text-sm sm:text-base max-w-full">
		{#if highlightedCode}
			<div class="min-w-0">
				{@html highlightedCode}
			</div>
		{:else}
			<pre class="bg-subtle p-3 sm:p-4 overflow-x-auto"><code>{code}</code></pre>
		{/if}
	</div>
</div>

<style>
	:global(pre.shiki) {
		margin: 0;
		padding: 0.75rem;
		background-color: transparent !important;
		overflow-x: auto;
		max-width: 100%;
	}
	:global(pre.shiki code) {
		background: transparent !important;
	}
	:global(pre.shiki span) {
		white-space: pre-wrap;
		word-break: break-word;
	}
</style>
