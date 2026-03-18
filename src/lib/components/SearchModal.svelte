<script>
	import { Search, X, FileText, ArrowRight, Clock, Sparkles, Hash } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let { isOpen = false, onClose } = $props();

	let searchQuery = $state('');
	let selectedIndex = $state(0);
	let inputRef = $state(null);
	let recentSearches = $state([]);
	let mode = $state('search');

	const searchIndex = [
		{ title: 'Introduction', href: '/docs', section: 'Getting Started', keywords: ['intro', 'start', 'begin', 'overview', 'what is logos', 'about'] },
		{ title: 'Installation', href: '/docs/install', section: 'Getting Started', keywords: ['install', 'setup', 'curl', 'download', 'linux', 'macos', 'get started', 'npm'] },
		{ title: 'Syntax & Types', href: '/docs/syntax', section: 'Language', keywords: ['syntax', 'types', 'variables', 'let', 'functions', 'fn', 'data types'] },
		{ title: 'String Interpolation', href: '/docs/syntax#string-interpolation', section: 'Syntax', keywords: ['string interpolation', '${}', 'template', 'embed', 'variables in strings', 'v0.4'] },
		{ title: 'Pipe Operator', href: '/docs/syntax#pipe-operator', section: 'Syntax', keywords: ['pipe', '|>', 'chaining', 'flow', 'compose', 'v0.4'] },
		{ title: 'Try Expressions', href: '/docs/syntax#try-expression', section: 'Syntax', keywords: ['try', 'catch', 'error', 'exception', 'handling', 'v0.4'] },
		{ title: 'Postfix Operators', href: '/docs/syntax#postfix-operators', section: 'Syntax', keywords: ['postfix', '?.', '?', 'optional', 'v0.4'] },
		{ title: 'For-In with Index', href: '/docs/syntax#for-in', section: 'Syntax', keywords: ['for in index', 'enumerate', 'loop index', 'v0.4'] },
		{ title: 'Variables', href: '/docs/syntax#variables', section: 'Syntax', keywords: ['let', 'variable', 'declare', 'string', 'number', 'boolean', 'null', 'const', 'mut'] },
		{ title: 'Functions', href: '/docs/syntax#functions', section: 'Syntax', keywords: ['fn', 'function', 'return', 'arrow', 'closure', 'lambda', 'anonymous'] },
		{ title: 'Control Flow', href: '/docs/syntax#control-flow', section: 'Syntax', keywords: ['if', 'else', 'for', 'loop', 'switch', 'case', 'default', 'ternary', 'match'] },
		{ title: 'Arrays', href: '/docs/syntax#arrays', section: 'Syntax', keywords: ['array', 'list', 'index', 'elements', 'push', 'pop', 'slice'] },
		{ title: 'Tables', href: '/docs/syntax#tables', section: 'Syntax', keywords: ['table', 'hashmap', 'map', 'object', 'key', 'value', 'struct'] },
		{ title: 'Concurrency', href: '/docs/syntax#spawn', section: 'Syntax', keywords: ['spawn', 'concurrent', 'async', 'parallel', 'goroutine', 'thread'] },
		{ title: 'HTTP', href: '/docs/syntax#http', section: 'Syntax', keywords: ['http', 'httpGet', 'httpPost', 'api', 'request', 'fetch', 'rest'] },
		{ title: 'File I/O', href: '/docs/syntax#file-io', section: 'Syntax', keywords: ['file', 'fileRead', 'fileWrite', 'read', 'write', 'io', 'filesystem'] },
		{ title: 'JSON', href: '/docs/syntax#json', section: 'Syntax', keywords: ['json', 'parseJson', 'toJson', 'parse', 'serialize', 'serialize'] },
		{ title: 'Standard Library', href: '/docs/stdlib', section: 'Language', keywords: ['stdlib', 'standard library', 'math', 'array functions', 'string functions', 'path', 'datetime', 'log', 'modules', 'use'] },
		{ title: 'Builtins', href: '/docs/builtins', section: 'Language', keywords: ['builtins', 'print', 'input', 'args', 'exit', 'sleep', 'random', 'assert'] },
		{ title: 'Embedding', href: '/docs/embedding', section: 'Advanced', keywords: ['embed', 'go', 'golang', 'integration', 'api', 'RegisterFunc', 'SetGlobal', 'GetGlobal', 'CallFunc', 'sandbox'] },
		{ title: 'Building Binaries', href: '/docs/building', section: 'Advanced', keywords: ['build', 'compile', 'binary', 'executable', 'lgs build', 'production'] },
		{ title: 'Examples', href: '/docs/examples', section: 'Advanced', keywords: ['examples', 'todo', 'cli', 'password generator', 'file search', 'json', 'config', 'samples'] },
		{ title: 'LLM Reference', href: '/docs/llm', section: 'Resources', keywords: ['llm', 'ai', 'prompt', 'reference', 'cheatsheet', 'model', 'gpt', 'claude'] },
		{ title: 'Playground', href: '/playground', section: 'Resources', keywords: ['playground', 'try', 'online', 'editor', 'sandbox', 'run'] }
	];

	const popularSearches = ['string interpolation', 'pipe operator', 'http', 'spawn', 'try expressions', 'functions'];

	function fuzzyMatch(text, query) {
		const textLower = text.toLowerCase();
		const queryLower = query.toLowerCase();
		let score = 0;
		let matched = [];
		let queryIdx = 0;

		for (let i = 0; i < textLower.length && queryIdx < queryLower.length; i++) {
			if (textLower[i] === queryLower[queryIdx]) {
				matched.push(text[i]);
				score += queryIdx === 0 ? 2 : 1;
				queryIdx++;
			} else {
				if (matched.length > 0 && !matched.at(-1).includes('`')) {
					matched.push('`');
				}
			}
		}

		return queryIdx === queryLower.length ? { score, matched: matched.join('').replace(/`/g, ''), fullMatch: false } : { score: 0, matched: text, fullMatch: textLower.includes(queryLower) };
	}

	function calculateScore(item, query) {
		let score = 0;
		const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 0);
		
		const titleMatch = fuzzyMatch(item.title, query);
		score += titleMatch.score * 10;
		if (item.title.toLowerCase().includes(query.toLowerCase())) score += 50;
		if (item.title.toLowerCase().startsWith(query.toLowerCase())) score += 30;
		if (item.title.toLowerCase() === query.toLowerCase()) score += 100;

		if (item.section.toLowerCase().includes(query.toLowerCase())) score += 15;

		for (const keyword of item.keywords) {
			const kwMatch = fuzzyMatch(keyword, query);
			score += kwMatch.score * 5;
			if (keyword.toLowerCase().includes(query.toLowerCase())) score += 10;
		}

		for (const word of words) {
			for (const keyword of item.keywords) {
				if (keyword.toLowerCase().includes(word)) score += 5;
				if (keyword.toLowerCase().startsWith(word)) score += 8;
			}
		}

		return score;
	}

	const filteredResults = $derived(() => {
		if (!searchQuery.trim()) return [];

		const query = searchQuery.trim();
		
		return searchIndex
			.map(item => ({
				...item,
				score: calculateScore(item, query)
			}))
			.filter(item => item.score > 0)
			.sort((a, b) => b.score - a.score)
			.slice(0, 10);
	});

	function handleKeydown(e) {
		const results = filteredResults();
		const hasResults = results.length > 0;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, 0);
		} else if (e.key === 'Tab') {
			e.preventDefault();
			if (mode === 'recent' && recentSearches.length > 0) {
				searchQuery = recentSearches[0];
			} else if (hasResults) {
				searchQuery = results[selectedIndex]?.title || '';
			}
		} else if (e.key === 'Enter' && hasResults) {
			e.preventDefault();
			navigateTo(results[selectedIndex].href);
		} else if (e.key === 'Escape') {
			onClose();
		}
	}

	function navigateTo(href) {
		if (searchQuery.trim()) {
			const recent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
			recentSearches = recent;
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('logos-recent-searches', JSON.stringify(recent));
			}
		}
		goto(href);
		onClose();
		searchQuery = '';
	}

	function selectPopular(term) {
		searchQuery = term;
		inputRef?.focus();
	}

	function selectRecent(term) {
		searchQuery = term;
		inputRef?.focus();
	}

	$effect(() => {
		if (isOpen && inputRef) {
			inputRef.focus();
			if (typeof localStorage !== 'undefined') {
				const saved = localStorage.getItem('logos-recent-searches');
				if (saved) recentSearches = JSON.parse(saved);
			}
		}
	});

	$effect(() => {
		selectedIndex = 0;
	});

	$effect(() => {
		if (searchQuery.trim()) {
			mode = 'search';
		} else if (recentSearches.length > 0) {
			mode = 'recent';
		} else {
			mode = 'empty';
		}
	});
</script>

{#if isOpen}
	<div class="fixed inset-0 z-[100]">
		<button
			class="absolute inset-0 bg-black/80 backdrop-blur-sm"
			onclick={onClose}
			aria-label="Close search"
		></button>

		<div class="absolute top-[10%] left-1/2 w-full max-w-2xl -translate-x-1/2 px-3 sm:top-[15%] sm:px-4">
			<div class="bg-bg border-border overflow-hidden rounded-xl border shadow-2xl">
				<div class="border-border flex items-center gap-3 border-b px-4 py-3">
					<Search class="text-muted h-5 w-5 flex-shrink-0" />
					<input
						bind:this={inputRef}
						bind:value={searchQuery}
						onkeydown={handleKeydown}
						type="text"
						placeholder="Search docs, features, examples..."
						class="text-text placeholder:text-muted flex-1 bg-transparent outline-none text-base sm:text-sm"
					/>
					{#if searchQuery}
						<button
							onclick={() => searchQuery = ''}
							class="text-muted hover:text-text p-1 transition-colors"
							aria-label="Clear"
						>
							<X class="h-4 w-4" />
						</button>
					{/if}
					<button
						onclick={onClose}
						class="text-muted hover:text-text hidden p-1 transition-colors sm:block"
						aria-label="Close"
					>
						<kbd class="bg-subtle border-border rounded border px-1.5 py-0.5 text-[10px]">esc</kbd>
					</button>
				</div>

				<div class="max-h-[60vh] overflow-y-auto">
					{#if mode === 'search' && filteredResults().length > 0}
						<div class="py-1">
							<div class="text-muted px-4 py-1.5 text-[10px] uppercase tracking-wider">Results</div>
							<ul>
								{#each filteredResults() as result, i}
									<li>
										<button
											onclick={() => navigateTo(result.href)}
											class="hover:bg-subtle flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors {i === selectedIndex ? 'bg-subtle' : ''}"
										>
											<FileText class="text-muted h-4 w-4 flex-shrink-0" />
											<div class="min-w-0 flex-1">
												<div class="text-text text-sm truncate">{result.title}</div>
												<div class="text-muted flex items-center gap-1 truncate text-xs">
													<Hash class="h-3 w-3" />
													{result.section}
												</div>
											</div>
											{#if i === selectedIndex}
												<ArrowRight class="text-muted h-4 w-4" />
											{/if}
										</button>
									</li>
								{/each}
							</ul>
						</div>
					{:else if mode === 'search' && searchQuery.trim()}
						<div class="text-muted px-4 py-10 text-center">
							<p class="text-sm">No results for "{searchQuery}"</p>
							<p class="mt-1 text-xs">Try different keywords</p>
						</div>
					{:else if mode === 'recent'}
						<div class="py-1">
							<div class="text-muted flex items-center gap-1.5 px-4 py-1.5 text-[10px] uppercase tracking-wider">
								<Clock class="h-3 w-3" />
								Recent
							</div>
							<ul>
								{#each recentSearches as term, i}
									<li>
										<button
											onclick={() => selectRecent(term)}
											class="hover:bg-subtle flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors {i === selectedIndex ? 'bg-subtle' : ''}"
										>
											<Clock class="text-muted h-4 w-4" />
											<span class="text-text">{term}</span>
										</button>
									</li>
								{/each}
							</ul>
						</div>
					{:else}
						<div class="py-1">
							<div class="text-muted flex items-center gap-1.5 px-4 py-1.5 text-[10px] uppercase tracking-wider">
								<Sparkles class="h-3 w-3" />
								Popular
							</div>
							<div class="flex flex-wrap gap-2 px-4 py-2">
								{#each popularSearches as term}
									<button
										onclick={() => selectPopular(term)}
										class="bg-subtle text-muted hover:text-text rounded-full border border-white/10 px-3 py-1.5 text-xs transition-colors"
									>
										{term}
									</button>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				<div class="border-border text-muted hidden items-center justify-between border-t px-4 py-2 text-xs sm:flex">
					<div class="flex items-center gap-3">
						<span class="flex items-center gap-1">
							<kbd class="bg-subtle border-border rounded border px-1.5 py-0.5">↑</kbd>
							<kbd class="bg-subtle border-border rounded border px-1.5 py-0.5">↓</kbd>
							navigate
						</span>
						<span class="flex items-center gap-1">
							<kbd class="bg-subtle border-border rounded border px-1.5 py-0.5">↵</kbd>
							select
						</span>
						<span class="flex items-center gap-1">
							<kbd class="bg-subtle border-border rounded border px-1.5 py-0.5">tab</kbd>
							autofill
						</span>
					</div>
					<span class="text-white/30">Logos v0.4.0</span>
				</div>
			</div>
		</div>
	</div>
{/if}
