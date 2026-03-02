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
	<div class="bg-border/20 border-border flex items-center justify-between border-b px-3 py-2 sm:px-4 sm:py-2.5">
		<div class="flex items-center gap-2">
			<div class="flex gap-1.5">
				<div class="h-2.5 w-2.5 rounded-full bg-red-500/60"></div>
				<div class="h-2.5 w-2.5 rounded-full bg-yellow-500/60"></div>
				<div class="h-2.5 w-2.5 rounded-full bg-green-500/60"></div>
			</div>
			<span class="text-muted ml-2 text-xs">Terminal</span>
		</div>
        <span class="bg-white/5 text-muted rounded px-1.5 py-0.5 text-[10px]">v0.0.1</span>
	</div>

	<div class="flex items-center justify-between gap-3 p-4 sm:gap-4 sm:p-5">
		<code class="font-code text-text flex items-center gap-2 text-sm sm:text-base overflow-x-auto">
			<span class="text-muted">$</span>
			<span class="whitespace-nowrap">{command}</span>
		</code>
		<button
			onclick={copyCommand}
			class="text-muted hover:text-text hover:bg-border flex-shrink-0 rounded p-1.5 transition-colors"
			aria-label="Copy command"
		>
			{#if copied}
				<Check class="h-4 w-4 text-green-500" />
			{:else}
				<Copy class="h-4 w-4" />
			{/if}
		</button>
	</div>

	<div class="px-4 pb-4 sm:px-5 sm:pb-5">
		<p class="text-muted text-xs sm:text-sm">Works on Linux and macOS</p>
	</div>
</div>
