<script lang="ts">
  import { fade } from 'svelte/transition';

  export let x: number;
  export let y: number;
  export let margin: number;
  export let title: string;
  export let description: string;
  export let titleActive: boolean;
  export let delayRelease: () => void;

  let boxHeight: number;
  let windowHeight: number;

  $: [yPos, transformStyles] =
    y + margin + boxHeight <= windowHeight
      ? [y + margin, 'transform: translateX(-50%)']
      : [y - margin, 'transform: translate(-50%, -100%)'];
</script>

<svelte:window bind:innerHeight={windowHeight} />

<div
  class="title-div"
  style="top: {yPos}px; left: {x}px; {transformStyles}"
  bind:clientHeight={boxHeight}
  transition:fade={{ delay: 0 }}
  on:mouseenter={() => {
    titleActive = true;
  }}
  on:mouseleave={() => {
    titleActive = false;
    delayRelease();
  }}
>
  <h3 style="text-align: center;">
    {title}
  </h3>
  <p class="description">
    {description}
  </p>
</div>

<style>
  .title-div {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.8);
    max-width: 24rem;
    padding: 0.25rem;
    border-radius: 1rem;
    box-shadow: 0.25rem 0.25rem;
  }

  .description {
    text-align: center;
    max-height: 16rem;
    overflow-y: auto;
  }
</style>
