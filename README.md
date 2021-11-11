# DeHub Monorepo

This is the **monorepo of DeHub**. Created based on the awesome [Nx.dev](https://nx.dev) workspace by [Nrwl](https://nrwl.io/) Team.

[![DeHUB Nx](https://github.com/DeHubToken/dehub-nx/actions/workflows/dehub-nx.yml/badge.svg)](https://github.com/DeHubToken/dehub-nx/actions/workflows/dehub-nx.yml)

_More libraries or apps are supported and will be added as we go under `apps` or `libs` folders_

# Applications

Apps represent standalone sites, which can be written in pure JS, React, Vue.JS or Angular and can consume common libraries (`libs`)

Dehub Nx Monorepo consists of the following type of applications:

- Angular
- React

## Angular

### `web`

DeHub Dapps

[![Netlify Status](https://api.netlify.com/api/v1/badges/355647c5-6e43-4c94-92bc-eac397ab80a8/deploy-status)](https://app.netlify.com/sites/dapps-dehub/deploys)

- Repo: **[Github](https://github.com/DeHubToken/dehub-nx)**
- CI: Github **[Actions](https://github.com/DeHubToken/dehub-nx/actions)**
- Hosting: **[Netlify](https://dapps-dehub.netlify.app/)**

## React

### `lottery`

DeHub Lottery Dapp

[![Netlify Status](https://api.netlify.com/api/v1/badges/bacc9132-2b4b-438d-9b93-a377c12181fb/deploy-status)](https://app.netlify.com/sites/dehub-react-lottery-draft/deploys)

- Repo: **[Github](https://github.com/DeHubToken/dehub-nx)**
- CI: Github **[Actions](https://github.com/DeHubToken/dehub-nx/actions)**
- Hosting: **[Netlify](https://dehub-react-lottery-draft.netlify.app)**

# Libraries

Libraries in Nx are self-contained isolated group of logics. Can represent reusable functionalities or core logic shared across multiple framework (in)dependent apps.

Dehub Nx Monorepo consists of the following type of libraries:

- Angular
- React
- Shared

## Angular

Angular libs which can be consumed only from Angular apps like ui libs or core services for example.

### `core`

- Angular animations
- GraphQL module
- PWA service _(coming soon...)_

## React

Angular libs which can be consumed only from Angular apps like ui libs or core services for example.

### `core`

_React core functionalities_

### `ui`

_Reusable react ui components like header, footer, etc._

## Shared

Framework independent libs which can be consumed from any Angular or React apps like styles or simple TS utilities or models.

### `moralis`

_Common Moralis logic like authentication, walletconnect, etc_

### `models`

_Common Models, states used in react and angular apps_

### `utils`

_Common Utils used in react and angular apps_

### `contentful`

_Generated models from Contentful GraphQL via [graphql codegen](https://www.graphql-code-generator.com/)_

### `assets/dehub`

_Common sass styles, variables, mixins, etc. of DeHUB_

### `assets/freya`

_Common sass styles, assets from the Freya PrimeNG themes_

# Dev Setup

`<APP>` can be `web` or `lottery`

1. **Checkout** the project: `https://github.com/DeHubToken/dehub-nx`
1. Open **VSCode** _(pre-configured editor settings involved)_
1. **Install** dependencies: `npm i`
1. While installing:
   Add the following line to `/etc/hosts` _(`c:/windows/system32/drivers/hosts`)_:
   ```
   127.0.0.1 dev.localhost
   ```
1. Run **Dev mode**: `npm <APP>:start`
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
