<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const runExample = `// run() - executes a command directly (no shell)
// Use try for clean error handling (v0.4+)

let result = try run("ls", "-la")
print(result)

// With arguments
let gitResult = try run("git", "status")
print(gitResult)

let echoResult = try run("echo", "hello")
print(echoResult)`;

	const shellExample = `// shell() - executes command through shell (sh -c)
// Use try for clean error handling (v0.4+)

let dateResult = try shell("date")
print(dateResult)

// Shell features work!
let psResult = try shell("ps aux | grep node")
print(psResult)

// Variables
let pathResult = try shell("echo $HOME")
print(pathResult)

// Multiple commands
let multiResult = try shell("echo 'First' && echo 'Second'")
print(multiResult)`;

	const fileOpsExample = `// File functions return {ok, value, error}
// Use try to unwrap and propagate errors (v0.4+)

let content = try fileRead("config.json")
print("File has \${len(content)} characters")

let written = try fileWrite("output.txt", "Hello, World!")
print("Written: \${written}")

try fileAppend("log.txt", "New log entry\\n")

if fileExists("data.json") {
    let data = try fileRead("data.json")
    print(data)
}

try fileMkdir("backup/2024/january")

let files = try fileReadDir(".")
for item in files {
    print("Found: " + item)
}

let globRes = try fileGlob("*.lgs")
for script in globRes {
    print("Script: " + script)
}`;

	const jsonExample = `// parseJson, toJson, prettyJson return {ok, value, error}
// Use try for clean error handling (v0.4+)

let data = try parseJson("{\\"name\\": \\"Bob\\", \\"scores\\": [95, 87, 92]}")
print(data["name"])
print(str(data["scores"][0]))

let obj = table{ "status": "ok", "count": 42 }
let jsonStr = try toJson(obj)
print(jsonStr)

let parsed = try parseJson("{\\"user\\": {\\"name\\": \\"Alice\\"}}")
print(try prettyJson(parsed))`;

	const httpExample = `// HTTP functions return {ok, value, error}
// Use try + pipe for elegant data pipelines (v0.4+)

// Simple request
let body = try httpGet("https://api.example.com/users")
print(body)

// With pipes - fetch, parse, filter, transform
let activeUsers = try httpGet("https://api.example.com/users")
    |> try parseJson
    |> filter(fn(u) -> u.active)
    |> map(fn(u) -> u.name)

print("Active users: \${activeUsers}")

// POST request
let payload = try toJson(table{ name: "Alice", email: "alice@example.com" })
let response = try httpPost("https://api.example.com/users", payload)
print("Created! Status: \${response.status}")

// With headers
let headers = table{
    "Authorization": "Bearer " + env("API_TOKEN"),
    "Content-Type": "application/json"
}
let data = try httpGet("https://api.example.com/private", headers)`;

	const ioExample = `// print() - outputs with trailing newline (v0.4.5, default)
// printn() - outputs without trailing newline (v0.4.5)
print("Hello!")
printn("No newline")
print("Next line")

// input() - reads one line from user (no prompt)
let name = input()
print("You typed: " + name)

// prompt(message) - shows message AND reads input
let age = prompt("Enter your age: ")
print("You are " + age)

// confirm() - yes/no question, returns true/false
if confirm("Delete all files?") {
    print("Deleted!")
}

// select() - numbered menu, returns chosen value
let choice = select("Pick a color:", ["red", "green", "blue"])
print("You chose: " + choice)

// clear() - clear the terminal
clear()`;

	const arrayExample = `let nums = [1, 2, 3, 4, 5]

nums = push(nums, 6)
nums = prepend(nums, 0)

print(first(nums))
print(last(nums))

let popped = pop(nums)
print(str(popped))

let rest = tail(nums)

let reversed = reverse([1, 2, 3])
let sorted = sort([3, 1, 4, 1, 5])

print(str(contains([1, 2, 3], 2)))

// range() for numeric iteration (v0.4.2)
for i in range(0, 10) {
    print(i)
}

// With step
for i in range(0, 20, 2) {
    print(i)  // 0, 2, 4, 6, ...
}

// Countdown
for i in range(5, 0, -1) {
    print(i)  // 5, 4, 3, 2
}`;

	const regexExample = `// reMatch - returns true/false if pattern matches
print(reMatch(\`\\d+\`, "hello 123"))     // true
print(reMatch(\`\\d+\`, "hello world"))  // false

// reFind - find first match, returns string or null
print(reFind(\`\\d+\`, "there are 3 cats"))    // "3"
print(reFind(\`\\d+\`, "no numbers here"))    // null

// reFindAll - find all matches, returns array
print(reFindAll(\`\\d+\`, "3 cats and 12 dogs"))  // ["3", "12"]

// reReplace - replace all matches
print(reReplace(\`\\d+\`, "I have 3 cats", "X"))  // "I have X cats"

// reSplit - split by pattern
print(reSplit(\`\\s+\`, "split   this   string"))  // ["split", "this", "string"]

// reGroups - extract capture groups
let email = "uthman@gmail.com"
let parts = reGroups(\`(\\w+)@(\\w+)\\.(\\w+)\`, email)
print(parts)  // ["uthman", "gmail", "com"]`;

	const tableExample = `let user = table{
    name: "Alice",
    age: 30,
    active: true,
}

print(user.name)

print(str(has(user, "email")))

let k = keys(user)
let v = values(user)

let updated = tableDelete(user, "age")

let extra = table{ role: "admin", age: 31 }
let merged = merge(user, extra)`;

	const stringExample = `let s = "  Hello, World!  "

print(upper(s))
print(lower(s))
print(trim(s))

print(replace("banana", "a", "o"))
print(str(contains("hello", "ell")))
print(str(startsWith("hello", "he")))
print(str(endsWith("hello", "lo")))

let words = split("a,b,c,d", ",")
print(join(words, "-"))

print(repeat("ha", 3))
print(slice("hello", 1, 4))
print(format("Name: {}, Age: {}", "Bob", 25))`;

	const timeExample = `print(str(timeNow()))
print(str(timeMs()))

print(timeStr())
print(dateStr())
print(dateTimeStr())

let ts = timeNow()
print(timeFormat(ts, "January 2, 2006"))
print(timeFormat(ts, "02/01/2006"))`;

	const typeConvExample = `let n = int("42")
let f = float("3.14")

let s1 = str(42)
let s2 = str(3.14)

let b1 = toBool(true)
let b2 = toBool(false)

print(type(42))
print(type("hello"))
print(type([1,2,3]))`;

	const osExample = `print(pwd())
cd("/tmp")

let home = env("HOME")
setenv("MY_VAR", "hello")

let cliArgs = args()
print(cliArgs[0])

sleep(1000)

print(osname())

exit(0)`;

	const confirmExample = `if confirm("Delete this file?") {
    print("Deleting...")
    try fileDelete("data.txt")
} else {
    print("Cancelled")
}`;

	const selectExample = `let choice = select("Pick a color:", ["red", "green", "blue"])

if choice == "red" {
    print(colorRed("You picked red"))
} else if choice == "green" {
    print(colorGreen("You picked green"))
}`;

	const tryWithPipes = `// Modern error handling with try + pipe (v0.4)
// Errors propagate automatically through the chain

// Fetch and transform user data
fn getUserStats(id) {
    return try httpGet("https://api.example.com/users/" + str(id))
        |> try parseJson
        |> map(fn(u) -> table{
            name: u.name,
            email: u.email,
            score: u.score,
        })
}

// Safe file processing pipeline
fn processFile(path) {
    return try fileRead(path)
        |> try parseJson
        |> filter(fn(d) -> d.active)
        |> map(fn(d) -> d.name)
}

// Chained JSON operations
let config = try fileRead("config.json")
    |> try parseJson
    |> filter(fn(c) -> c.enabled)
    |> map(fn(c) -> c.settings)`;

	const functions = {
		io: [
			{ name: 'print(value)', desc: 'Prints value to stdout with trailing newline (v0.4.5)' },
			{ name: 'printn(value)', desc: 'Prints without trailing newline (v0.4.5)' },
			{ name: 'input()', desc: 'Reads a line from stdin' },
			{ name: 'prompt(msg)', desc: 'Shows message, waits for input' },
			{ name: 'confirm(msg)', desc: 'Shows (y/n), returns bool' },
			{ name: 'select(msg, opts)', desc: 'Numbered menu, returns choice' },
			{ name: 'clear()', desc: 'Clears terminal screen' },
		],
		color: [
			{ name: 'colorRed(s)', desc: 'Red text' },
			{ name: 'colorGreen(s)', desc: 'Green text' },
			{ name: 'colorYellow(s)', desc: 'Yellow text' },
			{ name: 'colorBlue(s)', desc: 'Blue text' },
			{ name: 'colorBold(s)', desc: 'Bold text' },
		],
		type: [
			{ name: 'type(value)', desc: 'Returns type name string' },
			{ name: 'len(value)', desc: 'Length of string/array/table' },
		],
		file: [
			{ name: 'fileRead(path)', desc: 'Read file (try)' },
			{ name: 'fileWrite(path, data)', desc: 'Write file (try)' },
			{ name: 'fileAppend(path, data)', desc: 'Append to file (try)' },
			{ name: 'fileExists(path)', desc: 'Check if exists (bool)' },
			{ name: 'fileDelete(path)', desc: 'Delete file (try)' },
			{ name: 'fileMkdir(path)', desc: 'Create dir (try)' },
			{ name: 'fileReadDir(path)', desc: 'List dir (try)' },
			{ name: 'fileGlob(pattern)', desc: 'Glob files (try)' },
			{ name: 'fileCopy(src, dst)', desc: 'Copy file (try)' },
			{ name: 'fileMove(src, dst)', desc: 'Move file (try)' },
		],
		string: [
			{ name: 'upper(s)', desc: 'Uppercase' },
			{ name: 'lower(s)', desc: 'Lowercase' },
			{ name: 'trim(s)', desc: 'Remove whitespace' },
			{ name: 'replace(s, old, new)', desc: 'Replace all' },
			{ name: 'split(s, sep)', desc: 'Split into array' },
			{ name: 'join(arr, sep)', desc: 'Join with separator' },
			{ name: 'contains(s, sub)', desc: 'Check substring' },
			{ name: 'indexOf(s, sub)', desc: 'Find index (-1 if none)' },
			{ name: 'repeat(s, n)', desc: 'Repeat string' },
			{ name: 'slice(s, start, end)', desc: 'Substring' },
			{ name: 'format(tmpl, ...)', desc: 'Format with {}' },
		],
		conv: [
			{ name: 'str(value)', desc: 'Convert to string (short alias)' },
			{ name: 'int(value)', desc: 'Convert to int (short alias)' },
			{ name: 'float(value)', desc: 'Convert to float (short alias)' },
			{ name: 'toStr(value)', desc: 'Convert to string' },
			{ name: 'toInt(value)', desc: 'Convert to int' },
			{ name: 'toFloat(value)', desc: 'Convert to float' },
			{ name: 'toBool(value)', desc: 'Convert to bool' },
		],
		array: [
			{ name: 'push(arr, val)', desc: 'Add to end' },
			{ name: 'prepend(arr, val)', desc: 'Add to start' },
			{ name: 'pop(arr)', desc: 'Remove last' },
			{ name: 'first(arr)', desc: 'First element' },
			{ name: 'last(arr)', desc: 'Last element' },
			{ name: 'tail(arr)', desc: 'All except first' },
			{ name: 'reverse(arr)', desc: 'Reverse order' },
			{ name: 'sort(arr)', desc: 'Sort array (string or numeric)' },
			{ name: 'contains(arr, val)', desc: 'Check membership' },
			{ name: 'range(start, end, step?)', desc: 'Numeric iterator (v0.4.2)' },
		],
		table: [
			{ name: 'keys(t)', desc: 'Array of keys' },
			{ name: 'values(t)', desc: 'Array of values' },
			{ name: 'has(t, key)', desc: 'Check if key exists' },
			{ name: 'tableDelete(t, key)', desc: 'Remove key' },
			{ name: 'merge(t1, t2)', desc: 'Merge tables' },
		],
		json: [
			{ name: 'parseJson(s)', desc: 'Parse JSON (try)' },
			{ name: 'toJson(value)', desc: 'To JSON string (try)' },
			{ name: 'prettyJson(t)', desc: 'Formatted JSON (try)' },
		],
		math: [
			{ name: 'mathAbs(n)', desc: 'Absolute value' },
			{ name: 'mathPow(a, b)', desc: 'Power (a^b)' },
			{ name: 'mathSqrt(n)', desc: 'Square root' },
			{ name: 'mathFloor(n)', desc: 'Round down' },
			{ name: 'mathCeil(n)', desc: 'Round up' },
			{ name: 'mathRound(n)', desc: 'Round nearest' },
			{ name: 'mathMin(a, b)', desc: 'Minimum' },
			{ name: 'mathMax(a, b)', desc: 'Maximum' },
			{ name: 'mathRandom()', desc: 'Random float 0-1' },
			{ name: 'mathRandomInt(a, b)', desc: 'Random int a-b' },
			{ name: 'mathPi()', desc: 'Pi constant' },
		],
		os: [
			{ name: 'pwd()', desc: 'Current directory' },
			{ name: 'cd(path)', desc: 'Change directory' },
			{ name: 'env(name)', desc: 'Get env var' },
			{ name: 'setenv(n, v)', desc: 'Set env var' },
			{ name: 'args()', desc: 'CLI arguments' },
			{ name: 'sleep(ms)', desc: 'Wait milliseconds' },
			{ name: 'osname()', desc: '"linux"/"darwin"' },
			{ name: 'exit(code)', desc: 'Exit program' },
			{ name: 'run(cmd, ...)', desc: 'Run command (try)' },
			{ name: 'shell(cmd)', desc: 'Shell command (try)' },
		],
		time: [
			{ name: 'timeNow()', desc: 'Unix timestamp (sec)' },
			{ name: 'timeMs()', desc: 'Unix timestamp (ms)' },
			{ name: 'timeStr()', desc: '"HH:MM:SS"' },
			{ name: 'dateStr()', desc: '"YYYY-MM-DD"' },
			{ name: 'dateTimeStr()', desc: '"YYYY-MM-DD HH:MM:SS"' },
			{ name: 'timeFormat(ts, fmt)', desc: 'Custom format' },
		],
		http: [
			{ name: 'httpGet(url)', desc: 'GET request (try)' },
			{ name: 'httpGet(url, headers)', desc: 'GET with headers' },
			{ name: 'httpPost(url, body)', desc: 'POST request' },
			{ name: 'httpPut(url, body)', desc: 'PUT request' },
			{ name: 'httpPatch(url, body)', desc: 'PATCH request' },
			{ name: 'httpDelete(url)', desc: 'DELETE request' },
		],
		regex: [
			{ name: 'reMatch(pattern, text)', desc: 'True if pattern matches' },
			{ name: 'reFind(pattern, text)', desc: 'First match or null' },
			{ name: 'reFindAll(pattern, text)', desc: 'Array of all matches' },
			{ name: 'reReplace(pattern, text, repl)', desc: 'Replace all matches' },
			{ name: 'reSplit(pattern, text)', desc: 'Split by pattern' },
			{ name: 'reGroups(pattern, text)', desc: 'Capture groups array' },
		],
	};
