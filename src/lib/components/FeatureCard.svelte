<script>
	import * as icons from 'lucide-svelte';

	let { icon, title, description } = $props();

	const IconComponent = $derived(icons[icon] || icons.Box);
</script>

<div class="flex gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]">
	<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-black">
		<IconComponent class="h-5 w-5" />
	</div>
	<div>
		<h3 class="text-sm font-semibold text-white">{title}</h3>
		<p class="mt-1 text-sm leading-relaxed text-white/60">{description}</p>
	</div>
</div>
