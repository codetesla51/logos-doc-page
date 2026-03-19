<script>
	import Hero from '$lib/components/Hero.svelte';
	import InstallBlock from '$lib/components/InstallBlock.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import { onMount } from 'svelte';
	import { Code2, Zap, Shield, Terminal, Box, FileCode } from 'lucide-svelte';

	const features = [
		{
			icon: Code2,
			title: 'String interpolation',
			description: 'Use ${variable} directly in strings. No more concatenation hell.'
		},
		{
			icon: Zap,
			title: 'Pipe operator',
			description: 'Chain functions with |>. arr |> filter(fn) |> map(fn)'
		},
		{
			icon: Shield,
			title: 'Try expressions',
			description: 'Error handling without boilerplate. try httpGet() propagates errors.'
		},
		{
			icon: Terminal,
			title: 'Built-in HTTP/JSON',
			description: 'No imports needed. httpGet, httpPost, parseJson all work out of the box.'
		},
		{
			icon: Box,
			title: 'Compiles to binary',
			description: 'lgs build script.lgs produces a single standalone executable.'
		},
		{
			icon: FileCode,
			title: 'Readable syntax',
			description: 'C-like syntax that reads like prose. You will actually understand it next week.'
		}
	];

	const exampleCode = `// Fetch and filter with pipe operator
let users = try httpGet("https://api.example.com/users")
    |> parseJson
    |> filter(fn(u) -> u.active)

// String interpolation - no concatenation needed
for user in users {
    print("\${user.name} - \${user.role}")
}

// Concurrent processing
spawn for url in urls {
    let r = try httpGet(url)
    let data = r.value.body |> parseJson
    fileWrite("cache/\${url}.json", toJson(data))
}`;

	let featureCards = [];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-fade-in');
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

<section class="border-t border-white/5 py-20 sm:py-28">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-14 text-center sm:mb-16">
			<h2 class="text-2xl font-semibold sm:text-3xl">Modern features. Zero setup.</h2>
			<p class="text-white/40 mt-4 text-sm sm:text-base max-w-lg mx-auto">
				v0.4.3 brings const, range(), and regex builtins.
			</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as feature, i}
				<div
					bind:this={featureCards[i]}
					class="translate-y-4 opacity-0"
					style="transition-delay: {i * 50}ms"
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

<section class="border-t border-white/5 py-20 sm:py-28">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-14 text-center sm:mb-16">
			<h2 class="text-2xl font-semibold sm:text-3xl">Clean and readable</h2>
			<p class="text-white/40 mt-4 text-sm sm:text-base">
				No boilerplate. No ceremony. Just code.
			</p>
		</div>

		<CodeBlock code={exampleCode} language="javascript" filename="example.lgs" />
	</div>
</section>

<section class="border-t border-white/5 py-20 sm:py-28">
	<div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
		<div class="mb-10 text-center sm:mb-14">
			<h2 class="text-2xl font-semibold sm:text-3xl">Install</h2>
			<p class="text-white/40 mt-4 text-sm sm:text-base">One command. Linux and macOS.</p>
		</div>

		<InstallBlock />
	</div>
</section>

<section class="border-t border-white/5 py-20 sm:py-28">
	<div class="mx-auto max-w-2xl text-center sm:px-6 lg:px-8">
		<h2 class="text-2xl font-semibold sm:text-3xl">Ready to start?</h2>
		<p class="text-white/40 mt-4 text-sm sm:text-base">Read the docs and write your first script in minutes.</p>
		<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href="/docs"
				class="bg-white text-black hover:bg-white/90 w-full rounded-xl px-8 py-3.5 text-sm font-medium transition-colors sm:w-auto"
			>
				Read the Docs
			</a>
			<a
				href="https://github.com/codetesla51/logos"
				target="_blank"
				rel="noopener noreferrer"
				class="text-white/40 hover:text-white text-sm font-medium transition-colors"
			>
				View on GitHub &rarr;
			</a>
		</div>
		<div class="mt-12 flex items-center justify-center gap-4">
			<a
				href="/docs/changelog"
				class="text-white/30 hover:text-white/50 text-xs transition-colors"
			>
				Changelog
			</a>
			<span class="text-white/10">·</span>
			<span class="text-white/30 text-xs">v0.4.3</span>
		</div>
	</div>
</section>

<style>
	:global(.animate-fade-in) {
		animation: fadeIn 0.5s ease-out forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(0.5rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
