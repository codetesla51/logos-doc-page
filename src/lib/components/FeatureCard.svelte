<script>
	import * as icons from 'lucide-svelte';

	let { icon, title, description } = $props();

	const IconComponent = $derived(icons[icon] || icons.Box);
</script>

<div class="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-5 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-black/20">
	<!-- Subtle glow on hover -->
	<div class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)]"></div>

	<div class="relative flex items-start gap-4">
		<!-- Icon -->
		<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg">
			<IconComponent class="h-5 w-5 text-white/80" />
		</div>

		<!-- Content -->
		<div class="min-w-0 flex-1 pt-1">
			<h3 class="mb-1.5 text-sm font-semibold text-white">{title}</h3>
			<p class="text-xs leading-relaxed text-zinc-500">{description}</p>
		</div>
	</div>
</div>
