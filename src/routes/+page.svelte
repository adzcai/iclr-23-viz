<script>
  import papers from '$lib/data/papers.json';
  import embeddings from '$lib/data/embeddings.json';
  import Chart from './Chart.svelte';
  import CategorySelector from './CategorySelector.svelte';
  import './styles.css';
  import Footer from './Footer.svelte';

  const categories = [
    'General Machine Learning (ie none of the above)',
    'Applications (eg, speech processing, computer vision, NLP)',
    'Deep Learning and representational learning',
    'Generative models',
    'Infrastructure (eg, datasets, competitions, implementations, libraries)',
    'Machine Learning for Sciences (eg biology, physics, health sciences, social sciences, climate/sustainability )',
    'Neuroscience and Cognitive Science (e.g., neural coding, brain-computer interfaces)',
    'Optimization (eg, convex and non-convex optimization)',
    'Probabilistic Methods (eg, variational inference, causal inference, Gaussian processes)',
    'Reinforcement Learning (eg, decision and control, planning, hierarchical RL, robotics)',
    'Social Aspects of Machine Learning (eg, AI safety, fairness, privacy, interpretability, human-AI interaction, ethics)',
    'Theory (eg, control theory, learning theory, algorithmic game theory)',
    'Unsupervised and Self-supervised learning',
  ];

  let selectedCategories = Object.fromEntries(
    categories.map((category) => [category, true])
  );

  let maxPapers = 1000;

  $: data = papers
    .filter((paper) => selectedCategories[paper.category])
    .slice(0, maxPapers)
    .map(({ id, category, ...paper }) => ({
      href: `https://openreview.net/forum?id=${id}`,
      category: category ? categories.indexOf(category) : 0,
      ...paper,
      x: embeddings[id][0],
      y: embeddings[id][1],
    }));
</script>

<Chart {data} />

<CategorySelector
  bind:maxPapers
  bind:selectedCategories
  {categories}
  {papers}
/>

<Footer />
