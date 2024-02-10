import Bep20Abi from '@dehub/shared/asset/dehub/abis/erc20.json';
import { getRandomRpcUrlByChainId } from '@dehub/shared/utils';
import { Signer } from '@ethersproject/abstract-signer';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { JsonRpcProvider, Provider } from '@ethersproject/providers';
import DeHubStakingAbi from '../config/abis/DeHubStaking.json';
import MulticallAbi from '../config/abis/Multicall.json';
import { CHAIN, CHAIN_INFO } from '../constants/chains';
import { getMultiCallAddress, getStakingAddress } from './addressHelpers';
import { simpleRpcProvider } from './providers';

/** TODO: use or move to shared/util/contract.utils.ts  */
export const getContract = (
  address: string,
  abi: ContractInterface,
  signer?: Signer | Provider | null,
  chainId?: number
) => {
  const rpcProvider = new JsonRpcProvider(
    getRandomRpcUrlByChainId(chainId ?? CHAIN.BSC)
  );
  const signerOrProvider = signer ?? rpcProvider;
  return new Contract(address, abi, signerOrProvider);
};

export const getMultiCallContract = (signer?: Signer | Provider) => {
  return getContract(getMultiCallAddress(), MulticallAbi, signer);
};

export const getDehubTokenContract = (
  chainId: number,
  signer?: Signer | Provider | null
) => {
  const tokenAddress = CHAIN_INFO[chainId].dehubToken;
  const abi = CHAIN_INFO[chainId].dehubTokenABI;
  return getContract(tokenAddress, abi, signer, chainId);
};

export const getBridgeContract = (
  chainId: number,
  signer?: Signer | Provider
) => {
  const tokenAddress = CHAIN_INFO[chainId].bridgeContract;
  const abi = CHAIN_INFO[chainId].bridgeABI;
  return getContract(tokenAddress, abi, signer, chainId);
};

export const getBep20Contract = (
  address: string,
  signer?: Signer | Provider
) => {
  return getContract(address, Bep20Abi, signer);
};

export const getVersion = async (contract: Contract) => {
  try {
    return await contract['version']();
  } catch (error) {
    return 1;
  }
};

export const getStakingContract = (signer?: Signer | Provider) => {
  return getContract(
    getStakingAddress(),
    DeHubStakingAbi,
    signer ?? simpleRpcProvider
  );
};
