<script>
	import * as icons from 'lucide-svelte';

	let { icon, title, description } = $props();

	const IconComponent = $derived(icons[icon] || icons.Box);
</script>

<div class="rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:border-white/10 hover:bg-white/[0.04]">
	<div class="flex items-start gap-4">
		<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
			<IconComponent class="h-5 w-5 text-white/70" />
		</div>
		<div class="min-w-0 flex-1">
			<h3 class="text-sm font-medium text-white">{title}</h3>
			<p class="mt-1 text-xs text-zinc-500 leading-relaxed">{description}</p>
		</div>
	</div>
</div>
