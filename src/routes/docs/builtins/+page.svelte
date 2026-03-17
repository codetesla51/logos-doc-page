<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	// -----------------
	// RUN & SHELL EXAMPLES
	// -----------------
	const runExample = `// run() - executes a command directly (no shell)
// Returns {ok, value, error}
// Use when you know the exact command and arguments

// Simple command
let result = run("ls", "-la")
if result.ok {
    print(result.value)  // prints directory listing
} else {
    print("Error: " + result.error)
}

// With arguments - each arg is a separate string
let gitResult = run("git", "status")
if gitResult.ok {
    print(gitResult.value)
}

// Check exit code by looking at error
let echoResult = run("echo", "hello")
print(echoResult.value)  // "hello\\n"`;

	const shellExample = `// shell() - executes command through shell (sh -c)
// Returns {ok, value, error}
// Use when you need shell features like pipes, redirects, globbing

// Simple command
let dateResult = shell("date")
if dateResult.ok {
    print(dateResult.value)
}

// Shell features work!
let psResult = shell("ps aux | grep node")
print(psResult.value)

// Variables and command substitution
let pathResult = shell("echo $HOME")
print(pathResult.value)

// Multiple commands
let multiResult = shell("echo 'First' && echo 'Second'")
print(multiResult.value)`;

	// -----------------
	// FILE OPERATIONS EXAMPLES
	// -----------------
	const fileOpsExample = `// Most file functions return {ok, value, error}
// Always check .ok before using .value!

// Read a file
let readRes = fileRead("config.json")
if readRes.ok {
    let content = readRes.value
    print("File has " + toStr(len(content)) + " characters")
} else {
    print("Failed to read: " + readRes.error)
}

// Write to a file
let writeRes = fileWrite("output.txt", "Hello, World!")
if !writeRes.ok {
    print("Write failed: " + writeRes.error)
}

// Append to file
fileAppend("log.txt", "New log entry\\n")

// Check if file exists (returns true/false, no error possible)
if fileExists("data.json") {
    print("Data file exists!")
}

// Create directory (with all parent dirs)
fileMkdir("backup/2024/january")

// List directory contents
let dirRes = fileReadDir(".")
if dirRes.ok {
    for item in dirRes.value {
        print("Found: " + item)
    }
}

// Copy, move, delete
fileCopy("old.txt", "new.txt")
fileMove("temp.txt", "final.txt")
fileDelete("unwanted.txt")`;

	// -----------------
	// JSON EXAMPLES
	// -----------------
	const jsonExample = `// parseJson, toJson, prettyJson ALL return {ok, value, error}
// Always check .ok before using the value!

// Parse JSON string to table/array
let result = parseJson('{"name": "Bob", "scores": [95, 87, 92]}')
if result.ok {
    let data = result.value
    print(data["name"])              // Bob
    print(toStr(data["scores"][0]))  // 95
    print(toStr(len(data["scores"]))) // 3 (array length)
} else {
    print("JSON parse error: " + result.error)
}

// Convert table to JSON string
let obj = table{ "status": "ok", "count": 42, "tags": ["a", "b"] }
let jsonRes = toJson(obj)
if jsonRes.ok {
    print(jsonRes.value)  // {"count":42,"status":"ok","tags":["a","b"]}
} else {
    print("JSON encode error: " + jsonRes.error)
}

// Pretty print with colors (great for debugging!)
let parseResult = parseJson('{"user": {"name": "Alice", "age": 30}}')
if parseResult.ok {
    print(prettyJson(parseResult.value))
    // Output has color codes - keys in green, values in blue
}`;

	const prettyJsonExample = `// prettyJson() returns {ok, value, error}
// Great for debugging - shows formatted, colored JSON

let result = parseJson('{"name": "Alice", "skills": ["Go", "Rust", "JS"]}')
if result.ok {
    print(prettyJson(result.value))
}`;

	// -----------------
	// HTTP EXAMPLES
	// -----------------
	const httpExample = `// All HTTP functions return {ok, value, error}
// value contains: { body: "...", status: 200 }

// GET request
let res = httpGet("https://api.example.com/users")
if res.ok {
    // Parse the JSON response
    let parseResult = parseJson(res.value.body)
    if parseResult.ok {
        let users = parseResult.value
        for user in users {
            print(user["name"])
        }
    }
    print("Status: " + toStr(res.value.status))  // e.g., 200
} else {
    print("Request failed: " + res.error)
}

// POST with JSON body
let payloadRes = toJson(table {
    "name": "Alice",
    "email": "alice@example.com"
})
let payload = payloadRes.ok ? payloadRes.value : "{}"

let postRes = httpPost("https://api.example.com/users", payload)
if postRes.ok {
    print("Created! Status: " + toStr(postRes.value.status))
}

// Custom headers
let headers = table {
    "Authorization": "Bearer " + env("API_TOKEN"),
    "Content-Type": "application/json"
}
let authRes = httpGet("https://api.example.com/private", headers)`;

	// -----------------
	// I/O EXAMPLES
	// -----------------
	const ioExample = `// print() - outputs to console (most common)
print("Hello!")
print("Value:", 42)  // prints "Value: 42"

// input() - reads one line from user (no prompt)
let name = input()
print("You typed: " + name)

// prompt(message) - shows message AND reads input
let age = prompt("Enter your age: ")
print("You are " + age)

// confirm() - yes/no question, returns true/false
let sure = confirm("Delete all files?")
if sure {
    print("Deleted!")
}

// select() - numbered menu, returns chosen value
let choice = select("Pick a color:", ["red", "green", "blue"])
print("You chose: " + choice)

// clear() - clear the terminal
clear()`;

	// -----------------
	// ARRAY EXAMPLES
	// -----------------
	const arrayExample = `let nums = [1, 2, 3, 4, 5]

// Add to end/front
nums = push(nums, 6)      // [1,2,3,4,5,6]
nums = prepend(nums, 0)   // [0,1,2,3,4,5,6]

// Get elements
print(first(nums))        // 0
print(last(nums))         // 6
print(toStr(pop(nums)))   // 6, nums is now [0,1,2,3,4,5]

// Remove first element
let rest = tail(nums)     // [1,2,3,4,5]

// Transform
let reversed = reverse([1, 2, 3])  // [3, 2, 1]
let sorted = sort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]

// Check contents
print(toStr(contains([1, 2, 3], 2)))  // true
print(toStr(contains(["a", "b"], "c"))) // false`;

	// -----------------
	// TABLE EXAMPLES
	// -----------------
	const tableExample = `// Create a table (like a dictionary/hash map)
let user = table{
    "name": "Alice",
    "age": 30,
    "active": true
}

// Access values
print(user["name"])  // Alice
print(user["age"])   // 30

// Check if key exists
print(toStr(has(user, "email")))  // false
print(toStr(has(user, "name")))    // true

// Get all keys/values
let k = keys(user)   // ["name", "age", "active"]
let v = values(user) // ["Alice", 30, true]

// Modify
let updated = tableDelete(user, "age")  // removes "age" key

// Merge tables (second overwrites first)
let extra = table{ "role": "admin", "age": 31 }
let merged = merge(user, extra)
// Result: {name: "Alice", active: true, role: "admin", age: 31}`;

	// -----------------
	// STRING EXAMPLES
	// -----------------
	const stringExample = `let s = "  Hello, World!  "

// Case conversion
print(upper(s))  // "  HELLO, WORLD!  "
print(lower(s))  // "  hello, world!  "

// Trim whitespace
print(trim(s))   // "Hello, World!"

// Search and replace
print(replace("banana", "a", "o"))  // "bonono"
print(contains("hello", "ell"))     // true
print(startsWith("hello", "he"))    // true
print(endsWith("hello", "lo"))     // true

// Split and join
let words = split("a,b,c,d", ",")  // ["a", "b", "c", "d"]
print(join(words, "-"))             // "a-b-c-d"

// Position
print(toStr(indexOf("hello", "l")))    // 2 (first occurrence)
print(toStr(indexOf("hello", "z")))    // -1 (not found)

// Repeat and slice
print(repeat("ha", 3))        // "hahaha"
print(slice("hello", 1, 4))   // "ell" (chars at index 1,2,3)

// Format (like printf)
print(format("Name: {}, Age: {}", "Bob", 25))`;

	// -----------------
	// TIME EXAMPLES
	// -----------------
	const timeExample = `// Get current time
print(toStr(timeNow()))    // Unix timestamp (seconds): 1709395200
print(toStr(timeMs()))     // Unix timestamp (ms): 1709395200123

// Human-readable strings
print(timeStr())           // "14:30:00"
print(dateStr())           // "2024-03-02"
print(dateTimeStr())       // "2024-03-02 14:30:00"

// Custom formatting (Go time format)
let ts = timeNow()
print(timeFormat(ts, "January 2, 2006"))    // "March 2, 2024"
print(timeFormat(ts, "02/01/2006"))          // "02/03/2024"
print(timeFormat(ts, "Mon Jan 2 15:04:05"))  // "Sat Mar 2 14:30:00"`;

	// -----------------
	// TYPE CONVERSION EXAMPLES
	// -----------------
	const typeConvExample = `// String to number
let n = toInt("42")       // 42
let f = toFloat("3.14")   // 3.14

// Number to string
let s1 = toStr(42)        // "42"
let s2 = toStr(3.14)      // "3.14"

// Bool to number/string
let b1 = toInt(true)     // 1
let b2 = toInt(false)    // 0
let b3 = toStr(true)     // "true"

// String to bool
let b4 = toBool("true")  // true
let b5 = toBool("false") // false
let b6 = toBool("maybe") // null (invalid!)

// Check type
print(type(42))        // "INTEGER"
print(type("hello"))   // "STRING"
print(type(true))      // "BOOL"
print(type([1,2,3]))   // "ARRAY"
print(type(table{}))   // "TABLE"`;

	// -----------------
	// OS/SYSTEM EXAMPLES
	// -----------------
	const osExample = `// Working directory
print(pwd())                    // "/home/user/project"
cd("/tmp")                      // change directory

// Environment variables
let home = env("HOME")          // get value
setenv("MY_VAR", "hello")       // set value

// Command line arguments
let args = args()               // ["program.lgs", "arg1", "arg2"]
print(args[0])                  // program name

// Wait/sleep
sleep(1000)                    // wait 1000ms (1 second)

// Get OS
print(osname())                // "linux", "darwin", or "windows"

// Exit program
exit(0)                         // success
exit(1)                         // error`;

	// -----------------
	// HTTP RESULT EXAMPLE
	// -----------------
	const httpResultExample = `// HTTP functions return a table like:
// {
//     ok: true/false,
//     value: { body: "...", status: 200 },
//     error: "" (empty if ok)
// }`;

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

	<p>Functions for reading input and displaying output in the terminal. These are your primary way to interact with users.</p>

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
				<td class="px-4 py-2">Prints value to stdout with a newline. Can print multiple values separated by spaces.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>input()</code></td>
				<td class="px-4 py-2">Reads a line from stdin (user typing). Returns the entered text as a string.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>prompt(message)</code></td>
				<td class="px-4 py-2">Prints the message, then waits for user to type and press Enter. Returns what was typed.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>confirm(message)</code></td>
				<td class="px-4 py-2">Shows message with "(y/n)" prompt. Returns <code>true</code> if user types "y" or "yes", <code>false</code> otherwise.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>select(message, options)</code></td>
				<td class="px-4 py-2">Displays numbered list, user picks a number. Returns the chosen array element directly.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>clear()</code></td>
				<td class="px-4 py-2">Clears the terminal screen (sends escape codes). Useful for creating clean UI.</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={ioExample}
		language="javascript"
	/>

	<h3>confirm()</h3>
	<p>Perfect for yes/no decisions in scripts. The user must type "y" or "yes" (case insensitive) for true, anything else returns false.</p>

	<CodeBlock code={confirmExample} language="javascript" />

	<h3>select()</h3>
	<p>Creates an interactive menu. Users see numbered options, type a number, and you get that array element back. Great for simple CLI apps!</p>

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

	<p>Work with text - change case, search, replace, split, and format strings.</p>

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
				<td class="px-4 py-2">Converts entire string to uppercase</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>lower(s)</code></td>
				<td class="px-4 py-2">Converts entire string to lowercase</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>trim(s)</code></td>
				<td class="px-4 py-2">Removes whitespace from start and end only</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>replace(s, old, new)</code></td>
				<td class="px-4 py-2">Replaces ALL occurrences of "old" with "new"</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>split(s, sep)</code></td>
				<td class="px-4 py-2">Splits string into array at each separator</td>
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

	<p>Convert values from one type to another. Essential for working with user input (which always comes as strings) and for formatting output.</p>

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
				<td class="px-4 py-2">Converts to integer. Returns null if conversion fails (e.g., "abc" → null)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>toFloat(value)</code></td>
				<td class="px-4 py-2">Converts to floating-point number. Returns null if invalid.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>toBool(value)</code></td>
				<td class="px-4 py-2">Converts to boolean. Only "true"/"false" strings work. Returns null otherwise.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>toStr(value)</code></td>
				<td class="px-4 py-2">Converts any value to its string representation. Always succeeds.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>type(value)</code></td>
				<td class="px-4 py-2">Returns the type name as a string: "INTEGER", "FLOAT", "STRING", "BOOL", "ARRAY", "TABLE", "FUNCTION", "NULL"</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>len(value)</code></td>
				<td class="px-4 py-2">Returns length: character count for strings, element count for arrays/tables.</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={typeConvExample}
		language="javascript"
	/>

	<!-- Array Operations Section -->
	<h2 id="array-operations">Array Operations</h2>

	<p>Work with lists of values. Arrays are ordered - each element has a position (0, 1, 2...).</p>

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
				<td class="px-4 py-2">Adds element to the END. Returns a NEW array (original unchanged).</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>prepend(arr, value)</code></td>
				<td class="px-4 py-2">Adds element to the START. Returns new array.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pop(arr)</code></td>
				<td class="px-4 py-2">Returns last element. Array unchanged. Returns null if empty.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>first(arr)</code></td>
				<td class="px-4 py-2">Returns first element. Null if empty.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>last(arr)</code></td>
				<td class="px-4 py-2">Returns last element. Null if empty.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>tail(arr)</code></td>
				<td class="px-4 py-2">Returns all elements except the first. Null if empty.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>reverse(arr)</code></td>
				<td class="px-4 py-2">Returns new array with elements in reverse order.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>sort(arr)</code></td>
				<td class="px-4 py-2">Returns new sorted array (numeric sort). Original unchanged.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>contains(arr, value)</code></td>
				<td class="px-4 py-2">Returns true if value exists in array (compares as strings).</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={arrayExample}
		language="javascript"
	/>

	<!-- Table Operations Section -->
	<h2 id="table-operations">Table Operations</h2>

	<p>Tables are like dictionaries or hash maps - they store key-value pairs. Keys are always strings, values can be anything.</p>

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
				<td class="px-4 py-2">Returns array of all keys</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>values(table)</code></td>
				<td class="px-4 py-2">Returns array of all values</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>has(table, key)</code></td>
				<td class="px-4 py-2">Returns true if key exists in table</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>tableDelete(table, key)</code></td>
				<td class="px-4 py-2">Returns NEW table without the key (original unchanged)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>merge(table1, table2)</code></td>
				<td class="px-4 py-2">Returns new table with both merged. table2 values override table1 on conflict.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>len(table)</code></td>
				<td class="px-4 py-2">Returns number of key-value pairs</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>contains(table, key)</code></td>
				<td class="px-4 py-2">Same as has() - checks if key exists</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={tableExample}
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

	<p>Interact with the operating system - run commands, manage files, handle environment variables, and control program flow.</p>

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
				<td class="px-4 py-2">Returns current working directory as string</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>cd(path)</code></td>
				<td class="px-4 py-2">Changes current directory. Returns null.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>env(name)</code></td>
				<td class="px-4 py-2">Gets environment variable value. Returns null if not set.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>setenv(name, value)</code></td>
				<td class="px-4 py-2">Sets environment variable. Returns null.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>args()</code></td>
				<td class="px-4 py-2">Returns command line arguments as array. First element is program name.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>exit(code)</code></td>
				<td class="px-4 py-2">Exits program immediately with status code (0 = success).</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>sleep(ms)</code></td>
				<td class="px-4 py-2">Pauses execution for milliseconds. Returns null.</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>osname()</code></td>
				<td class="px-4 py-2">Returns OS name: "linux", "darwin" (macOS), or "windows"</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>run(cmd, ...args)</code></td>
				<td class="px-4 py-2">Executes command directly (no shell). Returns <code>{'{'}"ok", "value", "error"{'}'}</code></td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>shell(cmd)</code></td>
				<td class="px-4 py-2">Executes command through shell (sh -c). Returns <code>{'{'}"ok", "value", "error"{'}'}</code></td>
			</tr>
		</tbody>
	</table>

	<h3>run() vs shell() - When to use which?</h3>

	<p><strong>Use run()</strong> when you know the exact command and arguments - safer, no shell interpretation:</p>

	<CodeBlock
		code={runExample}
		language="javascript"
	/>

	<p><strong>Use shell()</strong> when you need shell features like pipes, redirects, or wildcards:</p>

	<CodeBlock
		code={shellExample}
		language="javascript"
	/>

	<h3>Other System Functions</h3>

	<CodeBlock
		code={osExample}
		language="javascript"
	/>

	<!-- Time Section -->
	<h2 id="time">Time</h2>

	<p>Get the current time, format dates, and measure elapsed time in your programs.</p>

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
				<td class="px-4 py-2">Returns current Unix timestamp in seconds (large integer)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>timeMs()</code></td>
				<td class="px-4 py-2">Returns current Unix timestamp in milliseconds (even larger integer)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>timeStr()</code></td>
				<td class="px-4 py-2">Returns current time as "HH:MM:SS" (e.g., "14:30:00")</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>dateStr()</code></td>
				<td class="px-4 py-2">Returns current date as "YYYY-MM-DD" (e.g., "2024-03-02")</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>dateTimeStr()</code></td>
				<td class="px-4 py-2">Returns current date and time as "YYYY-MM-DD HH:MM:SS"</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>timeFormat(timestamp, format)</code></td>
				<td class="px-4 py-2">Formats Unix timestamp using Go time layout string</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={timeExample}
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
