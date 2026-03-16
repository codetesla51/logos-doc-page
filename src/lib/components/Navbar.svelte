<script>
	import { Menu, X, Github, Star } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import logo from '$lib/assets/logo.png';

	let stars = $state(0);
	let mobileMenuOpen = $state(false);

	onMount(async () => {
		try {
			const res = await fetch('https://api.github.com/repos/codetesla51/logos');
			const data = await res.json();
			stars = data.stargazers_count || 0;
		} catch (e) {
			stars = 0;
		}
	});

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<nav class="bg-bg border-border sticky top-0 z-50 border-b">
	<div class="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
		<div class="flex h-14 items-center justify-between sm:h-16">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2">
				<img src={logo} alt="Logos" class="h-7 w-auto sm:h-8" />
			</a>

			<!-- Desktop Nav -->
			<div class="hidden items-center gap-4 md:flex">
				<a
					href="/playground"
					class="text-muted hover:text-text flex items-center gap-1.5 text-base transition-colors"
				>
					Playground
				</a>
				<a
					href="https://github.com/codetesla51/logos"
					target="_blank"
					rel="noopener noreferrer"
					class="text-muted hover:text-text flex items-center gap-1.5 text-base transition-colors"
				>
					<Star class="h-4 w-4" />
					<span>{stars}</span>
				</a>
				<a
					href="https://github.com/codetesla51/logos"
					target="_blank"
					rel="noopener noreferrer"
					class="border-border text-muted hover:text-text hover:border-muted flex items-center gap-2 rounded-md border px-4 py-2 text-base transition-colors"
				>
					<Github class="h-4 w-4" />
					<span>GitHub</span>
				</a>
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="text-muted hover:text-text p-2 transition-colors md:hidden"
				onclick={toggleMobileMenu}
				aria-label="Toggle menu"
			>
				{#if mobileMenuOpen}
					<X class="h-5 w-5" />
				{:else}
					<Menu class="h-5 w-5" />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="border-border bg-bg border-t md:hidden">
			<div class="space-y-3 px-4 py-4">
				<a
					href="/playground"
					class="text-muted hover:text-text flex items-center gap-2 text-base transition-colors"
				>
					Playground
				</a>
				<a
					href="https://github.com/codetesla51/logos"
					target="_blank"
					rel="noopener noreferrer"
					class="text-muted hover:text-text flex items-center gap-2 text-base transition-colors"
				>
					<Star class="h-4 w-4" />
					<span>{stars} stars</span>
				</a>
				<a
					href="https://github.com/codetesla51/logos"
					target="_blank"
					rel="noopener noreferrer"
					class="text-muted hover:text-text flex items-center gap-2 text-base transition-colors"
				>
					<Github class="h-4 w-4" />
					<span>GitHub</span>
				</a>
			</div>
		</div>
	{/if}
</nav>
