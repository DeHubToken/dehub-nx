import { defaultSharedProdEnv } from '@dehub/shared/model';
import { getAddress } from '@ethersproject/address';
import { getContractByCurrency } from './contract.util';
describe('Contract Util', () => {
  describe('getContractByCurrency', () => {
    const contracts = defaultSharedProdEnv.web3.addresses.contracts;

    it('should return proper contract for DeHub', () => {
      expect(getContractByCurrency('DeHub', contracts)).toBe(
        getAddress('0x680D3113caf77B61b510f332D5Ef4cf5b41A761D')
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
