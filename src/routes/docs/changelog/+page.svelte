<script>
	import DocLayout from '$lib/components/DocLayout.svelte';

	const changelog = [
		{
			version: 'v0.4.6',
			date: '2026-03-22',
			type: 'patch',
			changes: [
				{
					type: 'fixed',
					text: 'HTTP builtins now accept a table as the request body — automatically serialized to JSON'
				}
			]
		},
		{
			version: 'v0.4.5',
			date: '2026-03-20',
			type: 'patch',
			changes: [
				{
					type: 'added',
					text: 'printn builtin for printing without a trailing newline; print remains the default with newline'
				}
			]
		},
		{
			version: 'v0.4.3',
			date: '2026-03-19',
			type: 'patch',
			changes: [
				{
					type: 'added',
					text: 'regex builtins: reMatch, reFind, reFindAll, reReplace, reSplit, reGroups'
				}
			]
		},
		{
			version: 'v0.4.2',
			date: '2026-03-19',
			type: 'patch',
			changes: [
				{
					type: 'added',
					text: 'const keyword for immutable bindings — reassignment throws a runtime error'
				},
				{
					type: 'added',
					text: 'range(start, end, step?) builtin for numeric iteration with optional step and countdown support'
				},
				{
					type: 'fixed',
					text: 'sort() now handles both string and numeric arrays'
				},
				{
					type: 'added',
					text: 'str(), int(), float() added as short aliases for type conversion'
				}
			]
		},
		{
			version: 'v0.4.1',
			date: '2026-03-19',
			type: 'patch',
			changes: [
				{
					type: 'fixed',
					text: 'print: nested tables render with proper indentation, no internal detail leakage'
				},
				{
					type: 'fixed',
					text: 'sort: now handles both string and numeric arrays (previously strings were silently skipped)'
				},
				{
					type: 'fixed',
					text: 'args: bounds checking prevents panic when called with no script arguments'
				},
				{
					type: 'added',
					text: 'str(), int(), float() as short aliases for type conversion (toStr/toInt/toFloat still work)'
				}
			]
		},
		{
			version: 'v0.4.0',
			date: '2026-03-18',
			type: 'minor',
			changes: [
				{
					type: 'added',
					text: 'String interpolation: "${variable}" syntax for embedding expressions in strings'
				},
				{
					type: 'added',
					text: 'Pipe operator: |> chains function calls left-to-right for readable data transformations'
				},
				{
					type: 'added',
					text: 'try expression: unwraps result tables, propagates errors up the call stack'
				},
				{
					type: 'added',
					text: 'Postfix operators: i++ and i-- for convenient increment/decrement'
				}
			]
		},
		{
			version: 'v0.3.2',
			date: '2026-03-17',
			type: 'patch',
			changes: [
				{
					type: 'added',
					text: 'Ternary operator: condition ? trueBranch : falseBranch (nesting and chaining supported)'
				},
				{
					type: 'fixed',
					text: '? token was emitted as ILLEGAL by golexer — fixed'
				}
			]
		},
		{
			version: 'v0.3.1',
			date: '2026-03-17',
			type: 'patch',
			changes: [
				{
					type: 'added',
					text: 'Index variable in for-in loops: for i, v in col {}'
				},
				{
					type: 'added',
					text: 'Dot access on table literals'
				},
				{
					type: 'fixed',
					text: 'Table literal keys are string keys, not variable lookups'
				},
				{
					type: 'fixed',
					text: 'Dot assignment correctly mutates table fields'
				},
				{
					type: 'fixed',
					text: 'args builtin strips binary and script path — user args start at index 0'
				}
			]
		},
		{
			version: 'v0.3.0',
			date: '2026-03-17',
			type: 'minor',
			changes: [
				{
					type: 'added',
					text: 'toJson and prettyJson return {ok, value, error} result objects (breaking change)'
				}
			]
		},
		{
			version: 'v0.2.4',
			date: '2026-03-16',
			type: 'patch',
			changes: [
				{
					type: 'added',
					text: 'else if chaining in if expressions'
				},
				{
					type: 'fixed',
					text: 'Parser synchronize() recovers on all statement starters'
				},
				{
					type: 'fixed',
					text: 'Removed duplicate assignment handling in parseExpressionStatement'
				}
			]
		},
		{
			version: 'v0.2.3',
			date: '2026-03-13',
			type: 'patch',
			changes: [
				{
					type: 'fixed',
					text: 'HTTP builtins now send correct request headers'
				}
			]
		},
		{
			version: 'v0.2.2',
			date: '2026-03-13',
			type: 'patch',
			changes: [
				{
					type: 'fixed',
					text: 'Shell errors no longer silently swallowed'
				}
			]
		},
		{
			version: 'v0.2.1',
			date: '2026-03-13',
			type: 'patch',
			changes: [
				{
					type: 'added',
					text: 'confirm: interactive CLI confirmation prompt'
				},
				{
					type: 'added',
					text: 'select: interactive CLI selection menu'
				}
			]
		},
		{
			version: 'v0.2.0',
			date: '2026-03-13',
			type: 'minor',
			changes: [
				{
					type: 'added',
					text: 'prettyJson builtin for formatted JSON output'
				}
			]
		},
		{
			version: 'v0.1.1',
			date: '2026-03-13',
			type: 'patch',
			changes: [
				{
					type: 'fixed',
					text: 'lgs build now uses embedded stdlib files correctly'
				}
			]
		},
		{
			version: 'v0.1.0',
			date: '2026-03-13',
			type: 'minor',
			changes: [
				{
					type: 'added',
					text: 'Initial public release'
				}
			]
		}
	];

	function getTypeColor(type) {
		switch(type) {
			case 'added': return 'text-green-400 bg-green-500/10 border-green-500/20';
			case 'fixed': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
			case 'changed': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
			case 'removed': return 'text-red-400 bg-red-500/10 border-red-500/20';
			default: return 'text-white/60 bg-white/5 border-white/10';
		}
	}

	function getTypeLabel(type) {
		switch(type) {
			case 'added': return 'Added';
			case 'fixed': return 'Fixed';
			case 'changed': return 'Changed';
			case 'removed': return 'Removed';
			default: return type;
		}
	}

	function getVersionColor(type) {
		switch(type) {
			case 'minor': return 'text-purple-400';
			case 'major': return 'text-red-400';
			default: return 'text-white/60';
		}
	}
