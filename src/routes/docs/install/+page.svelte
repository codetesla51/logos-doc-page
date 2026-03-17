<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import InstallBlock from '$lib/components/InstallBlock.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Installation - Logos Documentation</title>
</svelte:head>

<DocLayout
	prev={{ title: 'Introduction', href: '/docs' }}
	next={{ title: 'Syntax & Types', href: '/docs/syntax' }}
>
	<!-- INSTALLATION CONTENT HERE -->
	<h1>Installation</h1>

	<p>Get Logos up and running on your system in seconds.</p>

	<h2>Quick Install</h2>

	<p>The fastest way to install Logos is with our install script:</p>

	<InstallBlock />

	<p>This script automatically detects your system and installs the appropriate binary.</p>

	<h2>Manual Installation</h2>

	<p>If you prefer to install manually, download the appropriate binary for your system:</p>

	<h3>Linux (amd64)</h3>

	<CodeBlock
		code={`wget https://github.com/codetesla51/logos/releases/latest/download/logos-linux-amd64
chmod +x logos-linux-amd64
sudo mv logos-linux-amd64 /usr/local/bin/lgs`}
		language="bash"
	/>

	<h3>macOS (Apple Silicon)</h3>

	<CodeBlock
		code={`curl -LO https://github.com/codetesla51/logos/releases/latest/download/logos-darwin-arm64
chmod +x logos-darwin-arm64
sudo mv logos-darwin-arm64 /usr/local/bin/lgs`}
		language="bash"
	/>

	<h3>macOS (Intel)</h3>

	<CodeBlock
		code={`curl -LO https://github.com/codetesla51/logos/releases/latest/download/logos-darwin-amd64
chmod +x logos-darwin-amd64
sudo mv logos-darwin-amd64 /usr/local/bin/lgs`}
		language="bash"
	/>

	<h2>Build from Source</h2>

	<p>You can also build Logos from source if you have Go installed:</p>

	<CodeBlock
		code={`git clone https://github.com/codetesla51/logos.git
cd logos
go build -o lgs ./cmd/logos
sudo mv lgs /usr/local/bin/`}
		language="bash"
	/>

	<h2>Requirements</h2>

	<ul>
		<li><strong>Operating System:</strong> Linux or macOS</li>
		<li><strong>Architecture:</strong> x86_64 (amd64) or ARM64</li>
		<li><strong>Go (for building):</strong> 1.21 or later</li>
	</ul>

	<h2>Verify Installation</h2>

	<p>After installation, verify that Logos is working:</p>

	<CodeBlock code={`lgs --version`} language="bash" />

	<p>You should see the version number printed to the console.</p>

	<h2>Your First Script</h2>

	<p>
		Create a file called <code>hello.lgs</code>:
	</p>

	<CodeBlock
		code={`let name = "World"
print("Hello, " + name + "!")`}
		language="javascript"
		filename="hello.lgs"
	/>

	<p>Run it:</p>

	<CodeBlock code={`lgs hello.lgs`} language="bash" />

	<p>
		You should see <code>Hello, World!</code> printed to your terminal.
	</p>

	<h2>Interactive REPL</h2>

	<p>
		Logos includes an interactive REPL (Read-Eval-Print Loop) for experimenting with code. Just run <code>lgs</code> without any arguments:
	</p>

	<CodeBlock code={`lgs`} language="bash" />

	<p>This starts the interactive shell:</p>

	<CodeBlock
		code={`>_ Logos v0.3.0 (Mar 02 2026, 12:52:39) on linux
Type "help" for more information
>>>`}
		language="text"
	/>

	<p>
		From here you can type Logos expressions and see results immediately. Great for testing ideas and learning the language.
	</p>
</DocLayout>
