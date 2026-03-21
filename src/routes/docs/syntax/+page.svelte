<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
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
		Logos is dynamically typed — you declare variables with <code>let</code>, and the interpreter
		figures out the rest. This page covers all the core syntax.
	</p>

	<h2 id="variables">Variables</h2>

	<p>
		Variables are declared with <code>let</code> and are mutable by default. Reassign with
		<code>=</code> or use compound operators like <code>+=</code>:
	</p>

	<CodeBlock
		code={`// All basic types
let name = "Uthman"     // string
let age = 20           // integer
let score = 3.14       // float
let active = true      // boolean
	let nothing = null     // null

// nil is also accepted (canonical form is null)
let empty = nil

// Reassign freely — no type annotations needed
age = 21

// Compound assignment
let count = 0
count += 5   // 5
count -= 2   // 3

// Postfix increment/decrement (v0.4+)
	let i = 0
i++   // 1
i--   // 0`}
		language="javascript"
	/>

	<p>
		<strong>Note:</strong> Both <code>null</code> and <code>nil</code> are valid. <code>null</code> is the
		canonical form used internally.
	</p>

	<p>
		<strong>Gotcha:</strong> Use <code>const</code> for immutable bindings. Reassignment throws a runtime error.
	</p>

	<CodeBlock
		code={`// const for immutable bindings (v0.4.2)
const PI = 3.14159
const MAX_RETRIES = 3

// Mutable with let
let counter = 0
counter++  // OK

// This throws a runtime error:
// PI = 3.14  // Error: cannot reassign const`}
		language="javascript"
	/>

	<h2 id="functions">Functions</h2>

	<p>
		Functions are first-class values — assign them to variables, pass them around, return them
		from other functions. Define with <code>fn</code>:
	</p>

	<CodeBlock
		code={`// Named function
fn greet(name) {
    return "Hello, " + name + "!"
}

// Anonymous function assigned to variable
let double = fn(x) {
    return x * 2
}

// Arrow syntax for single-expression functions (implicit return)
let triple = fn(x) -> x * 3

// Call them
print(greet("World"))  // Hello, World!
print(str(double(5)))  // 10`}
		language="javascript"
	/>

	<h3>When to use arrow functions</h3>

	<p>
		Use arrow syntax (<code>fn(x) -&gt; x * 2</code>) for short, pure transformations —
		map/filter callbacks, simple calculations. Use full <code>fn(x) &#123; ... &#125;</code> syntax
		for multi-statement functions, loops, or complex logic.
	</p>

	<p>Both forms are equivalent — choose based on readability:</p>

	<CodeBlock
		code={`// These two functions do the same thing:
fn double(x) -> x * 2     // arrow syntax (implicit return)
fn double(x) { return x * 2 }  // block syntax (explicit return)`}
		language="javascript"
	/>

	<h2 id="closures">Closures</h2>

	<p>
		Functions capture their surrounding scope. This lets you create factory functions that
		produce specialized behavior:
	</p>

	<CodeBlock
		code={`// makeAdder returns a new function that "remembers" x
let makeAdder = fn(x) {
    return fn(y) -> x + y
}

let add5 = makeAdder(5)
let add10 = makeAdder(10)

print(str(add5(3)))   // 8
print(str(add10(3)))  // 13

// Classic counter example
let makeCounter = fn() {
    let count = 0
    return fn() {
        count += 1
        return count
    }
}

let counter = makeCounter()
print(str(counter()))  // 1
print(str(counter()))  // 2
print(str(counter()))  // 3`}
		language="javascript"
	/>

	<h3>Why closures matter</h3>

	<p>
		Closures replace the need for classes or objects in many situations. They let you create
		private state, factory functions, and function factories without complex boilerplate.
	</p>

	<h2 id="control-flow">Control Flow</h2>

	<h3>If / Else</h3>

	<p>
		Branching works like most languages. Chain with <code>else if</code>:
	</p>

	<CodeBlock
		code={`let age = 20

if age >= 65 {
    print("senior discount!")
} else if age >= 18 {
    print("adult fare")
} else {
    print("child fare")
}

// Ternary operator for simple cases (v0.3.2+)
let price = age >= 65 ? 5 : age >= 18 ? 10 : 5
print("Ticket: $" + str(price))`}
		language="javascript"
	/>

	<h3>While-style For Loops</h3>

	<p>
		For loops with a condition run until the condition is false. It's a while loop with
		different syntax:
	</p>

	<CodeBlock
		code={`let i = 0
for i < 5 {
    print(str(i))
    i += 1
}
// Prints: 0, 1, 2, 3, 4`}
		language="javascript"
	/>

	<h3>For-In Loops</h3>

	<p>
		Iterate over arrays or table keys. Use the index variant when you need the position:
	</p>

	<CodeBlock
		code={`let fruits = ["apple", "banana", "mango"]

// Element only
for fruit in fruits {
    print(fruit)
}

// With index — i is position, v is value
for i, v in fruits {
    print(str(i) + ": " + v)
}
// Prints: 0: apple, 1: banana, 2: mango`}
		language="javascript"
	/>

	<h3>Numeric Ranges <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4.2</span></h3>

	<p>
		Use <code>range(start, end, step?)</code> for numeric iteration. <strong>End is exclusive</strong> — 
		it stops before reaching the end value:
	</p>

	<CodeBlock
		code={`// 0 to 10 (exclusive), so prints 0-9
for i in range(0, 10) {
    print(i)
}

// With step (default is 1)
for i in range(0, 10, 2) {
    print(i)  // 0, 2, 4, 6, 8
}

// Countdown with step=-1
for i in range(5, 0, -1) {
    print(i)  // 5, 4, 3, 2, 1
}

// Note: range(0, 10) excludes 10
// range(5, 0, -1) excludes 0`}
		language="javascript"
	/>

	<h3>Switch</h3>

	<p>
		Switch statements are useful when you have multiple conditions on the same value.
		Each <code>case</code> runs its block and then exits (no fallthrough):
	</p>

	<CodeBlock
		code={`let role = "admin"

switch role {
    case "admin" {
        print("full access")
    }
    case "editor" {
        print("can edit")
    }
    case "viewer" {
        print("read only")
    }
    default {
        print("no access")
    }
}`}
		language="javascript"
	/>

	<h2 id="arrays">Arrays</h2>

	<p>
		Arrays are ordered collections. They can hold mixed types. Access by zero-based index:
	</p>

	<CodeBlock
		code={`let scores = [95, 87, 92, 78, 88]

// Access by index
let first = scores[0]    // 95
let last = scores[4]     // 88

// Update an element
scores[0] = 100

// Array length
print(str(len(scores)))  // 5

// Mix types (generally avoid this in practice)
let mixed = [1, "hello", true, null]

// Nested arrays
let matrix = [[1, 2], [3, 4]]`}
		language="javascript"
	/>

	<h3>Common array operations</h3>

	<p>
		Logos has built-in functions for common operations. The <a href="/docs/stdlib">stdlib</a>
		has more powerful versions:
	</p>

	<CodeBlock
		code={`let nums = [1, 2, 3, 4, 5]

push(nums, 6)          // Add to end
prepend(nums, 0)       // Add to start
pop(nums)              // Remove and return last
first(nums)            // First element (1)
last(nums)             // Last element (5)
tail(nums)             // Everything except first
reverse(nums)          // Reversed copy
sort(nums)             // Sorted (v0.4.1: strings or numbers)
contains(nums, 3)      // true`}
		language="javascript"
	/>

	<h2 id="tables">Tables</h2>

	<p>
		Tables are key-value collections — the equivalent of objects, dicts, or hashmaps.
		Use dot notation for string keys, bracket notation for dynamic keys:
	</p>

	<CodeBlock
		code={`let user = table{
    name: "Alice",
    age: 30,
    active: true,
}

// Dot access (preferred for string keys)
print(user.name)     // Alice
user.name = "Bob"    // Mutates the field
print(user.name)     // Bob

// Bracket access (for dynamic keys)
let key = "age"
print(user[key])     // 30

// Nested tables
let company = table{
    name: "Acme",
    address: table{
        city: "Seattle",
        zip: "98101",
    },
}
print(company.address.city)  // Seattle`}
		language="javascript"
	/>

	<h3>Table utilities</h3>

	<CodeBlock
		code={`let config = table{ host: "localhost", port: 8080 }

// Get all keys or values
let k = keys(config)    // ["host", "port"]
let v = values(config)  // ["localhost", 8080]

// Check if key exists
has(config, "host")      // true
has(config, "debug")     // false

// Delete a key
let smaller = tableDelete(config, "port")

// Merge two tables
let extra = table{ debug: true, timeout: 30 }
let merged = merge(config, extra)`}
		language="javascript"
	/>

	<h3>When to use tables</h3>

	<p>
		Use tables for structured data — user profiles, API responses, configuration, game entities.
		They're more expressive than arrays when each item has named fields.
	</p>

	<p class="text-amber-400 text-sm">
		<strong>Note:</strong> Table key ordering is non-deterministic. Go maps don't preserve insertion order.
		This affects table comparisons — two tables with the same keys/values may appear different
		if compared as strings. Use explicit key-by-key comparison when order matters.
	</p>

	<h2 id="string-interpolation">String Interpolation <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4</span></h2>

	<p>
		Embed variables and expressions directly in strings with <code>${'${'}</code>. This replaces
		ugly concatenation:
	</p>

	<CodeBlock
		code={`// Instead of this:
print("Hello, " + name + "! You have " + str(count) + " messages.")

// Do this:
print("Hello, \${name}! You have \${count} messages.")`}
		language="javascript"
	/>

	<p>
		Interpolation works with any expression — variables, calculations, function calls, array access:
	</p>

	<CodeBlock
		code={`let name = "World"
let nums = [1, 2, 3]

// Basic
let greeting = "Hello, \${name}!"  // "Hello, World!"

// In expressions
let total = nums[0] + nums[1] + nums[2]
print("Sum: \${total}")  // "Sum: 6"

// Function calls in strings
let items = ["apple", "banana"]
print("Fruits: \${join(items, ", ")}")  // "Fruits: apple, banana"

// Table access
let user = table{ name: "Alice", role: "admin" }
print("\${user.name} is \${user.role}")  // "Alice is admin"`}
		language="javascript"
	/>

	<p>
		<strong>Gotcha:</strong> No quoted strings inside <code>${'${'}</code> blocks.
		Extract to a variable first:
	</p>

	<CodeBlock
		code={`// WRONG:
let msg = "Price: \${"$" + price}"   // syntax error

// CORRECT:
let dollar = "$"
let msg = "Price: \${dollar + price}"`}
		language="javascript"
	/>

	<h2 id="pipe-operator">Pipe Operator <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4</span></h2>

	<p>
		The pipe operator (<code>|></code>) passes the left value as the first argument to the
		right function. It makes data transformations readable:
	</p>

	<CodeBlock
		code={`// Without pipe — nested function calls (hard to read)
let nums = [10, 20, 30]
let doubled = []
for n in nums {
    push(doubled, n * 2)
}

// With pipe — left to right
let nums = [10, 20, 30]
let doubled = nums
    |> push(_, 10)
    |> push(_, 20)
    |> push(_, 30)

// Or just use a loop
for n in nums {
    print(n * 2)
}`}
		language="javascript"
	/>

	<p>
		Pipe shines with array operations. Chain as many as you need:
	</p>

	<CodeBlock
		code={`// Simple pipe — pass value to a function
let name = "world"
let greeting = "Hello, " + name  // Without pipe
let greeting2 = name |> upper()  // With pipe

// Chain transformations
let nums = [1, 2, 3, 4, 5]
let text = str(nums) |> upper() |> replace(" ", "-")
print(text)  // [1,-2,-3,-4,-5]`}
		language="javascript"
	/>

	<h3>Pipe with try</h3>

	<p>
		Combine pipe with <code>try</code> for elegant data pipelines that handle errors at the end:
	</p>

	<CodeBlock
		code={`// Fetch and parse with error handling
let res = try httpGet("https://api.example.com/users")
let data = try parseJson(res)

// Filter and transform without std/array
let active = []
for user in data {
    if user.active {
        push(active, user.name)
    }
}

// If httpGet fails, error propagates immediately
// No need to check .ok at every step`}
		language="javascript"
	/>

	<h2 id="try-expression">Try Expression <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4</span></h2>

	<p>
		Many built-in functions return result objects: <code>{'{'}ok, value, error{'}'}</code>.
		Checking these manually gets tedious. The <code>try</code> keyword unwraps the value
		and propagates errors automatically:
	</p>

	<CodeBlock
		code={`// Without try — verbose
fn readConfig(path) {
    let res = fileRead(path)
    if !res.ok {
        print("Failed: " + res.error)
        return null
    }
    let json = parseJson(res.value)
    if !json.ok {
        print("Invalid JSON: " + json.error)
        return null
    }
    return json.value
}

// With try — errors propagate automatically
fn readConfig(path) {
    let content = try fileRead(path)
    let config = try parseJson(content)
    return config
}

// If fileRead fails, readConfig returns the error immediately
// No explicit error checking needed`}
		language="javascript"
	/>

	<h3>When try propagates</h3>

	<p>
		Try unwraps the value if <code>.ok</code> is true, or returns a result object with
		<code>.ok = false</code> and the error message. In a function, this means the
		function returns early with the error.
	</p>

	<h2 id="postfix-operators">Postfix Operators <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4</span></h2>

	<p>
		<code>i++</code> increments and <code>i--</code> decrements by 1. The value of the
		expression is the <em>old</em> value (postfix behavior):
	</p>

	<CodeBlock
		code={`let n = 5
print(str(n++))   // 5 (prints old value, then increments)
print(str(n))     // 6

print(str(n--))   // 6 (prints old value, then decrements)
print(str(n))     // 5

// Common use: loop counters
for i = 0; i < 3; i++ {
    print(str(i))
}
// Prints: 0, 1, 2`}
		language="javascript"
	/>

	<h2 id="spawn">Concurrency</h2>

	<p>
		<code>spawn</code> runs code asynchronously in parallel goroutines. The program waits for all
		spawned tasks to complete before exiting. Use it when you have independent tasks:
	</p>

	<CodeBlock
		code={`// Spawn a single task
spawn {
    print("This runs in the background")
}

// Spawn a loop — each iteration runs concurrently
let urls = [
    "https://api.example.com/users",
    "https://api.example.com/posts",
    "https://api.example.com/comments",
]

spawn for url in urls {
    let data = try httpGet(url)
    cacheResult(url, data)
}

print("All requests queued")  // Prints immediately`}
		language="javascript"
	/>

	<h3>When to use spawn</h3>

	<p>
		Good for: parallel HTTP requests, batch file processing, concurrent computations.
		<strong>Not</strong> for: tasks that depend on each other's results, or when order matters.
	</p>

	<h2 id="http">HTTP Requests</h2>

	<p>
		HTTP functions return result objects. Always check for errors:
	</p>

	<CodeBlock
		code={`// GET request
let res = httpGet("https://api.example.com/users")
if res.ok {
    print(res.value.body)
} else {
    print("Error: " + res.error)
}

// With try + pipe (recommended in v0.4+)
let body = try httpGet("https://api.example.com/users")

// POST with JSON body
let payload = toJson(table{ name: "Alice", email: "alice@example.com" })
let res = httpPost("https://api.example.com/users", payload)

// With custom headers
let headers = table{
    "Authorization": "Bearer " + env("API_TOKEN"),
    "Content-Type": "application/json",
}
let data = try httpGet("https://api.example.com/private", headers)`}
		language="javascript"
	/>

	<p>
		Available methods: <code>httpGet</code>, <code>httpPost</code>, <code>httpPut</code>,
		<code>httpPatch</code>, <code>httpDelete</code>
	</p>

	<h2 id="json">JSON</h2>

	<p>
		Parse JSON strings into Logos tables, or convert tables back to JSON:
	</p>

	<CodeBlock
		code={`// Parse JSON string to table
let data = try parseJson('{"name": "Alice", "age": 30, "active": true}')
print(data.name)      // Alice
print(str(data.age))  // 30

// Convert table to JSON string
let user = table{ name: "Bob", email: "bob@example.com" }
let json = try toJson(user)

// Pretty format for debugging
let pretty = try prettyJson(data)`}
		language="javascript"
	/>

	<p>
		<strong>Gotcha:</strong> JSON numbers become Logos numbers, JSON arrays become Logos arrays,
		JSON objects become Logos tables. There's no round-trip type preservation — a table with
		integer keys might become string keys in JSON.
	</p>

	<h2 id="modules">Modules</h2>

	<p>
		Import standard library modules with <code>use</code>. Standard lib modules are:
	</p>

	<CodeBlock
		code={`use "std/math"      // mathFactorial, mathFib, mathIsPrime, etc.
use "std/array"    // map, filter, reduce, unique, etc.
use "std/string"   // strCapitalize, strReverse, etc.
use "std/path"     // pathJoin, pathBase, pathDir, etc.
use "std/time"     // datetimeNow, datetimeFormat, etc.
use "std/log"      // logDebug, logInfo, logWarn, logError
use "std/type"     // isString, isNumber, isArray, etc.
use "std/testing"  // assert, suite, summary`}
		language="javascript"
	/>

	<p>
		You can also import custom modules from the same directory:
	</p>

	<CodeBlock
		code={`// In myapp.lgs
use "utils"
use "helpers"

print(helperFunction())
print(utilValue)`}
		language="javascript"
	/>
</DocLayout>
