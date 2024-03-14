import ERC20Abi from '@dehub/shared/asset/dehub/abis/erc20.json';
import { Signer } from '@ethersproject/abstract-signer';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { Provider, Web3Provider } from '@ethersproject/providers';
import MulticallAbi from '../config/abis/Multicall.json';
import UniswapV2Router02 from '../config/abis/UniswapV2Router02.json';
import { getMultiCallAddress, getRouterAddress } from './addresses';
import { simpleRpcProvider } from './providers';

/** TODO: use or move to shared/util/contract.utils.ts  */
export const getContract = (
  address: string,
  abi: ContractInterface,
  signer?: Signer | Provider
) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new Contract(address, abi, signerOrProvider);
};

export const getMultiCallContract = (signer?: Signer | Provider) => {
  return getContract(getMultiCallAddress(), MulticallAbi, signer);
};

export const getERC20Contract = (
  address: string,
  signer?: Signer | Provider
) => {
  return getContract(address, ERC20Abi, signer);
};

export const getRouterContract = (library: Web3Provider, account: string) => {
  return getContract(
    getRouterAddress(),
    UniswapV2Router02,
    library.getSigner(account).connectUnchecked()
  );
};
