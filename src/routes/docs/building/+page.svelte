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
		Logos can compile your scripts into standalone executables. This allows you to distribute your
		applications without requiring users to have Logos installed.
	</p>

	<h2>The Build Command</h2>

	<p>
		Use <code>lgs build</code> to compile a Logos script into a binary:
	</p>

	<CodeBlock code={`lgs build script.lgs`} language="bash" />

	<p>
		This creates an executable named <code>script</code> (matching your script name without the
		<code>.lgs</code> extension) in the current directory.
	</p>

	<h2>How It Works</h2>

	<p>When you run <code>lgs build</code>, Logos:</p>

	<ol>
		<li>Parses and validates your Logos code</li>
		<li>Creates a temporary build directory</li>
		<li>Generates a Go main.go that embeds your script</li>
		<li>Copies the standard library into the build</li>
		<li>Resolves and includes any user modules your script imports</li>
		<li>Compiles everything using <code>go build</code></li>
		<li>Produces a standalone executable</li>
	</ol>

	<p>
		The resulting binary contains everything needed to run your script, including the Logos
		interpreter, your script source, the standard library, and any user modules.
	</p>

	<h2>User Modules</h2>

	<p>
		If your script imports custom modules using <code>use "modulename"</code>, the build process
		automatically finds and bundles them. Modules should be in the same directory as your main script:
	</p>

	<CodeBlock
		code={`// myapp.lgs
use "utils"
use "helpers"

// Your code here
print(helperFunction())`}
		language="javascript"
	/>

	<CodeBlock
		code={`// utils.lgs (in same directory)
let utilFunction = fn() {
    return "utility"
}`}
		language="javascript"
	/>

	<p>
		Standard library modules (<code>array</code>, <code>log</code>, <code>math</code>, <code>path</code>,
		<code>string</code>, <code>testing</code>, <code>time</code>, <code>type</code>) are always
		included automatically.
	</p>

	<h2>Requirements</h2>

	<p>Building requires Go to be installed on your system, since the build process uses <code>go build</code> under the hood.</p>

	<CodeBlock
		code={`# Check if Go is installed
go version

# If not, install Go first
# See: https://go.dev/doc/install`}
		language="bash"
	/>

	<h2>Example Workflow</h2>

	<p>Here's a typical workflow for building and distributing a Logos application:</p>

	<CodeBlock
		code={`# Write your script
print("Hello from Logos!")

# Save as myapp.lgs, then test it
lgs myapp.lgs

# Build to binary
lgs build myapp.lgs

# Run the binary
./myapp`}
		language="bash"
	/>

	<h2>Shebang Support</h2>

	<p>
		Logos scripts can include a shebang line for direct execution. The shebang is automatically
		stripped during both interpretation and building:
	</p>

	<CodeBlock
		code={`#!/usr/bin/env lgs

print("This script can be run directly!")
print("Or built into a binary.")`}
		language="javascript"
	/>

	<CodeBlock
		code={`# Make executable and run directly
chmod +x myscript.lgs
./myscript.lgs

# Or build it
lgs build myscript.lgs
./myscript`}
		language="bash"
	/>

	<h2>Build Output</h2>

	<p>On a successful build, you'll see:</p>

	<CodeBlock code={`Built: myapp`} language="text" />

	<p>The binary is created in your current working directory.</p>

	<h2>Troubleshooting</h2>

	<h3>Build fails with parse errors</h3>

	<p>
		The build validates your script before compiling. Fix any syntax errors shown in the output:
	</p>

	<CodeBlock
		code={`lgs build broken.lgs
# Output shows: parse error: unexpected token...`}
		language="bash"
	/>

	<h3>Build fails with "module not found"</h3>

	<p>
		Ensure all imported modules exist in the same directory as your main script. The build process
		looks for <code>modulename.lgs</code> relative to the script location.
	</p>

	<h3>Build fails with Go errors</h3>

	<p>
		Make sure Go is properly installed and <code>go build</code> works:
	</p>

	<CodeBlock
		code={`# Verify Go installation
go version

# Check Go environment
go env GOROOT GOPATH`}
		language="bash"
	/>

	<h3>Cannot find std directory</h3>

	<p>
		The build process needs access to the Logos standard library. This is typically found relative to
		the <code>lgs</code> binary or in the current working directory.
	</p>
</DocLayout>
