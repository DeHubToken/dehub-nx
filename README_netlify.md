# Netlify Settings

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

   **Prod Buy (React)**

   ```
   npx netlify sites:create --account-slug=dehub --name=buy-dehub
   ```

   Output:

   ```
   Admin URL: https://app.netlify.com/sites/buy-dehub
   URL:       https://buy-dehub.netlify.app
   Site ID:   11bd4ce0-3bf2-4642-8879-f541c6fed3fe
   ```

   **Preview Buy (React)**

   ```
   npx netlify sites:create --account-slug=dehub --name=buy-dehub-preview
   ```

   Output:

   ```
   Admin URL: https://app.netlify.com/sites/buy-dehub-preview
   URL:       https://buy-dehub-preview.netlify.app
   Site ID:   aadde395-d33b-4cba-8a96-c6952ae48876
   ```

   **Raffle (React) - inactive**

   ```
   npx netlify sites:create --account-slug=dehub --name=inactive-raffle-dehub
   ```

   ```
   Admin URL: https://app.netlify.com/sites/inactive-raffle-dehub
   URL:       https://inactive-raffle-dehub.netlify.app
   Site ID:   d1b6b0af-8fcd-4efa-a0ec-818a84cd9283
   ```

   **Prediction (React) - inactive**

   ```
   npx netlify sites:create --account-slug=dehub --name=inactive-prediction-dehub
   ```

   Output:

   ```
   Admin URL: https://app.netlify.com/sites/inactive-prediction-dehub
   URL:       https://inactive-prediction-dehub.netlify.app
   Site ID:   0343b7e0-60d7-4a95-b04f-6c1431544937
   ```
