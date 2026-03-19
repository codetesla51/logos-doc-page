<script>
	import { onMount, onDestroy } from 'svelte';
	import { Play, Loader2, AlertTriangle, RotateCcw } from 'lucide-svelte';
	import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { javascript } from '@codemirror/lang-javascript';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
	import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from '@codemirror/language';
	import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';

	const API_URL = 'https://logosplayground-codetesla517280-g3cm9qvp.leapcell.dev/run';

	const defaultCode = `// Welcome to the Logos Playground!
// This is a sandboxed environment.

let message = "Hello from Logos!"
print(message)

// String interpolation (v0.4+)
let name = "World"
print("Hello, ${name}!")

// Pipe operator (v0.4+)
let nums = [1, 2, 3, 4, 5]
let result = nums
    |> filter(fn(x) -> x % 2 == 0)
    |> map(fn(x) -> x * x)
print(result)`;

	let editorContainer = $state(null);
	let editorView = $state(null);
	let output = $state('');
	let isRunning = $state(false);
	let hasError = $state(false);

	onMount(() => {
		const state = EditorState.create({
			doc: defaultCode,
			extensions: [
				lineNumbers(),
				highlightActiveLine(),
				highlightActiveLineGutter(),
				history(),
				bracketMatching(),
				closeBrackets(),
				javascript(),
				oneDark,
				syntaxHighlighting(defaultHighlightStyle),
				keymap.of([
					...defaultKeymap,
					...historyKeymap,
					...closeBracketsKeymap
				]),
				EditorView.theme({
					'&': {
						height: '100%',
						fontSize: '14px'
					},
					'.cm-scroller': {
						fontFamily: "'Google Sans Code', 'Roboto Mono', monospace",
						overflow: 'auto'
					},
					'.cm-content': {
						padding: '16px 0'
					},
					'.cm-gutters': {
						backgroundColor: '#1e1e1e',
						borderRight: '1px solid #2a2a2a'
					},
					'.cm-activeLineGutter': {
						backgroundColor: '#2a2a2a'
					}
				}),
				EditorView.lineWrapping
			]
		});

		editorView = new EditorView({
			state,
			parent: editorContainer
		});
	});

	onDestroy(() => {
		if (editorView) {
			editorView.destroy();
		}
	});

	function getCode() {
		if (editorView) {
			return editorView.state.doc.toString();
		}
		return '';
	}

	async function runCode() {
		const source = getCode();
		if (!source.trim()) {
			output = 'No code to run.';
			return;
		}

		isRunning = true;
		hasError = false;
		output = '';

		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ source })
			});

			const data = await response.json();

			if (data.error) {
				hasError = true;
				output = data.error;
			} else if (data.output !== undefined) {
				output = data.output || '(No output)';
			} else {
				output = JSON.stringify(data, null, 2);
			}
		} catch (err) {
			hasError = true;
			output = `Error: ${err.message}`;
		} finally {
			isRunning = false;
		}
	}

	function resetCode() {
		if (editorView) {
			editorView.dispatch({
				changes: {
					from: 0,
					to: editorView.state.doc.length,
					insert: defaultCode
				}
			});
		}
		output = '';
		hasError = false;
	}
</script>

<div class="flex h-full flex-col gap-4 lg:flex-row">
	<div class="flex flex-1 flex-col min-h-0">
		<div class="flex items-center justify-between rounded-t-xl border border-white/5 bg-white/[0.02] px-4 py-3">
			<div class="flex items-center gap-3">
				<div class="flex gap-2">
					<div class="h-2.5 w-2.5 rounded-full bg-white/10"></div>
					<div class="h-2.5 w-2.5 rounded-full bg-white/10"></div>
					<div class="h-2.5 w-2.5 rounded-full bg-white/10"></div>
				</div>
				<span class="text-white/40 text-xs font-medium">playground.lgs</span>
			</div>
			<div class="flex items-center gap-2">
				<button
					onclick={resetCode}
					class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-white/40 transition-all hover:bg-white/5 hover:text-white/70"
					title="Reset code"
				>
					<RotateCcw class="h-3.5 w-3.5" />
					Reset
				</button>
				<button
					onclick={runCode}
					disabled={isRunning}
					class="flex items-center gap-1.5 rounded-lg bg-white px-4 py-1.5 text-xs font-medium text-black transition-all hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{#if isRunning}
						<Loader2 class="h-3.5 w-3.5 animate-spin" />
						Running...
					{:else}
						<Play class="h-3.5 w-3.5" />
						Run
					{/if}
				</button>
			</div>
		</div>
		<div
			bind:this={editorContainer}
			class="flex-1 overflow-hidden rounded-b-xl border border-t-0 border-white/5 bg-[#1a1a1a] min-h-[300px] lg:min-h-0"
		></div>
	</div>

	<div class="flex flex-1 flex-col min-h-0">
		<div class="flex items-center justify-between rounded-t-xl border border-white/5 bg-white/[0.02] px-4 py-3">
			<span class="text-white/40 text-xs font-medium">Output</span>
			{#if hasError}
				<span class="flex items-center gap-1.5 text-xs font-medium text-red-400">
					<AlertTriangle class="h-3 w-3" />
					Error
				</span>
			{/if}
		</div>
		<div class="flex-1 overflow-auto rounded-b-xl border border-t-0 border-white/5 bg-[#1a1a1a] p-4 min-h-[200px] lg:min-h-0">
			<pre class="font-mono text-sm whitespace-pre-wrap {hasError ? 'text-red-400' : 'text-white/70'}">{output || 'Click "Run" to execute your code.'}</pre>
		</div>
	</div>
</div>
