<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const arrayExample = `use "std/array"

let nums = [1, 2, 3, 4, 5]

// Transform each element
let doubled = map(nums, fn(x) -> x * 2)
// [2, 4, 6, 8, 10]

// Keep only elements matching a condition
let evens = filter(nums, fn(x) -> x % 2 == 0)
// [2, 4]

// Combine all elements into one value
let total = reduce(nums, fn(acc, x) -> acc + x, 0)
// 15

// Remove duplicates
let withDupes = [1, 2, 2, 3, 3, 3]
let unique = unique(withDupes)
// [1, 2, 3]

// Math on arrays
sum(nums)       // 15
min(nums)       // 1
max(nums)       // 5

// Find position
indexOf(nums, 3)    // 2 (0-based)
indexOf(nums, 99)   // -1 (not found)`;

	const mathExample = `use "std/math"

// Factorial and Fibonacci
mathFactorial(5)    // 120
mathFib(10)         // 55

// Prime checking
mathIsPrime(17)    // true
mathIsPrime(15)    // false

// Number theory
mathGcd(48, 18)    // 6 (greatest common divisor)
mathLcm(4, 6)      // 12 (least common multiple)

// Statistics
let scores = [85, 90, 78, 92, 88]
mathMean(scores)    // 86.6
mathMedian(scores)  // 88

// Number theory utilities
mathClamp(15, 0, 10)    // 10 (constrain to range)
mathLerp(0, 100, 0.25)   // 25.0 (linear interpolation)`;

	const stringExample = `use "std/string"

// Case manipulation
strCapitalize("hello world")    // "Hello World"
strReverse("hello")              // "olleh"

// String analysis
strIsPalindrome("racecar")       // true
strIsEmpty("")                  // true
strCount("banana", "a")         // 3

// Padding (useful for alignment)
strPadStart("42", 6, "0")       // "000042"
strPadEnd("hi", 6, ".")         // "hi...."`;

	const pathExample = `use "std/path"

let p = "/home/user/docs/report.pdf"

// Break path into parts
pathBase(p)      // "report.pdf"
pathDir(p)       // "/home/user/docs"
pathExt(p)       // ".pdf"
pathWithoutExt(p)  // "/home/user/docs/report"

// Build paths
let dir = pathJoin(["home", "user", "docs", "files"])
// "home/user/docs/files"

// Path analysis
pathIsAbs("/home/user")   // true
pathIsAbs("relative")     // false
pathExists("/etc/passwd") // true`;

	const timeExample = `use "std/time"

// Get current time
let now = datetimeNow()
print(now["date"])    // "2026-03-19"
print(now["str"])     // "2026-03-19 15:04:05"

// Time arithmetic
let tomorrow = datetimeAdd(now, 1, "days")
let nextWeek = datetimeAdd(now, 7, "days")
let yesterday = datetimeSubtract(now, 1, "days")

// Time differences
let diff = datetimeDiff(tomorrow, now, "days")  // 1

// Comparison
datetimeIsAfter(tomorrow, now)    // true
datetimeIsBefore(yesterday, now)  // true
datetimeIsEqual(now, now)          // true

// Formatting (Go time format)
datetimeFormat(now, "January 2, 2006")    // "March 19, 2026"
datetimeFormat(now, "02/01/2006")        // "03/19/2026"
datetimeFormat(now, "3:04 PM")           // "3:04 PM"`;

	const logExample = `use "std/log"

// Log levels with timestamps
logDebug("Debug info")    // white output
logInfo("Server started") // green output
logWarn("Low memory")     // yellow output
logError("Connection failed")  // red output

// Output:
// [2026-03-19 15:04:05] [DEBUG] Debug info
// [2026-03-19 15:04:05] [INFO] Server started`;

	const typeExample = `use "std/type"

let val = 42

// Check types at runtime
isInt(val)       // true
isFloat(val)     // false
isNumber(val)    // true (covers int and float)
isString(val)    // false
isBool(val)      // false
isNull(null)      // true
isArray([1,2,3]) // true
isTable(table{})  // true
isCallable(fn() {}) // true

// Use for type-safe code
fn process(val) {
    if isArray(val) {
        // handle array
    } else if isString(val) {
        // handle string
    }
}`;

	const testingExample = `use "std/testing"

// Group related tests
suite("string utils", fn() {
    assert("reverse", strReverse("hello"), "olleh")
    assert("capitalize", strCapitalize("hello"), "Hello")
    assert("palindrome", strIsPalindrome("racecar"), true)
})

suite("math utils", fn() {
    assert("factorial", mathFactorial(5), 120)
    assert("fibonacci", mathFib(10), 55)
    assert("prime", mathIsPrime(17), true)
})

// Run all tests and show summary
summary()`;

	const functions = {
		array: [
			{ name: 'map(arr, fn)', desc: 'Transform each element, return new array' },
			{ name: 'filter(arr, fn)', desc: 'Keep elements where fn returns true' },
			{ name: 'reduce(arr, fn, init)', desc: 'Combine to single value using fn(acc, val)' },
			{ name: 'unique(arr)', desc: 'Remove duplicate values' },
			{ name: 'sum(arr)', desc: 'Sum all numeric elements' },
			{ name: 'min(arr)', desc: 'Smallest element' },
			{ name: 'max(arr)', desc: 'Largest element' },
			{ name: 'indexOf(arr, val)', desc: 'Position of val, or -1 if not found' },
		],
		math: [
			{ name: 'mathFactorial(n)', desc: 'n! (1 * 2 * ... * n)' },
			{ name: 'mathFib(n)', desc: 'nth Fibonacci number (0-indexed)' },
			{ name: 'mathIsPrime(n)', desc: 'true if n is prime' },
			{ name: 'mathGcd(a, b)', desc: 'Greatest common divisor' },
			{ name: 'mathLcm(a, b)', desc: 'Least common multiple' },
			{ name: 'mathMean(arr)', desc: 'Average of numbers in array' },
			{ name: 'mathMedian(arr)', desc: 'Middle value (sorted)' },
			{ name: 'mathClamp(n, min, max)', desc: 'n if in range, else min/max' },
		],
		string: [
			{ name: 'strCapitalize(s)', desc: 'Capitalize first letter of each word' },
			{ name: 'strReverse(s)', desc: 'Reverse all characters' },
			{ name: 'strIsPalindrome(s)', desc: 'true if reads same forwards/backwards' },
			{ name: 'strIsEmpty(s)', desc: 'true if string is empty' },
			{ name: 'strCount(s, sub)', desc: 'Count occurrences of sub in s' },
			{ name: 'strPadStart(s, len, c)', desc: 'Pad s to len with c at start' },
			{ name: 'strPadEnd(s, len, c)', desc: 'Pad s to len with c at end' },
		],
		path: [
			{ name: 'pathJoin(parts)', desc: 'Join array of path components' },
			{ name: 'pathBase(p)', desc: 'Filename without directory' },
			{ name: 'pathDir(p)', desc: 'Directory portion of path' },
			{ name: 'pathExt(p)', desc: 'Extension including dot' },
			{ name: 'pathWithoutExt(p)', desc: 'Path without extension' },
			{ name: 'pathIsAbs(p)', desc: 'true if absolute path' },
			{ name: 'pathExists(p)', desc: 'true if file/dir exists' },
		],
		time: [
			{ name: 'datetimeNow()', desc: 'Current datetime as table' },
			{ name: 'datetimeAdd(dt, n, unit)', desc: 'Add n units (days/hours/etc)' },
			{ name: 'datetimeSubtract(dt, n, unit)', desc: 'Subtract n units' },
			{ name: 'datetimeDiff(d1, d2, unit)', desc: 'Difference in specified unit' },
			{ name: 'datetimeFormat(dt, fmt)', desc: 'Format with Go time layout' },
			{ name: 'datetimeIsAfter(d1, d2)', desc: 'true if d1 is later' },
		],
		log: [
			{ name: 'logDebug(msg)', desc: 'Debug level — white' },
			{ name: 'logInfo(msg)', desc: 'Info level — green' },
			{ name: 'logWarn(msg)', desc: 'Warning level — yellow' },
			{ name: 'logError(msg)', desc: 'Error level — red' },
		],
		type: [
			{ name: 'isString(val)', desc: 'Check if string' },
			{ name: 'isInt(val)', desc: 'Check if integer' },
			{ name: 'isFloat(val)', desc: 'Check if float' },
			{ name: 'isNumber(val)', desc: 'Check if int or float' },
			{ name: 'isBool(val)', desc: 'Check if boolean' },
			{ name: 'isArray(val)', desc: 'Check if array' },
			{ name: 'isTable(val)', desc: 'Check if table' },
			{ name: 'isCallable(val)', desc: 'Check if function' },
		],
		testing: [
			{ name: 'assert(name, got, expected)', desc: 'Check equality, report on mismatch' },
			{ name: 'suite(name, fn)', desc: 'Group related assertions' },
			{ name: 'summary()', desc: 'Print test results' },
		],
	};
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
		Modules written in Logos itself. Import with <code>use</code> at the top of your script.
		These modules provide functional programming utilities, math algorithms, and more.
	</p>

	<h2 id="std-array">std/array</h2>

	<p>
		Import with <code>use "std/array"</code> at the top of your script.
		Functional array operations. These work on arrays of any type, making data transformations
		declarative and readable.
	</p>

	<div class="grid gap-2">
		{#each functions.array as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={arrayExample} language="javascript" />

	<h2 id="std-math">std/math</h2>

	<p>
		Import with <code>use "std/math"</code> at the top of your script.
		Math utilities, number theory, and statistics. Great for algorithmic tasks without importing
		external libraries.
	</p>

	<div class="grid gap-2">
		{#each functions.math as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={mathExample} language="javascript" />

	<h2 id="std-string">std/string</h2>

	<p>
		Import with <code>use "std/string"</code> at the top of your script.
		String manipulation for formatting, analysis, and transformation. Complement to the built-in
		string functions.
	</p>

	<div class="grid gap-2">
		{#each functions.string as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={stringExample} language="javascript" />

	<h2 id="std-path">std/path</h2>

	<p>
		Import with <code>use "std/path"</code> at the top of your script.
		Cross-platform path manipulation. Handles separators and normalization automatically.
	</p>

	<div class="grid gap-2">
		{#each functions.path as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={pathExample} language="javascript" />

	<h2 id="std-time">std/time</h2>

	<p>
		Import with <code>use "std/time"</code> at the top of your script.
		Date and time handling. <code>datetimeNow()</code> returns a table with <code>date</code>,
		<code>str</code>, and <code>ts</code> (Unix timestamp) keys.
	</p>

	<div class="grid gap-2">
		{#each functions.time as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={timeExample} language="javascript" />

	<h2 id="std-log">std/log</h2>

	<p>
		Import with <code>use "std/log"</code> at the top of your script.
		Colored, timestamped log messages. Useful for CLI tools and background scripts where you
		want structured output.
	</p>

	<div class="grid gap-2">
		{#each functions.log as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={logExample} language="javascript" />

	<h2 id="std-type">std/type</h2>

	<p>
		Import with <code>use "std/type"</code> at the top of your script.
		Runtime type checking. Useful for type-safe utilities and handling mixed-type data.
	</p>

	<div class="grid gap-2">
		{#each functions.type as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={typeExample} language="javascript" />

	<h2 id="std-testing">std/testing</h2>

	<p>
		Import with <code>use "std/testing"</code> at the top of your script.
		Simple test framework. Group assertions with <code>suite</code>, run with <code>summary</code>.
		Prints a report showing which tests passed or failed.
	</p>

	<div class="grid gap-2">
		{#each functions.testing as fn}
			<div class="flex gap-4 bg-subtle/50 rounded px-3 py-2">
				<code class="text-green-400 text-xs sm:text-sm shrink-0">{fn.name}</code>
				<span class="text-muted text-xs sm:text-sm">{fn.desc}</span>
			</div>
		{/each}
	</div>

	<CodeBlock code={testingExample} language="javascript" filename="test.lgs" />
</DocLayout>
