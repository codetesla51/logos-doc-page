<script>
	import { Github, ArrowRight, Play } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { codeToHtml } from 'shiki';

	let highlightedCode = $state('');

	const heroCode = `// Fetch and filter with pipe operator
let res = try httpGet("https://api.example.com/users")

let users = res.value.body
    |> parseJson
    |> filter(fn(u) -> u.active)

for user in users {
    print("\${user.name} is \${user.role}")
}

// Clean, readable, powerful`;

	onMount(async () => {
		highlightedCode = await codeToHtml(heroCode, {
			lang: 'javascript',
			theme: 'github-dark'
		});
	});
</script>

<section class="bg-black text-white">
	<div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
		<div class="text-center">
			<p class="mb-4 text-sm font-mono text-white/40 sm:mb-6">v0.4.0</p>

			<h1 class="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
				Scripts that read like thoughts.
			</h1>

			<p class="text-white/60 mx-auto mt-6 max-w-3xl px-2 text-base leading-relaxed sm:mt-8 sm:px-0 sm:text-lg md:text-xl lg:text-2xl">
				A lightweight scripting language built for clarity. Write expressive scripts with pipes, string interpolation, and clean error handling — then compile them to a single binary.
			</p>

			<div class="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4">
				<a href="/docs" class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 sm:w-auto sm:px-8 sm:py-4 sm:text-base">
					Get Started
					<ArrowRight class="h-4 w-4 sm:h-5 sm:w-5" />
				</a>
				<a href="/playground" class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/40 sm:w-auto sm:px-8 sm:py-4 sm:text-base">
					<Play class="h-4 w-4 sm:h-5 sm:w-5" />
					Try Online
				</a>
				<a href="https://github.com/codetesla51/logos" target="_blank" rel="noopener noreferrer" class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/40 sm:w-auto sm:px-8 sm:py-4 sm:text-base">
					<Github class="h-4 w-4 sm:h-5 sm:w-5" />
					GitHub
				</a>
			</div>

			<div class="mt-8 px-2 sm:mt-10 sm:px-0">
				<pre class="inline-flex items-center gap-2 overflow-x-auto rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-xs sm:text-sm"><code class="font-mono text-green-400">curl -fsSL https://raw.githubusercontent.com/codetesla51/logos/main/install.sh | sh</code></pre>
			</div>
		</div>

		<!-- Code preview -->
		<div class="mx-auto mt-12 max-w-2xl px-2 sm:mt-16 sm:px-0">
			<div class="overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">
				<div class="flex flex-col items-center justify-between gap-2 border-b border-white/10 bg-[#161b22] px-4 py-3 sm:flex-row sm:px-5 sm:py-4">
					<div class="flex items-center gap-3">
						<div class="flex gap-2">
							<div class="h-2.5 w-2.5 rounded-full bg-red-500/80 sm:h-3 sm:w-3"></div>
							<div class="h-2.5 w-2.5 rounded-full bg-yellow-500/80 sm:h-3 sm:w-3"></div>
							<div class="h-2.5 w-2.5 rounded-full bg-green-500/80 sm:h-3 sm:w-3"></div>
						</div>
						<span class="font-mono text-xs text-white/40 sm:text-sm">example.lgs</span>
					</div>
					<a href="/playground" class="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10 sm:text-sm">
						<Play class="h-3 w-3 sm:h-4 sm:w-4" />
						Open
					</a>
				</div>

				<div class="font-mono text-xs sm:text-sm">
					{#if highlightedCode}
						{@html highlightedCode}
					{:else}
						<pre class="p-4 text-white/60 sm:p-6"><code>{heroCode}</code></pre>
					{/if}
				</div>

				<div class="border-t border-white/10 bg-[#161b22] px-4 py-2 sm:px-5 sm:py-3">
					<div class="flex flex-wrap items-center gap-2 sm:gap-4">
						<span class="rounded bg-green-500/20 px-2 py-1 text-xs font-semibold text-green-400 sm:text-sm">v0.4.0</span>
						<span class="text-xs text-white/40 sm:text-sm">HTTP + JSON + try expressions</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	:global(pre.shiki) {
		margin: 0;
		padding: 1.5rem;
		background-color: transparent !important;
	}
	:global(pre.shiki code) {
		background: transparent !important;
	}
</style>
