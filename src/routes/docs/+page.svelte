<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const exampleCode = `// Read a config file
let res = fileRead("config.json")
if !res.ok {
    print(colorRed("Error: " + res.error))
    exit(1)
}

let config = parseJson(res.value)
print("App: " + config["name"])

if config.age > 18 {
    print("adult")
} else if config.age > 13 {
    print("teenager")
} else {
    print("child")
}

// Run tasks concurrently
spawn for task in tasks {
    print("Processing: " + task)
}`;
</script>

<svelte:head>
	<title>Introduction - Logos Documentation</title>
</svelte:head>

<DocLayout prev={null} next={{ title: 'Installation', href: '/docs/install' }}>
	<h1>Introduction to Logos</h1>

	<p>
		<strong>Logos</strong> (from Greek, meaning <em>word</em>, <em>reason</em>, or <em>logic</em>) is a scripting language designed to be read and understood, not deciphered.
	</p>

	<p>
		It's what you reach for when Bash becomes unreadable after line three. A CLI-first language built for the kind of work Bash handles poorly: readable logic, proper error handling, and code you can come back to a week later and still understand.
	</p>

	<h2>What makes Logos different?</h2>

	<ul>
		<li><strong>Readable syntax</strong> — C-like syntax that reads like prose, not line noise</li>
		<li><strong>Sane error handling</strong> — Result tables instead of exceptions. Check <code>.ok</code>, handle <code>.error</code></li>
		<li><strong>Batteries included</strong> — File I/O, HTTP, JSON, shell execution built in with no imports</li>
		<li><strong>Concurrency</strong> — Simple <code>spawn</code> blocks for parallel execution</li>
		<li><strong>Compile to binary</strong> — <code>lgs build script.lgs</code> produces a standalone executable</li>
		<li><strong>Embeddable</strong> — Integrate into Go applications like Lua</li>
	</ul>

	<h2>Who is it for?</h2>

	<p>Logos is built for:</p>

	<ul>
		<li>Developers writing automation scripts that outgrow Bash</li>
		<li>CLI tools that need readable, maintainable code</li>
		<li>Projects requiring an embeddable scripting language</li>
		<li>Anyone tired of deciphering their own scripts</li>
	</ul>

	<h2>Quick Example</h2>

	<p>Here's a taste of Logos:</p>

	<CodeBlock code={exampleCode} language="javascript" filename="example.lgs" />

	<h2>CLI Usage</h2>

	<CodeBlock
		code={`lgs script.lgs        # Run a script
lgs fmt script.lgs    # Format code
lgs build script.lgs  # Compile to binary
lgs                   # Start the REPL`}
		language="bash"
	/>

	<h2>Getting Started</h2>

	<p>
		Ready to dive in? Head to the <a href="/docs/install">Installation</a> guide to set up Logos,
		then explore the <a href="/docs/syntax">Syntax & Types</a> reference to learn the language.
	</p>
</DocLayout>
