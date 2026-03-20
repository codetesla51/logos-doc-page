<script>
	import { onMount, onDestroy } from 'svelte';
	import { Play, Loader2, AlertTriangle, RotateCcw, Share2, Link, Check } from 'lucide-svelte';
	import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { javascript } from '@codemirror/lang-javascript';
	import { tags } from '@lezer/highlight';
	import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
	import { syntaxHighlighting, defaultHighlightStyle, bracketMatching, HighlightStyle } from '@codemirror/language';
	import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';

	const API_URL = 'https://logosplayground-codetesla517280-g3cm9qvp.leapcell.dev/run';

	const defaultCode = `// Welcome to the Logos Playground!
// Sandbox environment - network disabled

// String interpolation (v0.4+)
let name = "World"
print("Hello, \${name}!")

// Tables
let user = table{ name: "Alice", score: 95 }
print(user.name)

// Pipe operator (v0.4+)
let nums = [1, 2, 3, 4, 5]
print(str(nums))

spawn {
    print("Running concurrently")
}`;

	function decodeCode(hash) {
		try {
			return decodeURIComponent(hash);
		} catch {
			return null;
		}
	}

	function encodeCode(code) {
		return encodeURIComponent(code);
	}

	function loadFromHash() {
		const hash = window.location.hash.slice(1);
		if (hash) {
			const decoded = decodeCode(hash);
			if (decoded) return decoded;
		}
		return null;
	}

	let editorContainer = $state(null);
	let editorView = $state(null);
	let output = $state('');
	let isRunning = $state(false);
	let hasError = $state(false);
	let shareSuccess = $state(false);
	let copyTimeout = $state(null);

	const logosTheme = EditorView.theme({
		'&': {
			height: '100%',
			fontSize: '14px',
			backgroundColor: '#18181b'
		},
		'.cm-content': {
			fontFamily: "'Roboto Mono', monospace",
			caretColor: '#fafafa'
		},
		'.cm-cursor, .cm-dropCursor': {
			borderLeftColor: '#fafafa'
		},
		'&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
			backgroundColor: '#3f3f46'
		},
		'.cm-scroller': {
			fontFamily: "'Roboto Mono', monospace",
			overflow: 'auto'
		},
		'.cm-gutters': {
			backgroundColor: '#18181b',
			color: '#71717a',
			border: 'none',
			borderRight: '1px solid #27272a'
		},
		'.cm-lineNumbers .cm-gutterElement': {
			padding: '0 16px 0 8px'
		},
		'.cm-activeLineGutter': {
			backgroundColor: '#27272a'
		},
		'.cm-activeLine': {
			backgroundColor: '#27272a'
		}
	}, { dark: true });

	const logosHighlight = HighlightStyle.define([
		{ tag: tags.keyword, color: '#c084fc' },
		{ tag: tags.operator, color: '#fafafa' },
		{ tag: tags.special(tags.variableName), color: '#67e8f9' },
		{ tag: tags.typeName, color: '#67e8f9' },
		{ tag: tags.atom, color: '#fbbf24' },
		{ tag: tags.number, color: '#fbbf24' },
		{ tag: tags.definition(tags.variableName), color: '#67e8f9' },
		{ tag: tags.string, color: '#4ade80' },
		{ tag: tags.special(tags.string), color: '#4ade80' },
		{ tag: tags.comment, color: '#71717a' },
		{ tag: tags.variableName, color: '#fafafa' },
		{ tag: tags.tagName, color: '#c084fc' },
		{ tag: tags.bracket, color: '#fafafa' },
		{ tag: tags.meta, color: '#fafafa' },
		{ tag: tags.link, color: '#67e8f9', textDecoration: 'underline' },
		{ tag: tags.heading, fontWeight: 'bold', color: '#fafafa' },
		{ tag: tags.emphasis, fontStyle: 'italic' },
		{ tag: tags.strong, fontWeight: 'bold' },
		{ tag: tags.bool, color: '#fbbf24' },
		{ tag: tags.null, color: '#fbbf24' },
	]);

	onMount(() => {
		const initialCode = loadFromHash() || defaultCode;
		
		const state = EditorState.create({
			doc: initialCode,
			extensions: [
				lineNumbers(),
				highlightActiveLine(),
				highlightActiveLineGutter(),
				history(),
				bracketMatching(),
				closeBrackets(),
				javascript(),
				logosTheme,
				syntaxHighlighting(logosHighlight),
				syntaxHighlighting(defaultHighlightStyle),
				keymap.of([
					...defaultKeymap,
					...historyKeymap,
					...closeBracketsKeymap
				]),
				EditorView.lineWrapping
			]
		});

		editorView = new EditorView({
			state,
			parent: editorContainer
		});

		// Ctrl+Enter to run code
		editorView.dom.addEventListener('keydown', (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
				e.preventDefault();
				runCode();
			}
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
		window.location.hash = '';
	}

	async function shareCode() {
		const code = getCode();
		const encoded = encodeCode(code);
		const url = `${window.location.origin}${window.location.pathname}#${encoded}`;
		
		try {
			await navigator.clipboard.writeText(url);
			shareSuccess = true;
			if (copyTimeout) clearTimeout(copyTimeout);
			copyTimeout = setTimeout(() => {
				shareSuccess = false;
			}, 2000);
		} catch {
			window.prompt('Copy this URL:', url);
		}
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
					onclick={shareCode}
					class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-all {shareSuccess ? 'bg-green-500/20 text-green-400' : 'text-white/40 hover:bg-white/5 hover:text-white/70'}"
					title="Share code"
				>
					{#if shareSuccess}
						<Check class="h-3.5 w-3.5" />
						<span class="hidden sm:inline">Copied!</span>
					{:else}
						<Share2 class="h-3.5 w-3.5" />
						<span class="hidden sm:inline">Share</span>
					{/if}
				</button>
				<button
					onclick={resetCode}
					class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-white/40 transition-all hover:bg-white/5 hover:text-white/70"
					title="Reset code"
				>
					<RotateCcw class="h-3.5 w-3.5" />
				</button>
				<button
					onclick={runCode}
					disabled={isRunning}
					class="flex items-center gap-1.5 rounded-lg bg-white px-3 sm:px-4 py-1.5 text-xs font-medium text-black transition-all hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-[60px] justify-center"
				>
					{#if isRunning}
						<Loader2 class="h-3.5 w-3.5 animate-spin" />
						<span class="hidden sm:inline">Running...</span>
						<span class="sm:hidden">Run</span>
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
