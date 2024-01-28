import { decimalToHex } from './decimal-to-hex';

describe('decimalToHex', () => {
  it('should convert BSC Mainnet chainId to hex', () => {
    expect(decimalToHex(56)).toBe('0x38');
  });
  it('should convert BSC Testnet chainId to hex', () => {
    expect(decimalToHex(97)).toBe('0x61');
  });
});
