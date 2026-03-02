<script>
	import { Search, X, FileText, ArrowRight } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let { isOpen = false, onClose } = $props();

	let searchQuery = $state('');
	let selectedIndex = $state(0);
	let inputRef = $state(null);

	const searchIndex = [
		{
			title: 'Introduction',
			href: '/docs',
			section: 'Getting Started',
			keywords: ['intro', 'start', 'begin', 'overview', 'what is logos']
		},
		{
			title: 'Installation',
			href: '/docs/install',
			section: 'Getting Started',
			keywords: ['install', 'setup', 'curl', 'download', 'linux', 'macos']
		},
		{
			title: 'Syntax & Types',
			href: '/docs/syntax',
			section: 'Language',
			keywords: [
				'syntax',
				'types',
				'variables',
				'let',
				'functions',
				'fn',
				'if',
				'else',
				'for',
				'loop',
				'array',
				'table',
				'switch',
				'spawn',
				'concurrency'
			]
		},
		{
			title: 'Standard Library',
			href: '/docs/stdlib',
			section: 'Language',
			keywords: [
				'stdlib',
				'standard',
				'library',
				'math',
				'array',
				'string',
				'path',
				'datetime',
				'log',
				'modules',
				'use'
			]
		},
		{
			title: 'Embedding',
			href: '/docs/embedding',
			section: 'Advanced',
			keywords: [
				'embed',
				'go',
				'golang',
				'integration',
				'RegisterFunc',
				'SetGlobal',
				'GetGlobal',
				'CallFunc',
				'sandbox'
			]
		},
		{
			title: 'Building Binaries',
			href: '/docs/building',
			section: 'Advanced',
			keywords: ['build', 'compile', 'binary', 'executable', 'lgs build']
		},
		{
			title: 'Examples',
			href: '/docs/examples',
			section: 'Advanced',
			keywords: [
				'examples',
				'todo',
				'cli',
				'password',
				'generator',
				'file',
				'search',
				'json',
				'config'
			]
		},
		{
			title: 'Variables',
			href: '/docs/syntax#variables',
			section: 'Syntax',
			keywords: ['let', 'variable', 'declare', 'string', 'number', 'boolean', 'null']
		},
		{
			title: 'Functions',
			href: '/docs/syntax#functions',
			section: 'Syntax',
			keywords: ['fn', 'function', 'return', 'arrow', 'closure']
		},
		{
			title: 'Control Flow',
			href: '/docs/syntax#control-flow',
			section: 'Syntax',
			keywords: ['if', 'else', 'for', 'loop', 'switch', 'case', 'default']
		},
		{
			title: 'Arrays',
			href: '/docs/syntax#arrays',
			section: 'Syntax',
			keywords: ['array', 'list', 'index', 'elements']
		},
		{
			title: 'Tables',
			href: '/docs/syntax#tables',
			section: 'Syntax',
			keywords: ['table', 'hashmap', 'map', 'object', 'key', 'value']
		},
		{
			title: 'Concurrency',
			href: '/docs/syntax#spawn',
			section: 'Syntax',
			keywords: ['spawn', 'concurrent', 'async', 'parallel', 'goroutine']
		},
		{
			title: 'HTTP',
			href: '/docs/syntax#http',
			section: 'Syntax',
			keywords: ['http', 'httpGet', 'api', 'request', 'fetch']
		},
		{
			title: 'File I/O',
			href: '/docs/syntax#file-io',
			section: 'Syntax',
			keywords: ['file', 'fileRead', 'read', 'write', 'io']
		},
		{
			title: 'JSON',
			href: '/docs/syntax#json',
			section: 'Syntax',
			keywords: ['json', 'parseJson', 'parse', 'serialize']
		}
	];

	const filteredResults = $derived(() => {
		if (!searchQuery.trim()) return [];

		const query = searchQuery.toLowerCase().trim();
		const words = query.split(/\s+/);

		return searchIndex
			.map((item) => {
				let score = 0;
				const titleLower = item.title.toLowerCase();
				const sectionLower = item.section.toLowerCase();

				// Exact title match
				if (titleLower === query) score += 100;
				// Title starts with query
				else if (titleLower.startsWith(query)) score += 50;
				// Title contains query
				else if (titleLower.includes(query)) score += 30;

				// Section match
				if (sectionLower.includes(query)) score += 10;

				// Keyword matches
				for (const keyword of item.keywords) {
					for (const word of words) {
						if (keyword.includes(word)) score += 15;
						if (keyword === word) score += 25;
					}
				}

				return { ...item, score };
			})
			.filter((item) => item.score > 0)
			.sort((a, b) => b.score - a.score)
			.slice(0, 8);
	});

	function handleKeydown(e) {
		const results = filteredResults();

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, 0);
		} else if (e.key === 'Enter' && results[selectedIndex]) {
			e.preventDefault();
			navigateTo(results[selectedIndex].href);
		} else if (e.key === 'Escape') {
			onClose();
		}
	}

	function navigateTo(href) {
		goto(href);
		onClose();
		searchQuery = '';
	}

	$effect(() => {
		if (isOpen && inputRef) {
			inputRef.focus();
		}
	});

	$effect(() => {
		// Reset selected index when results change
		selectedIndex = 0;
	});

	onMount(() => {
		function handleGlobalKeydown(e) {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				if (!isOpen) {
					// This would need to be handled by parent
				}
			}
		}

		document.addEventListener('keydown', handleGlobalKeydown);
		return () => document.removeEventListener('keydown', handleGlobalKeydown);
	});
