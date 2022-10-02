<script lang="ts">
  interface Paper {
    title: string;
    keywords: string[];
    tldr: string | null;
    abstract: string;
    category: string | null;
    supplementary_material: string | null;
    x: number;
    y: number;
  }

  let components: {
    svg: SVGSVGElement | null;
  } = {
    svg: null,
  };

  export let data: {
    papers: Paper[];
    colors: Record<string, string>;
    defaultColor: string;
  };

  import { zoom, type D3ZoomEvent } from 'd3-zoom';
  import { scaleLinear } from 'd3-scale';
  import { select } from 'd3-selection';
  import { onMount } from 'svelte';

  const width = 800;
  const height = 600;

  $: zoomTransform = 'translate(0 0)';

  // set up zoom
  onMount(() => {
    const zoomEffect = zoom<SVGSVGElement, null>().on(
      'zoom',
      (event: D3ZoomEvent<SVGSVGElement, null>) => {
        zoomTransform = event.transform as unknown as string;
      }
    );

    select<SVGSVGElement, null>(components.svg!).call(zoomEffect);
  });

  const margin = 20;
  const xScale = scaleLinear([-5, 5], [-width / 2, width / 2]);
  const yScale = scaleLinear([-5, 5], [height / 2, -height / 2]);
</script>

<svg {width} {height} bind:this={components.svg}>
  <g transform={zoomTransform}>
    <g
      fill="none"
      stroke-linecap="round"
      stroke-width={5}
      transform="translate({width / 2} {height / 2})"
    >
      {#each data.papers as paper}
        <path
          d="M {paper.x},{paper.y} h 0"
          stroke={paper.category
            ? data.colors[paper.category]
            : data.defaultColor}
        />
      {/each}
    </g>
  </g>
</svg>

<style>
  svg {
    border: 1px dashed pink;
  }
</style>
