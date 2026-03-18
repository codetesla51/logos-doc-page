<script>
	import { page } from '$app/stores';
	import { X, Sparkles } from 'lucide-svelte';
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
				{ title: 'LLM Reference', href: '/docs/llm', icon: 'Sparkles', highlight: true }
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

<aside class="bg-bg border-border fixed top-0 left-0 z-40 hidden h-screen w-[240px] border-r pt-14 lg:block">
	<nav class="space-y-1 p-3">
		<a href="/" class="mb-4 flex items-center gap-2 px-2 py-1">
			<img src={logo} alt="Logos" class="h-5 w-auto" />
		</a>

		{#each navSections as section}
			<div class="pt-4">
				<h3 class="text-muted/60 mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest">
					{section.title}
				</h3>
				<ul class="space-y-0.5">
					{#each section.items as item}
						<li>
							<a
								href={item.href}
								class="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all {isActive(item.href)
									? 'bg-subtle text-text font-medium'
									: item.highlight
										? 'text-purple-400 hover:bg-purple-500/10 hover:text-purple-300'
										: 'text-muted hover:bg-subtle/50 hover:text-text'}"
							>
								{#if item.icon === 'Sparkles'}
									<Sparkles class="h-3.5 w-3.5" />
								{/if}
								{item.title}
								{#if item.highlight}
									<span class="ml-auto rounded bg-purple-500/20 px-1.5 py-0.5 text-[9px] font-medium">NEW</span>
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
			class="absolute inset-0 bg-black/60 backdrop-blur-sm"
			onclick={onClose}
			aria-label="Close sidebar"
		></button>

		<aside class="bg-bg border-border absolute top-0 left-0 h-full w-[280px] border-r">
			<div class="flex items-center justify-between border-b border-border/50 p-4">
				<a href="/" class="flex items-center gap-2">
					<img src={logo} alt="Logos" class="h-5 w-auto" />
				</a>
				<button
					onclick={onClose}
					class="text-muted hover:text-text rounded-lg p-1.5 transition-colors hover:bg-subtle"
					aria-label="Close menu"
				>
					<X class="h-5 w-5" />
				</button>
			</div>

			<nav class="space-y-1 p-3">
				{#each navSections as section}
					<div class="pt-4">
						<h3 class="text-muted/60 mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest">
							{section.title}
						</h3>
						<ul class="space-y-0.5">
							{#each section.items as item}
								<li>
									<a
										href={item.href}
										onclick={onClose}
										class="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all {isActive(item.href)
											? 'bg-subtle text-text font-medium'
											: item.highlight
												? 'text-purple-400 hover:bg-purple-500/10 hover:text-purple-300'
												: 'text-muted hover:bg-subtle/50 hover:text-text'}"
									>
										{#if item.icon === 'Sparkles'}
											<Sparkles class="h-3.5 w-3.5" />
										{/if}
										{item.title}
										{#if item.highlight}
											<span class="ml-auto rounded bg-purple-500/20 px-1.5 py-0.5 text-[9px] font-medium">NEW</span>
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
