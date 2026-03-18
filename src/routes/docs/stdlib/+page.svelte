<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

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
print(toStr(sum([1, 2, 3, 4, 5])))
print(toStr(min([3, 1, 4, 1, 5])))
print(toStr(max([3, 1, 4, 1, 5])))
print(toStr(unique([1, 2, 2, 3, 3, 3])))`;

	const mathExample = `use "std/math"

print(toStr(mathFactorial(5)))    // 120
print(toStr(mathFib(10)))         // 55
print(toStr(mathIsPrime(17)))    // true

print(toStr(mathGcd(48, 18)))   // 6
print(toStr(mathLcm(4, 6)))      // 12

let scores = [85, 90, 78, 92, 88]
print(toStr(mathMean(scores)))
print(toStr(mathMedian(scores)))`;

	const stringExample = `use "std/string"

print(strCapitalize("hello world"))
print(strReverse("hello"))
print(toStr(strIsPalindrome("racecar")))

print(strRepeat("ab", 3))
print(strCount("banana", "a"))
print(strPadStart("42", 5, "0"))`;

	const pathExample = `use "std/path"

let p = "/home/user/docs/file.txt"

print(pathBase(p))         // "file.txt"
print(pathDir(p))          // "/home/user/docs"
print(pathExt(p))          // ".txt"

let joined = pathJoin(["/home", "user", "docs"])
print(joined)

print(toStr(pathExists("/etc/passwd")))`;

	const timeExample = `use "std/time"

let now = datetimeNow()
print(now["str"])
print(now["date"])

let tomorrow = datetimeAdd(now, 1, "days")
let diff = datetimeDiff(tomorrow, now, "days")
print(toStr(diff))

print(datetimeFormat(now, "January 2, 2006"))`;

	const logExample = `use "std/log"

logDebug("Debug info")
logInfo("Server started")
logWarn("Low memory")
logError("Connection failed")

