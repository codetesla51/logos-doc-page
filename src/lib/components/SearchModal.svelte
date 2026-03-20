<script>
	import { Search, X, FileText, ArrowRight, Clock, Sparkles, Hash, Terminal, Code2, BookOpen, Zap, ExternalLink, Copy, Check, FunctionSquare, Sparkle, Package, Play, FileCode } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let { isOpen = false, onClose } = $props();

	let searchQuery = $state('');
	let selectedIndex = $state(0);
	let inputRef = $state(null);
	let recentSearches = $state([]);
	let mode = $state('search');
	let copied = $state(false);

	const searchIndex = [
		// Getting Started
		{ 
			title: 'Introduction', 
			href: '/docs', 
			section: 'Getting Started',
			type: 'doc',
			keywords: ['intro', 'start', 'begin', 'overview', 'what is logos', 'about', 'language', 'features', 'why logos'],
			snippet: 'Logos is a dynamically-typed, interpreted scripting language written in Go.'
		},
		{ 
			title: 'Installation', 
			href: '/docs/install', 
			section: 'Getting Started',
			type: 'doc',
			keywords: ['install', 'setup', 'curl', 'download', 'linux', 'macos', 'windows', 'get started', 'npm', 'brew', 'binary', 'release'],
			snippet: 'curl -fsSL https://logoslang.dev/install.sh | sh'
		},
		
		// Core Language
		{ 
			title: 'Syntax & Types', 
			href: '/docs/syntax', 
			section: 'Language',
			type: 'doc',
			keywords: ['syntax', 'types', 'variables', 'let', 'functions', 'fn', 'data types', 'primitives', 'strings', 'numbers', 'booleans', 'null'],
			snippet: 'let name = "Uthman"  // string\nlet age = 20    // integer\nlet active = true  // boolean'
		},
		{ 
			title: 'Variables & let', 
			href: '/docs/syntax#variables', 
			section: 'Syntax',
			type: 'section',
			keywords: ['let', 'variable', 'declare', 'string', 'number', 'integer', 'float', 'boolean', 'null', 'const', 'mutable', 'immutable', 'reassign'],
			snippet: 'let x = 10\nx += 5  // compound assignment\nconst PI = 3.14159  // immutable'
		},
		{ 
			title: 'const Keyword', 
			href: '/docs/syntax#variables', 
			section: 'Syntax',
			type: 'feature',
			keywords: ['const', 'immutable', 'constant', 'final', 'read-only', 'v0.4.2'],
			snippet: 'const MAX_RETRIES = 3\n// PI = 3.14  // Error!'
		},
		{ 
			title: 'Functions', 
			href: '/docs/syntax#functions', 
			section: 'Syntax',
			type: 'doc',
			keywords: ['fn', 'function', 'return', 'arrow', 'closure', 'lambda', 'anonymous', 'callback', 'first-class'],
			snippet: 'fn greet(name) { return "Hello, " + name }\nlet double = fn(x) -> x * 2'
		},
		{ 
			title: 'Closures', 
			href: '/docs/syntax#functions', 
			section: 'Syntax',
			type: 'feature',
			keywords: ['closure', 'scope', 'lexical', 'enclosing', 'capture', 'variable'],
			snippet: 'fn makeCounter() {\n  let count = 0\n  return fn() { count += 1; return count }\n}'
		},
		{ 
			title: 'Control Flow', 
			href: '/docs/syntax#control-flow', 
			section: 'Syntax',
			type: 'doc',
			keywords: ['if', 'else', 'for', 'loop', 'switch', 'case', 'default', 'ternary', 'match', 'break', 'continue'],
			snippet: 'if x > 10 { print("big") } else if x > 5 { print("medium") } else { print("small") }'
		},
		{ 
			title: 'Ternary Operator', 
			href: '/docs/syntax#control-flow', 
			section: 'Syntax',
			type: 'feature',
			keywords: ['ternary', '?', 'condition', 'if-else', 'inline', 'shorthand', 'v0.3.2'],
			snippet: 'let status = age >= 18 ? "adult" : "minor"'
		},
		{ 
			title: 'For Loop', 
			href: '/docs/syntax#control-flow', 
			section: 'Syntax',
			type: 'feature',
			keywords: ['for', 'loop', 'while', 'iterate', 'range', 'counter', 'increment'],
			snippet: 'for i < 10 { i += 1 }'
		},
		{ 
			title: 'For-In Loop', 
			href: '/docs/syntax#for-in', 
			section: 'Syntax',
			type: 'feature',
			keywords: ['for in', 'foreach', 'iterate', 'array', 'collection', 'index', 'enumerate', 'loop'],
			snippet: 'for item in arr { print(item) }\nfor i, v in arr { print("${i}: ${v}") }'
		},
		{ 
			title: 'range() Function', 
			href: '/docs/syntax#for-in', 
			section: 'Syntax',
			type: 'feature',
			keywords: ['range', 'numeric', 'iteration', 'countdown', 'step', 'sequence', 'v0.4.2'],
			snippet: 'for i in range(0, 10) { print(i) }  // 0-9\nfor i in range(5, 0, -1) { print(i) }  // countdown'
		},
		{ 
			title: 'Switch', 
			href: '/docs/syntax#switch', 
			section: 'Syntax',
			type: 'feature',
			keywords: ['switch', 'case', 'match', 'conditional', 'branch'],
			snippet: 'switch x {\n  case 1 { print("one") }\n  default { print("other") }\n}'
		},
		{ 
			title: 'Arrays', 
			href: '/docs/syntax#arrays', 
			section: 'Syntax',
			type: 'doc',
			keywords: ['array', 'list', 'index', 'elements', 'push', 'pop', 'slice', 'brackets', 'collection', 'sequential'],
			snippet: 'let arr = [1, 2, 3, "four", true]\nlet first = arr[0]'
		},
		{ 
			title: 'Tables', 
			href: '/docs/syntax#tables', 
			section: 'Syntax',
			type: 'doc',
			keywords: ['table', 'hashmap', 'map', 'object', 'key', 'value', 'struct', 'dict', 'dictionary', 'hash', 'dot access'],
			snippet: 'let user = table{ name: "Uthman", age: 20 }\nuser.name = "New Name"'
		},
		{ 
			title: 'Dot Access', 
			href: '/docs/syntax#tables', 
			section: 'Syntax',
			type: 'feature',
			keywords: ['dot', 'access', 'property', 'field', 'bracket', 'key', 'notation', 'v0.3.1'],
			snippet: 'user.name       // dot access\nuser["name"]    // bracket access'
		},

		// v0.4 Features
		{ 
			title: 'String Interpolation', 
			href: '/docs/syntax#string-interpolation', 
			section: 'Syntax',
			type: 'feature',
			keywords: ['string interpolation', '${}', 'template', 'embed', 'variables in strings', 'f-string', 'literal', 'v0.4'],
			snippet: 'let name = "world"\nlet greeting = "hello ${name}"  // "hello world"'
		},
		{ 
			title: 'Pipe Operator |>', 
			href: '/docs/syntax#pipe-operator', 
			section: 'Syntax',
			type: 'feature',
			keywords: ['pipe', '|>', 'chaining', 'flow', 'compose', 'transform', 'left-to-right', 'v0.4'],
			snippet: 'arr |> filter(fn) |> map(fn) |> sort()'
		},
		{ 
			title: 'try Expression', 
			href: '/docs/syntax#try-expression', 
			section: 'Syntax',
			type: 'feature',
			keywords: ['try', 'catch', 'error', 'exception', 'handling', 'unwrap', 'result', 'propagate', 'v0.4'],
			snippet: 'let res = try httpGet("https://api.example.com")'
		},
		{ 
			title: 'Postfix ++/--', 
			href: '/docs/syntax#postfix-operators', 
			section: 'Syntax',
			type: 'feature',
			keywords: ['++', '--', 'increment', 'decrement', 'postfix', 'i++', 'i--', 'v0.4'],
			snippet: 'let i = 0\ni++  // 1\ni--  // 0'
		},

		// Builtins - I/O
		{ 
			title: 'print()', 
			href: '/docs/builtins#io', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['print', 'output', 'console', 'stdout', 'log', 'display', 'newline'],
			snippet: 'print("Hello!")  // with newline\nprintn("No newline")  // without newline (v0.4.5)'
		},
		{ 
			title: 'printn()', 
			href: '/docs/builtins#io', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['printn', 'print no newline', 'no newline', 'output', 'stdout', 'v0.4.5'],
			snippet: 'printn("No newline")\nprint("Next")  // appears on same line'
		},
		{ 
			title: 'input()', 
			href: '/docs/builtins#io', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['input', 'read', 'stdin', 'user', 'prompt', 'readline'],
			snippet: 'let name = input()\nprint("You typed: " + name)'
		},
		{ 
			title: 'prompt()', 
			href: '/docs/builtins#io', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['prompt', 'input', 'message', 'ask', 'read'],
			snippet: 'let age = prompt("Enter your age: ")'
		},
		{ 
			title: 'confirm()', 
			href: '/docs/builtins#io', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['confirm', 'yes', 'no', 'y/n', 'boolean', 'interactive', 'cli', 'v0.2.1'],
			snippet: 'if confirm("Delete files?") { print("Deleted!") }'
		},
		{ 
			title: 'select()', 
			href: '/docs/builtins#io', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['select', 'menu', 'choice', 'pick', 'option', 'interactive', 'cli', 'v0.2.1'],
			snippet: 'let choice = select("Pick:", ["red", "green", "blue"])'
		},
		{ 
			title: 'clear()', 
			href: '/docs/builtins#io', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['clear', 'cls', 'screen', 'terminal', 'console'],
			snippet: 'clear()  // clears terminal'
		},

		// Builtins - Array
		{ 
			title: 'push()', 
			href: '/docs/builtins#array-operations', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['push', 'add', 'append', 'array', 'element', 'end'],
			snippet: 'arr = push(arr, 42)'
		},
		{ 
			title: 'pop()', 
			href: '/docs/builtins#array-operations', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['pop', 'remove', 'last', 'array', 'element'],
			snippet: 'let last = pop(arr)'
		},
		{ 
			title: 'sort()', 
			href: '/docs/builtins#array-operations', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['sort', 'order', 'ascending', 'descending', 'array', 'string', 'numeric', 'v0.4.1'],
			snippet: 'let sorted = sort([3, 1, 4, 1, 5])  // [1, 1, 3, 4, 5]'
		},
		{ 
			title: 'range()', 
			href: '/docs/builtins#array-operations', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['range', 'sequence', 'numeric', 'iteration', 'step', 'countdown', 'v0.4.2'],
			snippet: 'for i in range(0, 10) { print(i) }  // 0-9'
		},
		{ 
			title: 'reverse()', 
			href: '/docs/builtins#array-operations', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['reverse', 'flip', 'array', 'order', 'backwards'],
			snippet: 'let reversed = reverse([1, 2, 3])  // [3, 2, 1]'
		},
		{ 
			title: 'contains()', 
			href: '/docs/builtins#array-operations', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['contains', 'includes', 'has', 'find', 'search', 'array', 'string'],
			snippet: 'if contains(arr, "hello") { print("Found!") }'
		},
		{ 
			title: 'slice()', 
			href: '/docs/builtins#array-operations', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['slice', 'subarray', 'substring', 'sublist', 'portion', 'array', 'string'],
			snippet: 'let sub = slice(arr, 1, 4)  // elements 1-3'
		},

		// Builtins - String
		{ 
			title: 'upper()', 
			href: '/docs/builtins#string-operations', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['upper', 'uppercase', 'to upper', 'case', 'capitalize', 'string'],
			snippet: 'upper("hello")  // "HELLO"'
		},
		{ 
			title: 'lower()', 
			href: '/docs/builtins#string-operations', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['lower', 'lowercase', 'to lower', 'case', 'string'],
			snippet: 'lower("HELLO")  // "hello"'
		},
		{ 
			title: 'split()', 
			href: '/docs/builtins#string-operations', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['split', 'divide', 'separator', 'array', 'string', 'tokenize'],
			snippet: 'let words = split("a,b,c", ",")  // ["a", "b", "c"]'
		},
		{ 
			title: 'join()', 
			href: '/docs/builtins#string-operations', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['join', 'combine', 'concatenate', 'separator', 'array', 'string'],
			snippet: 'let s = join(["a", "b", "c"], "-")  // "a-b-c"'
		},
		{ 
			title: 'replace()', 
			href: '/docs/builtins#string-operations', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['replace', 'substitute', 'find', 'replace all', 'string', 'change'],
			snippet: 'replace("banana", "a", "o")  // "bonono"'
		},
		{ 
			title: 'format()', 
			href: '/docs/builtins#string-operations', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['format', 'template', 'placeholder', 'string', 'printf', 'interpolation'],
			snippet: 'format("Name: {}, Age: {}", "Bob", 25)  // "Name: Bob, Age: 25"'
		},

		// Builtins - Type Conversion
		{ 
			title: 'str()', 
			href: '/docs/builtins#type-conversion', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['str', 'string', 'tostring', 'convert', 'type', 'cast', 'v0.4.1'],
			snippet: 'str(42)    // "42"\nstr(3.14)  // "3.14"'
		},
		{ 
			title: 'int()', 
			href: '/docs/builtins#type-conversion', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['int', 'integer', 'toint', 'parse', 'convert', 'type', 'cast', 'number', 'v0.4.1'],
			snippet: 'int("42")    // 42\nint("3.14")  // 3'
		},
		{ 
			title: 'float()', 
			href: '/docs/builtins#type-conversion', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['float', 'decimal', 'tofloat', 'parse', 'convert', 'type', 'cast', 'number', 'v0.4.1'],
			snippet: 'float("3.14")  // 3.14\nfloat("42")   // 42.0'
		},

		// Builtins - JSON
		{ 
			title: 'parseJson()', 
			href: '/docs/builtins#json', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['parseJson', 'json', 'parse', 'deserialize', 'read', 'api', 'rest'],
			snippet: 'let data = try parseJson("{\\"name\\": \\"Bob\\"}")'
		},
		{ 
			title: 'toJson()', 
			href: '/docs/builtins#json', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['toJson', 'json', 'encode', 'serialize', 'object', 'table'],
			snippet: 'let json = try toJson(table{ name: "Alice" })'
		},
		{ 
			title: 'prettyJson()', 
			href: '/docs/builtins#json', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['prettyJson', 'json', 'format', 'indent', 'pretty', 'readable', 'v0.2.0'],
			snippet: 'let formatted = try prettyJson(data)'
		},

		// Builtins - HTTP
		{ 
			title: 'httpGet()', 
			href: '/docs/builtins#http', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['httpGet', 'http', 'get', 'request', 'fetch', 'api', 'rest', 'url', 'download'],
			snippet: 'let body = try httpGet("https://api.example.com/users")'
		},
		{ 
			title: 'httpPost()', 
			href: '/docs/builtins#http', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['httpPost', 'http', 'post', 'request', 'create', 'api', 'rest', 'submit', 'send'],
			snippet: 'let res = try httpPost("https://api.example.com/users", jsonBody)'
		},

		// Builtins - File
		{ 
			title: 'fileRead()', 
			href: '/docs/builtins#file-operations', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['fileRead', 'read', 'file', 'load', 'open', 'text', 'content'],
			snippet: 'let content = try fileRead("config.json")'
		},
		{ 
			title: 'fileWrite()', 
			href: '/docs/builtins#file-operations', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['fileWrite', 'write', 'file', 'save', 'create', 'create'],
			snippet: 'try fileWrite("output.txt", "Hello!")'
		},

		// Builtins - Math
		{ 
			title: 'mathRandom()', 
			href: '/docs/builtins#math', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['mathRandom', 'random', 'rand', 'math', 'float', '0-1'],
			snippet: 'mathRandom()           // 0.1234...\nmathRandomInt(1, 6)  // 1-6'
		},
		{ 
			title: 'mathRandomInt()', 
			href: '/docs/builtins#math', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['mathRandomInt', 'random', 'randint', 'integer', 'dice', 'lottery'],
			snippet: 'mathRandomInt(1, 100)  // random 1-100'
		},

		// Builtins - System
		{ 
			title: 'env()', 
			href: '/docs/builtins#os-system', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['env', 'environment', 'variable', 'getenv', 'os', 'system'],
			snippet: 'let home = env("HOME")'
		},
		{ 
			title: 'args()', 
			href: '/docs/builtins#os-system', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['args', 'arguments', 'cli', 'command line', 'argv'],
			snippet: 'let cliArgs = args()\nprint(cliArgs[0])'
		},
		{ 
			title: 'sleep()', 
			href: '/docs/builtins#os-system', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['sleep', 'wait', 'delay', 'pause', 'milliseconds', 'timeout'],
			snippet: 'sleep(1000)  // wait 1 second'
		},
		{ 
			title: 'shell()', 
			href: '/docs/builtins#os-system', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['shell', 'bash', 'sh', 'exec', 'command', 'system', 'run'],
			snippet: 'let result = try shell("date")'
		},

		// Builtins - Regex
		{ 
			title: 'reMatch()', 
			href: '/docs/builtins#regex', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['reMatch', 'regex', 'match', 'pattern', 'validate', 'test', 'v0.4.3'],
			snippet: 'reMatch(`\\d+`, "hello 123")  // true'
		},
		{ 
			title: 'reFind()', 
			href: '/docs/builtins#regex', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['reFind', 'regex', 'find', 'search', 'extract', 'first', 'v0.4.3'],
			snippet: 'reFind(`\\d+`, "3 cats")  // "3"'
		},
		{ 
			title: 'reReplace()', 
			href: '/docs/builtins#regex', 
			section: 'Builtins',
			type: 'builtin',
			keywords: ['reReplace', 'regex', 'replace', 'substitute', 'swap', 'v0.4.3'],
			snippet: 'reReplace(`\\d+`, "3 cats", "X")  // "X cats"'
		},

		// Concurrency
		{ 
			title: 'spawn', 
			href: '/docs/syntax#spawn', 
			section: 'Syntax',
			type: 'feature',
			keywords: ['spawn', 'concurrent', 'async', 'parallel', 'goroutine', 'thread', 'background', 'parallelism'],
			snippet: 'spawn { print("task 1") }\nspawn for item in list { process(item) }'
		},

		// Standard Library
		{ 
			title: 'Standard Library', 
			href: '/docs/stdlib', 
			section: 'Language',
			type: 'doc',
			keywords: ['stdlib', 'standard library', 'math', 'array functions', 'string functions', 'path', 'datetime', 'log', 'modules', 'use'],
			snippet: 'use "std/array"\nuse "std/math"\nuse "std/string"'
		},
		{ 
			title: 'std/array', 
			href: '/docs/stdlib#stdarray', 
			section: 'Standard Library',
			type: 'module',
			keywords: ['std/array', 'array', 'map', 'filter', 'reduce', 'unique', 'flat', 'sum', 'stdlib'],
			snippet: 'use "std/array"\nlet doubled = arrayMap([1, 2, 3], fn(x) -> x * 2)'
		},
		{ 
			title: 'std/string', 
			href: '/docs/stdlib#stdstring', 
			section: 'Standard Library',
			type: 'module',
			keywords: ['std/string', 'string', 'capitalize', 'reverse', 'palindrome', 'pad', 'stdlib'],
			snippet: 'use "std/string"\nstrCapitalize("hello")  // "Hello"'
		},
		{ 
			title: 'std/math', 
			href: '/docs/stdlib#stdmath', 
			section: 'Standard Library',
			type: 'module',
			keywords: ['std/math', 'math', 'fibonacci', 'factorial', 'prime', 'gcd', 'lcm', 'stdlib'],
			snippet: 'use "std/math"\nmathFib(10)  // 55'
		},

		// Advanced
		{ 
			title: 'Embedding in Go', 
			href: '/docs/embedding', 
			section: 'Advanced',
			type: 'doc',
			keywords: ['embed', 'go', 'golang', 'integration', 'api', 'RegisterFunc', 'SetGlobal', 'GetGlobal', 'CallFunc', 'sandbox', 'import'],
			snippet: 'vm := logos.New()\nvm.Register("greet", func(args ...) { ... })\nvm.Run(`print(greet("World"))`)'
		},
		{ 
			title: 'Sandbox Mode', 
			href: '/docs/embedding#sandbox', 
			section: 'Advanced',
			type: 'feature',
			keywords: ['sandbox', 'security', 'restrict', 'capability', 'disable', 'safe'],
			snippet: 'vm := logos.NewWithConfig(logos.SandboxConfig{\n  AllowFileIO: false,\n  AllowNetwork: false\n})'
		},
		{ 
			title: 'Building Binaries', 
			href: '/docs/building', 
			section: 'Advanced',
			type: 'doc',
			keywords: ['build', 'compile', 'binary', 'executable', 'lgs build', 'production', 'distribution', 'standalone'],
			snippet: 'lgs build script.lgs  // creates standalone binary'
		},
		{ 
			title: 'Examples', 
			href: '/docs/examples', 
			section: 'Advanced',
			type: 'doc',
			keywords: ['examples', 'todo', 'cli', 'password generator', 'file search', 'json', 'config', 'samples', 'recipes'],
			snippet: '// Real-world Logos code examples'
		},

		// Resources
		{ 
			title: 'Playground', 
			href: '/playground', 
			section: 'Resources',
			type: 'action',
			keywords: ['playground', 'try', 'online', 'editor', 'sandbox', 'run', 'execute', 'test', 'experiment'],
			snippet: 'Interactive Logos editor in your browser'
		},
		{ 
			title: 'LLM Reference', 
			href: '/docs/llm', 
			section: 'Resources',
			type: 'doc',
			keywords: ['llm', 'ai', 'prompt', 'reference', 'cheatsheet', 'model', 'gpt', 'claude', 'complete'],
			snippet: 'Complete Logos language reference for AI systems'
		},
		{ 
			title: 'Changelog', 
			href: '/docs/changelog', 
			section: 'Resources',
			type: 'doc',
			keywords: ['changelog', 'version', 'history', 'updates', 'release', 'v0.4', 'v0.3'],
			snippet: 'Version history and release notes'
		}
	];

	// Quick actions
	const quickActions = [
		{ title: 'Open Playground', href: '/playground', icon: Terminal, shortcut: '⌘P' },
		{ title: 'Copy Install Command', action: 'install', icon: Copy, shortcut: '⌘I' },
		{ title: 'View on GitHub', href: 'https://github.com/codetesla51/logos', icon: ExternalLink, shortcut: '⌘G' }
	];

	const popularSearches = [
		'string interpolation', 
		'httpGet', 
		'spawn concurrency', 
		'try expressions', 
		'functions closures',
		'file operations',
		'array sort'
	];

	function fuzzyMatch(text, query) {
		const textLower = text.toLowerCase();
		const queryLower = query.toLowerCase();
		let score = 0;
		let matchedChars = [];
		let queryIdx = 0;

		// Exact match bonus
		if (textLower.includes(queryLower)) {
			return { score: 100 + queryLower.length * 10, fullMatch: true };
		}

		// Starts with bonus
		if (textLower.startsWith(queryLower)) {
			return { score: 200 + queryLower.length * 20, fullMatch: true };
		}

		// Fuzzy character matching
		for (let i = 0; i < textLower.length && queryIdx < queryLower.length; i++) {
			if (textLower[i] === queryLower[queryIdx]) {
				score += 1 + (queryIdx * 0.5); // Earlier matches score higher
				matchedChars.push(text[i]);
				queryIdx++;
			}
		}

		return queryIdx === queryLower.length 
			? { score: score * 10, fullMatch: false, matched: matchedChars.join('') } 
			: { score: 0, fullMatch: false };
	}

	function calculateScore(item, query) {
		let score = 0;
		const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 0);
		
		// Title match (highest priority)
		const titleMatch = fuzzyMatch(item.title, query);
		score += titleMatch.score;
		
		// Section match
		const sectionMatch = fuzzyMatch(item.section, query);
		score += sectionMatch.score * 0.5;

		// Keyword matches
		for (const keyword of item.keywords) {
			const kwMatch = fuzzyMatch(keyword, query);
			score += kwMatch.score * 0.8;
			
			// Word-level matching
			for (const word of words) {
				if (keyword.toLowerCase().includes(word)) {
					score += 5;
				}
				if (keyword.toLowerCase().startsWith(word)) {
					score += 10;
				}
			}
		}

		// Snippet match
		if (item.snippet) {
			const snippetMatch = fuzzyMatch(item.snippet, query);
			score += snippetMatch.score * 0.3;
		}

		// Type bonuses
		if (item.type === 'builtin') score += 20;
		if (item.type === 'feature') score += 15;
		if (item.type === 'action') score += 25;

		return score;
	}

	const filteredResults = $derived(() => {
		if (!searchQuery.trim()) return [];

		const query = searchQuery.trim();
		
		return searchIndex
			.map(item => ({
				...item,
				score: calculateScore(item, query)
			}))
			.filter(item => item.score > 0)
			.sort((a, b) => b.score - a.score)
			.slice(0, 12);
	});

	function handleKeydown(e) {
		const results = filteredResults();
		const hasResults = results.length > 0;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, 0);
		} else if (e.key === 'Tab') {
			e.preventDefault();
			if (mode === 'recent' && recentSearches.length > 0) {
				searchQuery = recentSearches[0];
			} else if (hasResults) {
				searchQuery = results[selectedIndex]?.title || '';
			}
		} else if (e.key === 'Enter' && hasResults) {
			e.preventDefault();
			navigateTo(results[selectedIndex].href);
		} else if (e.key === 'Escape') {
			onClose();
		}
	}

	async function copyInstallCommand() {
		try {
			await navigator.clipboard.writeText('curl -fsSL https://logoslang.dev/install.sh | sh');
			copied = true;
			setTimeout(() => copied = false, 2000);
		} catch (e) {
			console.error('Failed to copy:', e);
		}
		onClose();
	}

	function navigateTo(href) {
		if (href === '/playground') {
			window.location.href = href;
			onClose();
			return;
		}
		if (href.startsWith('http')) {
			window.open(href, '_blank');
			onClose();
			return;
		}
		if (href === 'install') {
			copyInstallCommand();
			return;
		}
		if (searchQuery.trim()) {
			const recent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
			recentSearches = recent;
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('logos-recent-searches', JSON.stringify(recent));
			}
		}
		goto(href);
		onClose();
		searchQuery = '';
	}

	function selectPopular(term) {
		searchQuery = term;
		inputRef?.focus();
	}

	function selectRecent(term) {
		searchQuery = term;
		inputRef?.focus();
	}

	function getTypeIcon(type) {
		switch (type) {
			case 'builtin': return FunctionSquare;
			case 'feature': return Sparkle;
			case 'module': return Package;
			case 'action': return Play;
			default: return FileCode;
		}
	}

	function getTypeColor(type) {
		switch (type) {
			case 'builtin': return 'text-cyan-400';
			case 'feature': return 'text-purple-400';
			case 'module': return 'text-amber-400';
			case 'action': return 'text-green-400';
			default: return 'text-white/50';
		}
	}

	$effect(() => {
		if (isOpen && inputRef) {
			inputRef.focus();
			if (typeof localStorage !== 'undefined') {
				const saved = localStorage.getItem('logos-recent-searches');
				if (saved) recentSearches = JSON.parse(saved);
			}
		}
	});

	$effect(() => {
		selectedIndex = 0;
	});

	$effect(() => {
		if (searchQuery.trim()) {
			mode = 'search';
		} else if (recentSearches.length > 0) {
			mode = 'recent';
		} else {
			mode = 'empty';
		}
	});
