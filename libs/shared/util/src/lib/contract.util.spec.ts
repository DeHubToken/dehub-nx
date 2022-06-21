import { ContractsEnv } from '@dehub/shared/config';
import { getContractByCurrency } from './contract.util';

describe('Contract Util', () => {
  describe('getContractByCurrency', () => {
    const contracts: ContractsEnv = {
      dehub: 'dehubAddress',
      dehubBnb: 'dehubBnbAddress',
      wbnb: 'wbnbAddress',
      bnbBusd: 'bnbBusdAddress',
      busd: 'busdAddress',
      multiCall: 'multiCallAddress',
    };

    it('should return proper contract for DeHub', () => {
      expect(getContractByCurrency('DeHub', contracts)).toBe('dehubAddress');
    });

    it('should return proper contract for BNB', () => {
      expect(getContractByCurrency('BNB', contracts)).toBe('wbnbAddress');
    });

    it('should return proper contract for BUSD', () => {
      expect(getContractByCurrency('BUSD', contracts)).toBe('busdAddress');
    });
  });
});