// Output:
// [2026-03-17 14:30:00] [DEBUG] Debug info
// [2026-03-17 14:30:00] [INFO] Server started`;

	const typeExample = `use "std/type"

let val = 42
print(toStr(isInt(val)))
print(toStr(isNumber(val)))
print(toStr(isString(val)))

print(toStr(isNull(null)))
print(toStr(isArray([1, 2, 3])))
print(toStr(isCallable(fn() {})))`;

	const testingExample = `use "std/testing"

let add = fn(a, b) -> a + b

suite("math", fn() {
    assert("add", add(1, 2), 3)
    assert("add zero", add(5, 0), 5)
})

summary()`;

	const functions = {
		array: [
			{ name: 'map(arr, fn)', desc: 'Transform each element' },
			{ name: 'filter(arr, fn)', desc: 'Keep passing elements' },
			{ name: 'reduce(arr, fn, init)', desc: 'Combine to single value' },
			{ name: 'unique(arr)', desc: 'Remove duplicates' },
			{ name: 'flat(arr)', desc: 'Flatten nested arrays' },
			{ name: 'chunk(arr, n)', desc: 'Split into chunks' },
			{ name: 'sum(arr)', desc: 'Sum all numbers' },
			{ name: 'min(arr)', desc: 'Smallest number' },
			{ name: 'max(arr)', desc: 'Largest number' },
			{ name: 'indexOf(arr, val)', desc: 'Find position' },
			{ name: 'containsAll(arr, items)', desc: 'Check all present' },
		],
		math: [
			{ name: 'mathFactorial(n)', desc: 'n! (factorial)' },
			{ name: 'mathFib(n)', desc: 'nth Fibonacci number' },
			{ name: 'mathIsPrime(n)', desc: 'Check if prime' },
			{ name: 'mathGcd(a, b)', desc: 'Greatest common divisor' },
			{ name: 'mathLcm(a, b)', desc: 'Least common multiple' },
			{ name: 'mathMean(arr)', desc: 'Average' },
			{ name: 'mathMedian(arr)', desc: 'Middle value' },
			{ name: 'mathMode(arr)', desc: 'Most common value' },
			{ name: 'mathClamp(n, min, max)', desc: 'Constrain to range' },
			{ name: 'mathLerp(a, b, t)', desc: 'Linear interpolation' },
		],
		string: [
			{ name: 'strCapitalize(s)', desc: 'Capitalize first letter' },
			{ name: 'strReverse(s)', desc: 'Reverse characters' },
			{ name: 'strIsPalindrome(s)', desc: 'Check palindrome' },
			{ name: 'strIsEmpty(s)', desc: 'Check if empty' },
			{ name: 'strCount(s, sub)', desc: 'Count occurrences' },
			{ name: 'strRepeat(s, n)', desc: 'Repeat string' },
			{ name: 'strPadStart(s, len, c)', desc: 'Pad start' },
			{ name: 'strPadEnd(s, len, c)', desc: 'Pad end' },
		],
		path: [
			{ name: 'pathJoin(parts)', desc: 'Join path parts' },
			{ name: 'pathBase(p)', desc: 'Filename only' },
			{ name: 'pathDir(p)', desc: 'Directory only' },
			{ name: 'pathExt(p)', desc: 'Extension with dot' },
			{ name: 'pathWithoutExt(p)', desc: 'No extension' },
			{ name: 'pathIsAbs(p)', desc: 'Check if absolute' },
			{ name: 'pathClean(p)', desc: 'Simplify path' },
			{ name: 'pathExists(p)', desc: 'Check if exists' },
		],
		time: [
			{ name: 'datetimeNow()', desc: 'Current datetime' },
			{ name: 'datetimeFromTimestamp(ts)', desc: 'From Unix ts' },
			{ name: 'datetimeFormat(dt, fmt)', desc: 'Custom format' },
			{ name: 'datetimeAdd(dt, n, unit)', desc: 'Add time' },
			{ name: 'datetimeSubtract(dt, n, u)', desc: 'Subtract time' },
			{ name: 'datetimeDiff(d1, d2, u)', desc: 'Difference' },
			{ name: 'datetimeIsAfter(d1, d2)', desc: 'Check after' },
			{ name: 'datetimeIsBefore(d1, d2)', desc: 'Check before' },
			{ name: 'datetimeIsEqual(d1, d2)', desc: 'Check equal' },
			{ name: 'datetimeToStr(dt)', desc: 'To string' },
		],
		log: [
			{ name: 'logDebug(msg)', desc: 'Debug level (white)' },
			{ name: 'logInfo(msg)', desc: 'Info level (green)' },
			{ name: 'logWarn(msg)', desc: 'Warn level (yellow)' },
			{ name: 'logError(msg)', desc: 'Error level (red)' },
		],
		type: [
			{ name: 'isNull(val)', desc: 'Check null' },
			{ name: 'isString(val)', desc: 'Check string' },
			{ name: 'isInt(val)', desc: 'Check integer' },
			{ name: 'isFloat(val)', desc: 'Check float' },
			{ name: 'isNumber(val)', desc: 'Check int or float' },
			{ name: 'isBool(val)', desc: 'Check boolean' },
			{ name: 'isArray(val)', desc: 'Check array' },
			{ name: 'isTable(val)', desc: 'Check table' },
			{ name: 'isCallable(val)', desc: 'Check function' },
		],
		testing: [
			{ name: 'assert(name, got, expected)', desc: 'Check equality' },
			{ name: 'suite(name, fn)', desc: 'Group tests' },
			{ name: 'summary()', desc: 'Print results' },
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
		Modules written in Logos itself. Import with <code>use</code>.
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

	<h2 id="std-array">std/array</h2>

	<p>Functional array operations. Transform, filter, and reduce data.</p>

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

	<p>Math functions, statistics, and algorithms.</p>

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

	<p>String manipulation and formatting.</p>

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

	<p>File path manipulation and checks.</p>

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

	<p>Date/time handling, formatting, and calculations.</p>

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

	<p>Color-coded logging with timestamps.</p>

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

	<p>Runtime type checking.</p>

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

	<p>Simple testing framework.</p>

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
