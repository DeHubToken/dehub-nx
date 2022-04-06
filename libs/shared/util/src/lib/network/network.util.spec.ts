import { getRandomRpcUrl } from './network.util';

describe('Network Util', () => {
  describe('getRandomRpcUrl', () => {
    it('should pick random node', () => {
      const nodes = ['node1', 'node2', 'node3'];
      const randomNode = getRandomRpcUrl(nodes);

      expect(nodes.includes(randomNode)).toBe(true);
    });
  });
});
