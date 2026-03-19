<script>
	import { Copy, Check } from 'lucide-svelte';
	import { browser } from '$app/environment';

	let { code, language = 'javascript', filename = '' } = $props();

	let highlightedCode = $state('');
	let copied = $state(false);

	const langLabels = {
		javascript: 'logos',
		go: 'go',
		bash: 'bash',
		text: 'text',
	};

	async function highlight() {
		if (!browser) return;
		try {
			const { codeToHtml } = await import('shiki');
			highlightedCode = await codeToHtml(code, {
				lang: language,
				theme: 'github-dark'
			});
		} catch (e) {
			console.error('Shiki error:', e);
		}
	}

	$effect(() => {
		highlight();
	});

	async function copyCode() {
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

<div class="group relative rounded-xl border border-white/5 bg-zinc-900/50 overflow-hidden backdrop-blur-sm transition-all duration-200 hover:border-white/10 hover:bg-zinc-900/70">
	<div class="flex items-center justify-between border-b border-white/5 bg-zinc-900/80 px-4 py-2.5">
		<div class="flex items-center gap-3">
			<div class="flex gap-2">
				<div class="h-3 w-3 rounded-full bg-red-500/80 shadow-lg shadow-red-500/20"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/80 shadow-lg shadow-yellow-500/20"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/80 shadow-lg shadow-green-500/20"></div>
			</div>
			{#if filename}
				<span class="font-mono text-xs text-zinc-400">{filename}</span>
			{:else}
				<span class="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{langLabels[language] || language}</span>
			{/if}
		</div>

		<button
			onclick={copyCode}
			class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-all duration-150 {copied
				? 'bg-green-500/20 text-green-400'
				: 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'}"
			aria-label="Copy code"
		>
			{#if copied}
				<Check class="h-3.5 w-3.5" />
				<span class="hidden sm:inline">Copied!</span>
			{:else}
				<Copy class="h-3.5 w-3.5" />
				<span class="hidden sm:inline">Copy</span>
			{/if}
		</button>
	</div>

	<div class="overflow-x-auto">
		{#if highlightedCode}
			{@html highlightedCode}
		{:else}
			<pre class="p-4"><code class="font-mono text-sm text-zinc-300">{code}</code></pre>
		{/if}
	</div>
</div>

<style>
	:global(pre.shiki) {
		margin: 0;
		padding: 0.5rem 1.25rem;
		background-color: transparent !important;
		overflow-x: auto;
		line-height: 1.35;
		font-size: 0.8125rem;
	}
	:global(pre.shiki code) {
		background: transparent !important;
		display: block;
	}
	:global(pre.shiki span) {
		white-space: pre;
		word-break: normal;
	}
</style>
