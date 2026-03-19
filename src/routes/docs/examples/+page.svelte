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
		Practical examples demonstrating Logos features. These examples use v0.4.3 syntax including
		string interpolation, pipe operators, try expressions, and regex builtins.
	</p>

	<h2 id="modern-pipeline">Modern Pipeline with Try <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4</span></h2>

	<p>Fetch, parse, filter, and transform data with pipes and try expressions:</p>

	<CodeBlock
		code={`// modern_api.lgs - Pipe operator + try expressions
use "std/array"

// Fetch users and filter active ones
let getActiveUsers = fn() {
    return try httpGet("https://api.example.com/users")
        |> parseJson
        |> filter(fn(u) -> u.active && u.role != "guest")
        |> map(fn(u) -> table{
            name: u.name,
            email: u.email,
            role: u.role,
        })
}

// Display formatted user list
let users = getActiveUsers()

for i, user in users {
    print("\${i + 1}. \${user.name} <\${user.email}> [\${user.role}]")
}

// Count statistics
let roles = users |> map(fn(u) -> u.role)
print("\${len(users)} active users across \${len(roles)} roles")`}
		language="javascript"
		filename="modern_api.lgs"
	/>

	<h2 id="string-interpolation-examples">String Interpolation Examples <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4</span></h2>

	<p>Clean, readable string formatting with embedded expressions:</p>

	<CodeBlock
		code={`// formatting.lgs - String interpolation showcase
use "std/array"

let user = table{ name: "Alice", age: 28, scores: [95, 87, 92] }
let product = table{ name: "Widget", price: 29.99, qty: 5 }

// Basic interpolation
print("Hello, \${user.name}!")
print("\${user.name} is \${user.age} years old")

// In expressions
let total = product.price * product.qty
print("Order: \${product.name} x \${product.qty} = \$\${total}")

// Array access in strings
let avgScore = arraySum(user.scores) / len(user.scores)
print("\${user.name}'s average score: \${avgScore}")

// String concatenation
let greeting = "Welcome back, " + user.name + "!"
print(greeting)

// In function parameters
let formatDate = fn(day, month, year) {
    return "\${month}/\${day}/\${year}"
}
print("Today: \${formatDate(15, "March", 2024)}")`}
		language="javascript"
		filename="formatting.lgs"
	/>

	<h2 id="error-handling">Error Handling with Try <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4</span></h2>

	<p>Clean error propagation using try expressions:</p>

	<CodeBlock
		code={`// error_handling.lgs - Try expression examples

// Safe file operations
fn readConfig(path) {
    let content = try fileRead(path)
    let json = try parseJson(content)
    return json
}

// Safe HTTP requests
fn fetchUser(id) {
    let res = try httpGet("https://api.example.com/users/" + str(id))
    return try parseJson(res.value.body)
}

// Chained operations with try
fn processData(url, key) {
    return try httpGet(url)
        |> try parseJson
        |> filter(fn(d) -> d.active)
        |> map(fn(d) -> d[key])
}

// Multiple fallbacks (using 'fallback' instead of reserved 'default')
fn getSetting(key, fallback) {
    let config = try fileRead("config.json")
        |> try parseJson
    return has(config, key) ? config[key] : fallback
}

// HTTP with proper error handling
fn downloadAndSave(url, path) {
    let res = try httpGet(url)
    let data = try parseJson(res.value.body)
    let content = toJson(data)
    let saved = try fileWrite(path, content)
    return saved
}`}
		language="javascript"
		filename="error_handling.lgs"
	/>

	<h2 id="pipe-transformations">Data Transformations with Pipes <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded ml-2">v0.4</span></h2>

	<p>Chain array operations with the pipe operator:</p>

	<CodeBlock
		code={`// transformations.lgs - Pipe operator examples
use "std/array"

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Filter and transform
let evensSquared = numbers
    |> filter(fn(x) -> x % 2 == 0)
    |> map(fn(x) -> x * x)

print("Evens squared: \${evensSquared}")

// Complex pipeline
let data = [100, 25, 50, 75, 125]
    |> filter(fn(x) -> x > 30)
    |> map(fn(x) -> x * 1.1)     // add 10%
    |> filter(fn(x) -> x > 50)   // filter again
    |> map(fn(x) -> int(x))      // convert to int

// String processing pipeline
let words = ["hello", "WORLD", "LoGoS"]
    |> map(fn(w) -> lower(w))    // "hello", "world", "logos"
    |> map(fn(w) -> upper(w))    // "HELLO", "WORLD", "LOGOS"
    |> filter(fn(w) -> len(w) > 4)

print("Long words: \${words}")

// Object transformation
let user1 = table{ firstName: "John", lastName: "Doe", age: 30 }
let user2 = table{ firstName: "Jane", lastName: "Smith", age: 25 }
let users = [user1, user2]

let names = users
    |> map(fn(u) -> u.firstName + " " + u.lastName)
    |> map(fn(name) -> upper(name))

print("Names: \${names}")`}
		language="javascript"
		filename="transformations.lgs"
	/>

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
    let res = toJson(todos)
    if !res.ok {
        return false
    }
    return fileWrite(todoFile, res.value).ok
}

