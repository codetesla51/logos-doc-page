<script>
	import { page } from '$app/stores';
	import { X, Search, ExternalLink } from 'lucide-svelte';
	import logo from '$lib/assets/logo.png';

	let { isOpen = false, onClose, onSearchOpen } = $props();

	const navSections = [
		{
			title: 'Getting Started',
			items: [
				{ title: 'Introduction', href: '/docs' },
				{ title: 'Installation', href: '/docs/install' }
			]
		},
		{
			title: 'Language',
			items: [
				{ title: 'Syntax & Types', href: '/docs/syntax' },
				{ title: 'Standard Library', href: '/docs/stdlib' },
				{ title: 'Builtins', href: '/docs/builtins' }
			]
		},
		{
			title: 'Advanced',
			items: [
				{ title: 'Embedding', href: '/docs/embedding' },
				{ title: 'Building Binaries', href: '/docs/building' },
				{ title: 'Examples', href: '/docs/examples' }
			]
		},
		{
			title: 'Resources',
			items: [
				{ title: 'LLM Reference', href: '/docs/llm' },
				{ title: 'Changelog', href: '/docs/changelog' },
				{ title: 'Playground', href: '/playground', external: true }
			]
		}
	];

	function isActive(href) {
		const pathname = $page.url.pathname;
		if (href === '/docs') {
			return pathname === '/docs' || pathname === '/docs/';
		}
		return pathname.startsWith(href);
	}
</script>

<!-- Desktop Sidebar -->
<aside class="fixed top-0 left-0 z-40 hidden h-screen w-60 border-r border-white/5 bg-zinc-950/50 lg:block">
	<!-- Subtle gradient overlay -->
	<div class="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-transparent pointer-events-none"></div>

	<nav class="relative h-full overflow-y-auto p-4">
		<!-- Logo -->
		<a href="/" class="mb-6 flex items-center gap-2.5 px-2 py-1">
			<img src={logo} alt="Logos" class="h-6 w-auto" />
			<span class="font-mono text-sm font-medium text-white/90">Docs</span>
		</a>

		<!-- Nav sections -->
		{#each navSections as section}
			<div class="mb-6">
				<h3 class="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
					{section.title}
				</h3>
				<ul class="space-y-0.5">
					{#each section.items as item}
						<li>
							<a
								href={item.href}
								class="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-150 {isActive(item.href)
									? 'bg-white/10 text-white font-medium'
									: 'text-zinc-400 hover:bg-white/5 hover:text-white'}"
							>
								{#if isActive(item.href)}
									<div class="h-1 w-1 rounded-full bg-white"></div>
								{:else}
									<div class="h-1 w-1 rounded-full bg-zinc-700 opacity-0 transition-opacity group-hover:opacity-100"></div>
								{/if}
								{item.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</nav>
</aside>

<!-- Mobile Sidebar Overlay -->
{#if isOpen}
	<div class="fixed inset-0 z-50 lg:hidden">
		<!-- Backdrop -->
		<button
			class="absolute inset-0 bg-black/60 backdrop-blur-sm"
			onclick={onClose}
			aria-label="Close sidebar"
		></button>

		<!-- Sidebar panel -->
		<aside class="absolute top-0 left-0 h-full w-72 border-r border-white/5 bg-zinc-950 shadow-2xl">
			<!-- Header -->
			<div class="flex items-center justify-between border-b border-white/5 px-4 py-4">
				<a href="/" class="flex items-center gap-2.5" onclick={onClose}>
					<img src={logo} alt="Logos" class="h-6 w-auto" />
					<span class="font-mono text-sm font-medium text-white/90">Docs</span>
				</a>
				<div class="flex items-center gap-1">
					<button
						onclick={() => { onClose(); onSearchOpen?.(); }}
						class="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
						aria-label="Search"
					>
						<Search class="h-5 w-5" />
					</button>
					<button
						onclick={onClose}
						class="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
						aria-label="Close menu"
					>
						<X class="h-5 w-5" />
					</button>
				</div>
			</div>

			<!-- Nav -->
			<nav class="overflow-y-auto p-4">
				{#each navSections as section}
					<div class="mb-6">
						<h3 class="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
							{section.title}
						</h3>
						<ul class="space-y-0.5">
							{#each section.items as item}
								<li>
						<a
								href={item.href}
								onclick={onClose}
								target={item.external ? '_blank' : undefined}
								rel={item.external ? 'noopener noreferrer' : undefined}
								class="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-150 {isActive(item.href)
									? 'bg-white/10 text-white font-medium'
									: 'text-zinc-400 hover:bg-white/5 hover:text-white'}"
							>
								{#if isActive(item.href)}
									<div class="h-1 w-1 rounded-full bg-white"></div>
								{:else}
									<div class="h-1 w-1 rounded-full bg-zinc-700 opacity-0 transition-opacity group-hover:opacity-100"></div>
								{/if}
								{item.title}
								{#if item.external}
									<ExternalLink class="h-3 w-3 ml-auto opacity-50" />
								{/if}
							</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</nav>
		</aside>
	</div>
{/if}