</script>

{#if isOpen}
	<div class="fixed inset-0 z-[100]">
		<!-- Backdrop -->
		<button
			class="absolute inset-0 bg-black/70 backdrop-blur-sm"
			onclick={onClose}
			aria-label="Close search"
		></button>

		<!-- Search Modal -->
		<div class="absolute top-[15%] left-1/2 w-full max-w-xl -translate-x-1/2 px-4">
			<div class="bg-bg border-border overflow-hidden rounded-xl border shadow-2xl">
				<!-- Search Input -->
				<div class="border-border flex items-center gap-3 border-b px-4 py-3">
					<Search class="text-muted h-5 w-5 flex-shrink-0" />
					<input
						bind:this={inputRef}
						bind:value={searchQuery}
						onkeydown={handleKeydown}
						type="text"
						placeholder="Search documentation..."
						class="text-text placeholder:text-muted flex-1 bg-transparent outline-none"
					/>
					<button
						onclick={onClose}
						class="text-muted hover:text-text p-1 transition-colors"
						aria-label="Close"
					>
						<X class="h-5 w-5" />
					</button>
				</div>

				<!-- Results -->
				<div class="max-h-[400px] overflow-y-auto">
					{#if filteredResults().length > 0}
						<ul class="py-2">
							{#each filteredResults() as result, i}
								<li>
									<button
										onclick={() => navigateTo(result.href)}
										class="hover:bg-subtle flex w-full items-center gap-3 px-4 py-3 text-left transition-colors {i ===
										selectedIndex
											? 'bg-subtle'
											: ''}"
									>
										<FileText class="text-muted h-4 w-4 flex-shrink-0" />
										<div class="min-w-0 flex-1">
											<div class="text-text truncate">{result.title}</div>
											<div class="text-muted truncate text-xs">{result.section}</div>
										</div>
										<ArrowRight
											class="text-muted h-4 w-4 flex-shrink-0 {i === selectedIndex
												? 'text-text'
												: ''}"
										/>
									</button>
								</li>
							{/each}
						</ul>
					{:else if searchQuery.trim()}
						<div class="text-muted px-4 py-8 text-center">
							<p>No results found for "{searchQuery}"</p>
						</div>
					{:else}
						<div class="text-muted px-4 py-8 text-center">
							<p>Type to search the documentation</p>
						</div>
					{/if}
				</div>

				<!-- Footer -->
				<div class="border-border text-muted flex items-center gap-4 border-t px-4 py-2 text-xs">
					<span class="flex items-center gap-1">
						<kbd class="bg-subtle border-border rounded border px-1.5 py-0.5">↑</kbd>
						<kbd class="bg-subtle border-border rounded border px-1.5 py-0.5">↓</kbd>
						to navigate
					</span>
					<span class="flex items-center gap-1">
						<kbd class="bg-subtle border-border rounded border px-1.5 py-0.5">↵</kbd>
						to select
					</span>
					<span class="flex items-center gap-1">
						<kbd class="bg-subtle border-border rounded border px-1.5 py-0.5">esc</kbd>
						to close
					</span>
				</div>
			</div>
		</div>
	</div>
{/if}
