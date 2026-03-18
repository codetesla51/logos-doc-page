<script>
	import Hero from '$lib/components/Hero.svelte';
	import InstallBlock from '$lib/components/InstallBlock.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import { onMount } from 'svelte';

	const features = [
		{
			icon: 'Code2',
			title: 'String interpolation',
			description: 'Use ${variable} directly in strings. No more concatenation hell.'
		},
		{
			icon: 'Zap',
			title: 'Pipe operator',
			description: 'Chain functions with |>. arr |> filter(fn) |> map(fn)'
		},
		{
			icon: 'Shield',
			title: 'Try expressions',
			description: 'Error handling without boilerplate. try httpGet() propagates errors.'
		},
		{
			icon: 'Terminal',
			title: 'Built-in HTTP/JSON',
			description: 'No imports needed. httpGet, httpPost, parseJson all work out of the box.'
		},
		{
			icon: 'Box',
			title: 'Compiles to binary',
			description: 'lgs build script.lgs produces a single standalone executable.'
		},
		{
			icon: 'FileCode',
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

<section class="bg-bg border-t border-border/30 py-12 sm:py-20">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-8 text-center sm:mb-12">
			<h2 class="text-text text-2xl font-semibold sm:text-3xl">Modern features. Zero setup.</h2>
			<p class="text-muted mt-3 text-sm sm:text-base">
				v0.4.0 brings string interpolation, pipe operators, and try expressions.
			</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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

<section class="bg-subtle/30 border-t border-border/30 py-12 sm:py-20">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<div class="mb-8 text-center sm:mb-10">
			<h2 class="text-text text-2xl font-semibold sm:text-3xl">Clean and readable</h2>
			<p class="text-muted mt-3 text-sm sm:text-base">
				No boilerplate. No ceremony. Just code.
			</p>
		</div>

		<CodeBlock code={exampleCode} language="javascript" filename="example.lgs" />
	</div>
</section>

<section class="bg-bg border-t border-border/30 py-12 sm:py-20">
	<div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
		<div class="mb-8 text-center sm:mb-10">
			<h2 class="text-text text-2xl font-semibold sm:text-3xl">Install</h2>
			<p class="text-muted mt-3 text-sm sm:text-base">One command. Linux and macOS.</p>
		</div>

		<InstallBlock />
	</div>
</section>

<section class="border-t border-border/30 py-12 sm:py-20">
	<div class="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="text-text text-2xl font-semibold sm:text-3xl">Ready to start?</h2>
		<p class="text-muted mt-3 text-sm sm:text-base">Read the docs and write your first script in minutes.</p>
		<div class="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
			<a
				href="/docs"
				class="bg-text text-bg hover:bg-text/90 w-full rounded-lg px-6 py-3 text-sm font-medium transition-colors sm:w-auto"
			>
				Read the Docs
			</a>
			<a
				href="https://github.com/codetesla51/logos"
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted hover:text-text text-sm font-medium transition-colors"
			>
				View on GitHub &rarr;
			</a>
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
