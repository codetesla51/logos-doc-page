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
// This is a sandboxed environment - some functions are restricted.

let message = "Hello from Logos!"
print(message)

// Try some basic operations
let numbers = [1, 2, 3, 4, 5]
for num in numbers {
    print(num * 2)
}

// String manipulation
let greeting = "Hello, " + "World!"
print(greeting)`;

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

<div class="flex h-full flex-col lg:flex-row gap-4">
	<!-- Editor Panel -->
	<div class="flex flex-1 flex-col min-h-0">
		<div class="flex items-center justify-between border-b border-border bg-subtle/50 px-4 py-2 rounded-t-lg">
			<div class="flex items-center gap-2">
				<div class="flex gap-1.5">
					<div class="h-2.5 w-2.5 rounded-full bg-white/10"></div>
					<div class="h-2.5 w-2.5 rounded-full bg-white/10"></div>
					<div class="h-2.5 w-2.5 rounded-full bg-white/10"></div>
				</div>
				<span class="ml-2 text-xs text-muted">playground.lgs</span>
			</div>
			<div class="flex items-center gap-2">
				<button
					onclick={resetCode}
					class="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-muted hover:text-text hover:bg-border transition-colors"
					title="Reset code"
				>
					<RotateCcw class="h-3.5 w-3.5" />
					Reset
				</button>
				<button
					onclick={runCode}
					disabled={isRunning}
					class="flex items-center gap-1.5 rounded bg-text px-3 py-1.5 text-xs font-medium text-bg hover:bg-text/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
			class="flex-1 overflow-hidden rounded-b-lg border border-t-0 border-border bg-subtle min-h-[300px] lg:min-h-0"
		></div>
	</div>

	<!-- Output Panel -->
	<div class="flex flex-1 flex-col min-h-0 lg:max-w-md">
		<div class="flex items-center justify-between border-b border-border bg-subtle/50 px-4 py-2 rounded-t-lg">
			<span class="text-xs text-muted">Output</span>
			{#if hasError}
				<span class="flex items-center gap-1 text-xs text-red-400">
					<AlertTriangle class="h-3 w-3" />
					Error
				</span>
			{/if}
		</div>
		<div class="flex-1 overflow-auto rounded-b-lg border border-t-0 border-border bg-subtle p-4 min-h-[200px] lg:min-h-0">
			<pre class="font-code text-sm whitespace-pre-wrap {hasError ? 'text-red-400' : 'text-text'}">{output || 'Click "Run" to execute your code.'}</pre>
		</div>
	</div>
</div>
