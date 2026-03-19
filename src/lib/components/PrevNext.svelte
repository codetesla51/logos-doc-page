<script>
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	let { prev = null, next = null } = $props();
</script>

<nav class="mt-16 flex flex-col gap-3 border-t border-white/5 pt-8 sm:flex-row sm:items-stretch sm:justify-between">
	<!-- Previous -->
	<div class="flex-1">
		{#if prev}
			<a
				href={prev.href}
				class="group flex flex-col gap-1 rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-4 transition-all hover:border-white/10 hover:bg-white/[0.04]"
			>
				<span class="flex items-center gap-1.5 text-xs text-zinc-500">
					<ChevronLeft class="h-3 w-3" />
					Previous
				</span>
				<span class="text-sm font-medium text-zinc-300 transition-colors group-hover:text-white">
					{prev.title}
				</span>
			</a>
		{/if}
	</div>

	<!-- Next -->
	<div class="flex-1 sm:text-right">
		{#if next}
			<a
				href={next.href}
				class="group flex flex-col items-end gap-1 rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-4 transition-all hover:border-white/10 hover:bg-white/[0.04] sm:ml-auto sm:max-w-[280px]"
			>
				<span class="flex items-center gap-1.5 text-xs text-zinc-500">
					Next
					<ChevronRight class="h-3 w-3" />
				</span>
				<span class="text-sm font-medium text-zinc-300 transition-colors group-hover:text-white">
					{next.title}
				</span>
			</a>
		{/if}
	</div>
</nav>
