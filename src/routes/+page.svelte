<script>
  import papers from '$lib/data/papers.json';
  import embeddings from '$lib/data/embeddings.json';
  import Chart from './Chart.svelte';

  const colors = {
    'Applications (eg, speech processing, computer vision, NLP)': '#ff0000',
    'Deep Learning and representational learning': '#ff0000',
    'General Machine Learning (ie none of the above)': '#ff0000',
    'Generative models': '#ff0000',
    'Infrastructure (eg, datasets, competitions, implementations, libraries)':
      '#ff0000',
    'Machine Learning for Sciences (eg biology, physics, health sciences, social sciences, climate/sustainability )':
      '#ff0000',
    'Neuroscience and Cognitive Science (e.g., neural coding, brain-computer interfaces)':
      '#ff0000',
    'Optimization (eg, convex and non-convex optimization)': '#ff0000',
    'Probabilistic Methods (eg, variational inference, causal inference, Gaussian processes)':
      '#ff0000',
    'Reinforcement Learning (eg, decision and control, planning, hierarchical RL, robotics)':
      '#ff0000',
    'Social Aspects of Machine Learning (eg, AI safety, fairness, privacy, interpretability, human-AI interaction, ethics)':
      '#ff0000',
    'Theory (eg, control theory, learning theory, algorithmic game theory)':
      '#ff0000',
    'Unsupervised and Self-supervised learning': '#ff0000',
  };
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

<Chart
  data={{
    papers: papers
      .slice(0, 100)
      .map(
        (
          {
            'TL;DR': tldr,
            Please_choose_the_closest_area_that_your_submission_falls_into:
              category,
            ...paper
          },
          i
        ) => ({
          tldr,
          category,
          ...paper,
          x: embeddings[i][0],
          y: embeddings[i][1],
        })
      ),
    colors,
    defaultColor: '#eeeeee',
  }}
/>
