import Moralis from 'moralis';

console.log(Cypress.env());

const moralis = Cypress.env('moralis');
console.log('moralis', moralis);
const web3 = Cypress.env('web3');
console.log('web3', web3);

describe('moralis-cloud', () => {
  before(async () => {
    await Moralis.start(moralis);
  });

  it('Should return circulating supply', async () => {
    const supply = await Moralis.Cloud.run('totalCirculatingSupply', {});
    expect(Number(supply)).to.be.greaterThan(0);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isValidContract = (contract: any) => {
    // should contains address, name, chainId, abi
    expect(!contract.address).to.be.false;
    expect(!contract.name).to.be.false;
    expect(!contract.chainId).to.be.false;
    expect(!contract.abi).to.be.false;

    // check type of members
    expect(typeof contract.address).to.be.equal('string');
    expect(typeof contract.name).to.be.equal('string');
    expect(typeof contract.chainId).to.be.equal('number');
    expect(typeof contract.abi).to.be.equal('object');

    // check validation
    expect(contract.address.length > 0).to.be.true;
    expect(contract.name.length > 0).to.be.true;
    expect(contract.chainId).to.be.equal(web3.chainId);
    expect(contract.abi.length > 0).to.be.true;
  };

  it('Should return staking controller contract', async () => {
    const contract = await Moralis.Cloud.run(
      'getStakingControllerContract',
      {}
    );
    expect(!contract).to.be.false;

    isValidContract(contract);
  });

  it('Should return reward contract', async () => {
    const contract = await Moralis.Cloud.run('getRewardContract', {});
    expect(!contract).to.be.false;

    isValidContract(contract);
  });

  it('Should return active staking contract', async () => {
    const contract = await Moralis.Cloud.run('getActiveStakingContract', {});
    if (!contract) return;

    isValidContract(contract);

    const now = new Date();
    const quarter = Math.floor((now.getUTCMonth() + 1) / 4) + 1;
    expect(contract.year).to.be.equal(now.getUTCFullYear());
    expect(contract.quarter).to.be.equal(quarter);
  });

  it('Should return staking contract', async () => {
    const contracts = await Moralis.Cloud.run('getStakingContracts', {});
    expect(contracts && contracts.length > 0).to.be.true;

    contracts.forEach(contract => isValidContract(contract));
  });
});
