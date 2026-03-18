<script>
	import { Github, Heart } from 'lucide-svelte';
	import logo from '$lib/assets/logo.png';
</script>

<footer class="border-border/50 bg-subtle/20 border-t">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<div class="lg:col-span-2">
				<a href="/" class="flex items-center gap-2">
					<img src={logo} alt="Logos" class="h-6 w-auto" />
				</a>
				<p class="text-muted mt-4 max-w-md text-sm leading-relaxed">
					A lightweight scripting language that doesn't hurt your brain. Built for automation with modern features like string interpolation, pipe operators, and try expressions.
				</p>
			</div>

			<div>
				<h4 class="text-text mb-4 text-sm font-semibold">Documentation</h4>
				<ul class="space-y-2">
					<li><a href="/docs" class="text-muted hover:text-text text-sm transition-colors">Introduction</a></li>
					<li><a href="/docs/install" class="text-muted hover:text-text text-sm transition-colors">Installation</a></li>
					<li><a href="/docs/syntax" class="text-muted hover:text-text text-sm transition-colors">Syntax</a></li>
					<li><a href="/docs/llm" class="text-muted hover:text-text text-sm transition-colors">LLM Reference</a></li>
				</ul>
			</div>

			<div>
				<h4 class="text-text mb-4 text-sm font-semibold">Resources</h4>
				<ul class="space-y-2">
					<li><a href="/playground" class="text-muted hover:text-text text-sm transition-colors">Playground</a></li>
					<li><a href="https://github.com/codetesla51/logos" target="_blank" rel="noopener" class="text-muted hover:text-text text-sm transition-colors">GitHub</a></li>
					<li><a href="/docs/examples" class="text-muted hover:text-text text-sm transition-colors">Examples</a></li>
				</ul>
			</div>
		</div>

		<div class="border-border/50 mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
			<p class="text-muted flex items-center gap-1.5 text-xs">
				Built with <Heart class="h-3 w-3 text-red-400" /> and Go
			</p>
			<p class="text-muted text-xs">MIT License · v0.4.0</p>
		</div>
	</div>
</footer>
