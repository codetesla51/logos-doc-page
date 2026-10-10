---
name: logos
description: Write and review Logos (.lgs) scripts — readable scripting language with interpolation, pipes, try expressions, and result-based errors. Use when generating, explaining, or debugging Logos code.
---

# Logos language skill

Logos is a dynamically-typed, interpreted scripting language written in Go. Pratt parser, tree-walking interpreter. File extension `.lgs`. CLI: `lgs file.lgs` to run, `lgs build file.lgs` for a binary, `lgs fmt file.lgs` to format. No `lgs run` command.

## Variables

```logos
let x = 10
let name = "Uthman"
let flag = true
let nothing = null
const PI = 3.14159
x += 5
i++
i--
```

Mutable with `let`, immutable with `const` (reassignment is a runtime error). `null` is canonical. Interpolation `"hello ${name}"` — never put quoted strings inside `${}`; trailing literal text after `${}` works (v0.4.8+).

## Tables and arrays

```logos
let user = table{ name: "Uthman", age: 20 }
user.name = "New Name"
user["name"]
let arr = [1, 2, 3]
arr[0]
```

Dot access works on string-keyed tables only. Bracket access is type-aware: `t[1]` and `t["1"]` are different keys. Table key order is non-deterministic (Go maps).

## Control flow

```logos
if x > 10 { print("big") } else if x > 5 { print("mid") } else { print("small") }
switch x { case 1 { print("one") } default { print("other") } }
for i < 10 { i += 1 }
for item in arr { print(item) }
for i, v in arr { print("${i}: ${v}") }
for i in range(0, 10) { print(i) }
let label = age >= 18 ? "adult" : "minor"
```

Iterating a table yields `[key, value]` pairs. `range(start, end, step?)` end is exclusive, supports countdown.

## Functions

```logos
fn greet(name) { return "Hello " + name }
let double = fn(x) -> x * 2
let users = devs |> filter(fn(d) -> d.lang == "Go") |> map(fn(d) -> d.name)
```

Named `fn name()`, anonymous `fn()`, single-expression arrow `fn(x) -> ...`. Closures capture their environment.

## Errors: try and results

```logos
let res = try httpGet("https://api.example.com/data")
let data = try parseJson(res.value.body)
```

`try` unwraps `{ok, value, error}` tables and returns early on failure. Without it, check `.ok` manually. File, JSON, HTTP, shell builtins all return result tables. No try/catch. `==`/`!=` compare booleans by value, including bools from builtins (v0.4.9).

## Concurrency

```logos
spawn { print("task 1") }
spawn for item in jobs { process(item) }
```

`spawn` waits for all goroutines. `spawn for-in` supports arrays only.

## Builtins

I/O: `print` (newline), `println` (alias, v0.4.4), `printn` (no newline), `prompt`, `confirm`, `select`, `clear`. Convert: `str`, `int`, `float`. Strings: `upper lower trim replace split join contains startsWith endsWith slice format`. Arrays: `push pop first last reverse sort slice range`. Tables: `keys values has merge`. Math: `mathAbs mathSqrt mathPow mathFloor mathCeil mathRound mathMin mathMax mathRandom mathRandomInt mathPi`. JSON: `parseJson toJson prettyJson` (result tables). Files: `fileRead fileWrite fileAppend fileDelete fileMkdir fileReadDir fileGlob fileCopy fileMove` + `fileExists` (bool). HTTP: `httpGet httpPost httpPut httpPatch httpDelete` returning `{body, status}`. Regex: `reMatch reFind reFindAll reReplace reSplit reGroups` (backtick patterns). Time: `timeNow timeMs timeStr dateStr dateTimeStr sleep`. System: `osname pwd cd env setenv args exit shell run`.

## Stdlib (import with `use`)

`std/array`: map filter reduce unique flat sum min max. `std/string`: strCapitalize strReverse strIsPalindrome strRepeat strPadStart strPadEnd. `std/math`: mathFib mathFactorial mathMean mathMedian mathIsPrime mathGcd mathLcm mathClamp. `std/path`: pathJoin pathBase pathDir pathExt. `std/time`: datetimeNow datetimeFormat datetimeDiff datetimeAdd. `std/type`: isNull isString isInt isFloat isBool isArray isTable isNumber. `std/log`: logDebug logInfo logWarn logError. `std/testing`: assert suite summary.

```logos
use "std/array"
```

## Go embedding

```go
import "github.com/codetesla51/logos/logos"
vm := logos.New()
vm.Register("greet", func(args ...logos.Object) logos.Object { ... })
vm.SetVar("count", 42)
err := vm.Run(`print(greet("World"))`)
result := vm.GetVar("count")
result, err := vm.Call("myFunction", arg1, arg2)
```

Sandbox via `logos.NewWithConfig(logos.SandboxConfig{AllowFileIO: false, AllowNetwork: false, AllowShell: false, AllowExit: false})` — disables file, HTTP, shell, exit. Return `&logos.Bool{Value: ...}` from callbacks; fresh bools are falsy-aware by value (v0.4.7+).

## Limits

No classes, no variadic user functions, no fire-and-forget spawn, `args()` unavailable in compiled binaries.
