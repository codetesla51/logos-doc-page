<script>
	import { Copy, Check } from 'lucide-svelte';

	let copied = $state(false);

	const command = 'curl -fsSL https://raw.githubusercontent.com/codetesla51/logos/main/install.sh | sh';

	async function copyCommand() {
		await navigator.clipboard.writeText(command);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

<div class="glass overflow-hidden rounded-2xl">
	<div class="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-3">
		<div class="flex items-center gap-3">
			<div class="flex gap-1.5">
				<div class="h-3 w-3 rounded-full bg-red-500/60"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/60"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/60"></div>
			</div>
			<span class="text-white/30 text-xs font-medium">Terminal</span>
		</div>
		<span class="bg-white/5 border border-white/10 text-white/40 rounded-full px-2.5 py-1 text-[10px] font-mono">v0.4.1</span>
	</div>

	<div class="flex items-center justify-between gap-4 p-4">
		<code class="font-mono text-white/80 flex items-center gap-2 text-sm overflow-x-auto">
			<span class="text-white/30 shrink-0 select-none">$</span>
			<span class="whitespace-nowrap">{command}</span>
		</code>
		<button
			onclick={copyCommand}
			class="flex-shrink-0 rounded-lg p-2 transition-all duration-200 {copied ? 'bg-green-500/20 text-green-400' : 'text-white/40 hover:text-white hover:bg-white/5'}"
			aria-label="Copy command"
		>
			{#if copied}
				<Check class="h-4 w-4" />
			{:else}
				<Copy class="h-4 w-4" />
			{/if}
		</button>
	</div>

	<div class="px-4 pb-4">
		<p class="text-white/30 text-xs">Works on Linux and macOS</p>
	</div>
</div>
