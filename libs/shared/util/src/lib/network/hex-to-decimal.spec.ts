import { hexToDecimal } from './hex-to-decimal';

describe('hexToDecimal', () => {
  it('should convert BSC Mainnet hex chainId to decimal', () => {
    expect(hexToDecimal('0x38')).toBe(56);
  });
  it('should convert BSC Testnet hex chainId to decimal', () => {
    expect(hexToDecimal('0x61')).toBe(97);
  });
});
