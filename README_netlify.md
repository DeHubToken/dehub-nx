# Netlify Settings

1. Configuration details found in `.env` with `NETLIFY_AUTH_TOKEN` created on the Netlify Team page

1. Creating manual site (without ci) with the netlify cli

   **Dapps Dehub (Angular)**

   ```
   npx netlify sites:create --account-slug=dehub --name=dapps-dehub
   ```

   Output:

   ```
   Admin URL: https://app.netlify.com/sites/dapps-dehub
   URL:       https://dapps-dehub.netlify.app
   Site ID:   355647c5-6e43-4c94-92bc-eac397ab80a8
   ```

   **Staking (React)**

   ```
   npx netlify sites:create --account-slug=dehub --name=staking-dehub
   ```

   Output:

   ```
   Admin URL: https://app.netlify.com/sites/staking-dehub
   URL:       https://staking-dehub.netlify.app
   Site ID:   09877a39-cdbf-4a0e-a63c-dcee6e4f3fb3
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
