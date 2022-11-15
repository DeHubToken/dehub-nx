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
   npx nx generate @nrwl/angular:application --name=web --style=scss --prefix=dhb --routing --standaloneConfig
   ```
1. Generate Angular app feature:
   ```
   npx nx generate @nrwl/angular:library --name=feature-home --directory=angular --importPath=@dehub/angular/feature-home --prefix=dhb --routing --standaloneConfig --tags='scope:angular, type:feature'
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
   npx nx generate @nrwl/react:application --name=staking --style=scss --standaloneConfig --strict
   ```

   upgrade to [webpack 5](https://nx.dev/l/r/guides/webpack-5#webpack-5-for-react-apps)

   ```
   npx nx g @nrwl/web:webpack5
   ```

1. Generate Shared Assets<br>
   **Freya** _Used to store Primefaces template assets_

   ```
   npx nx generate @nrwl/workspace:library --name=freya --directory=shared/asset --skipBabelrc --skipTsConfig --standaloneConfig --strict --unitTestRunner=none
   ```

   **DeHUB** _Used to store common assets like logo, etc._

   ```
   npx nx generate @nrwl/workspace:library --name=dehub --directory=shared/asset --skipBabelrc --skipTsConfig --standaloneConfig --strict --unitTestRunner=none
   ```

1. Generate Shared Models _used for types, states, custom models_

   ```
   npx nx generate @nrwl/workspace:library --name=models --directory=shared --standaloneConfig --strict

   ```

1. Generate Shared Utils _used for utilities, and common functions_

   ```
   npx nx generate @nrwl/workspace:library --name=utils --directory=shared --standaloneConfig --strict
   ```

1. Generate Config lib:

   ```
   npx nx generate @nrwl/workspace:library --name=config --directory=shared --standaloneConfig --strict
   ```

1. Generate Utils lib:

   ```
   npx nx generate @nrwl/workspace:library --name=utils --directory=shared --standaloneConfig --strict
   ```

1. Generate React lib:

   ```
   npx nx generate @nrwl/react:lib --name=ui --directory=react --standaloneConfig --strict

   npx nx generate @nrwl/react:lib --name=core --directory=react --standaloneConfig --strict
   ```

1. Generate Moralis Cloud lib:

   ```
   npx nx generate @nrwl/js:library --name=cloud --directory=moralis --importPath=@dehub/moralis/cloud --publishable --tags='scope:shared, type:util'
   ```

1. Run Commands generation

   ```
   npx nx generate @nrwl/workspace:run-commands --name=deploy-prod-draft --command='npm run web:deploy:prod-draft' --project=web
   ```

   ```
   npx nx generate @nrwl/workspace:run-commands --name=deploy-prod --command='npm run web:deploy:prod' --project=web
   ```

   ```
   npx nx generate @nrwl/workspace:run-commands --name=deploy-prod-draft --command='npm run staking:deploy:prod-draft' --project=staking
   ```

   ```
   npx nx generate @nrwl/workspace:run-commands --name=deploy-prod --command='npm run staking:deploy:prod' --project=staking
   ```

1. Generate Angular lazy module under web:

   ```
   npx nx generate @schematics/angular:module --name=team --project=web --path=apps/web/src/app/modules --routing

   ```

1. Generate Angular component for landing page:

   ```
   npx nx generate @schematics/angular:component --name=landing-slogen --project=web --style=scss --changeDetection=OnPush --inlineStyle --inlineTemplate --path=apps/web/src/app/view/landing --skipTests
   ```

1. Generate Angular Core lib:

   ```
   npx nx generate @nrwl/angular:library --name=core --directory=angular --standaloneConfig --strict
   ```

1. Generate Angular Moralis lib:

   ```
   npx nx generate @nrwl/angular:library --name=moralis --directory=angular --standaloneConfig
   ```

1. Generate Angular Model lib:

   ```
   npx nx generate @nrwl/angular:library --name=model --directory=angular --importPath=@dehub/angular/model --prefix=dhb --simpleModuleName --skipModule --standaloneConfig --tags='scope:angular, type:model'
   ```

# Monorepo Tagging

We define the following **scopes** and **types** for each `project.json` under the `"tags": [...]` section.

Let's follow Nx recommendations: [guideline 1](https://nx.dev/structure/monorepo-tags) , [guideline 2](https://blog.nrwl.io/mastering-the-project-boundaries-in-nx-f095852f5bf4)

## Scopes

1. `scope:angular` - angular project
1. `scope:react` - react project
1. `scope:shared` - frameworks independent project

## Types

1. `type:app` - application
1. `type:feature` - feature lib
1. `type:ui` - dumb/stateless ui lib
1. `type:util` - utility lib
1. `type:model` - model/type lib _(pure interfaces or classes)_
1. `type:config` - environments/constants lib
1. `type:asset` - asset lib _(styles, themes, fonts, images)_

# Nx Cloud benefits

- [Nx Cloud 8 mins pitch](https://www.youtube.com/watch?v=GT7XIwG1i5A&feature=emb_title)
- [Run Details monitoring](https://blog.nrwl.io/introducing-run-details-available-now-on-nx-cloud-d2da86361862)

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
