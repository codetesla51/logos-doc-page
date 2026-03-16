<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const variablesCode = `let x = 10
let name = "Uthman"
let pi = 3.14
let flag = true
let nothing = null

x += 5
x -= 2`;

	const stringsCode = `let s = "hello world"
let raw = \`raw string with \\n not escaped\``;

	const arraysCode = `let arr = [1, 2, 3, "four", true]
let first = arr[0]
let last = arr[len(arr) - 1]`;

	const tablesCode = `let user = table{
  name: "Uthman",
  age: 20,
  active: true
}

user.name       // "Uthman" (dot access for string keys)
user["name"]    // "Uthman" (bracket access)`;

	const ifElseCode = `if x > 10 {
  print("big")
} else {
  print("small")
}`;

	const switchCode = `switch x {
  case 1 { print("one") }
  case 2 { print("two") }
  default { print("other") }
}`;

	const forLoopCode = `for i < 10 {
  i += 1
}`;

	const forInCode = `for item in arr {
  print(item)
}

for pair in user {
  print(pair[0])   // key
  print(pair[1])   // value
}`;

	const functionsCode = `let add = fn(x, y) {
  return x + y
}
add(2, 3)   // 5

let double = fn(x) -> x * 2

fn greet(name) {
  return "Hello " + name
}`;

	const closureCode = `fn makeCounter() {
  let count = 0
  return fn() {
    count += 1
    return count
  }
}
let counter = makeCounter()
counter()   // 1
counter()   // 2`;

	const modulesCode = `use "filename"
use "std/math"
use "std/array"
use "std/string"
use "std/path"
use "std/time"
use "std/type"
use "std/log"
use "std/testing"`;

	const spawnCode = `spawn {` + "\n" + `  print("task 1")` + "\n" + `  print("task 2")` + "\n" + `}` + "\n\n" + `spawn for item in jobs {` + "\n" + `  process(item)` + "\n" + `}`;

	const resultPatternCode = `table{` + "\n" + `  ok: true/false,` + "\n" + `  value: <data or null>,` + "\n" + `  error: "<message or empty string>"` + "\n" + `}` + "\n\n" + `let res = httpGet("https://api.example.com/data")` + "\n" + `if res.ok {` + "\n" + `  print(res.value.body)` + "\n" + `} else {` + "\n" + `  print(res.error)` + "\n" + `}`;

	const embeddingCode = `import "github.com/codetesla51/logos/logos"

vm := logos.New()

vm.Register("greet", func(args ...logos.Object) logos.Object {
    name := args[0].(*logos.String).Value
    return &logos.String{Value: "Hello, " + name}
})

vm.SetVar("count", 42)
err := vm.Run(\`print(greet("World"))\`)
result := vm.GetVar("count")`;
</script>

<svelte:head>
	<title>LLM Reference - Logos Documentation</title>
	<meta name="description" content="Complete Logos language reference for AI and LLM systems. Includes syntax, builtins, stdlib, and code examples." />
	<meta name="keywords" content="Logos, scripting language, programming language, AI reference, LLM, Go, interpreter" />
	<meta property="og:title" content="Logos LLM Reference" />
	<meta property="og:description" content="Complete Logos language reference for AI and LLM systems" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Logos LLM Reference" />
	<meta name="twitter:description" content="Complete Logos language reference for AI and LLM systems" />
	<link rel="canonical" href="https://logos-lang.vercel.app/docs/llm" />
	{@html '<script type="application/ld+json">' + `{"@context":"https://schema.org","@type":"TechArticle","name":"Logos Language LLM Reference","description":"Complete Logos language reference for AI and LLM systems","url":"https://logos-lang.vercel.app/docs/llm","programmingLanguage":{"@type":"ProgrammingLanguage","name":"Logos","url":"https://github.com/codetesla51/logos"},"author":{"@type":"Person","name":"Uthman"}}` + '</script>'}
</svelte:head>

<DocLayout
	prev={{ title: 'Examples', href: '/docs/examples' }}
	next={null}
