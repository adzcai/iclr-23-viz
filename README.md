# iclr-23-viz

Visualization of paper submissions for the [ICLR 2023](https://openreview.net/group?id=ICLR.cc/2023/Conference).

The visualization was made by

1. Fetching data from 
1. Passing the paper title, keywords, abstract, and category through the [SPECTER](https://github.com/allenai/specter) language model
2. Using the first token as the sequence embedding
3. Running TSNE to reduce down to 2 dimensions. (The plots look nicer and less scattered than PCA.)

Powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

Deployed with [Vercel](https://vercel.com/).

## Developing


```bash
npm install
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
