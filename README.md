# mfs.js

Modern full-stack javascript

![the stack](./stack.png)

This repo serves a POC of my talk on modern full-stack javascript.

The site is live at https://pizza.codyfactory.eu

Checkout the accompanying slides that were presented at:
* [NodeConf EU 2022 in Kilkenny](https://docs.google.com/presentation/d/1vHYSlgV8pSI3kobGQlYxfssvaeZrGA4BqDn0qLGDmYg/edit?usp=sharing)
* [ReactSummit 2022 in Amsterdam](https://docs.google.com/presentation/d/16OHcPhk1GKjprCFymcK_PAiPbvM7tGG0mCudFzVvHaU/edit?usp=sharing)

## Setup

1. Clone
2. Start the db:
   ```bash
   npm run db:up
   ```
3. Add data to the db (only need to do this once):
   ```bash
   npm run db:migrate
   ```
4. Run the stack:
   ```bash
   npm run dev
   ```
