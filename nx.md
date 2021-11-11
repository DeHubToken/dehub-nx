# DeHUB

This project was generated using [Nx](https://nx.dev).

# Scaffolding

1. Create new latest nx workspace with empty project and **nx cloud** selected:
   ```
   npx create-nx-workspace dehub-nx
   ```
1. Add Angular support:<br>
   ```
   npm install --save-dev @nrwl/angular
   ```
1. Generate Angular app:
   ```
   nx generate @nrwl/angular:application --name=web --style=scss --prefix=dhb --routing --standaloneConfig
   ```
1. Precommit hook with formatting (git >= v2.9):
   ```
   npm i husky pretty-quick --save-dev
   ```
   add the following into `package.json`:
   ```
   "husky": {
     "hooks": {
       "pre-commit": "pretty-quick --staged"
     }
   }
   ```
1. Local website serving with [lite-server](https://github.com/johnpapa/lite-server)
   ```
   npm i lite-server compression --save-dev
   ```
   Add the following line to `/etc/hosts`:
   ```
   127.0.0.1 dev.localhost
   ```
   Add `bs-config.js` lite server config to the root:
   ```
   module.exports = {
    port: 9301,
     open: 'external',
     host: 'dev.localhost',
     server: {
       baseDir: './dist/apps/web',
       middleware: {
         1: require('compression')(),
       },
     },
   };
   ```
1. Generate React App

   ```
   npm i @nrwl/react --save-dev
   ```

   ```
   nx generate @nrwl/react:application --name=lottery --style=scss --standaloneConfig --strict
   ```

   upgrade to [webpack 5](https://nx.dev/l/r/guides/webpack-5#webpack-5-for-react-apps)

   ```
   npx nx g @nrwl/web:webpack5
   ```

1. Generate Shared Assets<br>
   **Freya** _Used to store Primefaces template assets_

   ```
   nx generate @nrwl/workspace:library --name=freya --directory=shared/assets --skipBabelrc --skipTsConfig --standaloneConfig --strict --unitTestRunner=none
   ```

   **DeHUB** _Used to store common assets like logo, etc._

   ```
   nx generate @nrwl/workspace:library --name=dehub --directory=shared/assets --skipBabelrc --skipTsConfig --standaloneConfig --strict --unitTestRunner=none
   ```

1. Generate Shared Models _used for types, states, custom models_

   ```
   nx generate @nrwl/workspace:library --name=models --directory=shared --standaloneConfig --strict

   ```

1. Generate Shared Utils _used for utilities, and common functions_

   ```
   nx generate @nrwl/workspace:library --name=utils --directory=shared --standaloneConfig --strict
   ```

1. Generate Moralis lib:

   ```
   nx generate @nrwl/workspace:library --name=moralis --directory=shared --standaloneConfig --strict
   ```

1. Generate Config lib:

   ```
   nx generate @nrwl/workspace:library --name=config --directory=shared --standaloneConfig --strict
   ```

1. Generate Utils lib:

   ```
   nx generate @nrwl/workspace:library --name=utils --directory=shared --standaloneConfig --strict
   ```

1. Generate React lib:

   ```
   nx generate @nrwl/react:lib --name=ui --directory=react --standaloneConfig --strict

   nx generate @nrwl/react:lib --name=core --directory=react --standaloneConfig --strict
   ```

1. Run Commands generation

   ```
   nx generate @nrwl/workspace:run-commands --name=deploy-draft --command='npm run web:deploy:draft' --project=web
   ```

   ```
   nx generate @nrwl/workspace:run-commands --name=deploy-prod --command='npm run web:deploy:prod' --project=web
   ```

   ```
   nx generate @nrwl/workspace:run-commands --name=deploy-draft --command='npm run lottery:deploy:draft' --project=lottery
   ```

   ```
   nx generate @nrwl/workspace:run-commands --name=deploy-prod --command='npm run lottery:deploy:prod' --project=lottery
   ```

1. Angular lazy module under web:

   ```
   nx generate @schematics/angular:module --name=team --project=web --path=apps/web/src/app/modules --routing

   ```

1. Angular component for landing page:

   ```
   nx generate @schematics/angular:component --name=landing-slogen --project=web --style=scss --changeDetection=OnPush --inlineStyle --inlineTemplate --path=apps/web/src/app/view/landing --skipTests
   ```

1. Angular Core module:

   ```
   nx generate @nrwl/angular:library --name=core --directory=angular --standaloneConfig --strict
   ```

1. Generate Contentful lib:

   ```
   nx generate @nrwl/workspace:library --name=contentful --directory=shared --standaloneConfig --strict
   ```

# Netlify Settings

1. Configuration details found in `.env` with `NETLIFY_AUTH_TOKEN` created on the Netlify Team page

1. Creating manual site (without ci) with the netlify cli

   ```
   npx netlify sites:create --account-slug=dehub --name=dapps-dehub
   npx netlify sites:create --account-slug=dehub --name=dehub-react-lottery-draft
   ```

   Output sample:

   ```
   Site Created (Angular)

   Admin URL: https://app.netlify.com/sites/dapps-dehub
   URL:       https://dapps-dehub.netlify.app
   Site ID:   355647c5-6e43-4c94-92bc-eac397ab80a8

   Site Created (React)

   Admin URL: https://app.netlify.com/sites/dehub-react-lottery-draft
   URL:       https://dehub-react-lottery-draft.netlify.app
   Site ID:   bacc9132-2b4b-438d-9b93-a377c12181fb
   ```

# Nx Cloud benefits

- [Nx Cloud 8 mins pitch](https://www.youtube.com/watch?v=GT7XIwG1i5A&feature=emb_title)
- [Run Details monitoring](https://blog.nrwl.io/introducing-run-details-available-now-on-nx-cloud-d2da86361862)

# PrimeNG & Freya Theme

Custom purchased [Angular Freya template](https://primefaces.org/freya-ng/#/documentation).

- Grid system is [PrimeFlex 2.0.0!](https://www.primefaces.org/primeflex/setup) ([intro](https://www.youtube.com/watch?v=6DfUHUDt9mw)) ([migration](https://www.primefaces.org/primeflex/migration), [video](https://www.youtube.com/watch?v=2HGkuo1nOns))

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Extensible Build Framework**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@dehub/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
