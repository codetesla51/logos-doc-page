<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import { Copy, Check, Sparkles, AlertTriangle, Info } from 'lucide-svelte';

	let refCopied = $state(false);
	let copyTimeout = $state(null);

	const fullReference = `# Logos Language Reference (v0.4.5)

**For AI Code Generation** — Use this as the authoritative source when writing Logos code.

## Quick Facts
- File extension: .lgs
- CLI: lgs script.lgs | lgs build script.lgs | lgs fmt script.lgs
- Playground does NOT have std/array (map, filter, reduce) — use built-in operations instead

## Variables
let x = 10
const PI = 3.14159
x += 5  // compound assignment

## Types
Strings: "hello \${variable}" (interpolation, v0.4+)
Arrays: [1, 2, 3] — push(), pop(), sort(), range()
Tables: table{ name: "Alice", age: 30 } — dot or bracket access

## Functions
fn greet(name) { return "Hello, " + name }
let double = fn(x) -> x * 2

## Control Flow
if x > 10 { print("big") } else { print("small") }
for i < 10 { i += 1 }
for item in arr { print(item) }
for i, v in arr { print("\${i}: \${v}") }
range(0, 10) // 0-9 (end EXCLUSIVE, v0.4.2)
switch x { case 1 { print("one") } default { print("other") } }

## Pipe Operator (v0.4+)
⚠️ Playground: Use loops instead of map/filter (std/array not available)
CLI: arr |> filter(fn) |> map(fn)

## Try Expression (v0.4+)
let res = try httpGet("url")  // unwraps result, propagates errors

## Concurrency
spawn { print("async") }
spawn for item in items { process(item) }

## Builtins
I/O: print(x) [newline], printn(x) [no newline], input(), prompt(msg), confirm(msg), select(msg, opts), clear()
Type: type(val), len(), keys(), values(), has(), tableDelete(), merge()
Conversion: str(val), int(val), float(val) [short aliases, v0.4.1]
String: upper(), lower(), trim(), replace(), split(), join(), contains(), startsWith(), endsWith(), indexOf(), repeat(), slice(), format()
Array: push(), pop(), first(), last(), tail(), reverse(), sort(), contains(), range(start, end, step?)
JSON: parseJson(), toJson(), prettyJson()
HTTP: httpGet(), httpPost(), httpPut(), httpPatch(), httpDelete()
Math: mathAbs(), mathSqrt(), mathPow(), mathFloor(), mathCeil(), mathRound(), mathMin(), mathMax(), mathRandom(), mathRandomInt(), mathPi()
Time: timeNow(), timeMs(), timeStr(), dateStr(), dateTimeStr(), timeFormat(), sleep()
System: osname(), pwd(), cd(), env(), setenv(), args() [user args at index 0], exit(), run(), shell()
Color: colorRed(), colorGreen(), colorYellow(), colorBlue(), colorBold()
Regex: reMatch(), reFind(), reFindAll(), reReplace(), reSplit(), reGroups() (v0.4.3)

## std/array (CLI only, NOT on playground)
map(), filter(), reduce(), unique(), sum(), min(), max(), indexOf()

## std/math (CLI only)
mathFib(), mathFactorial(), mathIsPrime(), mathGcd(), mathLcm(), mathMean(), mathMedian(), mathClamp(), mathLerp()

## std/string (CLI only)
strCapitalize(), strReverse(), strIsPalindrome(), strIsEmpty(), strCount(), strPadStart(), strPadEnd()

## std/path (CLI only)
pathJoin(), pathBase(), pathDir(), pathExt(), pathWithoutExt(), pathIsAbs(), pathExists()

## std/time (CLI only)
datetimeNow(), datetimeFromTimestamp(), datetimeFormat(), datetimeAdd(), datetimeSubtract(), datetimeDiff(), datetimeIsAfter(), datetimeIsBefore(), datetimeIsEqual(), datetimeToStr()

## std/type (CLI only)
isString(), isInt(), isFloat(), isNumber(), isBool(), isArray(), isTable(), isNull(), isCallable()

## std/log (CLI only)
logDebug(), logInfo(), logWarn(), logError()

## std/testing (CLI only)
assert(), suite(), summary()

## Common Patterns
// args() - user args START at index 0 (binary & script already removed)
// lgs script.lgs --name "Alice" --verbose
args()[0]  // "--name" (NOT binary path!)

// For-in over tables
for key in keys(table) { print(table[key]) }

// range() end is EXCLUSIVE
for i in range(0, 10) { print(i) }  // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 (NOT 10)

// Gotchas
// WRONG: let bad = "$" + "hi"  // don't put strings inside interpolation
// CORRECT: let hi = "hi"; "\${hi}"  // use backslash escape
// t["1"] ≠ t[1]  // bracket access is type-aware`;

	async function copyReference() {
		try {
			await navigator.clipboard.writeText(fullReference);
			refCopied = true;
			if (copyTimeout) clearTimeout(copyTimeout);
			copyTimeout = setTimeout(() => { refCopied = false; }, 3000);
		} catch (e) {
			console.error('Failed to copy:', e);
		}
	}

	const playgroundWarning = `// ⚠️ PLAYGROUND LIMITATIONS
// std/array (map, filter, reduce, etc.) is NOT available
// Use built-in operations and loops instead

// WRONG for playground:
let evens = nums |> filter(fn(x) -> x % 2 == 0) |> map(fn(x) -> x * 2)

// CORRECT for playground:
let evens = []
for n in nums {
    if n % 2 == 0 {
        push(evens, n * 2)
    }
}`;

	const variablesCode = `// Basic variables
let x = 10
let name = "Alice"
let pi = 3.14
let active = true
let nothing = null

// Reassign freely
x += 5     // 15
x -= 2     // 13

// const - immutable binding (v0.4.2)
const PI = 3.14159
const API_KEY = "abc123"

PI = 3.14  // Error! Cannot reassign const

// Postfix operators (v0.4)
let i = 0
i++   // 1
i--   // 0`;

	const stringsCode = `let s = "hello world"

// String interpolation (v0.4+)
let name = "Alice"
let greeting = "Hello, \${name}!"  // "Hello, Alice!"

// No quoted strings inside \${}
let dollar = "$"
let price = "\${dollar}10"  // CORRECT

// Functions
upper("hello")    // "HELLO"
lower("HELLO")    // "hello"
trim("  hi  ")    // "hi"
split("a,b,c", ",")  // ["a", "b", "c"]
join(["a", "b"], "-")  // "a-b"`;

	const arraysCode = `let nums = [1, 2, 3, 4, 5]
let mixed = [1, "hello", true]

nums[0]           // 1 (zero-indexed)
len(nums)         // 5
contains(nums, 3) // true

// Mutations (modify in place)
push(nums, 6)       // append: [1,2,3,4,5,6]
prepend(nums, 0)    // prepend: [0,1,2,3,4,5,6]
pop(nums)           // remove last, return it
first(nums)         // first element
last(nums)          // last element
tail(nums)          // all except first

// Returns new array
reverse([1, 2, 3])  // [3, 2, 1]
sort([3, 1, 2])     // [1, 2, 3] (strings OR numbers)`;

	const tablesCode = `let user = table{
    name: "Alice",
    age: 30,
    active: true,
}

// Dot access (string keys)
user.name         // "Alice"
user.name = "Bob" // mutate

// Bracket access (dynamic keys)
let key = "age"
user[key]         // 30

// Nested tables
let company = table{
    name: "Acme",
    address: table{ city: "Seattle" },
}
company.address.city  // "Seattle"

// Table utilities
keys(user)            // ["name", "age", "active"]
values(user)          // ["Bob", 30, true]
has(user, "email")    // false
tableDelete(user, "age")  // remove key
merge(t1, t2)          // merge two tables

// ⚠️ Bracket access is type-aware
let t = table{ "1": "one", 1: "one-again" }
t["1"]  // "one" (string key)
t[1]    // "one-again" (number key)`;

	const forLoopsCode = `// While-style
let i = 0
for i < 5 {
    print(i)
    i += 1
}

// For-in arrays
for item in items {
    print(item)
}

// For-in with index
for i, v in items {
    print("\${i}: \${v}")
}

// range() (v0.4.2) — end is EXCLUSIVE
for i in range(0, 5) {
    print(i)  // 0, 1, 2, 3, 4 (NOT 5!)
}

// With step
for i in range(0, 10, 2) {
    print(i)  // 0, 2, 4, 6, 8
}

// Countdown (step = -1)
for i in range(5, 0, -1) {
    print(i)  // 5, 4, 3, 2, 1
}

// For-in over table keys
for key in keys(user) {
    print(key + ": " + str(user[key]))
}`;

	const functionsCode = `// Named function
fn greet(name) {
    return "Hello, " + name
}

// Arrow function (implicit return)
let double = fn(x) -> x * 2

// First-class values
let apply = fn(f, x) -> f(x)
apply(double, 5)  // 10

// Closures - capture surrounding scope
let makeAdder = fn(x) {
    return fn(y) -> x + y
}
let add5 = makeAdder(5)
add5(3)   // 8
add5(10)  // 15`;

	const errorHandlingCode = `// Result pattern - manual checking
let res = httpGet("https://api.example.com")
if res.ok {
    print(res.value.body)
} else {
    print("Error: " + res.error)
}

// Try expression (v0.4+) - unwraps and propagates
fn readConfig(path) {
    let content = try fileRead(path)
    let config = try parseJson(content)
    return config
}

// Without try - verbose
fn readConfigVerbose(path) {
    let res = fileRead(path)
    if !res.ok { return res.error }
    let json = parseJson(res.value)
    if !json.ok { return json.error }
    return json.value
}`;

	const concurrencyCode = `// Spawn single task
spawn {
    print("runs in background")
}

// Spawn loop - each iteration concurrent
let urls = ["https://api.example.com/1", "https://api.example.com/2"]
spawn for url in urls {
    let data = try httpGet(url)
    cache(url, data)
}

// Program waits for ALL spawns to complete before exit`;

	const pipeCode = `// Simple pipe - pass to function
let name = "hello"
name |> upper()  // "HELLO"

// ⚠️ Playground: Use loops for transformations
// (std/array not available)

// Pipe + try - error propagation
let data = try httpGet("https://api.example.com")
    |> try parseJson
    |> try filter(fn(u) -> u.active)`;

	const argsCode = `// Running: lgs script.lgs --name "Alice" --verbose
let cliArgs = args()

print(cliArgs[0])    // "--name" (NOT the binary path!)
print(cliArgs[1])    // "Alice"
len(cliArgs)         // 2 (binary & script already removed)

// Common pattern: flag checking
if contains(cliArgs, "--verbose") {
    print("Verbose mode")
}
if contains(cliArgs, "--name") {
    let idx = indexOf(cliArgs, "--name")
    let name = cliArgs[idx + 1]
    print("Name: " + name)
}`;

	const httpCode = `// GET request
let body = try httpGet("https://api.example.com/users")

// With headers
let headers = table{
    "Authorization": "Bearer " + env("API_TOKEN"),
    "Content-Type": "application/json"
}
let data = try httpGet("https://api.example.com/private", headers)

// POST with JSON
let payload = try toJson(table{ name: "Alice", email: "alice@example.com" })
let res = try httpPost("https://api.example.com/users", payload)

// Methods: httpGet, httpPost, httpPut, httpPatch, httpDelete`;

	const jsonCode = `// Parse JSON
let data = try parseJson('{"name": "Alice", "age": 30}')
print(data.name)      // "Alice"
print(str(data.age)) // "30"

// Convert to JSON
let user = table{ name: "Bob", score: 95 }
let json = try toJson(user)

// Pretty format
let pretty = try prettyJson(data)`;

	const fileCode = `// ⚠️ File I/O only works in CLI, NOT playground

let content = try fileRead("config.json")
try fileWrite("output.txt", "Hello!")
try fileAppend("log.txt", "New entry\\n")

if fileExists("data.json") {
    let data = try fileRead("data.json")
}

try fileMkdir("backup/2024")
let files = try fileReadDir(".")
let scripts = try fileGlob("*.lgs")`;

	const regexCode = `// reMatch - true/false if matches
reMatch(\`\\d+\`, "abc123")   // true

// reFind - first match or null
reFind(\`\\d+\`, "3 cats")   // "3"

// reFindAll - array of matches
reFindAll(\`\\d+\`, "1 and 2")  // ["1", "2"]

// reReplace - replace all
reReplace(\`\\d+\`, "3 cats", "X")  // "X cats"

// reSplit - split by pattern
reSplit(\`\\s+\`, "a  b c")   // ["a", "b", "c"]

// reGroups - capture groups
let parts = reGroups(\`(\\w+)@(\\w+)\`, "alice@example.com")
parts[0]  // "alice"
parts[1]  // "example"

// Use backticks for raw patterns (Go regexp)`;

	const gotchasCode = `// WRONG
let bad = "\${dollar}10"       // syntax error - no strings inside \${}
// Can't put quoted strings directly inside interpolation

// CORRECT
let hi = "hi"
let greeting = "\${hi}"        // use variable, not quoted string
for i in range(10, 0, -1) {}   // countdown (end is EXCLUSIVE)
let item = len(arr) > 0 ? arr[0] : null  // check length first

// Type-aware bracket access
let t = table{ 1: "one", "1": "one-again" }
t[1]    // number key: "one"
t["1"]  // string key: "one-again"

// sort() works on strings AND numbers
sort(["c", "a", "b"])  // ["a", "b", "c"]
sort([3, 1, 2])       // [1, 2, 3]`;

	const modulesCode = `// Standard library modules (CLI only)
use "std/array"    // map, filter, reduce, unique, sum, min, max, indexOf
use "std/math"    // mathFib, mathFactorial, mathIsPrime, mathGcd, mathLcm, mathMean, mathMedian, mathClamp, mathLerp
use "std/string"  // strCapitalize, strReverse, strIsPalindrome, strIsEmpty, strCount, strPadStart, strPadEnd
use "std/path"    // pathJoin, pathBase, pathDir, pathExt, pathWithoutExt, pathIsAbs, pathExists
use "std/time"    // datetimeNow, datetimeFormat, datetimeAdd, datetimeSubtract, datetimeDiff, datetimeIsAfter, datetimeIsBefore, datetimeIsEqual
use "std/type"    // isString, isInt, isFloat, isNumber, isBool, isArray, isTable, isNull, isCallable
use "std/log"     // logDebug, logInfo, logWarn, logError
use "std/testing" // assert, suite, summary

// ⚠️ NOT available on playground`;

	const stdlibArrayCode = `use "std/array"

// Map - transform each element
map([1, 2, 3], fn(x) -> x * 2)  // [2, 4, 6]

// Filter - keep matching elements
filter([1, 2, 3, 4], fn(x) -> x % 2 == 0)  // [2, 4]

// Reduce - combine to single value
reduce([1, 2, 3], fn(acc, x) -> acc + x, 0)  // 6

// Other utilities
unique([1, 2, 2, 3])        // [1, 2, 3]
sum([1, 2, 3])              // 6
min([3, 1, 2])              // 1
max([3, 1, 2])              // 3
indexOf(["a", "b", "c"], "b")  // 1

// ⚠️ Playground: Use loops instead`;

	const stdlibMathCode = `use "std/math"

mathFib(10)          // 55 (10th Fibonacci)
mathFactorial(5)     // 120 (5!)
mathIsPrime(17)      // true
mathGcd(48, 18)      // 6
mathLcm(4, 6)        // 12
mathMean([1, 2, 3])  // 2.0
mathMedian([1, 2, 3]) // 2
mathClamp(15, 0, 10) // 10 (constrain to range)
mathLerp(0, 100, 0.5) // 50.0 (linear interpolation)`;

	const stdlibStringCode = `use "std/string"

strCapitalize("hello world")  // "Hello World"
strReverse("hello")          // "olleh"
strIsPalindrome("racecar")   // true
strIsEmpty("")               // true
strCount("banana", "a")      // 3
strPadStart("42", 6, "0")    // "000042"
strPadEnd("hi", 6, ".")      // "hi...."`;

	const stdlibPathCode = `use "std/path"

pathJoin(["home", "user", "docs"])    // "home/user/docs"
pathBase("/home/user/file.txt")       // "file.txt"
pathDir("/home/user/file.txt")        // "/home/user"
pathExt("/home/user/file.txt")        // ".txt"
pathWithoutExt("/home/user/file.txt") // "/home/user/file"
pathIsAbs("/home/user")              // true
pathExists("/etc/passwd")            // true`;

	const stdlibTimeCode = `use "std/time"

let now = datetimeNow()
print(now["date"])  // "2026-03-20"
print(now["str"])   // "2026-03-20 15:04:05"

// Add/subtract
datetimeAdd(now, 1, "days")
datetimeSubtract(now, 7, "days")

// Format (Go time layout)
datetimeFormat(now, "January 2, 2006")  // "March 20, 2026"
datetimeFormat(now, "02/01/2006")        // "03/20/2026"

// Comparison
datetimeIsAfter(tomorrow, now)    // true
datetimeIsBefore(yesterday, now)   // true
datetimeIsEqual(now, now)         // true`;

	const embeddingCode = `import "github.com/codetesla51/logos/logos"

vm := logos.New()

vm.Register("greet", func(args ...logos.Object) logos.Object {
    name := args[0].(*logos.String).Value
    return &logos.String{Value: "Hello, " + name}
})

vm.SetVar("count", 42)
err := vm.Run(\`print(greet("World"))\`)
result := vm.GetVar("count")`;

	const sandboxCode = `vm := logos.NewWithConfig(logos.SandboxConfig{
    AllowFileIO:  false,  // Disable file operations
    AllowNetwork: false,  // Disable HTTP
    AllowShell:   false,  // Disable shell/exec
    AllowExit:    false,  // Disable exit()
})`;
</script>

