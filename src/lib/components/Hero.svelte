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
	<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
		<div class="text-center">
			<p class="mb-3 text-xs font-mono text-white/40 sm:mb-4">v0.4.0</p>

			<h1 class="mx-auto max-w-4xl text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
				Scripts that read like thoughts.
			</h1>

			<p class="text-white/60 mx-auto mt-4 max-w-2xl px-2 text-sm leading-relaxed sm:mt-6 sm:px-0 sm:text-base md:text-lg">
				A lightweight scripting language built for clarity. Write expressive scripts with pipes, string interpolation, and clean error handling — then compile them to a single binary.
			</p>

			<div class="mt-6 flex flex-col items-center justify-center gap-2 sm:mt-8 sm:flex-row sm:gap-3">
				<a href="/docs" class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90 sm:w-auto sm:px-6 sm:py-3">
					Get Started
					<ArrowRight class="h-4 w-4" />
				</a>
				<a href="/playground" class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/40 sm:w-auto sm:px-6 sm:py-3">
					<Play class="h-4 w-4" />
					Try Online
				</a>
				<a href="https://github.com/codetesla51/logos" target="_blank" rel="noopener noreferrer" class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/40 sm:w-auto sm:px-6 sm:py-3">
					<Github class="h-4 w-4" />
					GitHub
				</a>
			</div>

			<div class="mt-6 px-2 sm:mt-8 sm:px-0">
				<pre class="inline-flex items-center gap-2 overflow-x-auto rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm"><code class="font-mono text-green-400">curl -fsSL https://raw.githubusercontent.com/codetesla51/logos/main/install.sh | sh</code></pre>
			</div>
		</div>

		<!-- Code preview -->
		<div class="mx-auto mt-8 max-w-2xl px-2 sm:mt-10 sm:px-0">
			<div class="overflow-hidden rounded-lg border border-white/10 bg-[#0d1117]">
				<div class="flex flex-col items-center justify-between gap-2 border-b border-white/10 bg-[#161b22] px-3 py-2 sm:flex-row sm:px-4 sm:py-3">
					<div class="flex items-center gap-2">
						<div class="flex gap-1.5">
							<div class="h-2 w-2 rounded-full bg-red-500/80 sm:h-2.5 sm:w-2.5"></div>
							<div class="h-2 w-2 rounded-full bg-yellow-500/80 sm:h-2.5 sm:w-2.5"></div>
							<div class="h-2 w-2 rounded-full bg-green-500/80 sm:h-2.5 sm:w-2.5"></div>
						</div>
						<span class="font-mono text-[10px] text-white/40 sm:text-xs">example.lgs</span>
					</div>
					<a href="/playground" class="flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-white transition-colors hover:bg-white/10 sm:text-xs">
						<Play class="h-2.5 w-2.5 sm:h-3 sm:w-3" />
						Open
					</a>
				</div>

				<div class="font-mono text-[10px] leading-relaxed sm:text-xs">
					{#if highlightedCode}
						{@html highlightedCode}
					{:else}
						<pre class="p-3 text-white/60 sm:p-4"><code>{heroCode}</code></pre>
					{/if}
				</div>

				<div class="border-t border-white/10 bg-[#161b22] px-3 py-1.5 sm:px-4 sm:py-2">
					<div class="flex flex-wrap items-center gap-1.5 sm:gap-3">
						<span class="rounded bg-green-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-green-400 sm:text-xs">v0.4.0</span>
						<span class="text-[10px] text-white/40 sm:text-xs">HTTP + JSON + try expressions</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	:global(pre.shiki) {
		margin: 0;
		padding: 0.75rem;
		background-color: transparent !important;
	}
	:global(pre.shiki code) {
		background: transparent !important;
	}
</style>
