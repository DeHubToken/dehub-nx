import { formatSIPostfix } from './number.util';
describe('Number Util', () => {
  describe('formatSIPostfix', () => {
    it('should format 999 as 999', () => {
      expect(formatSIPostfix(999)).toBe('999');
    });

    it('should format 1,000 as 1 K', () => {
      expect(formatSIPostfix(1_000)).toBe('1 K');
    });

    it('should format 3,500,000 as 3.5 M', () => {
      expect(formatSIPostfix(3_500_000)).toBe('3.5 M');
    });
    it('should format 200.500.000 as 200.5 M', () => {
      expect(formatSIPostfix(200_500_000)).toBe('200.5 M');
    });

    it('should format 300.500.000.000 as 300.5 B', () => {
      expect(formatSIPostfix(300_500_000_000)).toBe('300.5 B');
    });

    it('should format 5.000.000.000.000 as 5 T', () => {
      expect(formatSIPostfix(5_000_000_000_000)).toBe('5 T');
    });
  });
});
