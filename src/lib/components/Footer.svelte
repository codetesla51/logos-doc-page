<script>
	import { Github } from 'lucide-svelte';
	import logo from '$lib/assets/logo.png';
</script>

<footer class="border-t border-white/10 bg-black">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<div class="lg:col-span-2">
				<a href="/" class="flex items-center gap-2">
					<img src={logo} alt="Logos" class="h-6 w-auto" />
				</a>
				<p class="text-white/50 mt-4 max-w-md text-sm leading-relaxed">
					Scripting made sensible. Modern syntax, powerful features, zero setup. Perfect for automation and CLI tools.
				</p>
			</div>

			<div>
				<h4 class="mb-4 text-sm font-semibold text-white">Documentation</h4>
				<ul class="space-y-2">
					<li><a href="/docs" class="text-sm text-white/50 transition-colors hover:text-white">Introduction</a></li>
					<li><a href="/docs/install" class="text-sm text-white/50 transition-colors hover:text-white">Installation</a></li>
					<li><a href="/docs/syntax" class="text-sm text-white/50 transition-colors hover:text-white">Syntax</a></li>
					<li><a href="/docs/llm" class="text-sm text-white/50 transition-colors hover:text-white">LLM Reference</a></li>
				</ul>
			</div>

			<div>
				<h4 class="mb-4 text-sm font-semibold text-white">Resources</h4>
				<ul class="space-y-2">
					<li><a href="/playground" class="text-sm text-white/50 transition-colors hover:text-white">Playground</a></li>
					<li><a href="https://github.com/codetesla51/logos" target="_blank" rel="noopener" class="text-sm text-white/50 transition-colors hover:text-white">GitHub</a></li>
					<li><a href="/docs/examples" class="text-sm text-white/50 transition-colors hover:text-white">Examples</a></li>
				</ul>
			</div>
		</div>

		<div class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
			<p class="text-xs text-white/40">Built with Go · MIT License</p>
			<p class="text-xs text-white/40">v0.4.0</p>
		</div>
	</div>
</footer>
