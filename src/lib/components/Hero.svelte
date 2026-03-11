<script>
	import { Github, ArrowRight, Terminal, Play } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { codeToHtml } from 'shiki';

	let highlightedCode = $state('');

	const heroCode = `let res = httpGet("https://api.example.com/users")

if !res.ok {
    print(colorRed("Error: " + res.error))
    exit(1)
}

let users = parseJson(res.value.body)

for user in users {
    if user["active"] {
        print(colorGreen("✓ " + user["name"]))
        print(prettyJson(user))
    }
}`;

	onMount(async () => {
		highlightedCode = await codeToHtml(heroCode, {
			lang: 'javascript',
			theme: 'github-dark'
		});
	});
</script>

<section class="relative overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent"></div>

	<div class="relative mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-24 lg:px-8 lg:py-32">
		<div class="text-center">
			<!-- Badge -->
			<div class="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-subtle/50 px-3 py-1">
				<Terminal class="h-3.5 w-3.5 text-muted" />
				<span class="text-xs font-medium text-muted">A scripting language for humans</span>
			</div>

			<!-- Main heading -->
			<h1 class="text-text mx-auto max-w-4xl text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
				Bash, but you can actually read it.
			</h1>

			<!-- Subheading -->
			<p class="text-muted mx-auto mt-6 max-w-xl text-base leading-relaxed sm:mt-8 sm:max-w-2xl sm:text-lg sm:leading-relaxed lg:text-xl lg:leading-relaxed">
				Simple syntax. Sane errors. Built-in HTTP, JSON, file I/O, and color output.
				<span class="text-text/70 mt-1 block sm:mt-0 sm:inline">Compiles to a single binary.</span>
			</p>

			<!-- CTA Buttons -->
			<div class="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
				<a href="/docs" class="group bg-text text-bg hover:bg-text/90 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all sm:w-auto sm:px-5 sm:py-2.5">
					Get Started
					<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
				</a>
				<a href="/playground" class="group border-border bg-subtle/50 text-text hover:bg-subtle hover:border-muted/50 inline-flex w-full items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-all sm:w-auto sm:px-5 sm:py-2.5">
					<Play class="h-4 w-4" />
					Try Playground
				</a>
				<a href="https://github.com/codetesla51/logos" target="_blank" rel="noopener noreferrer" class="border-border text-muted hover:text-text hover:border-muted/50 inline-flex w-full items-center justify-center gap-2 rounded-lg border bg-transparent px-6 py-3 text-sm font-medium transition-all sm:w-auto sm:px-5 sm:py-2.5">
					<Github class="h-4 w-4" />
					View on GitHub
				</a>
			</div>

			<!-- Install command -->
			<div class="mx-auto mt-8 w-full max-w-md sm:w-auto sm:max-w-none">
				<pre class="overflow-x-auto rounded-lg border border-border bg-subtle px-4 py-3"><code class="font-code text-xs sm:text-sm text-text">curl -fsSL https://raw.githubusercontent.com/codetesla51/logos/main/install.sh | sh</code></pre>
			</div>
		</div>

		<!-- Code preview -->
		<div class="mx-auto mt-12 max-w-2xl px-2 sm:mt-16 sm:px-0">
			<div class="border-border/50 bg-subtle/50 overflow-hidden rounded-xl border backdrop-blur-sm">
				<!-- Window chrome -->
				<div class="border-border/50 flex items-center justify-between border-b px-4 py-2.5">
					<div class="flex items-center gap-2">
						<div class="flex gap-1.5">
							<div class="h-2.5 w-2.5 rounded-full bg-white/10"></div>
							<div class="h-2.5 w-2.5 rounded-full bg-white/10"></div>
							<div class="h-2.5 w-2.5 rounded-full bg-white/10"></div>
						</div>
						<span class="text-muted/60 ml-2 text-xs">fetch_users.lgs</span>
					</div>
					<a href="/playground" class="text-muted/50 hover:text-muted inline-flex items-center gap-1 text-xs transition-colors">
						<Play class="h-3 w-3" />
						Run in playground
					</a>
				</div>

				<!-- Code -->
				<div class="font-code overflow-x-auto text-sm">
					{#if highlightedCode}
						{@html highlightedCode}
					{:else}
						<pre class="p-4 text-muted"><code>{heroCode}</code></pre>
					{/if}
				</div>

				<!-- Footer bar -->
				<div class="border-border/30 flex items-center gap-3 border-t px-4 py-2">
					<span class="text-muted/40 text-xs">logos v0.2.0</span>
					<span class="text-muted/20 text-xs">·</span>
					<span class="text-muted/40 text-xs">HTTP · JSON · color output · pretty print</span>
				</div>
			</div>
		</div>

		<!-- Quick features -->
		<div class="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 text-xs text-muted sm:mt-16 sm:gap-x-8 sm:gap-y-4 sm:text-sm">
			<div class="flex items-center gap-2">
				<div class="h-1.5 w-1.5 rounded-full bg-white/30"></div>
				<span>Written in Go</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="h-1.5 w-1.5 rounded-full bg-white/30"></div>
				<span>Embeddable</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="h-1.5 w-1.5 rounded-full bg-white/30"></div>
				<span>Built-in concurrency</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="h-1.5 w-1.5 rounded-full bg-white/30"></div>
				<span>MIT licensed</span>
			</div>
		</div>
	</div>
</section>

<style>
	:global(pre.shiki) {
		margin: 0;
		padding: 1rem;
		background-color: transparent !important;
	}
</style>
