<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import { Copy, Check, Sparkles } from 'lucide-svelte';

	let refCopied = $state(false);
	let copyTimeout = $state(null);

	const fullReference = `# Logos Language Reference (v0.4.5)

Logos is a dynamically-typed, interpreted scripting language written in Go. It uses a Pratt parser and a tree-walking interpreter.
File extension: .lgs
CLI: lgs file.lgs | lgs build file.lgs | lgs fmt file.lgs
GitHub: https://github.com/codetesla51/logos
Docs: https://logos-lang.vercel.app/docs
Version: v0.4.5

---

## SYNTAX OVERVIEW

### Variables
let x = 10
let name = "Uthman"
let pi = 3.14
let flag = true
let nothing = null
Variables are mutable. Reassign with =.

### Compound Assignment
x += 5
x -= 2
x *= 3
x /= 2
x %= 4

### Postfix Increment/Decrement
let i = 0
i++     // 1
i--     // 0
print(i)

### Strings
let s = "hello world"

// String interpolation with \${} (v0.4+)
let name = "world"
let greeting = "hello \${name}"
let age = 25
let bio = "\${name} is \${age} years old"

### Arrays
let arr = [1, 2, 3, "four", true]
let first = arr[0]
let last = arr[len(arr) - 1]

### Tables (Maps/Objects)
let user = table{
  name: "Uthman",
  age: 20,
  active: true
}

Dot access — works with string-keyed tables:
user.name       // "Uthman"
user.age        // 20

Dot assignment — mutate table fields:
user.name = "New Name"
user.age = 21

Bracket access — works on tables and is type-aware. The key type matters:
user["name"]          // works — string key lookup
table{1: "one"}[1]   // works — integer key lookup
table{1: "one"}["1"] // returns null — different type, different key

Nested tables render with proper indentation via print():
let config = table{
  db: table{
    host: "localhost",
    port: 5432
  }
}

---

## CONTROL FLOW

### If / Else
if x > 10 {
  print("big")
} else {
  print("small")
}

You can chain else if:
if x > 10 {
  print("big")
} else if x > 5 {
  print("medium")
} else {
  print("small")
}

### Switch
switch x {
  case 1 { print("one") }
  case 2 { print("two") }
  default { print("other") }
}

### For Loop (while-style)
for i < 10 {
  i += 1
}

### For-In Loop
for item in arr {
  print(item)
}

Use index variable with for i, v in (v0.3.1+):
for i, v in arr {
  print("\${i}: \${v}")
}

When iterating a table, each item is a 2-element array [key, value]:
for pair in user {
  print(pair[0])   // key string
  print(pair[1])   // value
}

### Break / Continue
for item in arr {
  if item == 3 { break }
  if item == 1 { continue }
  print(item)
}

---

## FUNCTIONS

### Anonymous Function
let add = fn(x, y) {
  return x + y
}
add(2, 3)   // 5

### Named Function
fn greet(name) {
  return "Hello " + name
}
greet("Uthman")

### Arrow Function (single expression)
let double = fn(x) -> x * 2
let square = fn(x) -> x * x

### Closures
fn makeCounter() {
  let count = 0
  return fn() {
    count += 1
    return count
  }
}
let counter = makeCounter()
counter()   // 1
counter()   // 2

---

## OPERATORS

Arithmetic: +, -, *, /, %
Comparison: ==, !=, <, >, <=, >=
Logical: &&, ||, !
Ternary: ? : (v0.3.2+) e.g., condition ? valueIfTrue : valueIfFalse
Pipe: |> (v0.4+) e.g., arr |> filter(fn) |> map(fn)

### Pipe Operator (v0.4+)
Chain function calls left to right:
let nums = [1, 2, 3, 4, 5]
let result = nums |> filter(fn(x) -> x % 2 == 0) |> map(fn(x) -> x * 2)
print(result)  // [4, 8]

---

## MODULES

use "filename"       // loads filename.lgs from same directory
use "std/math"       // loads from stdlib
use "std/array"
use "std/string"
use "std/path"
use "std/time"
use "std/type"
use "std/log"
use "std/testing"
Exports are implicit — everything defined at top level is accessible after use.

---

## ERROR HANDLING

### Try Expression (v0.4+)
Unwraps result tables and propagates errors up the call stack:
fn fetchData() {
  let res = try httpGet("https://api.example.com/data")
  return res.value.body
}
Without try, you would need:
fn fetchData() {
  let res = httpGet("https://api.example.com/data")
  if !res.ok { return res }
  return res.value.body
}

---

## CONCURRENCY

### Spawn Block
Runs each statement concurrently as a goroutine. Waits for all to finish.
spawn {
  print("task 1")
  print("task 2")
}

### Spawn For-In
Runs each iteration concurrently. Arrays only.
spawn for item in jobs {
  process(item)
}

---

## RESULT PATTERN

All HTTP, file, and shell builtins return a result table:
table{
  ok: true/false,
  value: <data or null>,
  error: "<message or empty string>"
}
Always check ok before using value:
let res = httpGet("https://api.example.com/data")
if res.ok {
  print(res.value.body)
  print(res.value.status)
} else {
  print(res.error)
}

---

## BUILTINS REFERENCE

### I/O
print(args...) — Prints all arguments with proper formatting. Handles all types including nested tables with indentation.
input(prompt?) — Reads line from stdin, optional prompt
prompt(msg) — Prints msg then reads a line
confirm(msg) — Prints "msg (y/n):", returns bool
select(msg, options[]) — Numbered menu, returns chosen element
clear() — Clears terminal screen
printn(args...) — Prints without trailing newline (v0.4.5)

### Color Output
All take 1 string argument and return string wrapped in ANSI codes.
colorRed(str) — Red
colorGreen(str) — Green
colorYellow(str) — Yellow
colorBlue(str) — Blue
colorMagenta(str) — Magenta
colorCyan(str) — Cyan
colorWhite(str) — White
colorBold(str) — Bold

### Type / Inspection
type(val) — Returns type name string: "INTEGER", "FLOAT", "STRING", "BOOLEAN", "NULL", "ARRAY", "TABLE", "FUNCTION"
len(val) — Length of string or array
keys(t) — Array of table keys as strings (without type prefix)
values(t) — Array of table values
has(t, key) — Returns bool — true if string key exists

### Type Conversion (v0.4.1+)
str(val) — Convert any value to string (short alias)
int(val) — Convert to integer (short alias)
float(val) — Convert to float (short alias)
toStr(val) — Convert any value to its string representation
toInt(val) — Converts string/float/bool to integer
toFloat(val) — Converts string/int/bool to float
toBool(val) — Converts value to boolean
Note: str(), int(), float() are short aliases added in v0.4.1. The to* forms still work.

### String
upper(s) — Uppercase
lower(s) — Lowercase
trim(s) — Trim leading/trailing whitespace
replace(s, old, new) — Replace all occurrences
split(s, sep) — Split string into array
join(arr, sep) — Join array of strings into one string
contains(val, sub) — True if string contains substring OR array contains value
startsWith(s, prefix) — Returns bool
endsWith(s, suffix) — Returns bool
indexOf(s, sub) — Index of first occurrence, -1 if not found
repeat(s, n) — Repeat string n times
slice(val, s, e) — Substring or sub-array (end is exclusive)
format(tmpl, args...) — Printf-style formatting with {} placeholders

### Array
push(arr, val) — Returns new array with val appended
pop(arr) — Returns last element, null if empty
first(arr) — Returns first element, null if empty
last(arr) — Returns last element, null if empty
tail(arr) — Returns all but first, null if empty
prepend(arr, val) — Returns new array with val at front
reverse(arr) — Returns reversed array
sort(arr) — Returns sorted array. Handles both string and numeric arrays (v0.4.1+)
slice(arr, s, e) — Sub-array from start to end (exclusive)
contains(arr, val) — Returns bool
range(start, end, step?) — Generates numeric sequence. End is EXCLUSIVE.

### Table
keys(t) — Returns array of key strings
values(t) — Returns array of values
has(t, key) — Returns bool
tableDelete(t, key) — Returns new table without that key
merge(t1, t2) — Merges two tables; t2 overwrites on conflict

### Math
mathAbs(n) — Absolute value
mathSqrt(n) — Square root
mathPow(base, exp) — Power
mathFloor(n) — Floor (returns integer)
mathCeil(n) — Ceiling (returns integer)
mathRound(n) — Round (returns integer)
mathMin(a, b) — Minimum of two numbers (returns float)
mathMax(a, b) — Maximum of two numbers (returns float)
mathRandom() — Random float between 0.0 and 1.0
mathRandomInt(min, max) — Random integer between min and max inclusive
mathPi() — Returns pi (3.14159...)

### JSON
parseJson(str) — Parses JSON string. Returns {ok, value, error}. Arrays -> Array, objects -> Table.
toJson(val) — Returns {ok, value, error}. Converts Logos value to compact JSON string.
prettyJson(val) — Returns {ok, value, error}. Pretty-printed JSON string.

### File I/O (disabled in sandbox)
All file builtins except fileExists return a result table {ok, value, error}.
fileRead(path) — Returns result with file content as string in value
fileWrite(path, content) — Overwrites file
fileAppend(path, content) — Appends to file
fileDelete(path) — Deletes file or empty directory
fileMkdir(path) — Creates directory and all parents
fileReadDir(path) — Returns result with array of filenames in value
fileGlob(pattern) — Returns result with matching path strings in value
fileCopy(src, dst) — Copies file
fileMove(src, dst) — Moves/renames file or directory
fileExists(path) — Returns bool directly (not a result table)

### HTTP (disabled in sandbox)
All HTTP builtins return a result table: {ok, value: {body, status}, error}
body is a string. status is an integer HTTP status code.
httpGet(url, headers?) — GET request
httpPost(url, body, headers?) — POST request
httpPut(url, body, headers?) — PUT request
httpPatch(url, body, headers?) — PATCH request
httpDelete(url, headers?) — DELETE request
headers is an optional table of string key-value pairs. body must be a string (typically JSON).

### Regex (v0.4.3)
reMatch(pattern, text) — Returns true if pattern matches
reFind(pattern, text) — Returns first match or null
reFindAll(pattern, text) — Returns array of all matches
reReplace(pattern, text, repl) — Replace all matches
reSplit(pattern, text) — Split by pattern
reGroups(pattern, text) — Returns capture groups array
Uses Go regexp syntax. Patterns use backticks for raw strings.

### Time
timeNow() — Current Unix timestamp in seconds (integer)
timeMs() — Current Unix timestamp in milliseconds (integer)
timeStr() — Current time string e.g. "15:04:05"
dateStr() — Current date string e.g. "2026-03-16"
dateTimeStr() — Current date+time string e.g. "2026-03-16 15:04:05"
timeFormat(ts, fmt) — Formats a unix timestamp using Go time layout string
sleep(ms) — Pauses execution for given milliseconds

### System / OS (disabled in sandbox)
osname() — Returns OS string: "linux", "darwin", "windows"
pwd() — Returns current working directory string
cd(path) — Changes current working directory
env(key) — Returns env variable value string or null
setenv(key, val) — Sets environment variable
args() — Returns CLI arguments as array (index 0 onward). Has bounds checking — returns empty array if no arguments.
exit(code?) — Exits process, optional integer code (default 0)
shell(cmd) — Runs shell command string, returns result table with output string in value
run(cmd, args...) — Runs command with separate args, returns result table

---

## STDLIB REFERENCE

Stdlib modules must be imported with use before their functions are available.

### std/array
use "std/array"
map(arr, func) — Transform each element
filter(arr, func) — Keep passing elements
reduce(arr, func, initial) — Combine to single value
unique(arr) — Remove duplicates
flat(arr) — Flatten nested arrays
sum(arr) — Sum all numbers
min(arr) — Smallest number
max(arr) — Largest number
indexOf(arr, val) — Find position
containsAll(arr, items) — Check all present

### std/string
use "std/string"
strCapitalize(str) — Capitalize first letter
strReverse(str) — Reverse characters
strIsPalindrome(str) — Returns true if palindrome
strIsEmpty(str) — Returns true if empty or whitespace
strCount(str, sub) — Count occurrences
strRepeat(str, n) — Repeat string n times
strPadStart(str, length, char) — Pad start
strPadEnd(str, length, char) — Pad end

### std/math
use "std/math"
mathFib(n) — nth Fibonacci number
mathFactorial(n) — n!
mathMean(arr) — Average
mathMedian(arr) — Middle value
mathMode(arr) — Most common value
mathClamp(n, min, max) — Constrain to range
mathLerp(a, b, t) — Linear interpolation
mathIsPrime(n) — Returns true if prime
mathGcd(a, b) — Greatest common divisor
mathLcm(a, b) — Least common multiple

### std/path
use "std/path"
pathJoin(arr) — Joins array of path parts with /
pathBase(path) — Filename portion of path
pathDir(path) — Directory portion of path
pathExt(path) — File extension e.g. ".lgs"
pathIsAbs(path) — Returns true if absolute
pathClean(path) — Simplify path
pathExists(path) — Returns true if exists
pathWithoutExt(path) — Path without extension

### std/time
use "std/time"
All datetime functions work with datetime objects: table{timestamp, str, date, time}.
datetimeNow() — Current datetime
datetimeFromTimestamp(ts) — From Unix timestamp
datetimeFormat(dt, fmt) — Custom format
datetimeIsAfter(dt1, dt2) — Returns bool
datetimeIsBefore(dt1, dt2) — Returns bool
datetimeIsEqual(dt1, dt2) — Returns bool
datetimeDiff(dt1, dt2, unit) — Difference
datetimeAdd(dt, amount, unit) — Add time
datetimeSubtract(dt, n, u) — Subtract time
datetimeToStr(dt) — To string

### std/type
use "std/type"
isNull(val) — Check null
isString(val) — Check string
isInt(val) — Check integer
isFloat(val) — Check float
isBool(val) — Check boolean
isArray(val) — Check array
isTable(val) — Check table
isNumber(val) — Check int or float
isCallable(val) — Check function

### std/log
use "std/log"
logDebug(msg) — Debug level (white)
logInfo(msg) — Info level (green)
logWarn(msg) — Warn level (yellow)
logError(msg) — Error level (red)

### std/testing
use "std/testing"
assert(name, got, expected) — Check equality
suite(name, func) — Group tests
summary() — Print results

---

## EMBEDDING LOGOS IN GO

import "github.com/codetesla51/logos/logos"

// Create VM (all capabilities enabled)
vm := logos.New()

// Create sandboxed VM
vm := logos.NewWithConfig(logos.SandboxConfig{
    AllowFileIO:  false,
    AllowNetwork: false,
    AllowShell:   false,
    AllowExit:    false,
})

// Register a Go function callable from Logos
vm.Register("greet", func(args ...logos.Object) logos.Object {
    name := args[0].(*logos.String).Value
    return &logos.String{Value: "Hello, " + name}
})

// Set a variable in the Logos environment
vm.SetVar("count", 42)
vm.SetVar("config", map[string]interface{}{"port": 8080})

// Run a script string
err := vm.Run(\`print(greet("World"))\`)

// Get a variable back as a Go value
result := vm.GetVar("count") // returns interface{}

// Call a Logos function from Go
result, err := vm.Call("myFunction", arg1, arg2)

Supported Go <-> Logos type conversions:
- int, int64 <-> Integer
- float64 <-> Float
- string <-> String
- bool <-> Bool
- []interface{} <-> Array
- map[string]interface{} <-> Table
- nil <-> Null

---

## SANDBOX MODE

When running in the Logos playground (web), sandbox mode is active:
- File I/O builtins disabled (fileRead, fileWrite, etc.)
- HTTP builtins disabled (httpGet, httpPost, etc.)
- Shell/exec builtins disabled (shell, run)
- exit() disabled
- Calling a sandboxed function returns an error object: "function 'X' is not available in sandbox mode"

---

## COMMON PATTERNS

### HTTP + JSON + Pipe
let users = try httpGet("https://api.example.com/users")
    |> try parseJson
    |> filter(fn(u) -> u.active)
    |> map(fn(u) -> u.name)
print(users)

### String Interpolation
let name = "Alice"
let age = 28
print("\${name} is \${age} years old")

### Error Handling with try
fn safeFetch(url) {
    let res = try httpGet(url)
    let data = try parseJson(res.value.body)
    return data
}

### File Operations
let content = try fileRead("config.json")
let config = try parseJson(content)
print(config.port)

### CLI Arguments
// Running: lgs script.lgs --name "Alice" --verbose
let cliArgs = args()
print(cliArgs[0])    // "--name" (NOT binary path!)
print(cliArgs[1])    // "Alice"
// Binary and script paths are already removed

---

## KNOWN LIMITATIONS

- Dot access only works with string-keyed table fields. Integer or boolean keys must use bracket access.
- Bracket access on tables is type-aware: t["1"] and t[1] are different keys.
- No try/catch — use the result pattern or try expression.
- No classes or structs — use tables as data containers.
- No variadic user-defined functions — only builtins support args....
- spawn waits for all goroutines (no fire-and-forget).
- spawn for item in only supports arrays, not tables or strings.
- args() does not work in compiled binaries — use lgs script.lgs`;

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

	<h2 id="stdlib">Standard Library</h2>

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
