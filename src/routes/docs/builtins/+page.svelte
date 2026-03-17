<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const jsonExample = `// parseJson returns {ok, value, error}
let result = parseJson("{\\"name\\": \\"Bob\\", \\"scores\\": [95, 87, 92]}")
if result.ok {
    let data = result.value
    print(data["name"])              // Bob
    print(toStr(data["scores"][0]))  // 95
} else {
    print("Parse error: " + result.error)
}

// toJson returns {ok, value, error}
let obj = table{ "status": "ok", "count": 42 }
let jsonRes = toJson(obj)
if jsonRes.ok {
    print(jsonRes.value)  // {"count":42,"status":"ok"}
} else {
    print("JSON error: " + jsonRes.error)
}`;

	const prettyJsonExample = `// prettyJson returns {ok, value, error}
let result = parseJson("{\\"name\\":\\"uthman\\",\\"age\\":20}")
if result.ok {
    print(prettyJson(result.value))
}`;

	const httpResultExample = `// ok: true/false
// value: { body: "...", status: 200 }
// error: ""`;

	const confirmExample = `let ok = confirm("Delete this file?")
if ok {
    print("Deleting...")
    fileDelete("data.txt")
} else {
    print("Cancelled")
}`;

	const selectExample = `let choice = select("Pick a color:", ["red", "green", "blue"])

if choice == "red" {
    print(colorRed("You picked red"))
} else if choice == "green" {
    print(colorGreen("You picked green"))
} else {
    print(colorBlue("You picked blue"))
}`;
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
		Logos provides a comprehensive set of built-in functions that are always available without any
		imports. These cover I/O, file operations, string manipulation, math, HTTP, and more.
	</p>

	<nav class="border-border bg-subtle/50 my-6 rounded-lg border p-4">
		<h3 class="text-text mb-3 text-sm font-medium">On this page</h3>
		<ul class="text-muted grid gap-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
			<li><a href="#io" class="hover:text-text">I/O</a></li>
			<li><a href="#color-output" class="hover:text-text">Color Output</a></li>
			<li><a href="#type-functions" class="hover:text-text">Type Functions</a></li>
			<li><a href="#file-operations" class="hover:text-text">File Operations</a></li>
			<li><a href="#string-operations" class="hover:text-text">String Operations</a></li>
			<li><a href="#type-conversion" class="hover:text-text">Type Conversion</a></li>
			<li><a href="#array-operations" class="hover:text-text">Array Operations</a></li>
			<li><a href="#table-operations" class="hover:text-text">Table Operations</a></li>
			<li><a href="#json" class="hover:text-text">JSON</a></li>
			<li><a href="#math" class="hover:text-text">Math</a></li>
			<li><a href="#os-system" class="hover:text-text">OS/System</a></li>
			<li><a href="#time" class="hover:text-text">Time</a></li>
			<li><a href="#http" class="hover:text-text">HTTP</a></li>
		</ul>
	</nav>

	<!-- I/O Section -->
	<h2 id="io">I/O</h2>

	<p>Basic input and output functions for terminal interaction.</p>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>print(value)</code></td>
				<td class="px-4 py-2">Prints value to stdout with newline</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>input()</code></td>
				<td class="px-4 py-2">Reads a line from stdin</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>prompt(message)</code></td>
				<td class="px-4 py-2">Prints message and reads input</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>confirm(message)</code></td>
				<td class="px-4 py-2">Prints message with (y/n) prompt, returns bool</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>select(message, options)</code></td>
				<td class="px-4 py-2">Shows numbered options, returns chosen value</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>clear()</code></td>
				<td class="px-4 py-2">Clears the terminal screen</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`print("Hello, World!")

let name = prompt("What is your name? ")
print("Hello, " + name)

clear()  // Clear the screen`}
		language="javascript"
	/>

	<h3>confirm()</h3>
	<p>Prompts the user with a yes/no question. Returns <code>true</code> if the user enters <code>y</code> or <code>yes</code>, <code>false</code> otherwise.</p>

	<CodeBlock code={confirmExample} language="javascript" />

	<h3>select()</h3>
	<p>Shows a numbered list of options and waits for the user to pick one. Returns the chosen value directly.</p>

	<CodeBlock code={selectExample} language="javascript" />

	<!-- Color Output Section -->
	<h2 id="color-output">Color Output</h2>

	<p>Functions for colored terminal output. Each returns a formatted string.</p>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>colorRed(text)</code></td>
				<td class="px-4 py-2">Returns text in red</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>colorGreen(text)</code></td>
				<td class="px-4 py-2">Returns text in green</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>colorYellow(text)</code></td>
				<td class="px-4 py-2">Returns text in yellow</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>colorBlue(text)</code></td>
				<td class="px-4 py-2">Returns text in blue</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>colorMagenta(text)</code></td>
				<td class="px-4 py-2">Returns text in magenta</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>colorCyan(text)</code></td>
				<td class="px-4 py-2">Returns text in cyan</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>colorWhite(text)</code></td>
				<td class="px-4 py-2">Returns text in white</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>colorBold(text)</code></td>
				<td class="px-4 py-2">Returns text in bold</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`print(colorRed("Error: Something went wrong"))
print(colorGreen("Success!"))
print(colorBold(colorYellow("Warning: Proceed with caution")))`}
		language="javascript"
	/>

	<!-- Type Functions Section -->
	<h2 id="type-functions">Type Functions</h2>

	<p>Functions for type inspection.</p>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>type(value)</code></td>
				<td class="px-4 py-2"
					>Returns type name as string ("int", "float", "string", "bool", "array", "table",
					"function", "null")</td
				>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>len(value)</code></td>
				<td class="px-4 py-2">Returns length of string, array, or table</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`print(type(42))        // "int"
print(type("hello"))   // "string"
print(type([1,2,3]))   // "array"

print(toStr(len("hello")))   // 5
print(toStr(len([1,2,3])))   // 3`}
		language="javascript"
	/>

	<!-- File Operations Section -->
	<h2 id="file-operations">File Operations</h2>

	<p>
		Comprehensive file system operations. Most file functions return a result object with
		<code>ok</code>, <code>value</code>, and <code>error</code> fields for safe error handling.
	</p>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>fileRead(path)</code></td>
				<td class="px-4 py-2">Reads entire file as string</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>fileWrite(path, content)</code></td>
				<td class="px-4 py-2">Writes content to file (overwrites)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>fileAppend(path, content)</code></td>
				<td class="px-4 py-2">Appends content to file</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>fileExists(path)</code></td>
				<td class="px-4 py-2">Returns true if file exists</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>fileDelete(path)</code></td>
				<td class="px-4 py-2">Deletes a file</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>fileDeleteAll(path)</code></td>
				<td class="px-4 py-2">Recursively deletes path</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>fileRename(old, new)</code></td>
				<td class="px-4 py-2">Renames/moves a file</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>fileMkdir(path)</code></td>
				<td class="px-4 py-2">Creates directory (with parents)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>fileRmdir(path)</code></td>
				<td class="px-4 py-2">Removes empty directory</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>fileReadDir(path)</code></td>
				<td class="px-4 py-2">Lists directory contents as array</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>fileCopy(src, dst)</code></td>
				<td class="px-4 py-2">Copies a file</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>fileMove(src, dst)</code></td>
				<td class="px-4 py-2">Moves a file</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>fileChmod(path, mode)</code></td>
				<td class="px-4 py-2">Changes file permissions</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>fileGlob(pattern)</code></td>
				<td class="px-4 py-2">Returns files matching glob pattern</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>fileExt(path)</code></td>
				<td class="px-4 py-2">Returns file extension</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`let writeRes = fileWrite("data.txt", "Hello, World!")
if !writeRes.ok {
    print("Write failed: " + writeRes.error)
}

let readRes = fileRead("data.txt")
if readRes.ok {
    print(readRes.value)  // Hello, World!
} else {
    print("Read failed: " + readRes.error)
}

fileAppend("log.txt", "Log entry\\n")

if fileExists("config.json") {
    let config = fileRead("config.json")
    if config.ok {
        print(config.value)
    }
}

fileMkdir("output/reports")
let dirRes = fileReadDir(".")
if dirRes.ok {
    for file in dirRes.value {
        print(file)
    }
}

let globRes = fileGlob("*.lgs")
if globRes.ok {
    for script in globRes.value {
        print("Found: " + script)
    }
}`}
		language="javascript"
	/>

	<!-- String Operations Section -->
	<h2 id="string-operations">String Operations</h2>

	<p>String manipulation functions.</p>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>upper(s)</code></td>
				<td class="px-4 py-2">Converts string to uppercase</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>lower(s)</code></td>
				<td class="px-4 py-2">Converts string to lowercase</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>trim(s)</code></td>
				<td class="px-4 py-2">Removes leading/trailing whitespace</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>replace(s, old, new)</code></td>
				<td class="px-4 py-2">Replaces all occurrences</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>split(s, sep)</code></td>
				<td class="px-4 py-2">Splits string by separator, returns array</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>join(arr, sep)</code></td>
				<td class="px-4 py-2">Joins array elements with separator</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>contains(s, sub)</code></td>
				<td class="px-4 py-2">Checks if string contains substring</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>startsWith(s, prefix)</code></td>
				<td class="px-4 py-2">Checks if string starts with prefix</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>endsWith(s, suffix)</code></td>
				<td class="px-4 py-2">Checks if string ends with suffix</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>indexOf(s, sub)</code></td>
				<td class="px-4 py-2">Returns index of substring (-1 if not found)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>repeat(s, n)</code></td>
				<td class="px-4 py-2">Repeats string n times</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>slice(s, start, end)</code></td>
				<td class="px-4 py-2">Returns substring from start to end</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>format(template, ...args)</code></td>
				<td class="px-4 py-2">Formats string with placeholders</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`print(upper("hello"))           // HELLO
print(lower("WORLD"))           // world
print(trim("  spaces  "))       // "spaces"

let words = split("a,b,c", ",")
print(join(words, "-"))         // a-b-c

print(toStr(contains("hello", "ell")))  // true
print(toStr(startsWith("hello", "he"))) // true

print(repeat("ab", 3))          // ababab
print(slice("hello", 1, 4))     // ell

print(format("Hello, {}!", "World"))  // Hello, World!`}
		language="javascript"
	/>

	<!-- Type Conversion Section -->
	<h2 id="type-conversion">Type Conversion</h2>

	<p>Functions for converting between types.</p>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>toInt(value)</code></td>
				<td class="px-4 py-2">Converts to integer</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>toFloat(value)</code></td>
				<td class="px-4 py-2">Converts to float</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>toBool(value)</code></td>
				<td class="px-4 py-2">Converts to boolean</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>toStr(value)</code></td>
				<td class="px-4 py-2">Converts to string</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`let num = toInt("42")
let pi = toFloat("3.14")
let flag = toBool("true")
let text = toStr(123)

print(type(num))   // int
print(type(pi))    // float
print(type(flag))  // bool
print(type(text))  // string`}
		language="javascript"
	/>

	<!-- Array Operations Section -->
	<h2 id="array-operations">Array Operations</h2>

	<p>Functions for array manipulation.</p>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>push(arr, value)</code></td>
				<td class="px-4 py-2">Adds element to end, returns new array</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pop(arr)</code></td>
				<td class="px-4 py-2">Returns last element</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>first(arr)</code></td>
				<td class="px-4 py-2">Returns first element</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>last(arr)</code></td>
				<td class="px-4 py-2">Returns last element</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>tail(arr)</code></td>
				<td class="px-4 py-2">Returns array without first element</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>prepend(arr, value)</code></td>
				<td class="px-4 py-2">Adds element to start, returns new array</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>reverse(arr)</code></td>
				<td class="px-4 py-2">Returns reversed array</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>sort(arr)</code></td>
				<td class="px-4 py-2">Returns sorted array</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`let nums = [1, 2, 3]

nums = push(nums, 4)        // [1, 2, 3, 4]
nums = prepend(nums, 0)     // [0, 1, 2, 3, 4]

print(toStr(first(nums)))   // 0
print(toStr(last(nums)))    // 4

let rest = tail(nums)       // [1, 2, 3, 4]
let rev = reverse(nums)     // [4, 3, 2, 1, 0]

let unsorted = [3, 1, 4, 1, 5]
let sorted = sort(unsorted) // [1, 1, 3, 4, 5]`}
		language="javascript"
	/>

	<!-- Table Operations Section -->
	<h2 id="table-operations">Table Operations</h2>

	<p>Functions for working with tables (key-value maps).</p>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>keys(table)</code></td>
				<td class="px-4 py-2">Returns array of keys</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>values(table)</code></td>
				<td class="px-4 py-2">Returns array of values</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>has(table, key)</code></td>
				<td class="px-4 py-2">Checks if key exists</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>tableDelete(table, key)</code></td>
				<td class="px-4 py-2">Removes key, returns new table</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>merge(table1, table2)</code></td>
				<td class="px-4 py-2">Merges tables, returns new table</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`let user = table{
    "name": "Alice",
    "age": 30,
    "role": "admin"
}

let k = keys(user)      // ["name", "age", "role"]
let v = values(user)    // ["Alice", 30, "admin"]

print(toStr(has(user, "name")))  // true
print(toStr(has(user, "email"))) // false

let updated = tableDelete(user, "age")
let merged = merge(user, table{ "email": "alice@example.com" })`}
		language="javascript"
	/>

	<!-- JSON Section -->
	<h2 id="json">JSON</h2>

	<p>JSON parsing and serialization. All JSON functions return a result object with <code>ok</code>, <code>value</code>, and <code>error</code> fields.</p>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>parseJson(str)</code></td>
				<td class="px-4 py-2">Parses JSON string to value</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>toJson(value)</code></td>
				<td class="px-4 py-2">Converts value to JSON string</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>prettyJson(table)</code></td>
				<td class="px-4 py-2">Converts table to indented, colored JSON string</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock code={jsonExample} language="javascript" />

	<h3>prettyJson()</h3>
	<p>
		Takes a table (typically from <code>parseJson</code>) and returns a result object with a formatted, color-highlighted JSON string. Keys are highlighted in green, values in blue. Check <code>.ok</code> before using <code>.value</code>.
	</p>

	<CodeBlock code={prettyJsonExample} language="javascript" />

	<!-- Math Section -->
	<h2 id="math">Math</h2>

	<p>Mathematical functions and constants.</p>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathAbs(n)</code></td>
				<td class="px-4 py-2">Returns absolute value</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathPow(base, exp)</code></td>
				<td class="px-4 py-2">Returns base raised to exp</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathSqrt(n)</code></td>
				<td class="px-4 py-2">Returns square root</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathFloor(n)</code></td>
				<td class="px-4 py-2">Rounds down to nearest integer</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathCeil(n)</code></td>
				<td class="px-4 py-2">Rounds up to nearest integer</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathRound(n)</code></td>
				<td class="px-4 py-2">Rounds to nearest integer</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathMin(a, b)</code></td>
				<td class="px-4 py-2">Returns smaller value</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathMax(a, b)</code></td>
				<td class="px-4 py-2">Returns larger value</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathRandom()</code></td>
				<td class="px-4 py-2">Returns random float between 0 and 1</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathRandomInt(min, max)</code></td>
				<td class="px-4 py-2">Returns random integer in range</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathPi()</code></td>
				<td class="px-4 py-2">Returns value of pi</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`print(toStr(mathAbs(-42)))       // 42
print(toStr(mathPow(2, 10)))     // 1024
print(toStr(mathSqrt(16)))       // 4

print(toStr(mathFloor(3.7)))     // 3
print(toStr(mathCeil(3.2)))      // 4
print(toStr(mathRound(3.5)))     // 4

print(toStr(mathMin(5, 3)))      // 3
print(toStr(mathMax(5, 3)))      // 5

let dice = mathRandomInt(1, 6)
print("Rolled: " + toStr(dice))

print(toStr(mathPi()))           // 3.141592653589793`}
		language="javascript"
	/>

	<!-- OS/System Section -->
	<h2 id="os-system">OS/System</h2>

	<p>System interaction and process control.</p>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pwd()</code></td>
				<td class="px-4 py-2">Returns current working directory</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>cd(path)</code></td>
				<td class="px-4 py-2">Changes current directory</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>env(name)</code></td>
				<td class="px-4 py-2">Gets environment variable</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>setenv(name, value)</code></td>
				<td class="px-4 py-2">Sets environment variable</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>args()</code></td>
				<td class="px-4 py-2">Returns command line arguments as array</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>exit(code)</code></td>
				<td class="px-4 py-2">Exits with status code</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>sleep(ms)</code></td>
				<td class="px-4 py-2">Pauses execution for milliseconds</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>osname()</code></td>
				<td class="px-4 py-2">Returns OS name ("linux", "darwin", "windows")</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>run(cmd, ...args)</code></td>
				<td class="px-4 py-2">Runs command with args, returns output</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>shell(cmd)</code></td>
				<td class="px-4 py-2">Runs command in shell, returns output</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`print(pwd())                    // /home/user/project
cd("/tmp")

let home = env("HOME")
setenv("MY_VAR", "hello")

let cliArgs = args()
for arg in cliArgs {
    print(arg)
}

print(osname())                 // linux

let output = run("ls", "-la")
print(output)

let result = shell("echo $HOME && pwd")
print(result)

sleep(1000)  // Wait 1 second
exit(0)`}
		language="javascript"
	/>

	<!-- Time Section -->
	<h2 id="time">Time</h2>

	<p>Time and date functions.</p>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>timeNow()</code></td>
				<td class="px-4 py-2">Returns current Unix timestamp (seconds)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>timeMs()</code></td>
				<td class="px-4 py-2">Returns current time in milliseconds</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>timeStr()</code></td>
				<td class="px-4 py-2">Returns current time as HH:MM:SS</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>dateStr()</code></td>
				<td class="px-4 py-2">Returns current date as YYYY-MM-DD</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>dateTimeStr()</code></td>
				<td class="px-4 py-2">Returns current datetime</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>timeFormat(timestamp, format)</code></td>
				<td class="px-4 py-2">Formats timestamp with Go layout</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`print(toStr(timeNow()))    // 1709395200
print(toStr(timeMs()))     // 1709395200123

print(timeStr())           // 14:30:00
print(dateStr())           // 2024-03-02
print(dateTimeStr())       // 2024-03-02 14:30:00

let ts = timeNow()
print(timeFormat(ts, "Jan 2, 2006"))  // Mar 2, 2024`}
		language="javascript"
	/>

	<!-- HTTP Section -->
