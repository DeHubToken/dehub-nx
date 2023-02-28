# DeHub Monorepo

[![DeHUB Nx](https://github.com/DeHubToken/dehub-nx/actions/workflows/dehub-nx.yml/badge.svg)](https://github.com/DeHubToken/dehub-nx/actions/workflows/dehub-nx.yml)

This is the **monorepo of DeHub**.

_Created based on the awesome [Nx.dev](https://nx.dev) workspace by [Nrwl](https://nrwl.io/) Team utilizing Nx Cloud_

# Dev setup

We recommend [VSCode](https://code.visualstudio.com/) as an editor. _(monorepo includes common settings and plugins for consistent DX)_

## Abbreviations

`<APP>`: specific app, e.g. be `web`, `staking` etc.

## Steps

1. **Checkout** the project: `https://github.com/DeHubToken/dehub-nx`
1. Open **VSCode** _(pre-configured editor settings involved)_
1. Be sure to use `node >= 16.13.0`
1. Install `pnpm` via npm: `npm install -g pnpm`
1. Add `~/.huskyrc` with content [here](https://typicode.github.io/husky/#/?id=command-not-found)
1. **Install** dependencies: `pnpm i`
1. While installing:
   Add the following line to `/etc/hosts` _(`c:/windows/system32/drivers/hosts`)_:
   ```
   127.0.0.1 dev.localhost
   ```
1. Run **Dev mode**: `pnpm <APP>:start`
1. Run **Prod mode**: `pnpm <APP>:demo` _(serve prod version locally)_
1. Run **CI**: `pnpm ci` _(lint, test, build from affected apps)_
1. Deploy as **prod-draft**: `pnpm deploy:prod-draft`
1. Deploy to **prod**: `pnpm deploy:prod`
1. We follow [commitlint](https://github.com/merkle-open/frontend-defaults/blob/master/repo/commitlint-conventional-changelog/index.js) guide, so please use these scopes:

   `'build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'`

# Dev flow

1. **Pick an issue/feature/tech debt** among [github issues](https://github.com/DeHubToken/dehub-nx/issues)
1. **Create a new branch** from `main` in the following pattern: `{ISSUE_ID}-{NAME}` e.g. `attila-365`
1. **Implement the task** as you like with commits _(check `pnpm ci` frequently)_
1. Before Pull Request (PR) ensure that `pnpm ci` run without any issue _(otherwise CI will fail)_
1. **Create a PR** / Pull request draft to request a review
1. **In PR include a summary** of your changes, but at least reference the github issue e.g. #356 so after merge the issue will be auto-closed
1. Ensure **[Github Actions](https://github.com/DeHubToken/dehub-nx/actions) remains green**
1. **Wait for an approval or collaborate** on review comments
1. Finally **after approval merge the PR with Squash** _(clean commit history)_

# More Details

1. [Nx structure](README_nx.md) _([see more](https://nx.dev))_
1. [Nx generate](README_nx_gen.md)
1. [Storage](README_storage.md)
1. [Hosting](README_hosting.md)
1. [Theme](README_theme.md)
1. [PWA](README_pwa.md) _([see more](https://web.dev/progressive-web-apps/))_