let listTodos = fn() {
    if len(todos) == 0 {
        print(colorYellow("  No todos yet!"))
        return null
    }
    for i, todo in todos {
        let taskName = todo["task"]
        let status = todo["done"] ? colorGreen("[x]") : colorYellow("[ ]")
        print("  \${i + 1}. \${status} \${taskName}")
    }
}

let addTodo = fn(task) {
    let ts = dateTimeStr()
    let todo = table{ task: task, done: false, created: ts }
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
    let taskName = todo["task"]
    print(colorGreen("Completed: \${taskName}"))
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
            completeTodo(int(parts[1]))
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
    print(colorGreen("Total users: \${len(users)}"))
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
        print(colorRed("Error: invalid JSON in \${path}"))
        return null
    }
    return parsed
}

let saveConfig = fn(path, cfg) {
    let res = toJson(cfg)
    if !res.ok {
        print("Error: " + res.error)
        return false
    }
    return fileWrite(path, res.value).ok
}

let getConfigValue = fn(config, key, fallback) {
    if config == null {
        return fallback
    }
    if !has(config, key) {
        return fallback
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
    let app = table{ name: "MyApp", version: "1.0.0", debug: false }
    let server = table{ host: "localhost", port: 8080 }
    config = table{ app: app, server: server }
    saveConfig(configPath, config)
}

// Access config values
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

print(colorYellow("Searching for '" + pattern + "' files containing '" + searchText + "'..."))
print("")

let results = searchFiles(dir, pattern, searchText)

if len(results) == 0 {
    print(colorYellow("No matches found"))
} else {
    print(colorBold("Found " + str(len(results)) + " match(es):"))
    for result in results {
        if has(result, "line") {
            let rPath = result["path"]
            let rLine = result["line"]
            let rMatch = result["match"]
            print(colorGreen("  " + rPath + ":" + str(rLine)))
            print("    " + rMatch)
        } else {
            let rPath = result["path"]
            print(colorGreen("  " + rPath))
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

	<h2 id="fizzbuzz">FizzBuzz</h2>

	<p>
		The classic FizzBuzz problem. Loop from 1 to n, printing "Fizz" for multiples of 3,
		"Buzz" for multiples of 5, "FizzBuzz" for both, and the number otherwise.
	</p>

	<CodeBlock
		code={`// fizzbuzz.lgs - Classic FizzBuzz
// Loop from 1 to 30 and apply FizzBuzz rules

let fizzbuzz = fn(n) {
    for i in range(1, n + 1) {
        let result = i % 15 == 0 ? "FizzBuzz"
            : i % 3 == 0 ? "Fizz"
            : i % 5 == 0 ? "Buzz"
            : str(i)
        print(result)
    }
}

fizzbuzz(30)`}
		language="javascript"
		filename="fizzbuzz.lgs"
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
