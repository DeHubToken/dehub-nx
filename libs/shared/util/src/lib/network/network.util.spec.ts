import { networks } from '@dehub/shared/model';
import { getRandomRpcUrlByChainId } from './network.util';

describe('Network Util', () => {
  describe('getRandomRpcUrlByChainId', () => {
    it('should return random rpc for Chain Id 56', () => {
      const randomNode = getRandomRpcUrlByChainId(56);

      expect(networks[56].nodes.includes(randomNode)).toBe(true);
    });

    it('should return random rpc for Chain Id 97', () => {
      const randomNode = getRandomRpcUrlByChainId(97);

      expect(networks[97].nodes.includes(randomNode)).toBe(true);
    });
  });
});
