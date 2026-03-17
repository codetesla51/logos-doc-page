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
		This page covers the complete syntax of Logos. The language is designed to be minimal and
		expressive, with a focus on readability.
	</p>

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
let nothing = null`}
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
    print(toStr(i) + ": " + toStr(v))
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

	<h2 id="tables">Tables (Hashmaps)</h2>

	<p>Tables are key-value collections, similar to objects or dictionaries.</p>

	<CodeBlock
		code={`let user = table{
    "name": "uthman",
    "age": 20,
    "active": true,
}

// access values (bracket or dot)
print(user["name"])  // uthman
print(user.name)     // uthman

// dot assignment
user.name = "new name"
print(user.name)     // new name

// nested tables
let data = table{
    "user": table{
        "name": "uthman",
        "role": "admin",
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
		code={`let res = httpGet("https://api.example.com/data")

if res.ok {
    print(res.value.body)
} else {
    print("request failed")
}`}
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
fileWrite("output.txt", "Hello, World!")`}
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