</script>

<svelte:head>
	<title>Builtins - Logos Documentation</title>
</svelte:head>

<DocLayout
	prev={{ title: 'Standard Library', href: '/docs/stdlib' }}
	next={{ title: 'Embedding', href: '/docs/embedding' }}
>
	<h1>Builtins Reference</h1>

	<p>
		Logos built-in functions. Use <code>try</code> for error handling on functions marked (try).
	</p>

	<h2 id="try">Try Expressions <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4</span></h2>

	<p>
		Functions marked (try) return <code>{'{'}ok, value, error{'}'}</code>. Use <code>try</code> to unwrap
		and propagate errors:
	</p>

	<CodeBlock
		code={`// Verbose error checking:
let res = fileRead("data.json")
if !res.ok { return res.error }
let data = res.value

// With try (v0.4+):
let data = try fileRead("data.json")`}
		language="javascript"
	/>

	<h3>Try + Pipe <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4</span></h3>

	<CodeBlock code={tryWithPipes} language="javascript" />

	<h2 id="io">I/O</h2>

	<div class="grid gap-2">
		{#each functions.io as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={ioExample} language="javascript" />

	<h3>confirm()</h3>

	<CodeBlock code={confirmExample} language="javascript" />

	<h3>select()</h3>

	<CodeBlock code={selectExample} language="javascript" />

	<h2 id="color-output">Color Output</h2>

	<div class="grid gap-2">
		{#each functions.color as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock
		code={`print(colorRed("Error"))
print(colorGreen("Success"))
print(colorBold(colorYellow("Warning")))`}
		language="javascript"
	/>

	<h2 id="type-functions">Type Functions</h2>

	<div class="grid gap-2">
		{#each functions.type as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<h2 id="file-operations">File Operations <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">try</span></h2>

	<div class="grid gap-2">
		{#each functions.file as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={fileOpsExample} language="javascript" />

	<h2 id="string-operations">String Operations</h2>

	<div class="grid gap-2">
		{#each functions.string as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={stringExample} language="javascript" />

	<h2 id="type-conversion">Type Conversion</h2>

	<div class="grid gap-2">
		{#each functions.conv as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={typeConvExample} language="javascript" />

	<h2 id="array-operations">Array Operations</h2>

	<div class="grid gap-2">
		{#each functions.array as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={arrayExample} language="javascript" />

	<h2 id="table-operations">Table Operations</h2>

	<div class="grid gap-2">
		{#each functions.table as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={tableExample} language="javascript" />

	<h2 id="json">JSON <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">try</span></h2>

	<div class="grid gap-2">
		{#each functions.json as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={jsonExample} language="javascript" />

	<h2 id="math">Math</h2>

	<div class="grid gap-2">
		{#each functions.math as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock
		code={`	print(str(mathAbs(-42)))
print(str(mathPow(2, 10)))
print(str(mathRandomInt(1, 6)))`}
		language="javascript"
	/>

	<h2 id="os-system">OS/System</h2>

	<div class="grid gap-2">
		{#each functions.os as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<h3>run() <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">try</span></h3>

	<CodeBlock code={runExample} language="javascript" />

	<h3>shell() <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">try</span></h3>

	<CodeBlock code={shellExample} language="javascript" />

	<h2 id="time">Time</h2>

	<div class="grid gap-2">
		{#each functions.time as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={timeExample} language="javascript" />

	<h2 id="http">HTTP <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">try + pipe</span></h2>

	<div class="grid gap-2">
		{#each functions.http as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={httpExample} language="javascript" />

	<h2 id="regex">Regex <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4.3</span></h2>

	<div class="grid gap-2">
		{#each functions.regex as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={regexExample} language="javascript" />
</DocLayout>
