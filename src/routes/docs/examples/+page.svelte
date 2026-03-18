<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Examples - Logos Documentation</title>
</svelte:head>

<DocLayout prev={{ title: 'Building Binaries', href: '/docs/building' }} next={null}>
	<h1>Examples</h1>

	<p>
		Here are practical examples to help you get started with Logos. Each example demonstrates
		different features of the language.
	</p>

	<h2 id="todo-app">Todo CLI App</h2>

	<p>A command-line todo list manager with persistent storage:</p>

	<CodeBlock
		code={`// todo_app.lgs - Command-line todo manager

let todoFile = "todos.json"
let todos = []

let loadTodos = fn() {
    if !fileExists(todoFile) {
        return []
    }
    let res = fileRead(todoFile)
    if !res.ok {
        return []
    }
    let parsed = parseJson(res.value)
    if parsed == null {
        return []
    }
    return parsed
}

let saveTodos = fn() {
    let json = toJson(todos)
    let res = fileWrite(todoFile, json)
    return res.ok
}

	let listTodos = fn() {
    if len(todos) == 0 {
        print(colorYellow("  No todos yet!"))
        return null
    }
    for i, todo in todos {
        let status = todo["done"] ? colorGreen("[x]") : colorYellow("[ ]")
        print("  \${i + 1}. \${status} \${todo["task"]}")
    }
}

let addTodo = fn(task) {
    let todo = table{
        task: task,
        done: false,
        created: dateTimeStr(),
    }
    todos = push(todos, todo)
    saveTodos()
    print(colorGreen("Added: \${task}"))
}

let completeTodo = fn(index) {
    if index < 1 || index > len(todos) {
        print(colorRed("Invalid todo number"))
        return null
    }
    let todo = todos[index - 1]
    todo["done"] = true
    saveTodos()
    print(colorGreen("Completed: \${todo["task"]}"))
}

// Main loop
print(colorBold(colorCyan("Todo App")))
todos = loadTodos()
print(colorGreen("Loaded \${len(todos)} todo(s)"))

let running = true
for running {
    let input = trim(prompt(colorBold("todo> ")))
    let parts = split(input, " ")
    let cmd = lower(parts[0])

    if cmd == "quit" || cmd == "q" {
        running = false
    }
    if cmd == "list" || cmd == "ls" {
        listTodos()
    }
    if cmd == "add" {
        if len(parts) < 2 {
            print(colorRed("Usage: add <task>"))
        } else {
            let task = join(slice(parts, 1, len(parts)), " ")
            addTodo(task)
        }
    }
    if cmd == "done" {
        if len(parts) < 2 {
            print(colorRed("Usage: done <number>"))
        } else {
            completeTodo(toInt(parts[1]))
        }
    }
}
print(colorYellow("Goodbye!"))`}
		language="javascript"
		filename="todo_app.lgs"
	/>

	<h2 id="http-client">HTTP API Client</h2>

	<p>Fetch data from a REST API with proper error handling:</p>

	<CodeBlock
		code={`// http_client.lgs - Fetch and display API data

let fetchUsers = fn() {
    let res = httpGet("https://jsonplaceholder.typicode.com/users")
    
    if !res.ok {
        print(colorRed("Error: " + res.error))
        return []
    }

    // HTTP responses have body and status in value
    let users = parseJson(res.value.body)
    return users
}

let displayUser = fn(user) {
    print("---")
    print("Name: " + user["name"])
    print("Email: " + user["email"])
    print("Company: " + user["company"]["name"])
}

// Fetch and display users
print(colorCyan("Fetching users from API..."))
print("")

let users = fetchUsers()

if len(users) > 0 {
    for user in users {
        displayUser(user)
    }
    print("---")
    print(colorGreen("Total users: " + toStr(len(users))))
}`}
		language="javascript"
		filename="http_client.lgs"
	/>

	<h2 id="json-config">JSON Configuration Manager</h2>

	<p>Load and manage JSON configuration files:</p>

	<CodeBlock
		code={`// json_config.lgs - Configuration file manager

let loadConfig = fn(path) {
    let res = fileRead(path)
    if !res.ok {
        return null
    }
    let parsed = parseJson(res.value)
    if parsed == null {
        print(colorRed("Error: invalid JSON in " + path))
        return null
    }
    return parsed
}

let saveConfig = fn(path, config) {
    let json = toJson(config)
    let res = fileWrite(path, json)
    return res.ok
}

let getConfigValue = fn(config, key, defaultValue) {
    if config == null {
        return defaultValue
    }
    if !has(config, key) {
        return defaultValue
    }
    return config[key]
}

// Load or create default config
let configPath = "config.json"
let config = null

if fileExists(configPath) {
    config = loadConfig(configPath)
    print(colorGreen("Loaded config from: \${configPath}"))
} else {
    print(colorYellow("Creating default config..."))
    config = table{
        app: table{
            name: "MyApp",
            version: "1.0.0",
            debug: false,
        },
        server: table{
            host: "localhost",
            port: 8080,
        },
    }
    saveConfig(configPath, config)
}

// Access config values with dot notation
let appName = config.app.name
let port = config.server.port

print("Application: \${appName}")
print("Port: \${port}")`}
		language="javascript"
		filename="json_config.lgs"
	/>

	<h2 id="file-search">File Search Utility</h2>

	<p>Search for files by name pattern with optional content search:</p>

	<CodeBlock
		code={`// file_search.lgs - Search files by pattern

let searchFiles = fn(dir, pattern, searchText) {
    let results = []
    let dirRes = fileReadDir(dir)
    if !dirRes.ok {
        return results
    }
    
    for entry in dirRes.value {
        let path = dir + "/" + entry
        
        if contains(lower(entry), lower(pattern)) {
            if len(searchText) == 0 {
                results = push(results, table{
                    path: path,
                    match: "filename",
                })
            } else {
                let fileRes = fileRead(path)
                if fileRes.ok {
                    let lines = split(fileRes.value, "\\n")
                    for lineNum, line in lines {
                        if contains(lower(line), lower(searchText)) {
                            results = push(results, table{
                                path: path,
                                line: lineNum + 1,
                                match: trim(line),
                            })
                        }
                    }
                }
            }
        }
    }
    return results
}

// Search for .lgs files containing "fn"
let dir = "."
let pattern = ".lgs"
let searchText = "fn"

print(colorYellow("Searching for '\${pattern}' files containing '\${searchText}'..."))
print("")

let results = searchFiles(dir, pattern, searchText)

if len(results) == 0 {
    print(colorYellow("No matches found"))
} else {
    print(colorBold("Found \${len(results)} match(es):"))
    for result in results {
        if has(result, "line") {
            print(colorGreen("  \${result.path}:\${result.line}"))
            print("    \${result.match}")
        } else {
            print(colorGreen("  \${result.path}"))
        }
    }
}`}
		language="javascript"
		filename="file_search.lgs"
	/>

	<h2 id="concurrent">Concurrent Processing</h2>

	<p>Process items concurrently using spawn:</p>

	<CodeBlock
		code={`// concurrent.lgs - Parallel processing example
use "std/math"

let processItem = fn(item) {
    let result = mathFactorial(item)
    print("Processed \${item}! = \${result}")
    return result
}

let items = [5, 6, 7, 8, 9, 10]

print("Processing items concurrently...")
print("")

spawn for item in items {
    processItem(item)
}

print("")
print("All items queued for processing!")

spawn {
    sleep(100)
    print("This runs in the background")
}`}
		language="javascript"
		filename="concurrent.lgs"
	/>

	<h2 id="testing">Testing Example</h2>

	<p>Write tests using the testing standard library:</p>

	<CodeBlock
		code={`// test_math.lgs - Example test file
use "std/testing"
use "std/math"

let add = fn(a, b) -> a + b
let multiply = fn(a, b) -> a * b

suite("arithmetic", fn() {
    assert("add positive", add(2, 3), 5)
    assert("add negative", add(-1, 1), 0)
    assert("add zero", add(0, 0), 0)
    assert("multiply", multiply(3, 4), 12)
    assert("multiply by zero", multiply(5, 0), 0)
})

suite("math stdlib", fn() {
    assert("factorial 5", mathFactorial(5), 120)
    assert("factorial 0", mathFactorial(0), 1)
    assert("fib 10", mathFib(10), 55)
    assert("isPrime 17", mathIsPrime(17), true)
    assert("isPrime 4", mathIsPrime(4), false)
    assert("gcd", mathGcd(48, 18), 6)
})

summary()

// Run with: lgs test_math.lgs
// Output:
// ok    arithmetic, math stdlib    11 tests passed`}
		language="javascript"
		filename="test_math.lgs"
	/>

	<h2 id="fizzbuzz">FizzBuzz</h2>

	<p>The classic FizzBuzz problem:</p>

	<CodeBlock
		code={`// fizzbuzz.lgs - Classic FizzBuzz

let fizzbuzz = fn(n) {
    for i, _ in range(1, n + 1) {
        let result = i % 15 == 0 ? "FizzBuzz" 
            : i % 3 == 0 ? "Fizz" 
            : i % 5 == 0 ? "Buzz" 
            : toStr(i)
        print(result)
    }
}

fizzbuzz(30)`}
		language="javascript"
		filename="fizzbuzz.lgs"
	/>

	<h2 id="cli-tool">CLI Tool with Arguments</h2>

	<p>Build command-line tools that accept arguments:</p>

	<CodeBlock
		code={`// greet.lgs - CLI tool example
let cliArgs = args()

if len(cliArgs) < 2 {
    print("Usage: lgs greet.lgs <name> [--loud]")
    exit(1)
}

let name = cliArgs[1]
let loud = false

for i, arg in cliArgs {
    if i > 1 && arg == "--loud" {
        loud = true
    }
}

let greeting = "Hello, \${name}!"
print(loud ? colorBold(upper(greeting)) : greeting)`}
		language="javascript"
		filename="greet.lgs"
	/>

	<h2 id="modern-features">Modern Features (v0.4.0+)</h2>

	<p>Demonstrates string interpolation, pipe operator, try expression, and postfix operators:</p>

	<CodeBlock
		code={`// modern.lgs - String interpolation, pipe, try, postfix

// String interpolation
let name = "world"
let greeting = "Hello \${name}!"
let age = 25
let bio = "\${name} is \${age} years old"
print(greeting)
print(bio)

// Pipe operator - chain transformations
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let result = nums
    |> filter(fn(x) -> x % 2 == 0)   // [2, 4, 6, 8, 10]
    |> map(fn(x) -> x * x)            // [4, 16, 36, 64, 100]
    |> filter(fn(x) -> x > 30)        // [36, 64, 100]

print("Filtered and mapped: " + toStr(result))

// Try expression - unwraps errors automatically
fn safeFetch(url) {
    let res = try httpGet(url)
    return res.value.body
}

// Postfix increment/decrement
let count = 0
count++
count++
print("Count: " + toStr(count))  // 2

// For-in with index
for i, num in nums {
    print(toStr(i) + ": " + toStr(num))
}`}
		language="javascript"
		filename="modern.lgs"
	/>

	<h2>More Examples</h2>

	<p>
		Find more examples in the
		<a
			href="https://github.com/codetesla51/logos/tree/main/examples"
			target="_blank"
			rel="noopener noreferrer"
			class="text-text hover:underline"
		>
			GitHub repository
		</a>, including:
	</p>

	<ul class="text-muted list-inside list-disc space-y-1">
		<li>Backup script with file operations</li>
		<li>Cron job scheduler</li>
		<li>Movie file organizer</li>
		<li>Line counter utility</li>
		<li>Guessing game</li>
	</ul>
</DocLayout>
