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
<aside
	class="bg-bg border-border fixed top-0 left-0 z-40 hidden h-screen w-[240px] overflow-y-auto border-r pt-14 lg:block"
>
	<nav class="space-y-6 p-4">
		{#each navSections as section}
			<div>
				<h3 class="text-muted mb-2 px-2 text-xs font-medium tracking-wider uppercase">
					{section.title}
				</h3>
				<ul class="space-y-1">
					{#each section.items as item}
						<li>
							<a
								href={item.href}
								class="block rounded px-2 py-2 text-base transition-colors {isActive(item.href)
									? 'text-text bg-subtle border-l-2 border-white/30'
									: 'text-muted hover:text-text hover:bg-subtle/50'}"
							>
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
			class="absolute inset-0 bg-black/70 backdrop-blur-sm"
			onclick={onClose}
			aria-label="Close sidebar"
		></button>

		<!-- Drawer -->
		<aside
			class="bg-bg border-border absolute top-0 left-0 h-full w-[260px] transform overflow-y-auto border-r transition-transform duration-300 ease-out"
		>
			<div class="border-border flex items-center justify-between border-b p-3">
				<a href="/" class="flex items-center">
					<img src={logo} alt="Logos" class="h-6 w-auto" />
				</a>
				<button
					onclick={onClose}
					class="text-muted hover:text-text p-1.5 transition-colors"
					aria-label="Close menu"
				>
					<X class="h-5 w-5" />
				</button>
			</div>

			<nav class="space-y-6 p-4">
				{#each navSections as section}
					<div>
					<h3 class="text-muted mb-2 px-2 text-xs font-medium tracking-wider uppercase">
						{section.title}
					</h3>
					<ul class="space-y-1">
						{#each section.items as item}
							<li>
								<a
									href={item.href}
									onclick={onClose}
									class="block rounded px-2 py-2 text-base transition-colors {isActive(item.href)
										? 'text-text bg-subtle border-l-2 border-white/30'
										: 'text-muted hover:text-text hover:bg-subtle/50'}"
								>
									{item.title}
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
