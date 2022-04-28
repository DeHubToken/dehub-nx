# Moralis Cloud

# Dev notes

1. If a `shared-util` needed in `moralis-cloud` then refactor first to a one function + one file style (example `decimalToHex`)
1. Remove the util from `shared-util/**/index.ts` and import directly from the new file across the monorepo

# External functions

External functions are defined in `app/dehub/*-functions.ts` files which are defined by `Moralis.Cloud.define` functions.

These functions can be callable outside by the following link format:

```
[Server URL]/functions/[Function name]?_AplicationId=[Application Id]&[param1]=[value1]&...
```

## Call Cloud functions in the frontend

https://docs.moralis.io/moralis-dapp/cloud-code/cloud-functions

```js
const contracts = await Moralis.Cloud.run('getStakingContracts');
```

### totalCirculatingSupply

Returns the total circulating supply of $DeHub token.

```js
const supply = await Moralis.Cloud.run('totalCirculatingSupply');
console.log('total circulating supply', supply.toString());
```

### getStakingContracts

Returns all the staking contract informations registered even if they're on the BSC or BSC testnet.

```typescript
interface StakingContractProperties {
  year: number;
  month: number;
  address: string;
  name: string;
  abi: Array;
  chainId: number;
}
```

```typescript
const contractInfos: StakingContractProperties[] = await Moralis.Cloud.run(
  'getStakingContracts',
  {}
);
for (const contractInfo of contractInfos) {
  console.log('year', contractInfo.year, 'quarter', contractInfo.quarter);
  const contract = new ethers.Contract(
    contractInfo.address,
    contractInfo.abi,
    provider
  );
  console.log('user info', await contract.userInfo(account));
}
```

### getActiveStakingContract

Return the contract informations of which quarter is active.

Returning type is same with `StakingContractProperties`

### getStakingControllerContract

Return the controller contract information which has the list of staking contract per every quarter.

```typescript
interface ContractProperties {
  address: string;
  name: string;
  abi: Array;
  chainId: number;
}
```

### getRewardContract

Return the reward contract information, returning type is same with `ContractProperties`.

### authAllrites

In order to use OTT API from Vdyo, it requires to get access token prior to calling API. Return type is like as following:

Reference Link: https://api.vdyo.co/docs/#header-authentication

```typescript
interface AuthAllritesReturns {
  accessToken: string;
  tokenType: string;
  expires: number;
}
```

```typescript
const authKey = await Moralis.Cloud.run('authAllrites', {});
console.log('authKey', authKey);

fetch('https://api.vdyo.co/contents', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${authKey.tokenType} ${authKey.accessToken}`,
  },
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
