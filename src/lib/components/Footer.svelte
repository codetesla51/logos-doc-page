<script>
	import { Github } from 'lucide-svelte';
	import logo from '$lib/assets/logo.png';
</script>

<footer class="border-t border-white/5 bg-black/50">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
			<div class="lg:col-span-2">
				<a href="/" class="inline-flex items-center gap-2.5">
					<img src={logo} alt="Logos" class="h-7 w-auto" />
					<span class="text-sm font-medium text-white/80">v0.4.5</span>
				</a>
				<p class="text-white/40 mt-5 max-w-md text-sm leading-relaxed">
					Scripting made sensible. Modern syntax, powerful features, zero setup. Perfect for automation and CLI tools.
				</p>
				<a
					href="https://github.com/codetesla51/logos"
					target="_blank"
					rel="noopener noreferrer"
					class="mt-6 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
				>
					<Github class="h-4 w-4" />
					View on GitHub
				</a>
			</div>

			<div>
				<h4 class="mb-5 text-xs font-semibold uppercase tracking-wider text-white/60">Documentation</h4>
				<ul class="space-y-3">
					<li><a href="/docs" class="text-sm text-white/40 transition-colors hover:text-white">Introduction</a></li>
					<li><a href="/docs/install" class="text-sm text-white/40 transition-colors hover:text-white">Installation</a></li>
					<li><a href="/docs/syntax" class="text-sm text-white/40 transition-colors hover:text-white">Syntax</a></li>
					<li><a href="/docs/stdlib" class="text-sm text-white/40 transition-colors hover:text-white">Standard Library</a></li>
					<li><a href="/docs/llm" class="text-sm text-white/40 transition-colors hover:text-white">LLM Reference</a></li>
				</ul>
			</div>

			<div>
				<h4 class="mb-5 text-xs font-semibold uppercase tracking-wider text-white/60">Resources</h4>
				<ul class="space-y-3">
					<li><a href="/playground" class="text-sm text-white/40 transition-colors hover:text-white">Playground</a></li>
					<li><a href="/docs/examples" class="text-sm text-white/40 transition-colors hover:text-white">Examples</a></li>
					<li><a href="/docs/embedding" class="text-sm text-white/40 transition-colors hover:text-white">Go Embedding</a></li>
					<li><a href="/docs/building" class="text-sm text-white/40 transition-colors hover:text-white">Building Binaries</a></li>
				</ul>
			</div>
		</div>

		<div class="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
			<p class="text-xs text-white/30">Built with Go · MIT License</p>
			<div class="flex items-center gap-4">
				<span class="h-1 w-1 rounded-full bg-white/20"></span>
				<span class="text-xs text-white/30">Made for developers who value clarity</span>
			</div>
		</div>
	</div>
</footer>
