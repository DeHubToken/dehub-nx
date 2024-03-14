import { useMemo } from 'react';
import { environment } from '../../environments/environment';
import DefaultTokenList from '../config/constants/default.tokenlist.json';
import DefaultTokenProdList from '../config/constants/default.tokenlist.prod.json';
import { ETHERToken, Token } from '../config/types';

const { web3 } = environment;
export const useTokenList = () => {
  return useMemo(() => {
    const chainId = web3.chainId;
    const list = DefaultTokenList.tokens.map(token => ({
      decimals: token.decimals,
      symbol: token.symbol,
      name: token.name,
      chainId: token.chainId,
      address: token.address,
      logoUri: token.logoURI,
    }));
    list.push(
      ...DefaultTokenProdList.tokens.map(token => ({
        decimals: token.decimals,
        symbol: token.symbol,
        name: token.name,
        chainId: token.chainId,
        address: token.address,
        logoUri: token.logoURI,
      }))
    );
    return list.filter(token => token.chainId === chainId);
  }, []);
};

export const useToken = (tokenAddress?: string): Token | undefined | null => {
  const list = useTokenList();

  return useMemo(() => {
    if (!tokenAddress) return null;
    if (tokenAddress === 'BNB') return ETHERToken;

    const tokens = list.filter(token => token.address === tokenAddress);
    return tokens.length > 0 ? tokens[0] : undefined;
  }, [list, tokenAddress]);
};
