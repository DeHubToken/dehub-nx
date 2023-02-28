import { shortenAddress } from './address.util';

describe('Address Util', () => {
  const address = '0xFf049d637Fe158B3202b0209FEd11f871C1aEbAC';
  it('shortenAddress should throw error in case of invalid address', () => {
    try {
      shortenAddress('0xFf049d6C1aEbAC');
    } catch (e) {
      expect(e instanceof Error).toBeTruthy();
    }
  });

  it('shortenAddress should shorten address using 4 characters', () => {
    expect(shortenAddress(address)).toBe('0xFf04...EbAC');
  });

  it('shortenAddress should shorten address using 6 characters', () => {
    expect(shortenAddress(address, 6)).toBe('0xFf049d...1aEbAC');
  });
});
