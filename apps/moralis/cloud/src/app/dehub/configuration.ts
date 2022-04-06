import { decimalToHex } from '@dehub/shared/util/network/decimal-to-hex';
import { environment } from '../../environments/environment';
import { SupportedNetwork } from './types';

export const bnbRewardDappName = environment.dappName.bnbReward;
export const tokenDappName = environment.dappName.token;
export const stakingDappName = environment.dappName.staking;
export const ottDappName = environment.dappName.ott;
export const DeHubTokenDecimals = new Moralis.Cloud.BigNumber(100000);

export const defChainId = decimalToHex(
  environment.web3.chainId
) as SupportedNetwork;
