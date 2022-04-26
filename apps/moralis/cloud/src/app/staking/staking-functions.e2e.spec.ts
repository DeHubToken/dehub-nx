require('../shared/mock.include');
import { Moralis } from 'moralis';
import { environment } from '../../environments/environment';
import { StakingFunctions } from './staking.model';

const { moralis, web3 } = environment;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidContract = (contract: any) => {
  // should contains address, name, chainId, abi
  expect(!contract.address).toBeFalsy();
  expect(!contract.name).toBeFalsy();
  expect(!contract.chainId).toBeFalsy();
  expect(!contract.abi).toBeFalsy();

  // check type of members
  expect(typeof contract.address).toEqual('string');
  expect(typeof contract.name).toEqual('string');
  expect(typeof contract.chainId).toEqual('number');
  expect(typeof contract.abi).toEqual('object');

  // check validation
  expect(contract.address.length > 0).toBeTruthy();
  expect(contract.name.length > 0).toBeTruthy();
  expect(contract.chainId).toEqual(web3.chainId);
  expect(contract.abi.length > 0).toBeTruthy();
};

describe('E2E Staking functions', () => {
  beforeAll(async () => await Moralis.start(moralis));

  it('Should return staking controller contract', async () => {
    const contract = await Moralis.Cloud.run(
      StakingFunctions.GetStakingControllerContract,
      {}
    );
    expect(!contract).toBeFalsy();

    isValidContract(contract);
  });

  it('Should return reward contract', async () => {
    const contract = await Moralis.Cloud.run(
      StakingFunctions.GetRewardContract
    );
    expect(!contract).toBeFalsy();

    isValidContract(contract);
  });

  it('Should return active staking contract', async () => {
    const contract = await Moralis.Cloud.run(
      StakingFunctions.GetActiveStakingContract
    );
    if (!contract) return;

    isValidContract(contract);

    const now = new Date();
    const quarter = Math.floor((now.getUTCMonth() + 1) / 4) + 1;
    expect(contract.year).toEqual(now.getUTCFullYear());
    expect(contract.quarter).toEqual(quarter);
  });

  it('Should return staking contract', async () => {
    const contracts = await Moralis.Cloud.run(
      StakingFunctions.GetStakingContracts
    );
    expect(contracts && contracts.length > 0).toBeTruthy();

    contracts.forEach(contract => isValidContract(contract));
  });
});
