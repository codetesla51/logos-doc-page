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
	<!-- Backdrop -->
	<div 
		class="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-md"
		onclick={onClose}
		onkeydown={(e) => e.key === 'Escape' && onClose()}
		role="button"
		tabindex="0"
		aria-label="Close sidebar"
	></div>

	<!-- Sidebar panel -->
	<aside 
		class="fixed top-0 left-0 z-50 h-full w-[85vw] max-w-[320px] bg-zinc-950/95 backdrop-blur-xl border-r border-white/10 shadow-2xl shadow-black/50 lg:hidden"
	>
		<!-- Header with gradient -->
		<div class="relative border-b border-white/5">
			<div class="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none"></div>
			<div class="flex items-center justify-between px-5 py-5">
				<a href="/" class="flex items-center gap-3 group" onclick={onClose}>
					<div class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
						<img src={logo} alt="Logos" class="h-5 w-auto" />
					</div>
					<div class="flex flex-col">
						<span class="font-mono text-sm font-semibold text-white">Logos</span>
						<span class="text-[10px] text-zinc-500">Documentation</span>
					</div>
				</a>
				<button
					onclick={onClose}
					class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white transition-all active:scale-95"
					aria-label="Close menu"
				>
					<X class="h-4 w-4" />
				</button>
			</div>
		</div>

		<!-- Search button -->
		<div class="px-5 py-3">
			<button
				onclick={() => { onClose(); onSearchOpen?.(); }}
				class="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-zinc-500 transition-all hover:bg-white/[0.05] hover:text-zinc-300"
			>
				<Search class="h-4 w-4" />
				<span>Search docs...</span>
				<kbd class="ml-auto rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">⌘K</kbd>
			</button>
		</div>

		<!-- Nav with custom scrollbar -->
		<nav class="overflow-y-auto px-3 pb-8" style="height: calc(100vh - 180px);">
			{#each navSections as section, i}
				<div class="mb-2">
					<h3 class="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
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
									class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-150 {isActive(item.href)
										? 'bg-white/10 text-white font-medium shadow-sm shadow-white/5'
										: 'text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200'}"
								>
									{#if isActive(item.href)}
										<div class="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400">
											<div class="h-1.5 w-1.5 rounded-full bg-current"></div>
										</div>
									{:else}
										<div class="flex h-5 w-5 items-center justify-center rounded-md bg-white/5 text-zinc-600 group-hover:bg-white/10 group-hover:text-zinc-400 transition-colors">
											<div class="h-1 w-1 rounded-full bg-current"></div>
										</div>
									{/if}
									<span class="flex-1">{item.title}</span>
									{#if item.external}
										<ExternalLink class="h-3.5 w-3.5 text-zinc-600" />
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				</div>
				{#if i < navSections.length - 1}
					<div class="my-3 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
				{/if}
			{/each}
		</nav>

		<!-- Footer -->
		<div class="absolute bottom-0 inset-x-0 border-t border-white/5 bg-zinc-950/80 backdrop-blur-sm p-4">
			<div class="flex items-center justify-between text-[11px] text-zinc-600">
				<span>Logos v0.4.5</span>
				<span class="flex items-center gap-1">
					<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
					Online
				</span>
			</div>
		</div>
	</aside>
{/if}
