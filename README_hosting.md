# Hosting

We use Netlify for hosting and creating sites from the CLI as we use Nx `run-commands` to auto-deploy on Netlify.

1. Configuration details found in `.env` with `NETLIFY_AUTH_TOKEN` created on the Netlify Team page

1. Creating manual site (without ci) with the netlify cli

   **Prod Web (Angular)**

   ```
   npx netlify sites:create --account-slug=dehub --name=web-dehub
   ```

   Output:

   ```
   Admin URL: https://app.netlify.com/sites/web-dehub
   URL:       https://web-dehub.netlify.app
   Site ID:   a5e07eeb-b383-41df-9bc1-c9dcb4fd93b6
   ```

   **Preview Web (Angular)**

   ```
   npx netlify sites:create --account-slug=dehub --name=web-dehub-preview
   ```

   Output:

   ```
   Admin URL: https://app.netlify.com/sites/web-dehub-preview
   URL:       https://web-dehub-preview.netlify.app
   Site ID:   cd6cae81-a327-47d3-8d95-3efefc0f46e2
   ```

   **Prod Staking (React)**

   ```
   npx netlify sites:create --account-slug=dehub --name=staking-dehub
   ```

   Output:

   ```
   Admin URL: https://app.netlify.com/sites/staking-dehub
   URL:       https://staking-dehub.netlify.app
   Site ID:   09877a39-cdbf-4a0e-a63c-dcee6e4f3fb3
   ```

   **Preview Staking (React)**

   ```
   npx netlify sites:create --account-slug=dehub --name=staking-dehub-preview
   ```

   Output:

   ```
   Admin URL: https://app.netlify.com/sites/staking-dehub-preview
   URL:       https://staking-dehub-preview.netlify.app
   Site ID:   6861568a-86ef-4c9f-9673-b2dc8b9df18f
   ```

   **Prod Staking (Bridge)**

   ```
   npx netlify sites:create --account-slug=dehub --name=bridge-dehub
   ```

   Output:

   ```
   Admin URL: https://app.netlify.com/sites/bridge-dehub
   URL:       https://bridge-dehub.netlify.app
   Site ID:   09877a39-cdbf-4a0e-a63c-dcee6e4f3fb3
   ```

   **Preview Staking (Bridge)**

   ```
   npx netlify sites:create --account-slug=dehub --name=bridge-dehub-preview
   ```

   Output:

   ```
   Admin URL: https://app.netlify.com/sites/bridge-dehub-preview
   URL:       https://bridge-dehub-preview.netlify.app
   Site ID:   6861568a-86ef-4c9f-9673-b2dc8b9df18f
   ```
