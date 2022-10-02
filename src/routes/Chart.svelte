<script lang="ts">
  let components: {
    svg: SVGSVGElement | null;
  } = {
    svg: null,
  };

  export let data: Paper[];

  import { zoom, zoomIdentity, ZoomTransform, type D3ZoomEvent } from 'd3-zoom';
  import { scaleLinear } from 'd3-scale';
  import { select } from 'd3-selection';
  import { onMount } from 'svelte';
  import HoverTitle from './HoverTitle.svelte';
  import type { Paper } from './+page';

  let width: number;
  let height: number;

  const numCategories = Math.max(...data.map((paper) => paper.category));

  const xCoords = data.map((paper) => paper.x);
  const yCoords = data.map((paper) => paper.y);
  const chartMargin = 5;
  const [xMin, xMax] = [
    Math.min(...xCoords) - chartMargin,
    Math.max(...xCoords) + chartMargin,
  ];
  const [yMin, yMax] = [
    Math.min(...yCoords) - chartMargin,
    Math.max(...yCoords) + chartMargin,
  ];

  $: xScale = scaleLinear([xMin, xMax], [-width / 2, width / 2]);
  $: yScale = scaleLinear([yMin, yMax], [height / 2, -height / 2]);

  let zoomTransform: ZoomTransform = zoomIdentity;
  $: zoomString = zoomTransform as unknown as string;

  const strokeWidth = 15;

  // set up zoom
  onMount(() => {
    const zoomEffect = zoom<SVGSVGElement, null>()
      .scaleExtent([0.5, 10])
      .on('zoom', (event: D3ZoomEvent<SVGSVGElement, null>) => {
        zoomTransform = event.transform;
      });

    select<SVGSVGElement, null>(components.svg!).call(zoomEffect);
  });

  let hoveredIndex: number | null = null;
  let titleActive = false;

  $: margin = 2 + strokeWidth * zoomTransform.k;

  function delayRelease() {
    setTimeout(() => {
      if (!titleActive) {
        hoveredIndex = null;
      }
    }, 100);
  }
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<svg {width} {height} bind:this={components.svg}>
  <g transform={zoomString}>
    <g
      fill="none"
      stroke-linecap="round"
      stroke-width={strokeWidth}
      transform="translate({width / 2} {height / 2})"
    >
      {#each data as paper, index}
        <a href={paper.href}>
          <path
            d="M {xScale(paper.x)},{yScale(paper.y)} h 0"
            stroke="hsl({(360 * paper.category) / numCategories}, 70%, 70%)"
            cursor="pointer"
            on:mouseenter={() => {
              hoveredIndex = index;
              titleActive = true;
            }}
            on:mouseleave={() => {
              titleActive = false;
              delayRelease();
            }}
          />
        </a>
      {/each}
    </g>
  </g>
</svg>

{#if hoveredIndex !== null}
  <HoverTitle
    x={zoomTransform.applyX(width / 2 + xScale(data[hoveredIndex].x))}
    y={zoomTransform.applyY(height / 2 + yScale(data[hoveredIndex].y))}
    {margin}
    title={data[hoveredIndex].title}
    description={data[hoveredIndex].tldr || data[hoveredIndex].abstract}
    bind:titleActive
    {delayRelease}
  />
{/if}
