<script>
	import { Github, ArrowRight, Play, Copy, Check, Terminal } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { codeToHtml } from 'shiki';

	let highlightedCode = $state('');
	let copied = $state(false);

	const installCmd = 'curl -fsSL https://logoslang.dev/install.sh | sh';

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

	async function copyInstall() {
		await navigator.clipboard.writeText(installCmd);
		copied = true;
		setTimeout(() => { copied = false; }, 2000);
	}

	onMount(async () => {
		highlightedCode = await codeToHtml(heroCode, {
			lang: 'javascript',
			theme: 'github-dark'
		});
	});
</script>

<section class="relative min-h-[90vh] flex items-center overflow-hidden">
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(120,119,198,0.2),transparent)]"></div>
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_70%,rgba(99,102,241,0.1),transparent)]"></div>
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_10%_80%,rgba(16,185,129,0.05),transparent)]"></div>
		<div class="noise-texture absolute inset-0 opacity-[0.015]"></div>
	</div>

	<div class="relative mx-auto w-full max-w-6xl px-4 py-20 lg:px-8">
		<div class="grid gap-16 lg:grid-cols-2 lg:items-center">
			<div class="space-y-8">
				<div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60">
					<span class="relative flex h-2 w-2">
						<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
					</span>
					v0.4.5 — New: printn() without newline
				</div>

				<h1 class="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
					<span class="block text-white">Scripting that</span>
					<span class="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
						flows.
					</span>
				</h1>

				<p class="max-w-lg text-lg text-zinc-400 leading-relaxed">
					A lightweight scripting language with pipes, try expressions, and string interpolation. 
					HTTP, JSON, concurrency — all built in. Compile to a single binary.
				</p>

				<div class="flex flex-col gap-4 sm:flex-row sm:items-center">
					<a
						href="/docs"
						class="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-100 hover:shadow-lg hover:shadow-white/10"
					>
						Get Started
						<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</a>
					<a
						href="/playground"
						class="group inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
					>
						<Play class="h-4 w-4" />
						Try in Playground
					</a>
				</div>

				<div class="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900/50 p-3">
					<Terminal class="h-4 w-4 text-zinc-500" />
					<code class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm text-emerald-400">
						{installCmd}
					</code>
					<button
						onclick={copyInstall}
						class="flex shrink-0 items-center gap-1.5 rounded-md bg-white/5 px-3 py-1.5 text-xs text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
					>
						{#if copied}
							<Check class="h-3.5 w-3.5 text-emerald-400" />
						{:else}
							<Copy class="h-3.5 w-3.5" />
						{/if}
						<span class="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
					</button>
				</div>

				<div class="flex items-center gap-6 pt-4">
					<a
						href="https://github.com/codetesla51/logos"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
					>
						<Github class="h-4 w-4" />
						<span>Star on GitHub</span>
					</a>
					<span class="text-zinc-700">|</span>
					<span class="text-sm text-zinc-500">MIT License</span>
				</div>
			</div>

			<div class="relative">
				<div class="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-transparent to-cyan-500/20 blur-xl opacity-50"></div>
				<div class="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/50">
					<div class="flex items-center justify-between border-b border-white/10 bg-zinc-900/80 px-4 py-3">
						<div class="flex items-center gap-3">
							<div class="flex gap-1.5">
								<div class="h-3 w-3 rounded-full bg-red-500/80"></div>
								<div class="h-3 w-3 rounded-full bg-yellow-500/80"></div>
								<div class="h-3 w-3 rounded-full bg-green-500/80"></div>
							</div>
							<span class="font-mono text-xs text-zinc-500">example.lgs</span>
						</div>
						<a
							href="/playground"
							class="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-emerald-400"
						>
							<Play class="h-3 w-3" />
							Run
						</a>
					</div>

					<div class="overflow-x-auto">
						{#if highlightedCode}
							{@html highlightedCode}
						{:else}
							<pre class="p-4 font-mono text-sm text-zinc-300"><code>{heroCode}</code></pre>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.noise-texture {
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
	}
	:global(pre.shiki) {
		margin: 0;
		padding: 1.25rem;
		background-color: transparent !important;
		overflow-x: auto;
		line-height: 1.6;
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
