import { decimalToHex } from '@dehub/shared/util/network/decimal-to-hex';
import { ChainIdAsNumber } from '../shared/types';
import { getStakingContracts } from './dapp.util';

/**
 * Get staked token amount of given wallet address.
 * @param {*} targetChainId network
 * @param {*} address user address
 */
export async function getStakedAmount(
  targetChainId: ChainIdAsNumber,
  address: string
): Promise<typeof Moralis.Cloud.BigNumber | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const decTargetChainId = targetChainId;

    const web3 = Moralis.web3ByChain(decimalToHex(targetChainId));
    let amount = new Moralis.Cloud.BigNumber(0);

    const stakingContracts = (await getStakingContracts()) ?? [];

    for (let i = 0; i < stakingContracts.length; i++) {
      if (stakingContracts[i].chainId !== decTargetChainId) {
        continue;
      }

      // create contract instance
      const contract = new web3.eth.Contract(
        stakingContracts[i].abi,
        stakingContracts[i].address
      );

      // get user info
      const userInfo = await contract.methods.userInfo(address).call();
      amount = amount.plus(new Moralis.Cloud.BigNumber(userInfo.amount));
    }

    return amount;
  } catch (err) {
    logger.error(`getStakedAmount error: ${JSON.stringify(err)}`);
    return null;
  }
}