</script>

<svelte:head>
	<title>Changelog - Logos Documentation</title>
	<meta name="description" content="Logos changelog — track the evolution of the language." />
</svelte:head>

<DocLayout prev={{ title: 'LLM Reference', href: '/docs/llm' }} next={null}>
	<h1>Changelog</h1>

	<p>
		A complete history of Logos releases. Major features are highlighted in each version.
	</p>

	<div class="mt-8 space-y-8">
		{#each changelog as release}
			<div class="relative">
				{#if changelog.indexOf(release) < changelog.length - 1}
					<div class="absolute left-4 top-8 h-full w-px bg-white/10"></div>
				{/if}

				<div class="relative flex gap-4">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border {release.type === 'minor' ? 'border-purple-500/30 bg-purple-500/10' : 'border-white/10 bg-white/5'}">
						<div class="h-2 w-2 rounded-full {release.type === 'minor' ? 'bg-purple-400' : 'bg-white/40'}"></div>
					</div>

					<div class="flex-1 pb-8">
						<div class="flex items-baseline gap-3">
							<h2 class="{getVersionColor(release.type)} text-lg font-semibold">{release.version}</h2>
							<span class="text-white/30 text-sm">{release.date}</span>
							<span class="{getTypeColor(release.type)} rounded border px-2 py-0.5 text-xs font-medium uppercase">{release.type}</span>
						</div>

						<ul class="mt-3 space-y-2">
							{#each release.changes as change}
								<li class="flex gap-3 text-sm">
									<span class="{getTypeColor(change.type)} shrink-0 font-medium uppercase text-[10px] mt-0.5">
										{getTypeLabel(change.type)}
									</span>
									<span class="text-white/70">{change.text}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		{/each}
	</div>
</DocLayout>
