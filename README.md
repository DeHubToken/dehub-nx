# DeHUB Monorepo

This is the **monorepo of DeHUB**. Created based on the awesome [Nx.dev](https://nx.dev) workspace by [Nrwl](https://nrwl.io/) Team.

_More libraries or apps are supported and will be added as we go under `apps` or `libs` folders_

# Applications

_Apps represent standalone sites, which can be written in pure JS, React, Vue.JS or Angular and can consume common libraries (`libs`)_

## `apps/web` -> **DeHUB Angular Website**.

_Angular DeHUB website_

- Repo: **[Github](https://github.com/DeHubToken/dehub-nx)**
- CI: Github **[Actions](https://github.com/DeHubToken/dehub-nx/actions)**
- Hosting: **[Netlify](https://dehub-ng-website.netlify.app/)**

## `apps/lottery` -> **DeHUB React Lottery Dapp**.

_React DeHUB Lottery Dapp_

- Repo: **[Github](https://github.com/DeHubToken/dehub-nx)**
- CI: Github **[Actions](https://github.com/DeHubToken/dehub-nx/actions)**
- Hosting: **[Netlify](https://dehub-react-lottery.netlify.app)**

# Libraries

## `libs/assets` -> **Themes, styles, assets: Freya**.

_Common sass styles from the Freya PrimeNG themes_

_Like UI, models, shared or moralis, etc._<br>

# Dev Setup

`<APP>` can be `web` or `lottery`

1. **Checkout** the project: `https://github.com/DeHubToken/dehub-nx`
1. Open **VSCode** _(pre-configured editor settings involved)_
1. **Install** dependencies: `npm i`
1. Run **Dev mode**: `npm <APP>:start`
1. Run **Prod mode**: `npm run <APP>:demo` _(serve prod version locally)_
1. Run **CI**: `npm run <APP>:ci` _(lint, test, build)_
1. Deploy as **draft**: `npm run <APP>:deploy:draft`
1. Deploy to **prod**: `npm run <APP>:deploy:prod`
