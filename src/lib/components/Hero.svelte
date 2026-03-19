<script>
	import { Github, ArrowRight, Play } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { codeToHtml } from 'shiki';

	let highlightedCode = $state('');

	const heroCode = `use "std/array"

let devs = [
  table{name: "Alice", lang: "Go", years: 2},
  table{name: "Bob",   lang: "Python", years: 1},
  table{name: "Carol", lang: "Go", years: 3},
]

let results = devs
  |> filter(fn(d) -> d.lang == "Go")
  |> map(fn(d) -> "\${d.name} — \${d.years} yrs")

for i, dev in results {
  i++
  print("  \${i}. \${dev}")
}

spawn for dev in devs {
  print(dev.name)
}`;

	onMount(async () => {
		highlightedCode = await codeToHtml(heroCode, {
			lang: 'javascript',
			theme: 'github-dark'
		});
	});
</script>

<section class="relative overflow-hidden">
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]"></div>
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(99,102,241,0.08),transparent)]"></div>
		<div class="absolute bottom-0 left-0 right-0 h-[500px] bg-[linear-gradient(to_top,rgba(9,9,11,1),transparent)]"></div>
	</div>

	<div class="relative mx-auto max-w-5xl px-4 py-20 sm:py-28 lg:px-8">
		<h1
			class="mb-6 text-center text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl animate-slide-up"
			style="animation-delay: 0ms;"
		>
			<span class="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
				Scripts that
			</span>
			<br />
			<span class="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
				read like thoughts.
			</span>
		</h1>

		<p
			class="mx-auto mb-10 max-w-xl text-center text-base text-zinc-400 sm:text-lg animate-slide-up"
			style="animation-delay: 100ms;"
		>
			A lightweight scripting language with string interpolation, pipes, and try expressions. Compile to a single binary.
		</p>

		<div
			class="mb-16 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 animate-slide-up"
			style="animation-delay: 200ms;"
		>
			<a
				href="/docs"
				class="group flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-100 hover:shadow-xl hover:shadow-white/5"
			>
				Get Started
				<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
			</a>
			<a
				href="/playground"
				class="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
			>
				<Play class="h-4 w-4" />
				Try Online
			</a>
			<a
				href="https://github.com/codetesla51/logos"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
			>
				<Github class="h-4 w-4" />
				GitHub
			</a>
		</div>

		<div
			class="mx-auto max-w-xl animate-slide-up"
			style="animation-delay: 300ms;"
		>
			<div class="rounded-xl border border-white/10 bg-zinc-900/80 overflow-hidden backdrop-blur-sm">
				<div class="flex items-center justify-between border-b border-white/5 bg-zinc-900 px-4 py-2.5">
					<div class="flex items-center gap-2">
						<div class="flex gap-1.5">
							<div class="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
							<div class="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
							<div class="h-2.5 w-2.5 rounded-full bg-green-500/80"></div>
						</div>
						<span class="font-mono text-[10px] text-zinc-500">terminal</span>
					</div>
					<span class="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-500">bash</span>
				</div>
				<div class="flex items-center gap-3 px-4 py-3.5">
					<span class="text-zinc-500 font-mono">$</span>
					<code class="flex-1 font-mono text-sm text-emerald-400 break-all">
						curl -fsSL https://raw.githubusercontent.com/codetesla51/logos/main/install.sh | sh
					</code>
				</div>
			</div>
		</div>

		<div
			class="mx-auto mt-12 max-w-2xl animate-slide-up"
			style="animation-delay: 400ms;"
		>
			<div class="rounded-2xl border border-white/10 bg-zinc-900/60 overflow-hidden backdrop-blur-xl shadow-2xl shadow-black/50">
				<div class="flex items-center justify-between border-b border-white/5 bg-zinc-900/90 px-4 py-3">
					<div class="flex items-center gap-3">
						<div class="flex gap-1.5">
							<div class="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-lg shadow-red-500/20"></div>
							<div class="h-2.5 w-2.5 rounded-full bg-yellow-500/80 shadow-lg shadow-yellow-500/20"></div>
							<div class="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-lg shadow-green-500/20"></div>
						</div>
						<span class="font-mono text-xs text-zinc-400">example.lgs</span>
					</div>
					<a
						href="/playground"
						class="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
					>
						<Play class="h-3 w-3" />
						Playground
					</a>
				</div>

				<div class="overflow-x-auto">
					{#if highlightedCode}
						{@html highlightedCode}
					{:else}
						<pre class="p-4 font-mono text-xs text-zinc-300"><code>{heroCode}</code></pre>
					{/if}
				</div>

				<div class="flex items-center gap-3 border-t border-white/5 bg-zinc-900/50 px-4 py-2.5">
					<span class="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
						v0.4.3
					</span>
					<span class="text-[10px] text-zinc-500">
						Pipe operator · For-in · Spawn
					</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	:global(pre.shiki) {
		margin: 0;
		padding: 0.5rem 1.25rem;
		background-color: transparent !important;
		overflow-x: auto;
		line-height: 1.4;
	}
	:global(pre.shiki code) {
		background: transparent !important;
		display: block;
	}
	:global(pre.shiki span) {
		white-space: pre;
		word-break: normal;
	}
</style>
