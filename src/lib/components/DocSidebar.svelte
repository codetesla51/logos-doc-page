<script>
	import { page } from '$app/stores';
	import { X } from 'lucide-svelte';
	import logo from '$lib/assets/logo.png';

	let { isOpen = false, onClose } = $props();

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
				{ title: 'LLM Reference', href: '/docs/llm', highlight: true }
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

<aside class="bg-black border-r border-white/10 fixed top-0 left-0 z-40 hidden h-screen w-[240px] overflow-y-auto pt-14 lg:block">
	<nav class="space-y-1 p-3 pb-20">
		<a href="/" class="mb-4 flex items-center gap-2 px-2 py-1">
			<img src={logo} alt="Logos" class="h-5 w-auto" />
		</a>

		{#each navSections as section}
			<div class="pt-4">
				<h3 class="text-white/40 mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest">
					{section.title}
				</h3>
				<ul class="space-y-0.5">
					{#each section.items as item}
						<li>
							<a
								href={item.href}
								class="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all {isActive(item.href)
									? 'bg-white text-black font-medium'
									: item.highlight
										? 'text-white/70 hover:bg-white/5 hover:text-white'
										: 'text-white/50 hover:bg-white/5 hover:text-white'}"
							>
								{item.title}
								{#if item.highlight}
									<span class="ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-medium">NEW</span>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</nav>
</aside>

{#if isOpen}
	<div class="fixed inset-0 z-50 lg:hidden">
		<button
			class="absolute inset-0 bg-black/80"
			onclick={onClose}
			aria-label="Close sidebar"
		></button>

		<aside class="bg-black absolute top-0 left-0 h-full w-[280px] border-r border-white/10">
			<div class="flex items-center justify-between border-b border-white/10 p-4">
				<a href="/" class="flex items-center gap-2">
					<img src={logo} alt="Logos" class="h-5 w-auto" />
				</a>
				<button
					onclick={onClose}
					class="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
					aria-label="Close menu"
				>
					<X class="h-5 w-5" />
				</button>
			</div>

			<nav class="space-y-1 p-3">
				{#each navSections as section}
					<div class="pt-4">
						<h3 class="text-white/40 mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest">
							{section.title}
						</h3>
						<ul class="space-y-0.5">
							{#each section.items as item}
								<li>
									<a
										href={item.href}
										onclick={onClose}
										class="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all {isActive(item.href)
											? 'bg-white text-black font-medium'
											: item.highlight
												? 'text-white/70 hover:bg-white/5 hover:text-white'
												: 'text-white/50 hover:bg-white/5 hover:text-white'}"
									>
										{item.title}
										{#if item.highlight}
											<span class="ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-medium">NEW</span>
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