>
	<h1>LLM Reference</h1>

	<p>
		This page contains a comprehensive reference of the Logos programming language for AI and LLM systems.
		It covers all syntax, builtins, stdlib modules, and common patterns.
	</p>

	<p>
		<strong>Quick links:</strong>
		<a href="#variables">Variables</a> ·
		<a href="#operators">Operators</a> ·
		<a href="#functions">Functions</a> ·
		<a href="#control-flow">Control Flow</a> ·
		<a href="#builtins">Builtins</a> ·
		<a href="#stdlib">Standard Library</a> ·
		<a href="#embedding">Embedding</a>
	</p>

	<h2 id="overview">Overview</h2>

	<p>
		<strong>Logos</strong> is a dynamically-typed, interpreted scripting language written in Go.
		It uses a Pratt parser and a tree-walking interpreter.
	</p>

	<ul>
		<li><strong>File extension:</strong> <code>.lgs</code></li>
		<li><strong>CLI:</strong> <code>lgs run file.lgs</code> | <code>lgs build file.lgs</code> | <code>lgs fmt file.lgs</code></li>
		<li><strong>GitHub:</strong> <a href="https://github.com/codetesla51/logos" target="_blank" rel="noopener">github.com/codetesla51/logos</a></li>
		<li><strong>Version:</strong> 0.2.3</li>
	</ul>

	<h2 id="variables">Variables</h2>

	<CodeBlock code={variablesCode} language="javascript" />

	<p>Variables are mutable. Reassign with <code>=</code>.</p>

	<h3>Compound Assignment</h3>
	<p><code>x += 5</code> · <code>x -= 2</code> · <code>x *= 3</code> · <code>x /= 2</code> · <code>x %= 4</code></p>

	<h2 id="operators">Operators</h2>

	<p><strong>Arithmetic:</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code></p>
	<p><strong>Comparison:</strong> <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code></p>
	<p><strong>Logical:</strong> <code>&amp;&amp;</code>, <code>||</code>, <code>!</code></p>

	<h2 id="strings">Strings</h2>

	<CodeBlock code={stringsCode} language="javascript" />

	<h2 id="arrays">Arrays</h2>

	<CodeBlock code={arraysCode} language="javascript" />

	<h2 id="tables">Tables (Maps/Objects)</h2>

	<CodeBlock code={tablesCode} language="javascript" />

	<p><strong>Important:</strong> Bracket access is type-aware. <code>t["1"]</code> and <code>t[1]</code> are different keys.</p>

	<h2 id="control-flow">Control Flow</h2>

	<h3>If / Else</h3>

	<CodeBlock code={ifElseCode} language="javascript" />

	<h3>Switch</h3>

	<CodeBlock code={switchCode} language="javascript" />

	<h3>For Loop</h3>

	<CodeBlock code={forLoopCode} language="javascript" />

	<h3>For-In Loop</h3>

	<CodeBlock code={forInCode} language="javascript" />

	<h2 id="functions">Functions</h2>

	<CodeBlock code={functionsCode} language="javascript" />

	<h3>Closures</h3>

	<CodeBlock code={closureCode} language="javascript" />

	<h2 id="modules">Modules</h2>

	<CodeBlock code={modulesCode} language="javascript" />

	<h2 id="concurrency">Concurrency</h2>

	<CodeBlock code={spawnCode} language="javascript" />

	<h2 id="result-pattern">Result Pattern</h2>

	<CodeBlock code={resultPatternCode} language="javascript" />

	<h2 id="builtins">Builtins Reference</h2>

	<h3>I/O</h3>
	<p><code>print(args...)</code> · <code>input(prompt?)</code> · <code>prompt(msg)</code> · <code>confirm(msg)</code> · <code>select(msg, options[])</code></p>

	<h3>Type</h3>
	<p><code>type(val)</code> · <code>len(str|arr)</code> · <code>keys(table)</code> · <code>values(table)</code> · <code>has(table, key)</code></p>

	<h3>Type Conversion</h3>
	<p><code>toInt(val)</code> · <code>toFloat(val)</code> · <code>toBool(val)</code> · <code>toStr(val)</code></p>

	<h3>String</h3>
	<p><code>upper(s)</code> · <code>lower(s)</code> · <code>trim(s)</code> · <code>replace(s, old, new)</code> · <code>split(s, sep)</code> · <code>join(arr, sep)</code> · <code>contains(str|arr, val)</code> · <code>startsWith(s, prefix)</code> · <code>endsWith(s, suffix)</code> · <code>indexOf(s, sub)</code> · <code>repeat(s, n)</code> · <code>slice(str|arr, start, end)</code> · <code>format(tmpl, args...)</code></p>

	<h3>Array</h3>
	<p><code>push(arr, val)</code> · <code>pop(arr)</code> · <code>first(arr)</code> · <code>last(arr)</code> · <code>tail(arr)</code> · <code>prepend(arr, val)</code> · <code>reverse(arr)</code> · <code>sort(arr)</code> · <code>slice(arr, start, end)</code> · <code>contains(arr, val)</code></p>

	<h3>Math</h3>
	<p><code>mathAbs(n)</code> · <code>mathSqrt(n)</code> · <code>mathPow(base, exp)</code> · <code>mathFloor(n)</code> · <code>mathCeil(n)</code> · <code>mathRound(n)</code> · <code>mathMin(a, b)</code> · <code>mathMax(a, b)</code> · <code>mathRandom()</code> · <code>mathRandomInt(min, max)</code> · <code>mathPi()</code></p>

	<h3>JSON</h3>
	<p><code>parseJson(str)</code> · <code>toJson(val)</code> · <code>prettyJson(val)</code></p>

	<h3>File I/O</h3>
	<p><code>fileRead(path)</code> · <code>fileWrite(path, content)</code> · <code>fileAppend(path, content)</code> · <code>fileDelete(path)</code> · <code>fileCopy(src, dst)</code> · <code>fileMove(src, dst)</code> · <code>fileMkdir(path)</code> · <code>fileReadDir(path)</code> · <code>fileGlob(pattern)</code> · <code>fileExists(path)</code></p>

	<h3>HTTP</h3>
	<p><code>httpGet(url, headers?)</code> · <code>httpPost(url, body, headers?)</code> · <code>httpPut(url, body, headers?)</code> · <code>httpPatch(url, body, headers?)</code> · <code>httpDelete(url, headers?)</code></p>

	<h3>Time</h3>
	<p><code>timeNow()</code> · <code>timeMs()</code> · <code>timeStr()</code> · <code>dateStr()</code> · <code>dateTimeStr()</code> · <code>timeFormat(ts, fmt)</code> · <code>sleep(ms)</code></p>

	<h3>System</h3>
	<p><code>osname()</code> · <code>pwd()</code> · <code>cd(path)</code> · <code>env(key)</code> · <code>setenv(key, val)</code> · <code>args()</code> · <code>exit(code?)</code> · <code>shell(cmd)</code> · <code>run(cmd, args...)</code></p>

	<h3>Color</h3>
	<p><code>colorRed(str)</code> · <code>colorGreen(str)</code> · <code>colorYellow(str)</code> · <code>colorBlue(str)</code> · <code>colorMagenta(str)</code> · <code>colorCyan(str)</code> · <code>colorWhite(str)</code> · <code>colorBold(str)</code></p>

	<h2 id="stdlib">Standard Library</h2>

	<h3>std/array</h3>
	<p><code>arrayMap(arr, fn)</code> · <code>arrayFilter(arr, fn)</code> · <code>arrayReduce(arr, fn, init)</code> · <code>arrayUnique(arr)</code> · <code>arrayFlat(arr)</code> · <code>arraySum(arr)</code> · <code>arrayMin(arr)</code> · <code>arrayMax(arr)</code></p>

	<h3>std/string</h3>
	<p><code>strPadStart(str, len, char)</code> · <code>strPadEnd(str, len, char)</code> · <code>strCapitalize(str)</code> · <code>strCount(str, sub)</code> · <code>strReverse(str)</code> · <code>strIsPalindrome(str)</code></p>

	<h3>std/math</h3>
	<p><code>mathFib(n)</code> · <code>mathFactorial(n)</code> · <code>mathMean(arr)</code> · <code>mathMedian(arr)</code> · <code>mathClamp(n, min, max)</code> · <code>mathIsPrime(n)</code> · <code>mathGcd(a, b)</code> · <code>mathLcm(a, b)</code></p>

	<h3>std/path</h3>
	<p><code>pathJoin(parts)</code> · <code>pathBase(path)</code> · <code>pathDir(path)</code> · <code>pathExt(path)</code> · <code>pathIsAbs(path)</code> · <code>pathClean(path)</code></p>

	<h3>std/time</h3>
	<p><code>datetimeNow()</code> · <code>datetimeFromTimestamp(ts)</code> · <code>datetimeFormat(dt, fmt)</code> · <code>datetimeIsAfter(dt1, dt2)</code> · <code>datetimeDiff(dt1, dt2, unit)</code> · <code>datetimeAdd(dt, amount, unit)</code></p>

	<h3>std/type</h3>
	<p><code>isNull(val)</code> · <code>isString(val)</code> · <code>isInt(val)</code> · <code>isFloat(val)</code> · <code>isBool(val)</code> · <code>isArray(val)</code> · <code>isTable(val)</code> · <code>isNumber(val)</code> · <code>isCallable(val)</code></p>

	<h3>std/log</h3>
	<p><code>logDebug(msg)</code> · <code>logInfo(msg)</code> · <code>logWarn(msg)</code> · <code>logError(msg)</code></p>

	<h3>std/testing</h3>
	<p><code>assert(name, got, expected)</code> · <code>suite(name, fn)</code> · <code>summary()</code></p>

	<h2 id="embedding">Embedding in Go</h2>

	<CodeBlock code={embeddingCode} language="go" />

	<h2 id="sandbox">Sandbox Mode</h2>

	<p>In the web playground:</p>
	<ul>
		<li>File I/O disabled</li>
		<li>HTTP disabled</li>
		<li>Shell/exec disabled</li>
		<li><code>exit()</code> disabled</li>
	</ul>

	<h2 id="limitations">Known Limitations</h2>

	<ul>
		<li>Dot access only works with string-keyed table fields</li>
		<li>Bracket access is type-aware (<code>t["1"]</code> ≠ <code>t[1]</code>)</li>
		<li>No try/catch — use result pattern</li>
		<li>No classes/structs — use tables</li>
		<li>No variadic user functions — only builtins support <code>args...</code></li>
		<li><code>spawn</code> waits for all goroutines</li>
		<li><code>sort()</code> only works on numeric arrays</li>
	</ul>

	<p>
		<strong>Full reference:</strong> See <a href="/llm.txt" target="_blank">llm.txt</a> for the complete reference.
	</p>
</DocLayout>
