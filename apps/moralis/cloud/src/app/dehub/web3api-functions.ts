import { getDeHubTokenConfig, SupportedNetwork } from './configuration';

/**
 * Get ERC20 token balance of given wallet address,
 * Of course, we can get it from `BscTokenBalance`
 * @param {*} chainId network
 * @param {*} address user address
 * @param {*} tokenAddress ERC20 token address
 * @returns amount in big number if success
 */
export async function getTokenBalance(
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
    return new Moralis.Cloud.BigNumber(filtered[0].balance);
  } catch (err) {
    logger.error(`getTokenBalance error: ${JSON.stringify(err)}`);
    return null;
  }
}

export async function getDeHubTokenBalance(
  chainId: SupportedNetwork,
  address: string
): Promise<typeof Moralis.Cloud.BigNumber> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const config = await getDeHubTokenConfig(chainId);
    if (!config) return null;
    return getTokenBalance(chainId, address, config.address);
  } catch (err) {
    logger.error(`getDeHubTokenBalance error: ${JSON.stringify(err)}`);
    return null;
  }
}

/**
 * Get staked token amount of given wallet address.
 * @param {*} chainId network
 * @param {*} address user address
 */
export async function getStakedAmount(
  chainId: SupportedNetwork,
  address: string
) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const config = await getDeHubTokenConfig(chainId);
    if (!config) return null;
    const web3 = Moralis.web3ByChain(chainId);
    // create contract instance
    const contract = new web3.eth.Contract(config.abi, config.address);
    // get user info
    const userInfo = await contract.methods.userInfo(address).call();
    return new Moralis.Cloud.BigNumber(userInfo.amount);
  } catch (err) {
    logger.error(`getStakedAmount error: ${JSON.stringify(err)}`);
    return null;
  }
}
