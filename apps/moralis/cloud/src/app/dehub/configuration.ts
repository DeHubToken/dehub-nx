/** @deprecated please use from env */
export enum SupportedNetwork {
  BSC_MAINNET = '0x38',
  BSC_TESTNET = '0x61',
}

export const stakingDappName = 'DeHubStakingDapp';

/** @deprecated please use from env */
export const ConfigFields = {
  [SupportedNetwork.BSC_MAINNET]: {
    StakingAbi: 'DEHUB_STAKING_ABI_MAINNET',
    StakingAddress: 'DEHUB_STAKING_MAINNET',
    TokenAbi: 'DEHUB_TOKEN_ABI_MAINNET',
    TokenAddress: 'DEHUB_TOKEN_MAINNET',
  },
  [SupportedNetwork.BSC_TESTNET]: {
    StakingAbi: 'DEHUB_STAKING_ABI_TESTNET',
    StakingAddress: 'DEHUB_STAKING_TESTNET',
    TokenAbi: 'DEHUB_TOKEN_ABI_TESTNET',
    TokenAddress: 'DEHUB_TOKEN_TESTNET',
  },
  OTTMinTokens: 'OTT_MIN_TOKENS_TO_PLAY',
};

export const DeHubTokenDecimals = new Moralis.Cloud.BigNumber(100000);

/** @deprecated please use from env */
export const chainId = SupportedNetwork.BSC_MAINNET;

export async function getOTTMinTokensToPlay() {
  const logger = Moralis.Cloud.getLogger();
  try {
    const config = await Moralis.Config.get({ useMasterKey: true });
    return new Moralis.Cloud.BigNumber(
      config.get(ConfigFields.OTTMinTokens)
    ).times(DeHubTokenDecimals);
  } catch (err) {
    logger.error(`getOTTMinTokensToPlay error: ${JSON.stringify(err)}`);
  }
  return null;
}

export async function getDeHubTokenConfig(chainId: SupportedNetwork): Promise<{
  address: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abi: any;
} | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const config = await Moralis.Config.get({ useMasterKey: true });
    return {
      address: config.get(ConfigFields[chainId].TokenAddress),
      abi: config.get(ConfigFields[chainId].TokenAbi),
    };
  } catch (err) {
    logger.error(`getDeHubTokenConfig error: ${JSON.stringify(err)}`);
  }
  return null;
}

export async function getDeHubStakingConfig(
  chainId: SupportedNetwork
): Promise<{
  address: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abi: any;
} | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const config = await Moralis.Config.get({ useMasterKey: true });
    return {
      address: config.get(ConfigFields[chainId].StakingAddress),
      abi: config.get(ConfigFields[chainId].StakingAbi),
    };
  } catch (err) {
    logger.error(`getDeHubStakingConfig error: ${JSON.stringify(err)}`);
  }
  return null;
}
