<script>
  import DocLayout from '$lib/components/DocLayout.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  const exampleCode = `// Fetch config, handle errors gracefully
let res = fileRead("config.json")
if !res.ok {
    print(colorRed("Error: " + res.error))
    exit(1)
}

let config = try parseJson(res.value)

// String interpolation makes templates readable
let greeting = "Hello, \${config["name"]}! Your plan: \${config["plan"]}"

// Ternary for simple conditions
let status = config["active"] ? "active" : "inactive"
print("\${status} - \${greeting}")

// Dot assignment mutates table fields
config["version"] = "2.0"

// For-in with index for numbered lists
let tasks = ["build", "test", "deploy"]
for i, task in tasks {
    print("\${i + 1}. \${task}")
}

// Range with step (0 to 10, exclusive)
for i in range(0, 10, 2) {
    print(i)  // 0, 2, 4, 6, 8
}

// Run tasks concurrently when order doesn't matter
spawn for task in tasks {
    processTask(task)
}`;
</script>

<DocLayout prev={null} next={{ title: 'Installation', href: '/docs/install' }}>
  <h1>Introduction to Logos</h1>

  <p>
    Logos is a scripting language designed for clarity. When Bash scripts grow past a few dozen
    lines, Logos is what you reach for — readable syntax, proper error handling, and code you'll
    still understand next month.
  </p>

  <h2>Why Logos?</h2>

  <p>
    Bash is fine for one-liners. But as scripts grow, they become unreadable. Logos solves
    this with:
  </p>

  <ul>
    <li>
      <strong>Readable syntax</strong> — C-like structure that reads like English prose, not line noise
    </li>
    <li>
      <strong>Sane error handling</strong> — Functions return result objects. Check <code>.ok</code>,
      handle <code>.error</code>. No silent failures.
    </li>
    <li>
      <strong>Batteries included</strong> — File I/O, HTTP, JSON, shell execution all work without imports
    </li>
    <li>
      <strong>Concurrency</strong> — <code>spawn</code> blocks run tasks in parallel when order doesn't matter
    </li>
    <li>
      <strong>Compile to binary</strong> — <code>lgs build script.lgs</code> produces a standalone executable
    </li>
    <li>
      <strong>Embed in Go</strong> — Integrate into your Go applications like Lua or JavaScript
    </li>
  </ul>

  <h2>A Taste of Logos</h2>

  <p>
    Here's a script that reads a config file, parses JSON, uses string interpolation, and runs
    tasks concurrently:
  </p>

  <CodeBlock code={exampleCode} language="javascript" filename="example.lgs" />

  <h2>CLI Commands</h2>

  <p>Run scripts, format code, or build binaries:</p>

  <CodeBlock
    code={`lgs hello.lgs        # Run a script
lgs fmt script.lgs    # Format code (auto-fixes indentation)
lgs build script.lgs  # Compile to standalone binary
lgs                   # Start the REPL for quick experiments`}
    language="bash"
  />
</DocLayout>
