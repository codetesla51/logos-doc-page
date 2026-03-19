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

<nav class="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-3">
				<img src={logo} alt="Logos" class="h-8 w-auto" />
			</a>

			<!-- Desktop Nav -->
			<div class="hidden items-center gap-1 md:flex">
				<a
					href="/docs"
					class="rounded-lg px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
				>
					Docs
				</a>
				<a
					href="/docs/changelog"
					class="rounded-lg px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
				>
					Changelog
				</a>
				<a
					href="/playground"
					class="rounded-lg px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
				>
					Playground
				</a>
				<a
					href="https://github.com/codetesla51/logos"
					target="_blank"
					rel="noopener noreferrer"
					class="ml-2 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-all hover:bg-white/10"
				>
					<Github class="h-4 w-4" />
					GitHub
					{#if stars > 0}
						<span class="rounded-full bg-white/10 px-1.5 py-0.5 text-xs">{stars}</span>
					{/if}
				</a>
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white md:hidden"
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
		<div class="border-t border-white/5 bg-zinc-950/95 backdrop-blur-xl md:hidden">
			<div class="mx-auto max-w-7xl px-4 py-4 space-y-1">
				<a
					href="/docs"
					onclick={toggleMobileMenu}
					class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
				>
					Docs
				</a>
				<a
					href="/docs/changelog"
					onclick={toggleMobileMenu}
					class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
				>
					Changelog
				</a>
				<a
					href="/playground"
					onclick={toggleMobileMenu}
					class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
				>
					Playground
				</a>
				<a
					href="https://github.com/codetesla51/logos"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
				>
					<Github class="h-4 w-4" />
					GitHub
					{#if stars > 0}
						<span class="rounded-full bg-white/10 px-1.5 py-0.5 text-xs">{stars}</span>
					{/if}
				</a>
			</div>
		</div>
	{/if}
</nav>
