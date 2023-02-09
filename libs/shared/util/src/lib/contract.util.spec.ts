import { ContractsEnv } from '@dehub/shared/config';
import { getAddress } from '@ethersproject/address';
import { getContractByCurrency } from './contract.util';

describe('Contract Util', () => {
  describe('getContractByCurrency', () => {
    const contracts: ContractsEnv = {
      dehub: '0xFC206f429d55c71cb7294EfF40c6ADb20dC21508',
      dehubBnb: '0xE876eE0945CE80Ef821633f2C18950b33Fb85633',
      wbnb: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      bnbBusd: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
      busd: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      multiCall: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
      staking: '0x592342c9203E9c5CB3697F2F1a2CFdDAd6e2E725',
    };

    it('should return proper contract for DeHub', () => {
      expect(getContractByCurrency('DeHub', contracts)).toBe(
        getAddress('0xFC206f429d55c71cb7294EfF40c6ADb20dC21508')
      );
    });

    it('should return proper contract for BNB', () => {
      expect(getContractByCurrency('BNB', contracts)).toBe(
        getAddress('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c')
      );
    });

    it('should return proper contract for BUSD', () => {
      expect(getContractByCurrency('BUSD', contracts)).toBe(
        getAddress('0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56')
      );
    });
  });
});
