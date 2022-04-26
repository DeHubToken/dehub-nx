require('../shared/mock.include');
import { Moralis } from 'moralis';
import { environment } from '../../environments/environment';
import { isValidContract } from './staking-functions.spec';
import { StakingFunctions } from './staking.model';

const { moralis } = environment;

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
