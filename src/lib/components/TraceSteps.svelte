<script>
  import { onDestroy, tick, untrack } from "svelte";
  import {
    Play,
    Pause,
    StepBack,
    StepForward,
    ChevronsLeft,
    ChevronsRight,
  } from "lucide-svelte";

  let { steps = [], truncated = false } = $props();

  let idx = $state(0);
  let playing = $state(false);
  let speed = $state(150);
  let timer = $state(null);
  let listEl = $state(null);

  const step = $derived(steps[Math.min(idx, steps.length - 1)]);
  const prevEnv = $derived(idx > 0 ? (steps[idx - 1]?.e ?? {}) : {});

  function changedKeys(env, prev) {
    return new Set(
      Object.keys(env).filter((k) => !(k in prev) || prev[k] !== env[k]),
    );
  }
  const changed = $derived(step ? changedKeys(step.e ?? {}, prevEnv) : new Set());

  function stop() {
    playing = false;
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function play() {
    if (playing || steps.length === 0) return;
    if (idx >= steps.length - 1) idx = 0;
    playing = true;
    timer = setInterval(() => {
      if (idx >= steps.length - 1) {
        stop();
        return;
      }
      idx++;
    }, speed);
  }

  function goto(i) {
    stop();
    idx = Math.max(0, Math.min(i, steps.length - 1));
  }

  onDestroy(stop);

  $effect(() => {
    // re-arm timer when speed changes mid-play (idx changes ignored)
    speed;
    if (untrack(() => playing)) {
      const at = untrack(() => idx);
      stop();
      idx = at;
      play();
    }
  });

  async function scrollActive() {
    await tick();
    listEl
      ?.querySelector("[data-active='true']")
      ?.scrollIntoView({ block: "nearest" });
  }
  $effect(() => {
    idx;
    scrollActive();
  });
</script>

{#if steps.length === 0}
  <p class="p-4 text-xs text-zinc-500">No steps recorded.</p>
{:else}
  <div class="flex flex-wrap items-center gap-1 border-b border-white/10 px-3 py-2">
    <button
      onclick={() => goto(0)}
      class="flex min-h-[36px] min-w-[36px] items-center justify-center text-zinc-400"
      title="First step"
      aria-label="First step"
    >
      <ChevronsLeft class="h-4 w-4" />
    </button>
    <button
      onclick={() => goto(idx - 1)}
      class="flex min-h-[36px] min-w-[36px] items-center justify-center text-zinc-400"
      title="Previous step"
      aria-label="Previous step"
    >
      <StepBack class="h-4 w-4" />
    </button>
    {#if playing}
      <button
        onclick={stop}
        class="flex min-h-[36px] min-w-[36px] items-center justify-center text-zinc-200"
        title="Pause"
        aria-label="Pause"
      >
        <Pause class="h-4 w-4" />
      </button>
    {:else}
      <button
        onclick={play}
        class="flex min-h-[36px] min-w-[36px] items-center justify-center text-zinc-200"
        title="Play"
        aria-label="Play"
      >
        <Play class="h-4 w-4" />
      </button>
    {/if}
    <button
      onclick={() => goto(idx + 1)}
      class="flex min-h-[36px] min-w-[36px] items-center justify-center text-zinc-400"
      title="Next step"
      aria-label="Next step"
    >
      <StepForward class="h-4 w-4" />
    </button>
    <button
      onclick={() => goto(steps.length - 1)}
      class="flex min-h-[36px] min-w-[36px] items-center justify-center text-zinc-400"
      title="Last step"
      aria-label="Last step"
    >
      <ChevronsRight class="h-4 w-4" />
    </button>
    <span class="ml-2 text-xs text-zinc-500 tabular-nums">
      {idx + 1} / {steps.length}
    </span>
    {#if truncated}
      <span class="ml-1 text-xs text-zinc-600">truncated</span>
    {/if}
    <select
      bind:value={speed}
      class="ml-auto border border-white/10 bg-[#151515] px-2 py-1 text-xs text-zinc-400"
      aria-label="Playback speed"
    >
      <option value={500}>slow</option>
      <option value={150}>normal</option>
      <option value={40}>fast</option>
    </select>
  </div>
  <div class="h-px bg-white/10">
    <div
      class="h-px bg-zinc-400 transition-[width] duration-150 ease-linear"
      style="width: {((idx + 1) / steps.length) * 100}%"
    ></div>
  </div>

  {#key idx}
    <div class="step-in border-b border-white/10 px-4 py-3">
      <div class="flex flex-wrap items-center gap-2 text-sm">
        <span class="text-zinc-200">{step.t}</span>
        <code class="min-w-0 flex-1 truncate text-xs text-zinc-500">{step.d}</code>
      </div>
      <p class="mt-1 truncate font-mono text-[13px] text-zinc-300">
        => {step.r}
      </p>
    </div>
  {/key}

  <div class="grid gap-0 lg:grid-cols-2">
    <div class="border-b border-white/10 lg:border-r lg:border-b-0">
      <p class="px-4 pt-3 pb-1 text-xs text-zinc-500">
        env after step {idx + 1}
      </p>
      {#key idx}
        {#if Object.keys(step.e ?? {}).length === 0}
          <p class="px-4 pb-3 text-xs text-zinc-600">(empty)</p>
        {:else}
          <ul class="px-4 pb-3">
            {#each Object.entries(step.e) as [k, v], j}
              <li
                class="env-in flex min-h-[32px] items-baseline gap-2 border-b border-white/5 py-1 last:border-0 {changed.has(k)
                  ? 'flash-row'
                  : ''}"
                style="animation-delay: {Math.min(j, 10) * 25}ms"
              >
                <span class="shrink-0 font-mono text-xs text-zinc-400">{k}</span>
                <span class="truncate font-mono text-xs text-zinc-200">{v}</span>
              </li>
            {/each}
          </ul>
        {/if}
      {/key}
    </div>
    <div class="max-h-72 overflow-y-auto p-2" bind:this={listEl}>
      {#each steps as s, i}
        <button
          onclick={() => goto(i)}
          data-active={i === idx}
          class="flex w-full items-center gap-2 px-2 py-1 text-left font-mono text-xs transition-colors {i ===
          idx
            ? 'bg-white/10 text-zinc-100'
            : 'text-zinc-500'}"
        >
          <span class="w-8 shrink-0 text-right text-zinc-600 tabular-nums"
            >{i + 1}</span
          >
          <span
            class="shrink-0 truncate"
            style="padding-left: {Math.min(s.depth, 8) * 8}px"
          >
            {s.t}
          </span>
        </button>
      {/each}
    </div>
  </div>
{/if}

<style>
  .flash-row {
    animation: flash 0.6s ease-out;
  }
  @keyframes flash {
    from {
      background-color: rgba(255, 255, 255, 0.12);
    }
    to {
      background-color: transparent;
    }
  }
  .step-in {
    animation: step-in 0.2s ease-out;
  }
  @keyframes step-in {
    from {
      opacity: 0;
      transform: translateX(6px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .env-in {
    opacity: 0;
    animation: env-in 0.2s ease-out forwards;
  }
  @keyframes env-in {
    from {
      opacity: 0;
      transform: translateY(3px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .flash-row,
    .step-in,
    .env-in {
      animation: none;
      opacity: 1;
    }
  }
</style>
