<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	// -----------------
	// ARRAY EXAMPLES
	// -----------------
	const arrayExample = `use "std/array"

let nums = [1, 2, 3, 4, 5]

// Transform: apply function to each element
let doubled = map(nums, fn(x) -> x * 2)
print(toStr(doubled))  // [2, 4, 6, 8, 10]

// Filter: keep only elements that pass test
let evens = filter(nums, fn(x) -> x % 2 == 0)
print(toStr(evens))  // [2, 4]

// Reduce: combine all elements into one value
let total = reduce(nums, fn(acc, x) -> acc + x, 0)
print(toStr(total))  // 15

// Other handy utilities
print(toStr(sum([1, 2, 3, 4, 5])))           // 15
print(toStr(min([3, 1, 4, 1, 5])))           // 1
print(toStr(max([3, 1, 4, 1, 5])))           // 5
print(toStr(unique([1, 2, 2, 3, 3, 3])))     // [1, 2, 3]
print(toStr(flat([[1, 2], [3, 4], [5]])))     // [1, 2, 3, 4, 5]
print(toStr(chunk([1, 2, 3, 4, 5], 2)))       // [[1, 2], [3, 4], [5]]
print(toStr(indexOf([10, 20, 30], 20)))      // 1
print(toStr(containsAll([1, 2, 3, 4], [1, 2]))) // true`;

	// -----------------
	// MATH EXAMPLES
	// -----------------
	const mathExample = `use "std/math"

// Basic math functions
print(toStr(mathFactorial(5)))    // 120 (5! = 5*4*3*2*1)
print(toStr(mathFib(10)))         // 55 (0,1,1,2,3,5,8,13,21,34,55)
print(toStr(mathIsPrime(17)))    // true
print(toStr(mathIsPrime(18)))    // false

// Number theory
print(toStr(mathGcd(48, 18)))   // 6 (greatest common divisor)
print(toStr(mathLcm(4, 6)))      // 12 (least common multiple)

// Statistics
let scores = [85, 90, 78, 92, 88]
print(toStr(mathMean(scores)))   // 86.6 (average)
print(toStr(mathMedian(scores))) // 88 (middle value)
print(toStr(mathMode([1, 1, 2, 2, 2, 3]))) // 2 (most common)

// Utility
print(toStr(mathClamp(150, 0, 100)))  // 100 (constrain to range)
print(toStr(mathClamp(-10, 0, 100)))  // 0
print(toStr(mathLerp(0, 100, 0.5)))  // 50 (linear interpolation)`;

	// -----------------
	// STRING EXAMPLES
	// -----------------
	const stringExample = `use "std/string"

// Case and formatting
print(strCapitalize("hello world"))  // "Hello world"
print(upper("hello"))                // "HELLO"
print(lower("HELLO"))                // "hello"

// Checking
print(toStr(strIsEmpty("   ")))      // true (whitespace counts as empty)
print(toStr(strIsPalindrome("racecar"))) // true
print(toStr(strIsPalindrome("hello")))   // false

// Manipulation
print(strReverse("hello"))           // "olleh"
print(strRepeat("ab", 3))            // "ababab"
print(strCount("banana", "a"))        // 3 (count occurrences)

// Padding (useful for formatting)
print(strPadStart("42", 5, "0"))     // "00042" (e.g., version numbers)
print(strPadEnd("hi", 5, "!"))       // "hi!!!" (e.g., ASCII art)`;

	// -----------------
	// PATH EXAMPLES
	// -----------------
	const pathExample = `use "std/path"

// Split paths into parts
let p = "/home/user/docs/file.txt"

print(pathBase(p))         // "file.txt" (filename only)
print(pathDir(p))          // "/home/user/docs" (folder)
print(pathExt(p))          // ".txt" (extension with dot)
print(pathWithoutExt(p))   // "/home/user/docs/file" (no extension)

// Check properties
print(toStr(pathIsAbs("/home/user")))    // true (starts with /)
print(toStr(pathIsAbs("relative/file"))) // false

// Build and clean paths
let joined = pathJoin(["/home", "user", "docs", "file.txt"])
print(joined)  // "/home/user/docs/file.txt"

print(pathClean("/home/user/../user/docs/./file"))  // "/home/user/docs/file"

// Check if exists
print(toStr(pathExists("/etc/passwd")))  // true/false`;

	// -----------------
	// TIME EXAMPLES
	// -----------------
	const timeExample = `use "std/time"

// Get current datetime (returns a table with timestamp, str, date, time)
let now = datetimeNow()
print(now["str"])    // "2026-03-17 14:30:00"
print(now["date"])   // "2026-03-17"
print(now["time"])   // "14:30:00"

// Create datetime from timestamp
let ts = timeNow()
let dt = datetimeFromTimestamp(ts)

// Add/subtract time
let tomorrow = datetimeAdd(now, 1, "days")
let nextWeek = datetimeAdd(now, 7, "days")
let ago = datetimeSubtract(now, 30, "minutes")

// Custom formatting (Go time layout)
print(datetimeFormat(now, "January 2, 2006"))    // "March 17, 2026"
print(datetimeFormat(now, "02/01/2006"))          // "03/17/2026"

// Compare datetimes
print(toStr(datetimeIsAfter(tomorrow, now)))  // true
print(toStr(datetimeIsBefore(ago, now)))      // true
print(toStr(datetimeIsEqual(now, now)))       // true

// Calculate difference
let diff = datetimeDiff(nextWeek, now, "days")
print(toStr(diff))  // 7

// Convert to string
print(datetimeToStr(now))  // same as now["str"]`;

	// -----------------
	// LOG EXAMPLES
	// -----------------
	const logExample = `use "std/log"

// Simple logging with different levels
logDebug("This is debug info")   // White text
logInfo("Server started")        // Green text  
logWarn("Low memory")            // Yellow text
logError("Connection failed")    // Red text

// Output format:
// [2026-03-17 14:30:00] [DEBUG] This is debug info
// [2026-03-17 14:30:00] [INFO] Server started
// [2026-03-17 14:30:00] [WARN] Low memory
// [2026-03-17 14:30:00] [ERROR] Connection failed

// Log levels filter output - only show INFO and above by default
// Set different level if needed (internal variables _logLevel)`;

	// -----------------
	// TYPE EXAMPLES
	// -----------------
	const typeExample = `use "std/type"

// Check what type a value is
let val = 42
print(toStr(isInt(val)))          // true
print(toStr(isNumber(val)))       // true (int OR float)
print(toStr(isString(val)))       // false

// Practical use: validate function input
let processInput = fn(input) {
    if isNull(input) {
        print("Error: input is required")
        return null
    }
    if !isNumber(input) {
        print("Error: input must be a number")
        return null
    }
    if input < 0 {
        print("Error: input must be positive")
        return null
    }
    return input * 2
}

// Type checking in action
print(toStr(isString("hello")))     // true
print(toStr(isFloat(3.14)))         // true
print(toStr(isBool(true)))          // true
print(toStr(isArray([1, 2, 3])))    // true
print(toStr(isTable(table{})))      // true
print(toStr(isCallable(fn() {})))   // true (functions are callable)`;

	// -----------------
	// TESTING EXAMPLES
	// -----------------
	const testingExample = `use "std/testing"

// Your functions to test
let add = fn(a, b) -> a + b
let multiply = fn(a, b) -> a * b
let greet = fn(name) -> "Hello, " + name + "!"

// Define test suites
suite("math operations", fn() {
    assert("add positive numbers", add(1, 2), 3)
    assert("add negative numbers", add(-1, 1), 0)
    assert("add zeros", add(0, 0), 0)
    
    assert("multiply basics", multiply(3, 4), 12)
    assert("multiply by zero", multiply(5, 0), 0)
})

suite("string operations", fn() {
    assert("greet with name", greet("Alice"), "Hello, Alice!")
    assert("greet with empty", greet(""), "Hello, !")
})

// Run all tests and print summary
summary()

// If all pass, output:
// ok    math operations, string operations    5 tests passed

// If one fails:
// --- FAIL: add negative numbers (got=0 expected=0)  // oh wait this passed
// FAIL
// failed: 1/5`;
</script>

