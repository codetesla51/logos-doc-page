<script>
	import { Copy, Check } from 'lucide-svelte';

	let copied = $state(false);

    // Use raw GitHub URL (preferred) to fetch installer directly from the repository
    const command = 'curl -fsSL https://raw.githubusercontent.com/codetesla51/logos/main/install.sh | sh';

	async function copyCommand() {
		await navigator.clipboard.writeText(command);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

<div class="border-border bg-subtle overflow-hidden rounded-lg border">
	<div class="bg-border/20 border-border flex items-center justify-between border-b px-2 py-1.5 sm:px-4 sm:py-2.5">
		<div class="flex items-center gap-2">
			<div class="flex gap-1">
				<div class="h-2 w-2 rounded-full bg-red-500/60 sm:h-2.5 sm:w-2.5"></div>
				<div class="h-2 w-2 rounded-full bg-yellow-500/60 sm:h-2.5 sm:w-2.5"></div>
				<div class="h-2 w-2 rounded-full bg-green-500/60 sm:h-2.5 sm:w-2.5"></div>
			</div>
			<span class="text-muted ml-1 text-[10px] sm:ml-2 sm:text-xs">Terminal</span>
		</div>
		<span class="bg-white/5 text-muted rounded px-1 py-0.5 text-[9px] sm:text-[10px]">v0.4.0</span>
	</div>

	<div class="flex items-center justify-between gap-2 p-3 sm:gap-4 sm:p-4">
		<code class="font-code text-text flex items-center gap-1 text-xs sm:text-sm overflow-x-auto">
			<span class="text-muted">$</span>
			<span class="whitespace-nowrap">{command}</span>
		</code>
		<button
			onclick={copyCommand}
			class="text-muted hover:text-text hover:bg-border flex-shrink-0 rounded p-1 transition-colors"
			aria-label="Copy command"
		>
			{#if copied}
				<Check class="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
			{:else}
				<Copy class="h-3 w-3 sm:h-4 sm:w-4" />
			{/if}
		</button>
	</div>

	<div class="px-3 pb-3 sm:px-4 sm:pb-4">
		<p class="text-muted text-[10px] sm:text-xs">Works on Linux and macOS</p>
	</div>
</div>
