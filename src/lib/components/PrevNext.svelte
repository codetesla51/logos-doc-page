<script>
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	let { prev = null, next = null } = $props();
</script>

<nav class="border-border mt-12 border-t pt-6 sm:mt-16 sm:pt-8">
	<div class="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between sm:gap-4">
		<!-- Previous -->
		<div class="flex-1">
			{#if prev}
				<a
					href={prev.href}
					class="group border-border hover:border-muted/50 flex flex-col items-start rounded-lg border p-3 sm:p-4 transition-colors"
				>
					<span class="text-muted mb-1 flex items-center gap-1 text-[10px] sm:text-xs tracking-wider uppercase">
						<ChevronLeft class="h-3 w-3" />
						Previous
					</span>
					<span class="text-muted group-hover:text-text text-sm transition-colors">
						{prev.title}
					</span>
				</a>
			{/if}
		</div>

		<!-- Next -->
		<div class="flex-1">
			{#if next}
				<a
					href={next.href}
					class="group border-border hover:border-muted/50 flex flex-col items-end rounded-lg border p-3 sm:p-4 text-right transition-colors"
				>
					<span class="text-muted mb-1 flex items-center gap-1 text-[10px] sm:text-xs tracking-wider uppercase">
						Next
						<ChevronRight class="h-3 w-3" />
					</span>
					<span class="text-muted group-hover:text-text text-sm transition-colors">
						{next.title}
					</span>
				</a>
			{/if}
		</div>
	</div>
</nav>
