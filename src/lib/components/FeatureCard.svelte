<script>
	import * as icons from 'lucide-svelte';

	let { icon, title, description } = $props();

	const IconComponent = $derived(icons[icon] || icons.Box);
</script>

<div class="flex gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04] sm:rounded-xl sm:p-4">
	<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black sm:h-10 sm:w-10">
		<IconComponent class="h-4 w-4 sm:h-5 sm:w-5" />
	</div>
	<div>
		<h3 class="text-xs font-semibold text-white sm:text-sm">{title}</h3>
		<p class="mt-0.5 text-[10px] leading-relaxed text-white/60 sm:mt-1 sm:text-sm">{description}</p>
	</div>
</div>
