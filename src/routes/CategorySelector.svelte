<script lang="ts">
  import type { Paper } from './+page';

  export let papers: Paper[];
  export let categories: string[];
  export let maxPapers: number;
  export let selectedCategories: Record<string, boolean>;

  const initialState = Object.fromEntries(
    categories.map((category) => [category, 0])
  );

  const categoryCounts = papers.reduce((counts, paper) => {
    const category = paper.category || categories[0];
    return {
      ...counts,
      [category]: counts[category] + 1,
    };
  }, initialState);

  $: anyOn = Object.values(selectedCategories).some(Boolean);

  function handleToggle() {
    categories.forEach((category) => (selectedCategories[category] = !anyOn));
  }
</script>

<div class="selector-container">
  <label>
    <span>Show me at most</span>
    <input
      type="number"
      bind:value={maxPapers}
      style="max-width: 4rem; border-radius: 0.5rem;"
    />
    <span>papers (out of {papers.length})</span>
  </label>
  <details>
    <summary style="text-align: right;">Show categories</summary>
    <div style="margin-top: 0.5rem">
      <div class="checkboxes-container">
        {#each categories as category}
          <label style="display: flex;">
            <input
              type="checkbox"
              bind:checked={selectedCategories[category]}
            />
            <span style="margin-left: 0.25rem; max-width: 16rem;">
              {category} ({categoryCounts[category]})
            </span>
          </label>
        {/each}
      </div>
      <div style="margin-top: 0.5rem;">
        <button on:click={handleToggle}>
          {anyOn ? 'Clear all' : 'Check all'}
        </button>
      </div>
    </div>
  </details>
</div>

<style>
  .selector-container {
    position: absolute;
    top: 2rem;
    right: 2rem;

    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: hsla(139, 80%, 61%, 0.7);

    box-shadow: 0.2rem 0.2rem 0.5rem 0.2rem #00000066;
  }

  .selector-container > details > summary {
    cursor: pointer;
  }

  .checkboxes-container {
    display: flex;
    flex-direction: column;
    max-height: 24rem;
    overflow: auto;
    background-color: #ffffff66;
    border-radius: 0.5rem;
    padding: 0.25rem;
  }

  .checkboxes-container > * + * {
    margin-top: 1rem;
  }
</style>
