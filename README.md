# DeHUB Monorepo

This is the **monorepo of DeHUB**. Created based on the awesome [Nx.dev](https://nx.dev) workspace by [Nrwl](https://nrwl.io/) Team.

_More libraries or apps are supported and will be added as we go under `apps` or `libs` folders_

# Applications

_Apps represent standalone sites, which can be written in pure JS, React, Vue.JS or Angular and can consume common libraries (`libs`)_

## `apps/web` [DeHUB Angular Website]

_Angular DeHUB website_

- Repo: **[Github](https://github.com/DeHubToken/dehub-nx)**
- CI: Github **[Actions](https://github.com/DeHubToken/dehub-nx/actions)**
- Hosting: **[Netlify](https://dehub-ng-website-draft.netlify.app/)**

## `apps/lottery` [DeHUB Lottery Dapp]

_React DeHUB Lottery Dapp_

- Repo: **[Github](https://github.com/DeHubToken/dehub-nx)**
- CI: Github **[Actions](https://github.com/DeHubToken/dehub-nx/actions)**
- Hosting: **[Netlify](https://dehub-react-lottery-draft.netlify.app)**

# Libraries

_Like UI, models, shared or moralis, etc._<br>

## `libs/shared/assets/dehub` [Shared DeHUB assets]

_Common sass styles of DeHUB_

## `libs/shared/assets/freya` [Shared Freya template]

_Common sass styles from the Freya PrimeNG themes_

## `libs/shared/moralis` [Shared Moralis functionality]

_Common Moralis logic like authentication, walletconnect, etc_

## `libs/shared/models` [Shared types, states, models]

_Common Models used in react and angular apps_

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
