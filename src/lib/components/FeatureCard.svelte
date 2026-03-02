<script>
	import * as icons from 'lucide-svelte';

	let { icon, title, description } = $props();

	const IconComponent = $derived(icons[icon] || icons.Box);
</script>

<div class="group flex gap-4">
	<div
		class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 transition-colors group-hover:bg-white/10"
	>
		<IconComponent class="text-muted group-hover:text-text h-4 w-4 transition-colors" />
	</div>
	<div>
		<h3 class="text-text text-sm font-medium">{title}</h3>
		<p class="text-muted mt-1 text-sm leading-relaxed">{description}</p>
	</div>
</div>
