<script>
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Embedding - Logos Documentation</title>
</svelte:head>

<DocLayout
	prev={{ title: 'Builtins', href: '/docs/builtins' }}
	next={{ title: 'Building Binaries', href: '/docs/building' }}
>
	<h1>Embedding in Go</h1>

	<p>
		Logos provides a clean embedding API that lets you run Logos scripts from Go applications.
		This makes it perfect for scripting, configuration, plugins, and game scripting.
	</p>

	<h2>Installation</h2>

	<p>Add Logos to your Go project:</p>

	<CodeBlock code={`go get github.com/codetesla51/logos`} language="bash" />

	<h2>Quick Start</h2>

	<p>Import the <code>logos</code> package and create a VM:</p>

	<CodeBlock
		code={`package main

import (
    "fmt"
    "github.com/codetesla51/logos/logos"
)

func main() {
    vm := logos.New()

    err := vm.Run(\`
        let message = "Hello from Logos!"
        print(message)
    \`)

    if err != nil {
        fmt.Println("Error:", err)
    }
}`}
		language="go"
		filename="main.go"
	/>

	<h2>API Reference</h2>

	<h3>logos.New()</h3>

	<p>Creates a new Logos VM with all capabilities enabled:</p>

	<CodeBlock code={`vm := logos.New()`} language="go" />

	<h3>logos.NewWithConfig()</h3>

	<p>Creates a sandboxed VM with specific capabilities:</p>

	<CodeBlock
		code={`vm := logos.NewWithConfig(logos.SandboxConfig{
    AllowFileIO:  false,  // Block file read/write/delete
    AllowNetwork: false,  // Block HTTP requests
    AllowShell:   false,  // Block shell() command
    AllowExit:    false,  // Block exit()
})`}
		language="go"
	/>

	<h3>vm.Run()</h3>

	<p>Evaluates a Logos script string. Returns an error if parsing fails or the script produces an error:</p>

	<CodeBlock
		code={`err := vm.Run(\`
    let x = 10
    let y = 20
    print(toStr(x + y))
\`)

if err != nil {
    fmt.Println("Script error:", err)
}`}
		language="go"
	/>

	<h3>vm.Register()</h3>

	<p>Registers a Go function callable from Logos scripts:</p>

	<CodeBlock
		code={`vm.Register("greet", func(args ...logos.Object) logos.Object {
    name := args[0].(*logos.String).Value
    return &logos.String{Value: "Hello, " + name + "!"}
})

vm.Register("add", func(args ...logos.Object) logos.Object {
    a := args[0].(*logos.Integer).Value
    b := args[1].(*logos.Integer).Value
    return &logos.Integer{Value: a + b}
})

// Use them in Logos
vm.Run(\`
    print(greet("World"))  // Hello, World!
    print(add(5, 10))      // 15
\`)`}
		language="go"
	/>

	<h3>vm.SetVar()</h3>

	<p>Sets a variable in the Logos environment. Supports Go types: int, int64, float64, string, bool, []interface{'{'}{'}'}, map[string]interface{'{'}{'}'}, nil:</p>

	<CodeBlock
		code={`vm.SetVar("count", 42)
vm.SetVar("name", "Logos")
vm.SetVar("enabled", true)
vm.SetVar("items", []interface{}{1, 2, 3})
vm.SetVar("config", map[string]interface{}{
    "host": "localhost",
    "port": 8080,
})

vm.Run(\`
    print("Count:", count)
    print("Name:", name)
    print("Items:", items)
\`)`}
		language="go"
	/>

	<h3>vm.GetVar()</h3>

	<p>Gets a variable from the Logos environment, converted back to a Go value:</p>

	<CodeBlock
		code={`vm.Run(\`
    let result = 42 * 2
    let greeting = "Hello"
\`)

result := vm.GetVar("result")
fmt.Println(result)  // 84

greeting := vm.GetVar("greeting")
fmt.Println(greeting)  // Hello

missing := vm.GetVar("undefined")
fmt.Println(missing)  // nil`}
		language="go"
	/>

	<h3>vm.Call()</h3>

	<p>Calls a Logos function by name with Go arguments:</p>

	<CodeBlock
		code={`vm.Run(\`
    let double = fn(x) {
        return x * 2
    }

    let greet = fn(name) {
        return "Hello, " + name + "!"
    }
\`)

// Call Logos functions from Go
result, err := vm.Call("double", 21)
fmt.Println(result)  // 42

greeting, err := vm.Call("greet", "World")
fmt.Println(greeting)  // Hello, World!`}
		language="go"
	/>

	<h2>Object Types</h2>

	<p>When registering functions, you work with Logos object types:</p>

	<CodeBlock
		code={`// Available types (re-exported from interpreter)
logos.Object      // Interface for all types
logos.Integer     // int64 value
logos.Float       // float64 value
logos.String      // string value
logos.Bool        // bool value
logos.Array       // []Object elements
logos.Table       // map[string]Object pairs
logos.Null        // null value
logos.Function    // Logos function
logos.Builtin     // Go builtin function`}
		language="go"
	/>

	<p>Accessing values:</p>

	<CodeBlock
		code={`vm.Register("processData", func(args ...logos.Object) logos.Object {
    // Type assertions to access values
    num := args[0].(*logos.Integer).Value     // int64
    text := args[1].(*logos.String).Value     // string
    flag := args[2].(*logos.Bool).Value       // bool

    // Return a table
    return &logos.Table{Pairs: map[string]logos.Object{
        "STRING:result": &logos.String{Value: text},
        "STRING:count":  &logos.Integer{Value: num * 2},
    }}
})`}
		language="go"
	/>

	<h2>Sandboxing</h2>

	<p>
		Use <code>NewWithConfig</code> to create restricted VMs for untrusted scripts:
	</p>

	<CodeBlock
		code={`// Fully sandboxed - no file, network, shell, or exit access
vm := logos.NewWithConfig(logos.SandboxConfig{
    AllowFileIO:  false,
    AllowNetwork: false,
    AllowShell:   false,
    AllowExit:    false,
})

// This will fail - file access is disabled
err := vm.Run(\`
    let data = fileRead("secrets.txt")
\`)
// Error: file operations are disabled in sandbox mode

// This will fail - network access is disabled
err = vm.Run(\`
    let resp = httpGet("https://api.example.com")
\`)
// Error: network operations are disabled in sandbox mode`}
		language="go"
	/>

	<h2>Complete Example: Basic Embedding</h2>

	<CodeBlock
		code={`package main

import (
    "fmt"
    "github.com/codetesla51/logos/logos"
)

func main() {
    // Create sandboxed VM
    vm := logos.NewWithConfig(logos.SandboxConfig{
        AllowFileIO:  false,
        AllowNetwork: false,
        AllowShell:   false,
        AllowExit:    false,
    })

    // Register custom functions
    vm.Register("greet", func(args ...logos.Object) logos.Object {
        name := args[0].(*logos.String).Value
        return &logos.String{Value: "Hello from Go, " + name + "!"}
    })

    vm.Register("add", func(args ...logos.Object) logos.Object {
        a := args[0].(*logos.Integer).Value
        b := args[1].(*logos.Integer).Value
        return &logos.Integer{Value: a + b}
    })

    // Run script
    script := \`
        let name = "World"
        print(greet(name))

        let sum = add(5, 10)
        print("Sum:", sum)

        let final = "done"
    \`

    err := vm.Run(script)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }

    // Get result from script
    finalValue := vm.GetVar("final")
    fmt.Println("Final value:", finalValue)

    // Try blocked operation
    err = vm.Run(\`let data = fileRead("secret.txt")\`)
    if err != nil {
        fmt.Println("Blocked:", err)
    }
}`}
		language="go"
		filename="main.go"
	/>

	<h2>Complete Example: Game Scripting</h2>

	<p>
		Logos is great for game scripting. Here's an example of exposing game state to scripts:
	</p>

	<CodeBlock
		code={`package main

import (
    "fmt"
    "github.com/codetesla51/logos/logos"
)

type Player struct {
    Name   string
    Health int
    Level  int
}

var player = Player{Name: "Hero", Health: 100, Level: 1}

func main() {
    vm := logos.NewWithConfig(logos.SandboxConfig{
        AllowFileIO:  false,
        AllowNetwork: false,
        AllowShell:   false,
        AllowExit:    false,
    })

    // Expose player data to scripts
    vm.Register("getPlayer", func(args ...logos.Object) logos.Object {
        return &logos.Table{Pairs: map[string]logos.Object{
            "STRING:name":   &logos.String{Value: player.Name},
            "STRING:health": &logos.Integer{Value: int64(player.Health)},
            "STRING:level":  &logos.Integer{Value: int64(player.Level)},
        }}
    })

    vm.Register("heal", func(args ...logos.Object) logos.Object {
        amount := int(args[0].(*logos.Integer).Value)
        player.Health += amount
        if player.Health > 100 {
            player.Health = 100
        }
        return &logos.String{Value: fmt.Sprintf("Healed! Health: %d", player.Health)}
    })

    vm.Register("setName", func(args ...logos.Object) logos.Object {
        player.Name = args[0].(*logos.String).Value
        return &logos.Null{}
    })

    // Run game script
    vm.Run(\`
        let p = getPlayer()
        print("Player: " + p["name"] + " (HP: " + toStr(p["health"]) + ")")

        setName("Warrior")
        print(heal(20))

        let updated = getPlayer()
        print("Now: " + updated["name"] + " (HP: " + toStr(updated["health"]) + ")")
    \`)
}`}
		language="go"
		filename="game.go"
	/>

	<h2>Complete Example: Environment Config</h2>

	<p>
		Use Logos for configuration scripts that read environment variables:
	</p>

	<CodeBlock
		code={`package main

import (
    "os"
    "github.com/codetesla51/logos/logos"
)

func main() {
    vm := logos.NewWithConfig(logos.SandboxConfig{
        AllowFileIO:  false,
        AllowNetwork: false,
        AllowShell:   false,
        AllowExit:    false,
    })

    // Register env access
    vm.Register("env", func(args ...logos.Object) logos.Object {
        key := args[0].(*logos.String).Value
        value := os.Getenv(key)
        if value == "" && len(args) > 1 {
            return args[1]  // Return default
        }
        if value == "" {
            return &logos.Null{}
        }
        return &logos.String{Value: value}
    })

    // Set some env vars for demo
    os.Setenv("APP_NAME", "MyApp")
    os.Setenv("APP_ENV", "development")

    vm.Run(\`
        let appName = env("APP_NAME", "DefaultApp")
        let appEnv = env("APP_ENV", "production")

        print("App: " + appName)
        print("Environment: " + appEnv)

        if appEnv == "development" {
            print("Running in dev mode")
        }
    \`)
}`}
		language="go"
		filename="config.go"
	/>

	<h2>Error Handling</h2>

	<p>All methods that can fail return errors:</p>

	<CodeBlock
		code={`// vm.Run() returns error on parse or runtime errors
err := vm.Run(\`let x = 10 / 0\`)
if err != nil {
    fmt.Println("Script error:", err)
}

// vm.Call() returns (result, error)
result, err := vm.Call("nonexistent", 1)
if err != nil {
    fmt.Println("Call error:", err)
}`}
		language="go"
	/>

	<h2>Multiple VMs</h2>

	<p>Each VM is independent with its own environment:</p>

	<CodeBlock
		code={`vm1 := logos.New()
vm2 := logos.New()

vm1.SetVar("x", 42)
vm2.SetVar("x", 100)

// Each VM has its own state
fmt.Println(vm1.GetVar("x"))  // 42
fmt.Println(vm2.GetVar("x"))  // 100

// Functions registered on one VM don't affect others
vm1.Register("getValue", func(args ...logos.Object) logos.Object {
    return &logos.Integer{Value: 1}
})

vm2.Register("getValue", func(args ...logos.Object) logos.Object {
    return &logos.Integer{Value: 2}
})

result1, _ := vm1.Call("getValue")  // 1
result2, _ := vm2.Call("getValue")  // 2`}
		language="go"
	/>
</DocLayout>
