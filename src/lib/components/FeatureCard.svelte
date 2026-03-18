<script>
	import * as icons from 'lucide-svelte';

	let { icon, title, description, color = 'blue' } = $props();

	const colorMap = {
		blue: 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20',
		green: 'bg-green-500/10 text-green-400 group-hover:bg-green-500/20',
		yellow: 'bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500/20',
		purple: 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20',
		red: 'bg-red-500/10 text-red-400 group-hover:bg-red-500/20',
		pink: 'bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20'
	};

	const IconComponent = $derived(icons[icon] || icons.Box);
	const colorClass = $derived(colorMap[color] || colorMap.blue);
</script>

<div class="group flex gap-4 rounded-xl border border-border/50 bg-subtle/20 p-4 transition-all hover:border-border hover:bg-subtle/30">
	<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg {colorClass} transition-colors">
		<IconComponent class="h-5 w-5" />
	</div>
	<div>
		<h3 class="text-text text-sm font-semibold">{title}</h3>
		<p class="text-muted mt-1 text-sm leading-relaxed">{description}</p>
	</div>
</div>
