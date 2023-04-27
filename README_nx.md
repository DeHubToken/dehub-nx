# Nx Applications and Libraries

In Nx you can generate apps or libs and they are living in `apps` or `libs` folders.

Most of the commands outputs are cached on Nx Cloud.

Nx Cloud benefits

- [Nx Cloud 8 mins pitch](https://www.youtube.com/watch?v=GT7XIwG1i5A&feature=emb_title)
- [Run Details monitoring](https://blog.nrwl.io/introducing-run-details-available-now-on-nx-cloud-d2da86361862)

# Applications

Apps represent standalone sites, which can be written in pure JS, React, Vue.JS or Angular and can consume common libraries (`libs`)

- Repo: **[Github](https://github.com/DeHubToken/dehub-nx)**
- CI: Github **[Actions](https://github.com/DeHubToken/dehub-nx/actions)**
- Hosting: **[Netlify](https://dehub.net/)**

Dehub Nx Monorepo consists of the following type of applications:

- Angular
- React

## Angular

### `web`

DeHub

[![Netlify Status](https://api.netlify.com/api/v1/badges/a5e07eeb-b383-41df-9bc1-c9dcb4fd93b6/deploy-status)](https://app.netlify.com/sites/web-dehub/deploys)

- Hosting: **[Netlify](https://web-dehub.netlify.app/)**

## React

### `staking`

DeHub Staking Dapp

[![Netlify Status](https://api.netlify.com/api/v1/badges/09877a39-cdbf-4a0e-a63c-dcee6e4f3fb3/deploy-status)](https://app.netlify.com/sites/staking-dehub/deploys)

- Hosting: **[Netlify](https://staking-dehub.netlify.app)**

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
- Angular Moralis wrapper _(candidate for [MoralisWeb3 opensource lib](https://github.com/MoralisWeb3/angular-moralis))_
- Crypto Login, Logout, etc.

### `ui`

_Reusable angular ui components like directives, pipes or components, etc._

## React

Angular libs which can be consumed only from Angular apps like ui libs or core services for example.

### `core`

_React core functionalities_

- Contentful GraphQL generated hooks

### `ui`

_Reusable react ui components like header, footer, etc._

## Shared

Framework independent libs which can be consumed from any Angular or React apps like styles or simple TS utilities or models.

### `config`

_Shared environment variables across react and angular apps_

### `graphql`

_GraphQL queries like Contentful (use [graphql codegen](https://www.graphql-code-generator.com/))_

### `models`

_Common Models, states used in react and angular apps_

- Contentful GraphQL generated models

### `utils`

_Common Utils used in react and angular apps_

### `moralis`

_Common Moralis logic like authentication, walletconnect, etc_

### `assets/dehub`

_Common sass styles, variables, mixins, etc. of DeHUB_

### `assets/freya`

_Common sass styles, assets from the Freya PrimeNG themes_
