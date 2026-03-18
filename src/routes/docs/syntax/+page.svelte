<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const jsonExample = `let json = parseJson("{\\"name\\":\\"uthman\\",\\"age\\":20}")
print(json["name"])  // uthman`;
</script>

<svelte:head>
	<title>Syntax & Types - Logos Documentation</title>
</svelte:head>

<DocLayout
	prev={{ title: 'Installation', href: '/docs/install' }}
	next={{ title: 'Standard Library', href: '/docs/stdlib' }}
>
	<h1>Syntax & Types</h1>

	<p>
		Logos is a lightweight scripting language designed for clarity. This page covers the complete
		syntax, including v0.4.0 features like string interpolation, pipe operators, and try expressions.
	</p>

	<h2 id="v04">v0.4.0 Highlights</h2>

	<p>Logos v0.4.0 introduces powerful features that make code cleaner and more expressive:</p>

	<div class="grid gap-4 my-4">
		<div class="bg-subtle border border-white/10 rounded-lg p-4">
			<h3 class="text-base font-semibold text-white mb-2">String Interpolation</h3>
			<p class="text-muted text-sm mb-2">Embed variables directly in strings with <code>{'$'}{'{'}{'}'}</code></p>
			<code class="text-xs text-green-400">let greeting = "Hello ${'${name}'}!"</code>
		</div>
		<div class="bg-subtle border border-white/10 rounded-lg p-4">
			<h3 class="text-base font-semibold text-white mb-2">Pipe Operator</h3>
			<p class="text-muted text-sm mb-2">Chain function calls left to right with <code>|></code></p>
			<code class="text-xs text-green-400">nums |> filter(fn) |> map(fn)</code>
		</div>
		<div class="bg-subtle border border-white/10 rounded-lg p-4">
			<h3 class="text-base font-semibold text-white mb-2">Try Expressions</h3>
			<p class="text-muted text-sm mb-2">Handle errors elegantly without verbose checks</p>
			<code class="text-xs text-green-400">let res = try httpGet(url)</code>
		</div>
	</div>

	<h2 id="variables">Variables</h2>

	<p>
		Variables are declared using the <code>let</code> keyword. Logos is dynamically typed, so you don't
		need to specify types.
	</p>

	<CodeBlock
		code={`// strings
let name = "uthman"

// numbers (integers and floats)
let age = 20
let score = 3.14

// booleans
let active = true

// null
let nothing = null

// postfix increment/decrement
let i = 0
i++     // 1
i--     // 0`}
		language="javascript"
	/>

	<h2 id="functions">Functions</h2>

	<p>
		Functions are first-class values in Logos. Define them with the <code>fn</code> keyword.
	</p>

	<CodeBlock
		code={`// regular function
let greet = fn(name) {
    return "hello " + name
}

// call it
print(greet("world"))`}
		language="javascript"
	/>

	<h3 id="arrow-functions">Arrow Functions</h3>

	<p>For simple functions, use the arrow syntax:</p>

	<CodeBlock
		code={`// single expression - implicit return
let double = fn(x) -> x * 2
let add = fn(x, y) -> x + y

// use them
print(toStr(double(5)))    // 10
print(toStr(add(2, 3)))    // 5`}
		language="javascript"
	/>

	<h2 id="control-flow">Control Flow</h2>

	<h3>If / Else</h3>

	<CodeBlock
		code={`let age = 20

if age > 18 {
    print("adult")
} else {
    print("minor")
}

// can also chain
if age < 13 {
    print("child")
} else if age < 20 {
    print("teenager")
} else {
    print("adult")
}`}
		language="javascript"
	/>

	<h3>Ternary Operator</h3>

	<p>Use <code>? :</code> for inline conditional expressions:</p>

	<CodeBlock
		code={`let age = 20
let status = age >= 18 ? "adult" : "minor"
print(status)

// in expressions
print("You are " + (age >= 18 ? "an adult" : "a minor"))`}
		language="javascript"
	/>

	<h3>For Loops</h3>

	<CodeBlock
		code={`// while-style loop
let i = 0
for i < 5 {
    print(toStr(i))
    i += 1
}`}
		language="javascript"
	/>

	<h3>For-In Loops</h3>

	<CodeBlock
		code={`// iterate over arrays
let nums = [1, 2, 3, 4, 5]
for n in nums {
    print(toStr(n))
}

// with index variable
for i, v in nums {
    print("\${i}: \${v}")
}`}
		language="javascript"
	/>

	<h2 id="arrays">Arrays</h2>

	<p>Arrays are ordered collections of values.</p>

	<CodeBlock
		code={`let fruits = ["apple", "banana", "mango"]

// access by index (0-based)
let first = fruits[0]
print(first)  // apple

// arrays can hold mixed types
let mixed = [1, "hello", true, null]`}
		language="javascript"
	/>

	<h2 id="string-interpolation">String Interpolation <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4</span></h2>

	<p>Embed expressions directly in strings with <code>{'$'}{'{'}{'}'}</code>. No more concatenation!</p>

	<CodeBlock
		code={`let name = "world"
let greeting = "Hello \${name}!"  // "Hello world!"

let age = 25
let year = 2024
let bio = "\${name} is \${age} in \${year}"
// "world is 25 in 2024"

// works with any expression
let nums = [1, 2, 3]
print("Sum: \${nums[0] + nums[1] + nums[2]}")  // "Sum: 6"

// in function calls
let formatUser = fn(user) {
    return "\${user.name} (\${user.role})"
}`}
		language="javascript"
	/>

	<h2 id="pipe-operator">Pipe Operator <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4</span></h2>

	<p>Chain function calls left to right with <code>|></code>. Makes data transformations readable!</p>

	<CodeBlock
		code={`let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// chain transformations
let result = nums
    |> filter(fn(x) -> x % 2 == 0)   // [2, 4, 6, 8, 10]
    |> map(fn(x) -> x * x)           // [4, 16, 36, 64, 100]
    |> filter(fn(x) -> x > 30)      // [36, 64, 100]

print(result)  // [36, 64, 100]

// with HTTP and JSON
let users = httpGet("https://api.example.com/users")
    |> parseJson
    |> filter(fn(u) -> u.active)
    |> map(fn(u) -> u.name)

// with arrays
let sum = [1, 2, 3, 4, 5]
    |> filter(fn(x) -> x % 2 == 1)   // [1, 3, 5]
    |> map(fn(x) -> x * 10)          // [10, 30, 50]
    |> reduce(fn(acc, x) -> acc + x, 0)  // 90`}
		language="javascript"
	/>

	<h2 id="try-expression">Try Expression <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4</span></h2>

	<p>Unwrap result tables and propagate errors automatically with <code>try</code>.</p>

	<CodeBlock
		code={`// Instead of verbose error checking:
let res = httpGet("https://api.example.com/data")
if !res.ok {
    print("Error: " + res.error)
    return
}
let data = res.value.body

// Use try to unwrap and propagate:
fn fetchUser(id) {
    let res = try httpGet("https://api.example.com/users/" + toStr(id))
    return parseJson(res.value.body)
}

// Try works with any function that returns Result
fn safeRead(path) {
    let content = try fileRead(path)
    return content
}

// In pipes - errors propagate automatically
let data = httpGet("https://api.example.com/users")
    |> try parseJson
    |> try filter(fn(u) -> u.active)
    |> map(fn(u) -> u.name)`}
		language="javascript"
	/>

	<h2 id="postfix-operators">Postfix Operators <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4</span></h2>

	<p>Postfix increment and decrement operators:</p>

	<CodeBlock
		code={`let count = 0
count++   // 1
count++   // 2
count--   // 1
print(toStr(count))  // 1`}
		language="javascript"
	/>

	<h2 id="tables">Tables (Hashmaps)</h2>

	<p>Tables are key-value collections, similar to objects or dictionaries.</p>

	<CodeBlock
		code={`let user = table{
    name: "uthman",
    age: 20,
    active: true,
}

// access values (dot notation)
print(user.name)     // uthman

// dot assignment
user.name = "new name"
print(user.name)     // new name

// nested tables
let data = table{
    user: table{
        name: "uthman",
        role: "admin",
    },
}`}
		language="javascript"
	/>

	<h2 id="switch">Switch</h2>

	<p>Switch statements for multi-way branching:</p>

	<CodeBlock
		code={`let role = "admin"

switch role {
    case "admin" { print("full access") }
    case "user"  { print("limited access") }
    default      { print("no access") }
}`}
		language="javascript"
	/>

	<h2 id="spawn">Spawn (Concurrency)</h2>

	<p>
		Run code concurrently using <code>spawn</code> blocks:
	</p>

	<CodeBlock
		code={`// spawn a single block
spawn {
    print("running concurrently")
}

// spawn a loop
let items = [1, 2, 3, 4, 5]
spawn for item in items {
    print(toStr(item))
}`}
		language="javascript"
	/>

	<h2 id="http">HTTP</h2>

	<p>Make HTTP requests with built-in functions:</p>

	<CodeBlock
		code={`// Basic usage
let res = httpGet("https://api.example.com/data")
if res.ok {
    print(res.value.body)
}

// With try expression (v0.4)
let data = try httpGet("https://api.example.com/users")

// POST request
let res = httpPost("https://api.example.com/users", "{\"name\": \"test\"}")`}
		language="javascript"
	/>

	<h2 id="file-io">File I/O</h2>

	<p>Read and write files:</p>

	<CodeBlock
		code={`// read a file
let file = fileRead("data.txt")
if file.ok {
    print(file.value)
}

// write to a file
fileWrite("output.txt", "Hello, World!")

// with try (v0.4)
let content = try fileRead("data.txt")`}
		language="javascript"
	/>

	<h2 id="json">JSON</h2>

	<p>Parse and work with JSON:</p>

	<CodeBlock code={jsonExample} language="javascript" />

	<h2 id="modules">Modules</h2>

	<p>Import standard library modules:</p>

	<CodeBlock
		code={`use "std/math"
use "std/array"
use "std/string"

print(toStr(mathFactorial(5)))   // 120
print(toStr(arraySum([1, 2, 3])))  // 6
print(strReverse("hello"))       // olleh`}
		language="javascript"
	/>

	<h2 id="closures">Closures</h2>

	<p>Functions capture their surrounding scope:</p>

	<CodeBlock
		code={`let makeCounter = fn() {
    let count = 0
    return fn() {
        count += 1
        return count
    }
}

let counter = makeCounter()
print(toStr(counter()))  // 1
print(toStr(counter()))  // 2
print(toStr(counter()))  // 3`}
		language="javascript"
	/>

	<h2 id="recursion">Recursion</h2>

	<p>Functions can call themselves:</p>

	<CodeBlock
		code={`let fib = fn(n) {
    if n <= 1 { return n }
    return fib(n - 1) + fib(n - 2)
}

print(toStr(fib(10)))  // 55`}
		language="javascript"
	/>
</DocLayout>