<svelte:head>
	<title>LLM Reference - Logos Documentation</title>
	<meta name="description" content="Complete Logos language reference for AI and LLM systems. Includes syntax, builtins, stdlib, and validated code examples." />
	<meta name="keywords" content="Logos, scripting language, programming language, AI reference, LLM, Go, interpreter" />
	<meta property="og:title" content="Logos LLM Reference" />
	<meta property="og:description" content="Complete Logos language reference for AI and LLM systems" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Logos LLM Reference" />
	<meta name="twitter:description" content="Complete Logos language reference for AI and LLM systems" />
	<link rel="canonical" href="https://logos-lang.vercel.app/docs/llm" />
</svelte:head>

<DocLayout
	prev={{ title: 'Examples', href: '/docs/examples' }}
	next={null}
>
	<div class="not-prose mb-8 rounded-xl border border-white/10 bg-white/[0.02] p-6">
		<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
			<div class="flex-1">
				<div class="flex items-center gap-2 mb-2">
					<Sparkles class="h-5 w-5 text-amber-400" />
					<h2 class="text-lg font-semibold text-white m-0">For AI & LLM Code Generation</h2>
				</div>
				<p class="text-sm text-zinc-400 mb-0">
					Copy this reference and paste it in your AI prompts. All code examples are validated against the v0.4.5 interpreter.
				</p>
			</div>
			<button
				onclick={copyReference}
				class="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-100 shrink-0"
			>
				{#if refCopied}
					<Check class="h-4 w-4" />
					Copied!
				{:else}
					<Copy class="h-4 w-4" />
					Copy Full Reference
				{/if}
			</button>
		</div>
	</div>

	<h1>LLM Reference</h1>

	<p>
		This reference is the authoritative source for generating accurate Logos code. All examples are validated against the v0.4.5 interpreter.
	</p>

	<div class="not-prose my-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
		<div class="flex items-start gap-3">
			<AlertTriangle class="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
			<div>
				<p class="text-sm text-amber-200 mb-2">
					<strong>Critical:</strong> The web playground does NOT have <code>std/array</code> (map, filter, reduce, etc.).
					Use built-in array operations and loops for playground-compatible code.
				</p>
				<CodeBlock code={playgroundWarning} language="javascript" />
			</div>
		</div>
	</div>

	<h2 id="quick-facts">Quick Facts</h2>

	<ul>
		<li><strong>File extension:</strong> <code>.lgs</code></li>
		<li><strong>CLI:</strong> <code>lgs file.lgs</code> | <code>lgs build file.lgs</code> | <code>lgs fmt file.lgs</code></li>
		<li><strong>Interpreter:</strong> Pratt parser + tree-walking evaluator in Go</li>
		<li><strong>GitHub:</strong> <a href="https://github.com/codetesla51/logos" target="_blank" rel="noopener">github.com/codetesla51/logos</a></li>
	</ul>

	<h2 id="variables">Variables</h2>

	<CodeBlock code={variablesCode} language="javascript" />

	<h2 id="strings">Strings</h2>

	<CodeBlock code={stringsCode} language="javascript" />

	<h2 id="arrays">Arrays</h2>

	<CodeBlock code={arraysCode} language="javascript" />

	<h2 id="tables">Tables (Objects/Maps)</h2>

	<CodeBlock code={tablesCode} language="javascript" />

	<h2 id="control-flow">Control Flow</h2>

	<h3>For Loops</h3>

	<CodeBlock code={forLoopsCode} language="javascript" />

	<h3>Switch</h3>

	<CodeBlock code={`switch role {
    case "admin" { print("full access") }
    case "editor" { print("can edit") }
    default { print("read only") }
}
// No fallthrough`} language="javascript" />

	<h2 id="functions">Functions</h2>

	<CodeBlock code={functionsCode} language="javascript" />

	<h2 id="error-handling">Error Handling</h2>

	<CodeBlock code={errorHandlingCode} language="javascript" />

	<h3>Try + Pipe (v0.4+)</h3>
	<p>Errors propagate automatically through the chain:</p>

	<CodeBlock code={`let data = try httpGet("https://api.example.com")
    |> try parseJson
    |> try filter(fn(u) -> u.active)

// If httpGet fails, the whole chain returns the error`} language="javascript" />

	<h2 id="concurrency">Concurrency</h2>

	<CodeBlock code={concurrencyCode} language="javascript" />

	<h2 id="args">CLI Arguments</h2>
	<p>
		<code>args()</code> returns user arguments starting at index 0. The binary path and script path are already removed.
	</p>

	<CodeBlock code={argsCode} language="javascript" />

	<h2 id="builtins">Built-in Functions</h2>

	<h3>I/O</h3>
	<p>
		<code>print(x)</code> outputs with trailing newline. <code>printn(x)</code> outputs without.
	</p>
	<p>
		<code>input()</code> · <code>prompt(msg)</code> · <code>confirm(msg)</code> · <code>select(msg, opts[])</code> · <code>clear()</code>
	</p>

	<CodeBlock code={`print("Hello!")        // with newline
printn("No newline")  // without newline
print("Next line")

let name = input()           // read stdin
let age = prompt("Age: ")    // show prompt, read input

if confirm("Delete?") {
    print("Deleted!")
}

let color = select("Pick:", ["red", "green", "blue"])`} language="javascript" />

	<h3>Type</h3>
	<p><code>type(val)</code> · <code>len(str|arr)</code> · <code>keys(table)</code> · <code>values(table)</code> · <code>has(table, key)</code></p>

	<h3>Type Conversion</h3>
	<p>
		<code>str(val)</code> · <code>int(val)</code> · <code>float(val)</code> are short aliases (v0.4.1).
		The <code>to*</code> forms still work.
	</p>

	<h3>String</h3>
	<p>
		<code>upper(s)</code> · <code>lower(s)</code> · <code>trim(s)</code> · <code>replace(s, old, new)</code> ·
		<code>split(s, sep)</code> · <code>join(arr, sep)</code> · <code>contains(str|arr, val)</code> ·
		<code>startsWith(s, prefix)</code> · <code>endsWith(s, suffix)</code> · <code>indexOf(s, sub)</code> ·
		<code>repeat(s, n)</code> · <code>slice(str|arr, start, end)</code> · <code>format(tmpl, args...)</code>
	</p>

	<h3>Array</h3>
	<p>
		<code>push(arr, val)</code> · <code>prepend(arr, val)</code> · <code>pop(arr)</code> ·
		<code>first(arr)</code> · <code>last(arr)</code> · <code>tail(arr)</code> ·
		<code>reverse(arr)</code> · <code>sort(arr)</code> · <code>contains(arr, val)</code> ·
		<code>range(start, end, step?)</code>
	</p>
	<p><strong>Important:</strong> <code>range()</code> end is EXCLUSIVE. <code>range(0, 10)</code> gives 0-9, not 0-10.</p>

	<h3>JSON</h3>
	<p><code>parseJson(str)</code> · <code>toJson(val)</code> · <code>prettyJson(val)</code></p>

	<CodeBlock code={jsonCode} language="javascript" />

	<h3>HTTP</h3>
	<p><code>httpGet(url, headers?)</code> · <code>httpPost(url, body, headers?)</code> · <code>httpPut(url, body)</code> · <code>httpPatch(url, body)</code> · <code>httpDelete(url)</code></p>

	<CodeBlock code={httpCode} language="javascript" />

	<h3>File I/O <span class="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded ml-2">CLI Only</span></h3>
	<p><code>fileRead(path)</code> · <code>fileWrite(path, data)</code> · <code>fileAppend(path, data)</code> · <code>fileDelete(path)</code> · <code>fileExists(path)</code> · <code>fileMkdir(path)</code> · <code>fileReadDir(path)</code> · <code>fileGlob(pattern)</code> · <code>fileCopy(src, dst)</code> · <code>fileMove(src, dst)</code></p>

	<CodeBlock code={fileCode} language="javascript" />

	<h3>Math</h3>
	<p>
		<code>mathAbs(n)</code> · <code>mathSqrt(n)</code> · <code>mathPow(base, exp)</code> ·
		<code>mathFloor(n)</code> · <code>mathCeil(n)</code> · <code>mathRound(n)</code> ·
		<code>mathMin(a, b)</code> · <code>mathMax(a, b)</code> · <code>mathRandom()</code> ·
		<code>mathRandomInt(min, max)</code> · <code>mathPi()</code>
	</p>

	<h3>Time</h3>
	<p><code>timeNow()</code> · <code>timeMs()</code> · <code>timeStr()</code> · <code>dateStr()</code> · <code>dateTimeStr()</code> · <code>timeFormat(ts, fmt)</code> · <code>sleep(ms)</code></p>

	<h3>System</h3>
	<p><code>osname()</code> · <code>pwd()</code> · <code>cd(path)</code> · <code>env(key)</code> · <code>setenv(key, val)</code> · <code>args()</code> · <code>exit(code)</code> · <code>run(cmd, args...)</code> · <code>shell(cmd)</code></p>

	<h3>Color Output</h3>
	<p><code>colorRed(s)</code> · <code>colorGreen(s)</code> · <code>colorYellow(s)</code> · <code>colorBlue(s)</code> · <code>colorBold(s)</code></p>

	<CodeBlock code={`print(colorRed("Error!"))
print(colorGreen("Success"))
print(colorBold(colorYellow("Warning")))`} language="javascript" />

	<h3>Regex (v0.4.3)</h3>
	<p>
		<code>reMatch(pattern, text)</code> · <code>reFind(pattern, text)</code> ·
		<code>reFindAll(pattern, text)</code> · <code>reReplace(pattern, text, repl)</code> ·
		<code>reSplit(pattern, text)</code> · <code>reGroups(pattern, text)</code>
	</p>
	<p>Uses Go regexp syntax. Use backticks for raw patterns.</p>

	<CodeBlock code={regexCode} language="javascript" />

	<h2 id="stdlib">Standard Library <span class="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded ml-2">CLI Only</span></h2>

	<div class="not-prose my-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
		<div class="flex items-center gap-2 mb-2">
			<Info class="h-4 w-4 text-amber-400" />
			<span class="text-sm text-amber-200"><strong>Note:</strong> Standard library modules are NOT available on the web playground. Use built-in operations and loops instead.</span>
		</div>
	</div>

	<h3>std/array</h3>
	<p><code>map(arr, fn)</code> · <code>filter(arr, fn)</code> · <code>reduce(arr, fn, init)</code> · <code>unique(arr)</code> · <code>sum(arr)</code> · <code>min(arr)</code> · <code>max(arr)</code> · <code>indexOf(arr, val)</code></p>

	<CodeBlock code={stdlibArrayCode} language="javascript" />

	<h3>std/math</h3>
	<p><code>mathFib(n)</code> · <code>mathFactorial(n)</code> · <code>mathIsPrime(n)</code> · <code>mathGcd(a, b)</code> · <code>mathLcm(a, b)</code> · <code>mathMean(arr)</code> · <code>mathMedian(arr)</code> · <code>mathClamp(n, min, max)</code> · <code>mathLerp(a, b, t)</code></p>

	<CodeBlock code={stdlibMathCode} language="javascript" />

	<h3>std/string</h3>
	<p><code>strCapitalize(s)</code> · <code>strReverse(s)</code> · <code>strIsPalindrome(s)</code> · <code>strIsEmpty(s)</code> · <code>strCount(s, sub)</code> · <code>strPadStart(s, len, c)</code> · <code>strPadEnd(s, len, c)</code></p>

	<CodeBlock code={stdlibStringCode} language="javascript" />

	<h3>std/path</h3>
	<p><code>pathJoin(parts)</code> · <code>pathBase(p)</code> · <code>pathDir(p)</code> · <code>pathExt(p)</code> · <code>pathWithoutExt(p)</code> · <code>pathIsAbs(p)</code> · <code>pathExists(p)</code></p>

	<CodeBlock code={stdlibPathCode} language="javascript" />

	<h3>std/time</h3>
	<p><code>datetimeNow()</code> · <code>datetimeFromTimestamp(ts)</code> · <code>datetimeFormat(dt, fmt)</code> · <code>datetimeAdd(dt, n, unit)</code> · <code>datetimeSubtract(dt, n, unit)</code> · <code>datetimeDiff(d1, d2, unit)</code> · <code>datetimeIsAfter(d1, d2)</code> · <code>datetimeIsBefore(d1, d2)</code> · <code>datetimeIsEqual(d1, d2)</code> · <code>datetimeToStr(dt)</code></p>

	<CodeBlock code={stdlibTimeCode} language="javascript" />

	<h3>std/type</h3>
	<p><code>isString(val)</code> · <code>isInt(val)</code> · <code>isFloat(val)</code> · <code>isNumber(val)</code> · <code>isBool(val)</code> · <code>isArray(val)</code> · <code>isTable(val)</code> · <code>isNull(val)</code> · <code>isCallable(val)</code></p>

	<h3>std/log</h3>
	<p><code>logDebug(msg)</code> · <code>logInfo(msg)</code> · <code>logWarn(msg)</code> · <code>logError(msg)</code></p>

	<h3>std/testing</h3>
	<p><code>assert(name, got, expected)</code> · <code>suite(name, fn)</code> · <code>summary()</code></p>

	<h2 id="embedding">Go Embedding</h2>

	<CodeBlock code={embeddingCode} language="go" />

	<h3>Sandbox Mode</h3>
	<p>Restrict capabilities for untrusted code:</p>

	<CodeBlock code={sandboxCode} language="go" />

	<h2 id="gotchas">Gotchas & Common Mistakes</h2>

	<CodeBlock code={gotchasCode} language="javascript" />

	<h2 id="limitations">Known Limitations</h2>

	<ul>
		<li>Dot access only works with string-keyed table fields</li>
		<li>Bracket access is type-aware: <code>t["1"]</code> ≠ <code>t[1]</code></li>
		<li>No try/catch — use result pattern or try expression</li>
		<li>No classes/structs — use tables</li>
		<li>No variadic user functions — only builtins support <code>args...</code></li>
		<li><code>spawn</code> waits for all goroutines to complete before exit</li>
		<li>std/array not available on playground server</li>
		<li><code>args()</code> does not work in compiled binaries — use <code>lgs script.lgs</code></li>
	</ul>

	<h2 id="cheat-sheet">Quick Cheat Sheet</h2>

	<div class="grid md:grid-cols-2 gap-4 not-prose">
		<div class="bg-subtle/50 rounded-lg p-4">
			<h4 class="text-sm font-semibold text-white mb-2">Variables</h4>
			<code class="text-xs text-green-400">let x = 10<br/>const PI = 3.14<br/>x += 5</code>
		</div>
		<div class="bg-subtle/50 rounded-lg p-4">
			<h4 class="text-sm font-semibold text-white mb-2">Strings</h4>
			<code class="text-xs text-green-400">"Hello ${"{"}name{"}"}"<br/>split("a,b", ",")</code>
		</div>
		<div class="bg-subtle/50 rounded-lg p-4">
			<h4 class="text-sm font-semibold text-white mb-2">Arrays</h4>
			<code class="text-xs text-green-400">[1, 2, 3]<br/>push(arr, x)<br/>sort(arr)</code>
		</div>
		<div class="bg-subtle/50 rounded-lg p-4">
			<h4 class="text-sm font-semibold text-white mb-2">Tables</h4>
			<code class="text-xs text-green-400">let u = table{'{'}<br/>  name: "Alice"<br/>{'}'}<br/>u.name</code>
		</div>
		<div class="bg-subtle/50 rounded-lg p-4">
			<h4 class="text-sm font-semibold text-white mb-2">Functions</h4>
			<code class="text-xs text-green-400">fn add(a, b) {'{'}<br/>  return a + b<br/>{'}'}<br/>fn(x) -> x * 2</code>
		</div>
		<div class="bg-subtle/50 rounded-lg p-4">
			<h4 class="text-sm font-semibold text-white mb-2">Loops</h4>
			<code class="text-xs text-green-400">for i in range(0, 10) {'{'}<br/>  print(i)<br/>{'}'}</code>
		</div>
		<div class="bg-subtle/50 rounded-lg p-4">
			<h4 class="text-sm font-semibold text-white mb-2">Errors</h4>
			<code class="text-xs text-green-400">try httpGet(url)<br/>|> try parseJson</code>
		</div>
		<div class="bg-subtle/50 rounded-lg p-4">
			<h4 class="text-sm font-semibold text-white mb-2">HTTP</h4>
			<code class="text-xs text-green-400">try httpGet(url)<br/>try httpPost(url, body)</code>
		</div>
	</div>

	<p class="mt-8 text-sm text-zinc-500">
		<strong>Full reference:</strong> See <a href="/llm.txt" target="_blank">llm.txt</a> for the complete reference.
	</p>
</DocLayout>
