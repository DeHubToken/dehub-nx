import {
  getDeHubTokenContract,
  getStakingContracts,
} from './dapp-configurations';
import { SupportedNetwork } from './types';

/**
 * Get ERC20 token balance of given wallet address,
 * Of course, we can get it from `BscTokenBalance`
 * @param {*} chainId network
 * @param {*} address user address
 * @param {*} tokenAddress ERC20 token address
 * @returns amount in big number if success
 */
async function getTokenBalance(
  chainId: SupportedNetwork,
  address: string,
  tokenAddress: string
) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const accountTokens = await Moralis.Web3API.account.getTokenBalances({
      chain: chainId,
      address,
    });
    const filtered = accountTokens.filter(
      balance => balance.token_address === tokenAddress.toLowerCase()
    );
    return filtered.length > 0
      ? new Moralis.Cloud.BigNumber(filtered[0].balance)
      : new Moralis.Cloud.BigNumber(0);
  } catch (err) {
    logger.error(`getTokenBalance error: ${JSON.stringify(err)}`);
    return null;
  }
}

/** @deprecated not used */
export async function getDeHubTokenBalance(
  chainId: SupportedNetwork,
  address: string
): Promise<typeof Moralis.Cloud.BigNumber> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const contract = await getDeHubTokenContract(chainId);
    return getTokenBalance(chainId, address, contract.address);
  } catch (err) {
    logger.error(`getDeHubTokenBalance error: ${JSON.stringify(err)}`);
    return null;
  }
}

/**
 * Get staked token amount of given wallet address.
 * @param {*} targetChainId network
 * @param {*} address user address
 */
export async function getStakedAmount(
  targetChainId: SupportedNetwork,
  address: string
) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const decTargetChainId = parseInt(targetChainId, 16);

    const web3 = Moralis.web3ByChain(targetChainId);
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