</script>

{#if isOpen}
	<div class="fixed inset-0 z-[100]">
		<button
			class="absolute inset-0 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
			onclick={onClose}
			aria-label="Close search"
		></button>

		<div class="absolute top-[8%] left-1/2 w-full max-w-2xl -translate-x-1/2 px-3 sm:top-[12%] sm:px-4">
			<div class="glass overflow-hidden rounded-2xl shadow-2xl animate-[slideUp_0.2s_ease-out]">
				<div class="flex items-center gap-3 border-b border-white/5 px-5 py-4">
					<Search class="text-white/40 h-5 w-5 flex-shrink-0" />
					<input
						bind:this={inputRef}
						bind:value={searchQuery}
						onkeydown={handleKeydown}
						type="text"
						placeholder="Search functions, features, docs..."
						class="text-white placeholder:text-white/30 flex-1 bg-transparent outline-none text-base sm:text-sm"
					/>
					{#if searchQuery}
						<button
							onclick={() => searchQuery = ''}
							class="text-white/40 hover:text-white p-1 transition-colors rounded-md hover:bg-white/5"
							aria-label="Clear"
						>
							<X class="h-4 w-4" />
						</button>
					{/if}
					<button
						onclick={onClose}
						class="text-white/40 hover:text-white hidden p-1 transition-colors sm:block rounded-md hover:bg-white/5"
						aria-label="Close"
					>
						<kbd class="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[10px] font-mono">esc</kbd>
					</button>
				</div>

				<div class="max-h-[65vh] overflow-y-auto">
					{#if mode === 'search' && filteredResults().length > 0}
						<div class="py-1">
							{#each ['builtin', 'feature', 'doc', 'module', 'section', 'action'] as type}
								{@const typeResults = filteredResults().filter(r => r.type === type)}
								{#if typeResults.length > 0}
									<div class="mb-2">
										<div class="text-white/30 px-5 py-1.5 text-[10px] uppercase tracking-wider font-medium flex items-center gap-2">
											{#if type === 'builtin'}
												<span>Functions</span>
											{:else if type === 'feature'}
												<span>Features</span>
											{:else if type === 'module'}
												<span>Modules</span>
											{:else if type === 'action'}
												<span>Quick Actions</span>
											{:else}
												<span>Documentation</span>
											{/if}
										</div>
										<ul>
											{#each typeResults as result, i}
												{@const globalIndex = filteredResults().indexOf(result)}
												{@const IconComponent = getTypeIcon(result.type)}
												<li>
													<button
														onclick={() => navigateTo(result.href)}
														class="hover:bg-white/5 flex w-full items-start gap-3 px-5 py-3 text-left transition-colors {globalIndex === selectedIndex ? 'bg-white/5' : ''}"
													>
														<IconComponent class="h-5 w-5 mt-0.5 {getTypeColor(result.type)}" />
														<div class="min-w-0 flex-1">
															<div class="text-white text-sm flex items-center gap-2">
																<span class={getTypeColor(result.type)}>{result.title}</span>
																{#if result.type === 'builtin'}
																	<span class="text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded font-mono">fn</span>
																{/if}
															</div>
															{#if result.snippet}
																<div class="text-white/30 text-xs font-mono mt-1 truncate max-w-md">
																	{result.snippet.split('\n')[0]}
																</div>
															{/if}
														</div>
														<div class="text-white/20 flex items-center gap-2 shrink-0">
															<span class="text-[10px] uppercase tracking-wider">{result.section}</span>
															{#if globalIndex === selectedIndex}
																<ArrowRight class="h-4 w-4 text-white/60" />
															{/if}
														</div>
													</button>
												</li>
											{/each}
										</ul>
									</div>
								{/if}
							{/each}
						</div>
					{:else if mode === 'search' && searchQuery.trim()}
						<div class="text-white/40 px-5 py-12 text-center">
							<p class="text-sm">No results for "{searchQuery}"</p>
							<p class="mt-1 text-xs">Try searching for a function name or concept</p>
						</div>
					{:else if mode === 'recent'}
						<div class="py-1">
							<div class="text-white/30 flex items-center gap-1.5 px-5 py-2 text-[10px] uppercase tracking-wider font-medium">
								<Clock class="h-3 w-3" />
								Recent Searches
							</div>
							<ul>
								{#each recentSearches as term, i}
									<li>
										<button
											onclick={() => selectRecent(term)}
											class="hover:bg-white/5 flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition-colors {i === selectedIndex ? 'bg-white/5' : ''}"
										>
											<Clock class="text-white/30 h-4 w-4" />
											<span class="text-white">{term}</span>
										</button>
									</li>
								{/each}
							</ul>
						</div>
					{:else}
						<div class="py-2">
							<div class="px-5 py-2">
								<div class="text-white/30 text-[10px] uppercase tracking-wider font-medium mb-2 flex items-center gap-1.5">
									<Zap class="h-3 w-3" />
									Quick Actions
								</div>
								<div class="flex flex-wrap gap-2">
									{#each quickActions as action}
										{@const ActionIcon = action.icon}
										<button
											onclick={() => navigateTo(action.href || action.action)}
											class="bg-white/5 text-white/60 hover:text-white rounded-lg border border-white/10 px-3 py-2 text-xs transition-colors hover:bg-white/10 hover:border-white/20 flex items-center gap-2"
										>
											<ActionIcon class="h-3.5 w-3.5" />
											{action.title}
											<kbd class="bg-white/5 border border-white/10 rounded px-1 py-0.5 text-[9px] font-mono ml-1">{action.shortcut}</kbd>
										</button>
									{/each}
								</div>
							</div>
							<div class="mt-2">
								<div class="text-white/30 flex items-center gap-1.5 px-5 py-2 text-[10px] uppercase tracking-wider font-medium">
									<Sparkles class="h-3 w-3" />
									Popular Searches
								</div>
								<div class="flex flex-wrap gap-2 px-5 py-2">
									{#each popularSearches as term}
										<button
											onclick={() => selectPopular(term)}
											class="bg-white/5 text-white/60 hover:text-white rounded-full border border-white/10 px-3 py-2 text-xs transition-colors hover:bg-white/10 hover:border-white/20"
										>
											{term}
										</button>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				</div>

				<div class="border-t border-white/5 text-white/30 flex items-center justify-between px-5 py-2.5 text-xs">
					<div class="flex items-center gap-4">
						<span class="flex items-center gap-1.5">
							<kbd class="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 font-mono text-[10px]">↑</kbd>
							<kbd class="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 font-mono text-[10px]">↓</kbd>
							<span class="ml-1 hidden sm:inline">navigate</span>
						</span>
						<span class="flex items-center gap-1.5">
							<kbd class="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 font-mono text-[10px]">↵</kbd>
							<span class="ml-1 hidden sm:inline">select</span>
						</span>
						<span class="flex items-center gap-1.5">
							<kbd class="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 font-mono text-[10px]">tab</kbd>
							<span class="ml-1 hidden sm:inline">autofill</span>
						</span>
					</div>
					<span class="font-mono text-[10px] text-white/20">Logos v0.4.5</span>
				</div>
			</div>
		</div>
	</div>
{/if}
