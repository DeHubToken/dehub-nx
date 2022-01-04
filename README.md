# DeHub Monorepo

This is the **monorepo of DeHub**. Created based on the awesome [Nx.dev](https://nx.dev) workspace by [Nrwl](https://nrwl.io/) Team.

[![DeHUB Nx](https://github.com/DeHubToken/dehub-nx/actions/workflows/dehub-nx.yml/badge.svg)](https://github.com/DeHubToken/dehub-nx/actions/workflows/dehub-nx.yml)

_More libraries or apps are supported and will be added as we go under `apps` or `libs` folders_

# Applications

Apps represent standalone sites, which can be written in pure JS, React, Vue.JS or Angular and can consume common libraries (`libs`)

- Repo: **[Github](https://github.com/DeHubToken/dehub-nx)**
- CI: Github **[Actions](https://github.com/DeHubToken/dehub-nx/actions)**
- Hosting: **[Netlify](https://dapps.netlify.app/)**

Dehub Nx Monorepo consists of the following type of applications:

- Angular
- React

## Angular

### `web`

DeHub Dapps

[![Netlify Status](https://api.netlify.com/api/v1/badges/355647c5-6e43-4c94-92bc-eac397ab80a8/deploy-status)](https://app.netlify.com/sites/dapps-dehub/deploys)

- Hosting: **[Netlify](https://dapps-dehub.netlify.app/)**

## React

### `raffle`

DeHub Raffle Dapp (Inactive)

[![Netlify Status](https://api.netlify.com/api/v1/badges/d1b6b0af-8fcd-4efa-a0ec-818a84cd9283/deploy-status)](https://app.netlify.com/sites/inactive-raffle-dehub/deploys)

- Hosting: **[Netlify](https://inactive-raffle-dehub.netlify.app)**

### `prediction`

DeHub Prediction Dapp (Inactive)

[![Netlify Status](https://api.netlify.com/api/v1/badges/0343b7e0-60d7-4a95-b04f-6c1431544937/deploy-status)](https://app.netlify.com/sites/inactive-prediction-dehub/deploys)

- Hosting: **[Netlify](https://inactive-prediction-dehub.netlify.app)**

# Libraries

Libraries in Nx are self-contained isolated group of logics. Can represent reusable functionalities or core logic shared across multiple framework (in)dependent apps.

Dehub Nx Monorepo consists of the following type of libraries:

- Angular
- React
- Shared

## Angular

Angular libs which can be consumed only from Angular apps like ui libs or core services for example.

### `core`

- Theme switcher
- GraphQL module with generated services

### `ui`

_Reusable angular ui components like directives, pipes or components, etc._

## React

Angular libs which can be consumed only from Angular apps like ui libs or core services for example.

### `core`

_React core functionalities_

- Contentful GraphQL generated hooks

### `ui`

_Reusable react ui components like header, footer, etc._

### `pcsuikit`

_Reusable Pancakeswap ui components_

## Shared

Framework independent libs which can be consumed from any Angular or React apps like styles or simple TS utilities or models.

### `config`

_Shared environment variables across react and angular apps_

### `models`

_Common Models, states used in react and angular apps_

- Contentful GraphQL generated models

### `utils`

_Common Utils used in react and angular apps_

### `moralis`

_Common Moralis logic like authentication, walletconnect, etc_

### `graphql`

_GraphQL queries like Contentful (use [graphql codegen](https://www.graphql-code-generator.com/))_

### `assets/dehub`

_Common sass styles, variables, mixins, etc. of DeHUB_

### `assets/freya`

_Common sass styles, assets from the Freya PrimeNG themes_

# Dev Setup

`<APP>` can be `web` or `raffle`

1. **Checkout** the project: `https://github.com/DeHubToken/dehub-nx`
1. Open **VSCode** _(pre-configured editor settings involved)_
1. Be sure to use `node >= 16.13.0`
1. **Install** dependencies: `npm ci`
1. While installing:
   Add the following line to `/etc/hosts` _(`c:/windows/system32/drivers/hosts`)_:
   ```
   127.0.0.1 dev.localhost
   ```
1. Run **Dev mode**: `npm run <APP>:start`
1. Run **Prod mode**: `npm run <APP>:demo` _(serve prod version locally)_
1. Run **CI**: `npm run ci` _(lint, test, build from affected apps)_
1. Deploy as **draft**: `npm run deploy:draft`
1. Deploy to **prod**: `npm run deploy:prod`

# PWA Manifest

Generated with [PWA Manifest Generator](https://www.simicart.com/manifest-generator.html/)

1. App name: `DeHub`
1. Short name: `DeHub`
1. Display Mode: `fullscreen`
1. Description: `DeHub - Decentralized Entertainment Hub`
1. Theme color: `#060d1b`
1. Background color: `#622f88`
1. Icon: `shared/assets/dehub/ulogo.png`
