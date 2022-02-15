import { decimalToHex, getRandomRpcUrl, hexToDecimal } from './network.util';

describe('Network Util', () => {
  describe('decimalToHex', () => {
    it('should convert BSC Mainnet chainId to hex', () => {
      expect(decimalToHex(56)).toBe('0x38');
    });
    it('should convert BSC Testnet chainId to hex', () => {
      expect(decimalToHex(97)).toBe('0x61');
    });
  });

  describe('hexToDecimal', () => {
    it('should convert BSC Mainnet hex chainId to decimal', () => {
      expect(hexToDecimal('0x38')).toBe(56);
    });
    it('should convert BSC Testnet hex chainId to decimal', () => {
      expect(hexToDecimal('0x61')).toBe(97);
    });
  });

  describe('getRandomRpcUrl', () => {
    it('should pick random node', () => {
      const nodes = ['node1', 'node2', 'node3'];
      const randomNode = getRandomRpcUrl(nodes);

      expect(nodes.includes(randomNode)).toBe(true);
    });
  });
});
