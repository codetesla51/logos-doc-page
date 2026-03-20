<script>
	import Hero from '$lib/components/Hero.svelte';
	import InstallBlock from '$lib/components/InstallBlock.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import { onMount } from 'svelte';
	import { Code2, Zap, Shield, Terminal, Box, Layers, ArrowRight, Github, BookOpen, Rocket, Heart } from 'lucide-svelte';

	const features = [
		{
			icon: Code2,
			title: 'String interpolation',
			description: 'Embed variables directly in strings with ${}. No concatenation, no templates.'
		},
		{
			icon: Zap,
			title: 'Pipe operator',
			description: 'Chain operations cleanly with |>. Data flows left to right through transforms.'
		},
		{
			icon: Shield,
			title: 'Try expressions',
			description: 'Propagate errors up the call stack without verbose if !ok checks.'
		},
		{
			icon: Terminal,
			title: 'Built-in HTTP & JSON',
			description: 'httpGet, httpPost, parseJson — everything you need for API integration.'
		},
		{
			icon: Box,
			title: 'Single binary',
			description: 'lgs build compiles to a standalone executable. No runtime needed.'
		},
		{
			icon: Layers,
			title: 'Concurrency',
			description: 'spawn blocks and spawn for-in for easy parallel processing.'
		}
	];

	const exampleCode = `// Fetch, parse, and filter with pipes
let users = try httpGet("https://api.example.com/users")
    |> parseJson
    |> filter(fn(u) -> u.active)
    |> map(fn(u) -> u.name)

// String interpolation everywhere
for name in users {
    print("\${name} is active")
}

// Concurrent data fetching
spawn for url in urls {
    let data = try httpGet(url) |> parseJson
    fileWrite("cache/\${url}.json", toJson(data))
}`;

	const stdlibModules = [
		{ name: 'std/array', desc: 'map, filter, reduce, unique, flat' },
		{ name: 'std/string', desc: 'capitalize, reverse, palindrome, pad' },
		{ name: 'std/math', desc: 'fib, factorial, isPrime, gcd, lcm' },
		{ name: 'std/path', desc: 'join, base, dir, ext, clean' },
		{ name: 'std/time', desc: 'datetime, format, diff, add, subtract' },
		{ name: 'std/type', desc: 'isString, isInt, isArray, isTable' }
	];

	let featureCards = [];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-in');
					}
				});
			},
			{ threshold: 0.1 }
		);

		featureCards.forEach((card) => {
			if (card) observer.observe(card);
		});

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Logos - A scripting language that doesn't hurt your brain</title>
	<meta
		name="description"
		content="A lightweight scripting language with string interpolation, pipe operators, and try expressions. Built-in HTTP, JSON, concurrency. Compiles to binary."
	/>
</svelte:head>

<Hero />

<section class="border-t border-white/5 py-24 sm:py-32">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				Everything you need, nothing you don't
			</h2>
			<p class="mt-4 max-w-xl mx-auto text-zinc-400">
				Modern language features without the complexity. Built for writing real scripts.
			</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as feature, i}
				<div
					bind:this={featureCards[i]}
					class="feature-card opacity-0 translate-y-4"
					style="transition-delay: {i * 75}ms"
				>
					<FeatureCard
						icon={feature.icon}
						title={feature.title}
						description={feature.description}
					/>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="border-t border-white/5 py-24 sm:py-32">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				Standard library included
			</h2>
			<p class="mt-4 max-w-xl mx-auto text-zinc-400">
				Common operations covered. Import what you need, nothing more.
			</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each stdlibModules as mod}
				<a
					href="/docs/stdlib"
					class="group rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-white/10 hover:bg-white/[0.05]"
				>
					<code class="font-mono text-sm text-emerald-400">{mod.name}</code>
					<p class="mt-1 text-xs text-zinc-500">{mod.desc}</p>
				</a>
			{/each}
		</div>

		<div class="mt-10 text-center">
			<a
				href="/docs/stdlib"
				class="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
			>
				View full stdlib docs
				<ArrowRight class="h-4 w-4" />
			</a>
		</div>
	</div>
</section>

<section class="border-t border-white/5 py-24 sm:py-32">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
			<div>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
					Readable code, maintainable projects
				</h2>
				<p class="mt-4 max-w-lg text-zinc-400">
					Logos syntax is designed for humans. Variables that make sense, functions that read 
					like prose, and patterns that stay consistent across your codebase.
				</p>
				<ul class="mt-8 space-y-3">
					<li class="flex items-center gap-3 text-sm text-zinc-300">
						<span class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
							<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						</span>
						C-like syntax, easy to learn
					</li>
					<li class="flex items-center gap-3 text-sm text-zinc-300">
						<span class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
							<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						</span>
						Consistent patterns across stdlib
					</li>
					<li class="flex items-center gap-3 text-sm text-zinc-300">
						<span class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
							<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						</span>
						Helpful error messages
					</li>
				</ul>
				<a
					href="/docs/syntax"
					class="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-100"
				>
					Read the docs
					<ArrowRight class="h-4 w-4" />
				</a>
			</div>

			<CodeBlock code={exampleCode} language="javascript" filename="api.lgs" />
		</div>
	</div>
</section>

<section class="border-t border-white/5 py-24 sm:py-32">
	<div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
		<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
			Ready to try?
		</h2>
		<p class="mt-4 text-zinc-400">
			No installation required. Try it right in your browser.
		</p>
		<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href="/playground"
				class="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-medium text-zinc-900 transition-all hover:bg-zinc-100 hover:shadow-lg hover:shadow-white/10"
			>
				<Rocket class="h-5 w-5" />
				Open Playground
				<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
			</a>
			<a
				href="/docs"
				class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-white transition-all hover:bg-white/10"
			>
				<BookOpen class="h-5 w-5" />
				Read Docs
			</a>
		</div>
	</div>
</section>

<section class="border-t border-white/5 py-16 sm:py-20">
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6">
		<p class="text-sm text-zinc-500">
			Made with Go · MIT License · 
			<a href="https://github.com/codetesla51/logos" class="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1">
				<Github class="h-3.5 w-3.5" />
				View on GitHub
			</a>
		</p>
		<p class="mt-3 text-xs text-zinc-600">
			Logos v0.4.5 · 
			<a href="/docs/changelog" class="hover:text-zinc-500 transition-colors">Changelog</a>
		</p>
	</div>
</section>

<style>
	.feature-card {
		transition: opacity 0.5s ease-out, transform 0.5s ease-out;
	}
	.feature-card.animate-in {
		opacity: 1;
		transform: translateY(0);
	}
</style>
