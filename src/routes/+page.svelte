<script>
	import Hero from '$lib/components/Hero.svelte';
	import InstallBlock from '$lib/components/InstallBlock.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import { onMount } from 'svelte';

	const features = [
		{
			icon: 'Terminal',
			title: 'CLI First',
			description: 'File I/O, HTTP, JSON, and shell execution built in. No imports needed.'
		},
		{
			icon: 'Package',
			title: 'Embeddable',
			description: 'Embed in Go apps like Lua. Register functions and call scripts from Go.'
		},
		{
			icon: 'FileCode',
			title: 'Readable',
			description: 'C-like syntax that reads like prose. No boilerplate, no surprises.'
		},
		{
			icon: 'Zap',
			title: 'Concurrent',
			description: 'First-class concurrency with spawn blocks. Parallelize with ease.'
		},
		{
			icon: 'Binary',
			title: 'Compiles',
			description: 'Build to a single standalone binary. No runtime dependencies.'
		},
		{
			icon: 'Shield',
			title: 'Sandboxed',
			description: 'Restrict file, network, and shell access when embedding.'
		}
	];

	const exampleCode = `// Fetch and process data
let res = httpGet("https://api.example.com/data")

if res.ok {
    let data = parseJson(res.value.body)
    
    for item in data["items"] {
        print(item["name"])
    }
}

// Concurrent processing
spawn for url in urls {
    let r = httpGet(url)
    if r.ok {
        fileWrite("cache/" + hash(url), r.value.body)
    }
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
	<title>Logos - A readable scripting language</title>
	<meta
		name="description"
		content="A readable scripting language with C-like syntax, sane error handling, built-in concurrency, and build-to-binary support."
	/>
</svelte:head>

<!-- Hero Section -->
<Hero />

<!-- Features Section -->
<section class="bg-bg border-t border-border/30 py-20">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="text-text text-2xl font-semibold sm:text-3xl">Why Logos?</h2>
			<p class="text-muted mt-3 text-base">
				Everything you need for scripting. Nothing you don't.
			</p>
		</div>

		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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

<!-- Code Example Section -->
<section class="bg-subtle/30 border-t border-border/30 py-20">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<div class="mb-10 text-center">
			<h2 class="text-text text-2xl font-semibold sm:text-3xl">Clean and readable</h2>
			<p class="text-muted mt-3 text-base">
				Logos syntax stays out of your way.
			</p>
		</div>

		<CodeBlock code={exampleCode} language="javascript" filename="example.lgs" />
	</div>
</section>

<!-- Install Section -->
<section class="bg-bg border-t border-border/30 py-20">
	<div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
		<div class="mb-10 text-center">
			<h2 class="text-text text-2xl font-semibold sm:text-3xl">Install</h2>
			<p class="text-muted mt-3 text-base">One command. Linux and macOS.</p>
		</div>

		<InstallBlock />
	</div>
</section>

<!-- CTA Section -->
<section class="border-t border-border/30 py-20">
	<div class="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="text-text text-2xl font-semibold sm:text-3xl">Ready to start?</h2>
		<p class="text-muted mt-3 text-base">Read the docs and write your first script in minutes.</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
			<a
				href="/docs"
				class="bg-text text-bg hover:bg-text/90 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors"
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