<svelte:head>
	<title>Standard Library - Logos Documentation</title>
</svelte:head>

<DocLayout
	prev={{ title: 'Syntax & Types', href: '/docs/syntax' }}
	next={{ title: 'Builtins', href: '/docs/builtins' }}
>
	<h1>Standard Library</h1>

	<p>
		Logos comes with a set of standard library modules that provide common functionality. Import
		them using the <code>use</code> keyword. These modules contain pure Logos functions - no hidden
		Go code!
	</p>

	<p class="text-muted mt-4">
		Each module is written in Logos itself and builds on top of the
		<a href="/docs/builtins" class="text-text hover:underline">builtin functions</a>.
	</p>

	<nav class="border-border bg-subtle/50 my-6 rounded-lg border p-4">
		<h3 class="text-text mb-3 text-sm font-medium">Available Modules</h3>
		<ul class="text-muted grid gap-2 text-sm">
			<li><code>std/array</code> - Functional array operations (map, filter, reduce, etc.)</li>
			<li><code>std/math</code> - Math functions and algorithms</li>
			<li><code>std/string</code> - String manipulation utilities</li>
			<li><code>std/path</code> - File path operations</li>
			<li><code>std/time</code> - Date/time handling</li>
			<li><code>std/log</code> - Structured logging</li>
			<li><code>std/type</code> - Runtime type checking</li>
			<li><code>std/testing</code> - Simple testing framework</li>
		</ul>
	</nav>

	<CodeBlock
		code={`// Import any combination of modules
use "std/array"
use "std/math"
use "std/string"
use "std/path"
use "std/time"
use "std/log"
use "std/type"
use "std/testing"`}
		language="javascript"
	/>

	<h2 id="std-array">std/array</h2>

	<p>Functional programming utilities for arrays. Transform, filter, and reduce your data with these powerful functions.</p>

	<h3>Core Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">What it does</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>map(arr, fn)</code></td>
				<td class="px-4 py-2">Applies function to each element, returns new array with transformed values</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>filter(arr, fn)</code></td>
				<td class="px-4 py-2">Keeps only elements where the function returns true</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>reduce(arr, fn, initial)</code></td>
				<td class="px-4 py-2">Combines all elements into one value using accumulator function</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>unique(arr)</code></td>
				<td class="px-4 py-2">Returns new array with all duplicate values removed</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>flat(arr)</code></td>
				<td class="px-4 py-2">Recursively flattens nested arrays into one level</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>chunk(arr, size)</code></td>
				<td class="px-4 py-2">Splits array into smaller arrays of given size</td>
			</tr>
		</tbody>
	</table>

	<h3>Statistical Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">What it does</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>sum(arr)</code></td>
				<td class="px-4 py-2">Adds all numbers together, returns total</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>min(arr)</code></td>
				<td class="px-4 py-2">Returns smallest number (exits with error if empty)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>max(arr)</code></td>
				<td class="px-4 py-2">Returns largest number (exits with error if empty)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>indexOf(arr, val)</code></td>
				<td class="px-4 py-2">Finds position of value, returns -1 if not found</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>containsAll(arr, items)</code></td>
				<td class="px-4 py-2">Returns true if array contains every item in the items array</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>copy(arr)</code></td>
				<td class="px-4 py-2">Creates a shallow copy of the array</td>
			</tr>
		</tbody>
	</table>

	<p class="text-muted mt-4 text-sm">
		<strong>Note:</strong> All array functions that transform data return a NEW array, leaving the original unchanged.
		This is called "immutable" behavior - safer for your code!
	</p>

	<h3>Example</h3>

	<CodeBlock
		code={arrayExample}
		language="javascript"
	/>

	<h2 id="std-math">std/math</h2>

	<p>Mathematical functions including number theory, statistics, and utility functions. Great for data analysis and calculations.</p>

	<h3>Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">What it does</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathFactorial(n)</code></td>
				<td class="px-4 py-2">Returns n! (n × n-1 × ... × 1)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathFib(n)</code></td>
				<td class="px-4 py-2">Returns nth Fibonacci number (0,1,1,2,3,5,8...)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathIsPrime(n)</code></td>
				<td class="px-4 py-2">Returns true if n is a prime number</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathGcd(a, b)</code></td>
				<td class="px-4 py-2">Greatest common divisor (Euclidean algorithm)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathLcm(a, b)</code></td>
				<td class="px-4 py-2">Least common multiple</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathMean(arr)</code></td>
				<td class="px-4 py-2">Average of all numbers in array</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathMedian(arr)</code></td>
				<td class="px-4 py-2">Middle value when sorted (or average of two middle)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathMode(arr)</code></td>
				<td class="px-4 py-2">Most frequently occurring value</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathClamp(n, min, max)</code></td>
				<td class="px-4 py-2">Returns n if between min/max, otherwise returns boundary</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathLerp(a, b, t)</code></td>
				<td class="px-4 py-2">Linear interpolation: a + (b-a) × t</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={mathExample}
		language="javascript"
	/>

	<h2 id="std-string">std/string</h2>

	<p>String manipulation utilities - helpful for text processing, formatting, and validation.</p>

	<h3>Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">What it does</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strCapitalize(s)</code></td>
				<td class="px-4 py-2">Capitalizes first letter, rest lowercase</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strReverse(s)</code></td>
				<td class="px-4 py-2">Reverses string characters</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strIsPalindrome(s)</code></td>
				<td class="px-4 py-2">Returns true if string reads same backwards</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strIsEmpty(s)</code></td>
				<td class="px-4 py-2">Returns true if string is empty or only whitespace</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strCount(s, sub)</code></td>
				<td class="px-4 py-2">Count how many times substring appears</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strRepeat(s, n)</code></td>
				<td class="px-4 py-2">Repeats string n times</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strPadStart(s, len, char)</code></td>
				<td class="px-4 py-2">Pads start with char to reach length</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strPadEnd(s, len, char)</code></td>
				<td class="px-4 py-2">Pads end with char to reach length</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={stringExample}
		language="javascript"
	/>

	<h2 id="std-path">std/path</h2>

	<p>File path manipulation - break paths apart, join components, and check file system properties.</p>

	<h3>Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">What it does</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathJoin(parts)</code></td>
				<td class="px-4 py-2">Joins array of path parts into one path</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathBase(path)</code></td>
				<td class="px-4 py-2">Returns filename (everything after last /)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathDir(path)</code></td>
				<td class="px-4 py-2">Returns directory (everything before last /)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathExt(path)</code></td>
				<td class="px-4 py-2">Returns extension including dot (e.g., ".txt")</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathWithoutExt(path)</code></td>
				<td class="px-4 py-2">Returns path with extension removed</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathIsAbs(path)</code></td>
				<td class="px-4 py-2">Returns true if path is absolute (starts with /)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathClean(path)</code></td>
				<td class="px-4 py-2">Resolves ".." and "." to get simplified path</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathExists(path)</code></td>
				<td class="px-4 py-2">Returns true if file or directory exists</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={pathExample}
		language="javascript"
	/>

	<h2 id="std-time">std/time</h2>

	<p>Date and time utilities - work with datetime objects, format dates, add/subtract time, and calculate differences.</p>

	<h3>Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">What it does</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeNow()</code></td>
				<td class="px-4 py-2">Returns current datetime as table with timestamp, str, date, time</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeFromTimestamp(ts)</code></td>
				<td class="px-4 py-2">Creates datetime table from Unix timestamp</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeFormat(dt, fmt)</code></td>
				<td class="px-4 py-2">Formats datetime using Go time layout (e.g., "Jan 2, 2006")</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeAdd(dt, amount, unit)</code></td>
				<td class="px-4 py-2">Adds time to datetime. Unit: "seconds", "minutes", "hours", "days", "weeks"</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeSubtract(dt, amount, unit)</code></td>
				<td class="px-4 py-2">Subtracts time from datetime</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeDiff(dt1, dt2, unit)</code></td>
				<td class="px-4 py-2">Returns difference between datetimes in specified unit</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeIsAfter(dt1, dt2)</code></td>
				<td class="px-4 py-2">Returns true if dt1 is later than dt2</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeIsBefore(dt1, dt2)</code></td>
				<td class="px-4 py-2">Returns true if dt1 is earlier than dt2</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeIsEqual(dt1, dt2)</code></td>
				<td class="px-4 py-2">Returns true if both datetimes represent the same moment</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeToStr(dt)</code></td>
				<td class="px-4 py-2">Returns datetime as string (same as dt["str"])</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={timeExample}
		language="javascript"
	/>

	<h2 id="std-log">std/log</h2>

	<p>Structured logging with color-coded levels. Great for debugging and monitoring your application's behavior.</p>

	<h3>Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">What it does</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>logDebug(msg)</code></td>
				<td class="px-4 py-2">Log debug message (white text)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>logInfo(msg)</code></td>
				<td class="px-4 py-2">Log info message (green text)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>logWarn(msg)</code></td>
				<td class="px-4 py-2">Log warning message (yellow text)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>logError(msg)</code></td>
				<td class="px-4 py-2">Log error message (red text)</td>
			</tr>
		</tbody>
	</table>

	<p class="text-muted mt-4 text-sm">
		<strong>Tip:</strong> Each log message includes timestamp and level, like: <code>[2026-03-17 14:30:00] [INFO] Your message here</code>
	</p>

	<h3>Example</h3>

	<CodeBlock
		code={logExample}
		language="javascript"
	/>

	<h2 id="std-type">std/type</h2>

	<p>Runtime type checking - check what type a value is before using it. Essential for writing safe, defensive code.</p>

	<h3>Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">What it does</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isNull(val)</code></td>
				<td class="px-4 py-2">Returns true if value is null/nil</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isString(val)</code></td>
				<td class="px-4 py-2">Returns true if value is a string</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isInt(val)</code></td>
				<td class="px-4 py-2">Returns true if value is an integer</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isFloat(val)</code></td>
				<td class="px-4 py-2">Returns true if value is a float</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isNumber(val)</code></td>
				<td class="px-4 py-2">Returns true if value is int OR float</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isBool(val)</code></td>
				<td class="px-4 py-2">Returns true if value is a boolean</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isArray(val)</code></td>
				<td class="px-4 py-2">Returns true if value is an array</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isTable(val)</code></td>
				<td class="px-4 py-2">Returns true if value is a table</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isCallable(val)</code></td>
				<td class="px-4 py-2">Returns true if value is a function (can be called)</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={typeExample}
		language="javascript"
	/>

	<h2 id="std-testing">std/testing</h2>

	<p>Simple testing framework for writing and running tests. Organize your tests into suites, assert expected values, and get a summary.</p>

	<h3>Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">What it does</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>assert(name, got, expected)</code></td>
				<td class="px-4 py-2">Checks if got equals expected, prints failure if not</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>suite(name, func)</code></td>
				<td class="px-4 py-2">Groups related tests together under a name</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>summary()</code></td>
				<td class="px-4 py-2">Prints final results and exits with error code if any tests failed</td>
			</tr>
		</tbody>
	</table>

	<p class="text-muted mt-4 text-sm">
		<strong>How it works:</strong> Call <code>assert</code> with a test name and expected value. If the values don't match, it prints a failure message. 
		At the end, call <code>summary()</code> to see pass/fail count. If any tests failed, the program exits with code 1.
	</p>

	<h3>Example</h3>

	<CodeBlock
		code={testingExample}
		language="javascript"
		filename="test.lgs"
	/>
</DocLayout>
