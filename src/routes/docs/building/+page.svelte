<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Building Binaries - Logos Documentation</title>
</svelte:head>

<DocLayout
	prev={{ title: 'Embedding', href: '/docs/embedding' }}
	next={{ title: 'Examples', href: '/docs/examples' }}
>
	<h1>Building Binaries</h1>

	<p>
		Turn your Logos scripts into standalone executables. No Logos installation required on
		target machines — just run the binary.
	</p>

	<h2>Build Command</h2>

	<p>
		Run <code>lgs build</code> with your script:
	</p>

	<CodeBlock code={`lgs build script.lgs`} language="bash" />

	<p>
		This creates a binary named <code>script</code> (your filename without <code>.lgs</code>)
		in the current directory.
	</p>

	<h2>How It Works</h2>

	<p>
		Under the hood, <code>lgs build</code> does the following:
	</p>

	<ol>
		<li>Parses and validates your Logos code</li>
		<li>Creates a temporary Go project</li>
		<li>Generates a <code>main.go</code> that embeds your script as a string</li>
		<li>Links in the Logos interpreter and standard library</li>
		<li>Runs <code>go build</code> to produce a native executable</li>
	</ol>

	<p>
		The resulting binary is fully self-contained. It includes the Logos interpreter, your script,
		and the stdlib — everything bundled together.
	</p>

	<h2>Requirements</h2>

	<p>
		Building requires Go to be installed. The build process uses <code>go build</code> internally:
	</p>

	<CodeBlock
		code={`# Check Go is installed
go version
# go version go1.21+`}
		language="bash"
	/>

	<h2>Example Workflow</h2>

	<p>From script to binary in a few commands:</p>

	<CodeBlock
		code={`# 1. Write your script
cat > deploy.lgs << 'EOF'
let version = "1.2.0"
let target = args()[1]

print("Deploying \${version} to \${target}...")

let res = httpGet("https://api.example.com/health")
if res.ok {
    print("Server healthy, deploying...")
} else {
    print("Error: Server not ready")
    exit(1)
}

print("Deployment complete!")
EOF

# 2. Test with Logos interpreter
lgs deploy.lgs staging

# 3. Build to binary
lgs build deploy.lgs

# 4. Distribute and run the binary
./deploy staging`}
		language="bash"
	/>

	<h2>Shebang Support</h2>

	<p>
		Add a shebang to make scripts directly executable. The shebang is ignored during build:
	</p>

	<CodeBlock
		code={`#!/usr/bin/env lgs

print("I can be run directly!")
print("And built into a binary too.")`}
		language="javascript"
		filename="hello.lgs"
	/>

	<CodeBlock
		code={`# Make executable
chmod +x hello.lgs

# Run directly
./hello.lgs

# Or build it
lgs build hello.lgs
./hello`}
		language="bash"
	/>

	<h2>Custom Module Imports</h2>

	<p>
		If your script imports local modules, they're bundled automatically:
	</p>

	<CodeBlock
		code={`// In myapp.lgs
use "utils"
use "helpers"

print(formatMessage("Hello", "World"))`}
		language="javascript"
		filename="myapp.lgs"
	/>

	<CodeBlock
		code={`// utils.lgs — in the same directory
let formatMessage = fn(prefix, name) {
    return "\${prefix}, \${name}!"
}`}
		language="javascript"
		filename="utils.lgs"
	/>

	<p>
		Local modules (<code>use "mymodule"</code>) must be in the same directory as the main script.
		Standard library imports (<code>use "std/array"</code>) are always included.
	</p>

	<h2>Output</h2>

	<p>
		On success, you see the output filename:
	</p>

	<CodeBlock code={`Built: myapp`} language="text" />

	<p>
		The binary is created in your current working directory. Move it anywhere and run it —
		no Logos installation needed.
	</p>

	<h2>Troubleshooting</h2>

	<h3>Parse errors</h3>

	<p>
		Your script is validated before building. Fix syntax errors:
	</p>

	<CodeBlock
		code={`lgs build script.lgs
# Error: parse error at line 5: unexpected token '}'`}
		language="bash"
	/>

	<h3>Module not found</h3>

	<p>
		Ensure all <code>use "modulename"</code> imports exist in the same directory:
	</p>

	<CodeBlock
		code={`ls -la
# -rw-r--r--  myapp.lgs
# -rw-r--r--  utils.lgs
# -rw-r--r--  helpers.lgs`}
		language="bash"
	/>

	<h3>Go not found</h3>

	<p>
		Install Go first: <a href="https://go.dev/doc/install" class="text-text hover:underline">https://go.dev/doc/install</a>
	</p>

	<h3>Binary too large</h3>

	<p>
		Binary size is typically 10-20MB depending on platform. This includes the full interpreter.
		For comparison, a "hello world" in C is ~15KB; a Logos binary includes the runtime.
	</p>
</DocLayout>
