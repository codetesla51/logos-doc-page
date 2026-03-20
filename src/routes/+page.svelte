<script>
	import Hero from '$lib/components/Hero.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import { Code2, Zap, Shield, Terminal, Box, Layers, ArrowRight, Github, BookOpen, Rocket } from 'lucide-svelte';

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

	const exampleCode = `// String interpolation
let name = "Alice"
let score = 95
print("\${name} scored \${score} points")

// Tables
let user = table{ name: "Bob", role: "admin" }
print(user.name)

// Try expression
let data = try httpGet("https://api.example.com")
if data.ok {
    print("Success!")
}

// Spawn for concurrency
spawn {
    print("Running in background")
}`;

	const stdlibModules = [
		{ name: 'std/array', desc: 'map, filter, reduce, unique, flat' },
		{ name: 'std/string', desc: 'capitalize, reverse, palindrome, pad' },
		{ name: 'std/math', desc: 'fib, factorial, isPrime, gcd, lcm' },
		{ name: 'std/path', desc: 'join, base, dir, ext, clean' },
		{ name: 'std/time', desc: 'datetime, format, diff, add, subtract' },
		{ name: 'std/type', desc: 'isString, isInt, isArray, isTable' }
	];
</script>

<svelte:head>
	<title>Logos - A scripting language that doesn't hurt your brain</title>
	<meta name="description" content="Logos is a lightweight scripting language with string interpolation, pipe operators, and try expressions. Built-in HTTP, JSON, concurrency. Compiles to binary." />
	<meta property="og:title" content="Logos - Scripting that flows" />
	<meta property="og:description" content="A lightweight scripting language with pipes, try expressions, and string interpolation. HTTP, JSON, concurrency built in." />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Logos - Scripting that flows" />
	<meta name="twitter:description" content="A lightweight scripting language with pipes, try expressions, and string interpolation." />
	<link rel="canonical" href="https://logos-lang.vercel.app/" />
</svelte:head>

<Hero />

<section class="border-t border-white/5 py-20 sm:py-28">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="text-2xl font-semibold sm:text-3xl">
				Everything you need, nothing you don't
			</h2>
			<p class="mt-3 max-w-xl mx-auto text-sm text-zinc-400">
				Modern language features without the complexity.
			</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as feature}
				<FeatureCard
					icon={feature.icon}
					title={feature.title}
					description={feature.description}
				/>
			{/each}
		</div>
	</div>
</section>

<section class="border-t border-white/5 py-20 sm:py-28">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="text-2xl font-semibold sm:text-3xl">
				Standard library included
			</h2>
			<p class="mt-3 max-w-xl mx-auto text-sm text-zinc-400">
				Common operations covered. Import what you need.
			</p>
		</div>

		<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each stdlibModules as mod}
				<a
					href="/docs/stdlib"
					class="rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-white/10 hover:bg-white/[0.05]"
				>
					<code class="font-mono text-sm text-white">{mod.name}</code>
					<p class="mt-1 text-xs text-zinc-500">{mod.desc}</p>
				</a>
			{/each}
		</div>

		<div class="mt-8 text-center">
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

<section class="border-t border-white/5 py-20 sm:py-28">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-10 lg:grid-cols-2 lg:items-center">
			<div>
				<h2 class="text-2xl font-semibold sm:text-3xl">
					Readable code, maintainable projects
				</h2>
				<p class="mt-3 max-w-md text-sm text-zinc-400">
					Logos syntax is designed for humans. C-like syntax that's easy to learn 
					and consistent across your codebase.
				</p>
				<a
					href="/docs/syntax"
					class="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
				>
					Read the docs
					<ArrowRight class="h-4 w-4" />
				</a>
			</div>

			<CodeBlock code={exampleCode} language="javascript" filename="example.lgs" />
		</div>
	</div>
</section>

<section class="border-t border-white/5 py-20 sm:py-28">
	<div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
		<h2 class="text-2xl font-semibold sm:text-3xl">
			Ready to try?
		</h2>
		<p class="mt-3 text-sm text-zinc-400">
			No installation required. Try it right in your browser.
		</p>
		<div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
			<a
				href="/playground"
				class="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
			>
				<Rocket class="h-4 w-4" />
				Open Playground
			</a>
			<a
				href="/docs"
				class="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
			>
				<BookOpen class="h-4 w-4" />
				Read Docs
			</a>
		</div>
	</div>
</section>

<section class="border-t border-white/5 py-12 sm:py-16">
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6">
		<p class="text-sm text-zinc-500">
			Made with Go · MIT License · 
			<a href="https://github.com/codetesla51/logos" class="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1">
				<Github class="h-3.5 w-3.5" />
				View on GitHub
			</a>
		</p>
		<p class="mt-2 text-xs text-zinc-600">
			Logos v0.4.5 · 
			<a href="/docs/changelog" class="hover:text-zinc-500 transition-colors">Changelog</a>
		</p>
	</div>
</section>