<h2 id="http">HTTP</h2>
<p>HTTP client functions for making web requests. All HTTP functions return a result object:</p>
<CodeBlock code={httpResultExample} language="javascript" />
<table class="w-full border-collapse text-left">
    <thead>
        <tr class="border-border border-b">
            <th class="text-text px-4 py-2">Function</th>
            <th class="text-text px-4 py-2">Description</th>
        </tr>
    </thead>
    <tbody class="text-muted">
        <tr class="border-border border-b">
            <td class="px-4 py-2"><code>httpGet(url)</code></td>
            <td class="px-4 py-2">Makes GET request</td>
        </tr>
        <tr class="border-border border-b">
            <td class="px-4 py-2"><code>httpGet(url, headers)</code></td>
            <td class="px-4 py-2">Makes GET request with custom headers</td>
        </tr>
        <tr class="border-border border-b">
            <td class="px-4 py-2"><code>httpPost(url, body)</code></td>
            <td class="px-4 py-2">Makes POST request with JSON body</td>
        </tr>
        <tr class="border-border border-b">
            <td class="px-4 py-2"><code>httpPost(url, body, headers)</code></td>
            <td class="px-4 py-2">Makes POST request with JSON body and custom headers</td>
        </tr>
        <tr class="border-border border-b">
            <td class="px-4 py-2"><code>httpPatch(url, body)</code></td>
            <td class="px-4 py-2">Makes PATCH request with JSON body</td>
        </tr>
        <tr class="border-border border-b">
            <td class="px-4 py-2"><code>httpPatch(url, body, headers)</code></td>
            <td class="px-4 py-2">Makes PATCH request with JSON body and custom headers</td>
        </tr>
        <tr class="border-border border-b">
            <td class="px-4 py-2"><code>httpPut(url, body)</code></td>
            <td class="px-4 py-2">Makes PUT request with JSON body</td>
        </tr>
        <tr class="border-border border-b">
            <td class="px-4 py-2"><code>httpPut(url, body, headers)</code></td>
            <td class="px-4 py-2">Makes PUT request with JSON body and custom headers</td>
        </tr>
        <tr class="border-border border-b">
            <td class="px-4 py-2"><code>httpDelete(url)</code></td>
            <td class="px-4 py-2">Makes DELETE request</td>
        </tr>
        <tr class="border-border border-b">
            <td class="px-4 py-2"><code>httpDelete(url, headers)</code></td>
            <td class="px-4 py-2">Makes DELETE request with custom headers</td>
        </tr>
    </tbody>
