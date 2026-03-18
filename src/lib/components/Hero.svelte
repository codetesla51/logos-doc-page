<script>
	import { Github, ArrowRight, Play, Zap, Shield, Code2, Box } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { codeToHtml } from 'shiki';

	let highlightedCode = $state('');

	const heroCode = `// Fetch and filter active users
let res = try httpGet("https://api.example.com/users")

let users = res.value.body
    |> parseJson
    |> filter(fn(u) -> u.active)

for user in users {
    print("✓ \${user.name}")
}

// String interpolation, pipe, try - just works`;

	onMount(async () => {
		highlightedCode = await codeToHtml(heroCode, {
			lang: 'javascript',
			theme: 'github-dark'
		});
	});
</script>

<section class="relative overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent"></div>
	<div class="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-radial from-purple-500/10 via-transparent to-transparent blur-3xl"></div>

	<div class="relative mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-24 lg:px-8 lg:py-32">
		<div class="text-center">
			<div class="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1">
				<Zap class="h-3.5 w-3.5 text-yellow-500" />
				<span class="text-xs font-medium text-yellow-200">Now with pipe operator and try expressions</span>
			</div>

			<h1 class="text-text mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight">
				Scripting that doesn't hurt your brain.
			</h1>

			<p class="text-muted mx-auto mt-6 max-w-2xl text-lg leading-relaxed lg:text-xl">
				A lightweight language built for automation. String interpolation, pipe operators, and sane error handling — without the boilerplate.
			</p>

			<div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
				<a href="/docs" class="group bg-text text-bg hover:bg-text/90 inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3.5 text-sm font-medium transition-all">
					Get Started
					<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
				</a>
				<a href="/playground" class="group border-border bg-subtle/50 text-text hover:bg-subtle inline-flex items-center justify-center gap-2 rounded-lg border px-8 py-3.5 text-sm font-medium transition-all">
					<Play class="h-4 w-4" />
					Try Playground
				</a>
				<a href="https://github.com/codetesla51/logos" target="_blank" rel="noopener noreferrer" class="border-border text-muted hover:text-text inline-flex items-center justify-center gap-2 rounded-lg border bg-transparent px-8 py-3.5 text-sm font-medium transition-all">
					<Github class="h-4 w-4" />
					GitHub
				</a>
			</div>

			<div class="mx-auto mt-8">
				<pre class="overflow-x-auto rounded-lg border border-border bg-subtle px-5 py-3 shadow-inner"><code class="font-code text-sm text-green-400">curl -fsSL https://raw.githubusercontent.com/codetesla51/logos/main/install.sh | sh</code></pre>
			</div>
		</div>

		<!-- Code preview -->
		<div class="mx-auto mt-16 max-w-2xl px-2 sm:px-0">
			<div class="border-border/50 overflow-hidden rounded-xl border bg-[#0d1117] shadow-2xl shadow-black/30">
				<div class="border-border/50 flex items-center justify-between border-b bg-[#161b22] px-4 py-3">
					<div class="flex items-center gap-3">
						<div class="flex gap-2">
							<div class="h-3 w-3 rounded-full bg-red-500/80"></div>
							<div class="h-3 w-3 rounded-full bg-yellow-500/80"></div>
							<div class="h-3 w-3 rounded-full bg-green-500/80"></div>
						</div>
						<span class="text-muted/60 text-xs">example.lgs</span>
					</div>
					<a href="/playground" class="text-muted/50 hover:text-white inline-flex items-center gap-1.5 text-xs transition-colors">
						<Play class="h-3 w-3" />
						Open in playground
					</a>
				</div>

				<div class="font-code overflow-x-auto text-sm">
					{#if highlightedCode}
						{@html highlightedCode}
					{:else}
						<pre class="p-4 text-muted"><code>{heroCode}</code></pre>
					{/if}
				</div>

				<div class="border-border/30 flex items-center gap-3 border-t bg-[#161b22] px-4 py-2">
					<span class="text-muted/40 rounded-full bg-[#238636] px-2 py-0.5 text-[10px] font-medium text-white">v0.4.0</span>
					<span class="text-muted/30 text-xs">·</span>
					<span class="text-muted/40 text-xs">string interpolation · pipe operator · try expressions</span>
				</div>
			</div>
		</div>

		<!-- Feature grid -->
		<div class="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
			<div class="group rounded-xl border border-border/50 bg-subtle/20 p-6 transition-all hover:border-blue-500/30 hover:bg-subtle/30">
				<Code2 class="mb-3 h-7 w-7 text-blue-400 transition-transform group-hover:scale-110" />
				<p class="text-sm font-semibold text-text">Readable syntax</p>
				<p class="mt-1 text-xs text-muted">Code you can actually understand</p>
			</div>
			<div class="group rounded-xl border border-border/50 bg-subtle/20 p-6 transition-all hover:border-green-500/30 hover:bg-subtle/30">
				<Shield class="mb-3 h-7 w-7 text-green-400 transition-transform group-hover:scale-110" />
				<p class="text-sm font-semibold text-text">Try expressions</p>
				<p class="mt-1 text-xs text-muted">Error handling without the boilerplate</p>
			</div>
			<div class="group rounded-xl border border-border/50 bg-subtle/20 p-6 transition-all hover:border-yellow-500/30 hover:bg-subtle/30">
				<Zap class="mb-3 h-7 w-7 text-yellow-400 transition-transform group-hover:scale-110" />
				<p class="text-sm font-semibold text-text">Pipe operator</p>
				<p class="mt-1 text-xs text-muted">Chain functions elegantly</p>
			</div>
			<div class="group rounded-xl border border-border/50 bg-subtle/20 p-6 transition-all hover:border-purple-500/30 hover:bg-subtle/30">
				<Box class="mb-3 h-7 w-7 text-purple-400 transition-transform group-hover:scale-110" />
				<p class="text-sm font-semibold text-text">Compiles to binary</p>
				<p class="mt-1 text-xs text-muted">Single portable executable</p>
			</div>
		</div>
	</div>
</section>

<style>
	:global(pre.shiki) {
		margin: 0;
		padding: 1.25rem;
		background-color: transparent !important;
	}
	:global(pre.shiki code) {
		background: transparent !important;
	}
</style>
