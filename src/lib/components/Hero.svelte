<script>
	import { Github, ArrowRight, Play, Copy, Check, Terminal } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { codeToHtml } from 'shiki';

	let highlightedCode = $state('');
	let copied = $state(false);

	const installCmd = 'curl -fsSL https://logoslang.dev/install.sh | sh';

	const heroCode = `// String interpolation
let name = "World"
print("Hello, \${name}!")

// Table operations
let user = table{ name: "Alice", score: 95 }
print(user.name)

// Built-in HTTP (sandboxed in playground)
let data = try httpGet("https://api.example.com")
print(data.status)

spawn {
    print("Running concurrently")
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

<section class="py-20 sm:py-28">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
			<div class="space-y-6">
				<div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60">
					<span class="relative flex h-2 w-2">
						<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
					</span>
					v0.4.5 — New: printn() without newline
				</div>

				<h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
					Scripting that flows.
				</h1>

				<p class="max-w-lg text-base text-zinc-400">
					A lightweight scripting language with pipes, try expressions, and string interpolation. 
					HTTP, JSON, concurrency — all built in. Compile to a single binary.
				</p>

				<div class="flex flex-col gap-3 sm:flex-row sm:items-center">
					<a
						href="/docs"
						class="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
					>
						Get Started
						<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</a>
					<a
						href="/playground"
						class="group inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
					>
						<Play class="h-4 w-4" />
						Try in Playground
					</a>
				</div>

				<div class="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900/80 p-3">
					<Terminal class="h-4 w-4 text-zinc-500" />
					<code class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm text-emerald-400">
						{installCmd}
					</code>
					<button
						onclick={copyInstall}
						class="flex shrink-0 items-center gap-1.5 rounded-md bg-white/5 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
					>
						{#if copied}
							<Check class="h-3.5 w-3.5 text-emerald-400" />
							<span class="hidden sm:inline">Copied</span>
						{:else}
							<Copy class="h-3.5 w-3.5" />
							<span class="hidden sm:inline">Copy</span>
						{/if}
					</button>
				</div>

				<div class="flex items-center gap-6 pt-2">
					<a
						href="https://github.com/codetesla51/logos"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
					>
						<Github class="h-4 w-4" />
						<span>Star on GitHub</span>
					</a>
					<span class="text-zinc-700">·</span>
					<span class="text-sm text-zinc-500">MIT License</span>
				</div>
			</div>

			<div class="overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
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
						class="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-white"
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
</section>

<style>
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
