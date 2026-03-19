<script>
	import { Github, ArrowRight, Play, Copy, Check } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { codeToHtml } from 'shiki';

	let highlightedCode = $state('');
	let copied = $state(false);

	const installCmd = 'curl -fsSL https://raw.githubusercontent.com/codetesla51/logos/main/install.sh | sh';

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

<section class="relative overflow-hidden">
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]"></div>
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(99,102,241,0.08),transparent)]"></div>
		<div class="absolute bottom-0 left-0 right-0 h-[500px] bg-[linear-gradient(to_top,rgba(9,9,11,1),transparent)]"></div>
	</div>

	<div class="relative mx-auto max-w-5xl px-4 py-16 sm:py-24 lg:px-8">
		<h1
			class="mb-6 text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl animate-slide-up"
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
			class="mx-auto mb-6 max-w-lg text-center text-sm text-zinc-400 sm:text-base animate-slide-up"
			style="animation-delay: 100ms;"
		>
			String interpolation, pipes, try expressions. Compile to a single binary.
		</p>

		<div
			class="mx-auto mb-8 max-w-md animate-slide-up"
			style="animation-delay: 150ms;"
		>
			<div class="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900/80 p-2">
				<code class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-2 py-1 font-mono text-xs text-emerald-400">
					{installCmd}
				</code>
				<button
					onclick={copyInstall}
					class="flex shrink-0 items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1.5 text-xs text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
				>
					{#if copied}
						<Check class="h-3 w-3 text-green-400" />
						<span class="hidden sm:inline">Copied</span>
					{:else}
						<Copy class="h-3 w-3" />
						<span class="hidden sm:inline">Copy</span>
					{/if}
				</button>
			</div>
		</div>

		<div
			class="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-3 animate-slide-up"
			style="animation-delay: 200ms;"
		>
			<a
				href="/docs"
				class="group flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-100"
			>
				Documentation
				<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
			</a>
			<a
				href="/playground"
				class="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white transition-all hover:bg-white/10"
			>
				<Play class="h-4 w-4" />
				Playground
			</a>
			<a
				href="https://github.com/codetesla51/logos"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white transition-all hover:bg-white/10"
			>
				<Github class="h-4 w-4" />
				GitHub
			</a>
		</div>

		<div
			class="mx-auto max-w-2xl animate-slide-up"
			style="animation-delay: 300ms;"
		>
			<div class="overflow-hidden rounded-lg border border-white/10 bg-zinc-900 shadow-2xl shadow-black/50">
				<div class="flex items-center justify-between border-b border-white/10 bg-zinc-900/80 px-4 py-2">
					<div class="flex items-center gap-2">
						<div class="flex gap-1.5">
							<div class="h-2.5 w-2.5 rounded-full bg-red-500/60"></div>
							<div class="h-2.5 w-2.5 rounded-full bg-yellow-500/60"></div>
							<div class="h-2.5 w-2.5 rounded-full bg-green-500/60"></div>
						</div>
						<span class="font-mono text-xs text-zinc-500">example.lgs</span>
					</div>
					<a
						href="/playground"
						class="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-white"
					>
						<Play class="h-3 w-3" />
						Open in Playground
					</a>
				</div>

				<div class="overflow-x-auto">
					{#if highlightedCode}
						{@html highlightedCode}
					{:else}
						<pre class="p-4 font-mono text-xs text-zinc-300"><code>{heroCode}</code></pre>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	:global(pre.shiki) {
		margin: 0;
		padding: 1rem 1.25rem;
		background-color: transparent !important;
		overflow-x: auto;
		line-height: 1.5;
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
