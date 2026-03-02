<script>
	import { Github } from 'lucide-svelte';
	import logo from '$lib/assets/logo.png';
</script>

<footer class="border-border bg-bg border-t py-6">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
			<!-- Logo -->
			<a href="/" class="flex items-center">
				<img src={logo} alt="Logos" class="h-6 w-auto" />
			</a>

			<!-- Links -->
			<div class="flex items-center gap-6">
				<a
					href="https://github.com/codetesla51/logos"
					target="_blank"
					rel="noopener noreferrer"
					class="text-muted hover:text-text flex items-center gap-2 text-sm transition-colors"
				>
					<Github class="h-4 w-4" />
					<span>GitHub</span>
				</a>
			</div>
		</div>

		<div class="text-muted mt-4 text-center text-xs">
			<p>Built with Go. Licensed under MIT.</p>
		</div>
	</div>
</footer>