</table>
<h3>Example</h3>
<CodeBlock
    code={`let res = httpGet("https://api.example.com/users")
if res.ok {
    let parseResult = parseJson(res.value.body)
    if parseResult.ok {
        let users = parseResult.value
        for user in users {
            print(user["name"])
        }
    }
    print("Status: " + toStr(res.value.status))
} else {
    print("Request failed: " + res.error)
}

let jsonRes = toJson(table {
    "name": "Alice",
    "email": "alice@example.com"
})
let payload = jsonRes.ok ? jsonRes.value : "{}"

let postRes = httpPost("https://api.example.com/users", payload)
if postRes.ok {
    print("Created! Status: " + toStr(postRes.value.status))
}

let updateRes = toJson(table { "name": "Alice Smith" })
let update = updateRes.ok ? updateRes.value : "{}"
let putRes = httpPut("https://api.example.com/users/1", update)
let patchRes = httpPatch("https://api.example.com/users/1", update)
let delRes = httpDelete("https://api.example.com/users/1")
if delRes.ok {
    print("Deleted successfully")
}

let headers = table {
    "Authorization": "Bearer " + env("API_TOKEN")
}

let authRes = httpGet("https://api.example.com/protected", headers)
if authRes.ok {
    print(authRes.value.body)
} else {
    print(colorRed("Auth failed: " + authRes.error))
}`}
    language="javascript"
/>
</DocLayout>
