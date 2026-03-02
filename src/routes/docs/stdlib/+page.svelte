<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
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
		them using the <code>use</code> keyword.
	</p>

	<CodeBlock
		code={`use "std/array"
use "std/math"
use "std/string"
use "std/path"
use "std/time"
use "std/log"
use "std/type"
use "std/testing"`}
		language="javascript"
	/>

	<p class="text-muted mt-4">
		Standard library functions are written in Logos itself and build on top of the
		<a href="/docs/builtins" class="text-text hover:underline">builtin functions</a>.
	</p>

	<h2 id="std-array">std/array</h2>

	<p>Functional array utilities for transforming, filtering, and aggregating arrays.</p>

	<h3>Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>map(arr, fn)</code></td>
				<td class="px-4 py-2">Applies function to each element, returns new array</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>filter(arr, fn)</code></td>
				<td class="px-4 py-2">Returns elements where function returns true</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>reduce(arr, fn, initial)</code></td>
				<td class="px-4 py-2">Reduces array to single value</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>unique(arr)</code></td>
				<td class="px-4 py-2">Returns array with duplicates removed</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>flat(arr)</code></td>
				<td class="px-4 py-2">Flattens nested arrays</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>copy(arr)</code></td>
				<td class="px-4 py-2">Creates a shallow copy of array</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>sum(arr)</code></td>
				<td class="px-4 py-2">Returns sum of numeric elements</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>min(arr)</code></td>
				<td class="px-4 py-2">Returns minimum value</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>max(arr)</code></td>
				<td class="px-4 py-2">Returns maximum value</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>chunk(arr, size)</code></td>
				<td class="px-4 py-2">Splits array into chunks of given size</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>indexOf(arr, val)</code></td>
				<td class="px-4 py-2">Returns index of value, -1 if not found</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>containsAll(arr, items)</code></td>
				<td class="px-4 py-2">Checks if array contains all items</td>
			</tr>
		</tbody>
	</table>

	<p class="text-muted mt-2 text-sm">
		Also available with <code>array</code> prefix: <code>arrayMap</code>, <code>arrayFilter</code>,
		<code>arrayReduce</code>, <code>arraySum</code>, etc.
	</p>

	<h3>Example</h3>

	<CodeBlock
		code={`use "std/array"

let nums = [1, 2, 3, 4, 5]

// Map: double each number
let doubled = map(nums, fn(x) -> x * 2)
print(toStr(doubled))  // [2, 4, 6, 8, 10]

// Filter: keep even numbers
let evens = filter(nums, fn(x) -> x % 2 == 0)
print(toStr(evens))  // [2, 4]

// Reduce: sum all numbers
let total = reduce(nums, fn(acc, x) -> acc + x, 0)
print(toStr(total))  // 15

// Other utilities
print(toStr(sum(nums)))           // 15
print(toStr(min(nums)))           // 1
print(toStr(max(nums)))           // 5
print(toStr(unique([1, 2, 2, 3]))) // [1, 2, 3]
print(toStr(chunk(nums, 2)))      // [[1, 2], [3, 4], [5]]`}
		language="javascript"
	/>

	<h2 id="std-math">std/math</h2>

	<p>Mathematical functions and algorithms.</p>

	<h3>Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathFib(n)</code></td>
				<td class="px-4 py-2">Returns nth Fibonacci number</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathFactorial(n)</code></td>
				<td class="px-4 py-2">Returns factorial of n</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathMean(arr)</code></td>
				<td class="px-4 py-2">Returns average of array</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathMedian(arr)</code></td>
				<td class="px-4 py-2">Returns median of array</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathMode(arr)</code></td>
				<td class="px-4 py-2">Returns most frequent value</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathClamp(n, min, max)</code></td>
				<td class="px-4 py-2">Clamps value to range</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathLerp(a, b, t)</code></td>
				<td class="px-4 py-2">Linear interpolation</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathIsPrime(n)</code></td>
				<td class="px-4 py-2">Returns true if n is prime</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathGcd(a, b)</code></td>
				<td class="px-4 py-2">Greatest common divisor</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>mathLcm(a, b)</code></td>
				<td class="px-4 py-2">Least common multiple</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`use "std/math"

print(toStr(mathFactorial(5)))  // 120
print(toStr(mathFib(10)))       // 55
print(toStr(mathIsPrime(17)))   // true

let scores = [85, 90, 78, 92, 88]
print(toStr(mathMean(scores)))    // 86.6
print(toStr(mathMedian(scores)))  // 88

print(toStr(mathClamp(150, 0, 100)))  // 100
print(toStr(mathGcd(48, 18)))         // 6
print(toStr(mathLcm(4, 6)))           // 12`}
		language="javascript"
	/>

	<h2 id="std-string">std/string</h2>

	<p>String manipulation utilities.</p>

	<h3>Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strPadStart(s, len, char)</code></td>
				<td class="px-4 py-2">Pads string at start to length</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strPadEnd(s, len, char)</code></td>
				<td class="px-4 py-2">Pads string at end to length</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strCapitalize(s)</code></td>
				<td class="px-4 py-2">Capitalizes first character</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strIsEmpty(s)</code></td>
				<td class="px-4 py-2">Returns true if string is empty/whitespace</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strCount(s, sub)</code></td>
				<td class="px-4 py-2">Counts occurrences of substring</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strReverse(s)</code></td>
				<td class="px-4 py-2">Reverses the string</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strIsPalindrome(s)</code></td>
				<td class="px-4 py-2">Returns true if string is palindrome</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>strRepeat(s, n)</code></td>
				<td class="px-4 py-2">Repeats string n times</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`use "std/string"

print(strReverse("hello"))         // olleh
print(strCapitalize("hello"))      // Hello
print(toStr(strIsPalindrome("racecar")))  // true

print(strPadStart("42", 5, "0"))   // 00042
print(strPadEnd("hi", 5, "!"))     // hi!!!

print(toStr(strCount("banana", "a")))  // 3
print(strRepeat("ab", 3))              // ababab`}
		language="javascript"
	/>

	<h2 id="std-path">std/path</h2>

	<p>File path manipulation utilities.</p>

	<h3>Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathJoin(parts)</code></td>
				<td class="px-4 py-2">Joins path components (array)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathBase(path)</code></td>
				<td class="px-4 py-2">Returns filename portion</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathDir(path)</code></td>
				<td class="px-4 py-2">Returns directory portion</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathExt(path)</code></td>
				<td class="px-4 py-2">Returns file extension</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathIsAbs(path)</code></td>
				<td class="px-4 py-2">Returns true if path is absolute</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathClean(path)</code></td>
				<td class="px-4 py-2">Cleans path (resolves .. and .)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathExists(path)</code></td>
				<td class="px-4 py-2">Returns true if path exists</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>pathWithoutExt(path)</code></td>
				<td class="px-4 py-2">Returns path without extension</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`use "std/path"

let p = "/home/user/docs/file.txt"

print(pathBase(p))        // file.txt
print(pathDir(p))         // /home/user/docs
print(pathExt(p))         // .txt
print(pathWithoutExt(p))  // /home/user/docs/file

print(toStr(pathIsAbs(p)))      // true
print(toStr(pathExists(".")))   // true

// Join path components
let joined = pathJoin(["/home", "user", "docs"])
print(joined)  // /home/user/docs

// Clean messy paths
print(pathClean("/home/user/../user/docs"))  // /home/user/docs`}
		language="javascript"
	/>

	<h2 id="std-time">std/time</h2>

	<p>Date and time utilities with datetime objects.</p>

	<h3>Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeNow()</code></td>
				<td class="px-4 py-2">Returns current datetime object</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeFromTimestamp(ts)</code></td>
				<td class="px-4 py-2">Creates datetime from Unix timestamp</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeFormat(dt, fmt)</code></td>
				<td class="px-4 py-2">Formats datetime with Go layout</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeIsAfter(dt1, dt2)</code></td>
				<td class="px-4 py-2">Returns true if dt1 is after dt2</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeIsBefore(dt1, dt2)</code></td>
				<td class="px-4 py-2">Returns true if dt1 is before dt2</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeIsEqual(dt1, dt2)</code></td>
				<td class="px-4 py-2">Returns true if datetimes are equal</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeDiff(dt1, dt2, unit)</code></td>
				<td class="px-4 py-2">Returns difference in specified unit</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeAdd(dt, amount, unit)</code></td>
				<td class="px-4 py-2">Adds time to datetime</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeSubtract(dt, amount, unit)</code></td>
				<td class="px-4 py-2">Subtracts time from datetime</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>datetimeToStr(dt)</code></td>
				<td class="px-4 py-2">Returns datetime as string</td>
			</tr>
		</tbody>
	</table>

	<p class="text-muted mt-2 text-sm">
		Units: <code>"seconds"</code>, <code>"minutes"</code>, <code>"hours"</code>,
		<code>"days"</code>, <code>"weeks"</code>
	</p>

	<h3>Example</h3>

	<CodeBlock
		code={`use "std/time"

let now = datetimeNow()
print(now["str"])    // 2026-03-02 14:30:00
print(now["date"])   // 2026-03-02
print(now["time"])   // 14:30:00

// Add time
let tomorrow = datetimeAdd(now, 1, "days")
let nextWeek = datetimeAdd(now, 7, "days")

// Format with custom layout
print(datetimeFormat(now, "Jan 2, 2006"))  // Mar 2, 2026

// Compare datetimes
print(toStr(datetimeIsAfter(tomorrow, now)))  // true

// Calculate difference
let diff = datetimeDiff(nextWeek, now, "days")
print(toStr(diff))  // 7`}
		language="javascript"
	/>

	<h2 id="std-log">std/log</h2>

	<p>Structured logging with levels and optional file output.</p>

	<h3>Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>logDebug(msg)</code></td>
				<td class="px-4 py-2">Logs debug message (white)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>logInfo(msg)</code></td>
				<td class="px-4 py-2">Logs info message (green)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>logWarn(msg)</code></td>
				<td class="px-4 py-2">Logs warning message (yellow)</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>logError(msg)</code></td>
				<td class="px-4 py-2">Logs error message (red)</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`use "std/log"

logDebug("Starting application...")
logInfo("Server listening on port 8080")
logWarn("Configuration file not found, using defaults")
logError("Failed to connect to database")

// Output includes timestamp and level:
// [2026-03-02 14:30:00] [INFO] Server listening on port 8080`}
		language="javascript"
	/>

	<h2 id="std-type">std/type</h2>

	<p>Type checking utilities for runtime type inspection.</p>

	<h3>Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isNull(val)</code></td>
				<td class="px-4 py-2">Returns true if value is null</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isString(val)</code></td>
				<td class="px-4 py-2">Returns true if value is string</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isInt(val)</code></td>
				<td class="px-4 py-2">Returns true if value is integer</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isFloat(val)</code></td>
				<td class="px-4 py-2">Returns true if value is float</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isBool(val)</code></td>
				<td class="px-4 py-2">Returns true if value is boolean</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isArray(val)</code></td>
				<td class="px-4 py-2">Returns true if value is array</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isTable(val)</code></td>
				<td class="px-4 py-2">Returns true if value is table</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isNumber(val)</code></td>
				<td class="px-4 py-2">Returns true if int or float</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>isCallable(val)</code></td>
				<td class="px-4 py-2">Returns true if value is function</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`use "std/type"

let validate = fn(value) {
    if isNull(value) {
        return "Value is required"
    }
    if !isNumber(value) {
        return "Value must be a number"
    }
    return null
}

print(toStr(isString("hello")))  // true
print(toStr(isInt(42)))          // true
print(toStr(isNumber(3.14)))     // true
print(toStr(isArray([1, 2, 3]))) // true
print(toStr(isCallable(fn() {}))) // true`}
		language="javascript"
	/>

	<h2 id="std-testing">std/testing</h2>

	<p>Simple testing framework for writing and running tests.</p>

	<h3>Functions</h3>

	<table class="w-full border-collapse text-left">
		<thead>
			<tr class="border-border border-b">
				<th class="text-text px-4 py-2">Function</th>
				<th class="text-text px-4 py-2">Description</th>
			</tr>
		</thead>
		<tbody class="text-muted">
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>assert(name, got, expected)</code></td>
				<td class="px-4 py-2">Asserts got equals expected</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>suite(name, fn)</code></td>
				<td class="px-4 py-2">Defines a test suite</td>
			</tr>
			<tr class="border-border border-b">
				<td class="px-4 py-2"><code>summary()</code></td>
				<td class="px-4 py-2">Prints test results and exits</td>
			</tr>
		</tbody>
	</table>

	<h3>Example</h3>

	<CodeBlock
		code={`use "std/testing"

let add = fn(a, b) -> a + b
let multiply = fn(a, b) -> a * b

suite("math", fn() {
    assert("add 1 + 2", add(1, 2), 3)
    assert("add negative", add(-1, 1), 0)
    assert("multiply", multiply(3, 4), 12)
})

suite("strings", fn() {
    assert("upper", upper("hello"), "HELLO")
    assert("len", len("test"), 4)
})

summary()

// Output on success:
// ok    math, strings    5 tests passed

// Output on failure:
// --- FAIL: add 1 + 2 (got=4 expected=3)
// FAIL
// failed: 1/5`}
		language="javascript"
		filename="test.lgs"
	/>
</DocLayout>
