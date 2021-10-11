import { isThemeSwitchKey } from './shared-utils';

describe('sharedUtils', () => {
  describe('isThemeSwitchKey ', () => {
    it('should trigger on Shift + IntlBackslash', () => {
      expect(
        isThemeSwitchKey({
          ctrlKey: false,
          code: 'IntlBackslash',
          shiftKey: true,
        } as KeyboardEvent)
      ).toBe(true);
    });

    it('should not trigger on Shift + T', () => {
      expect(
        isThemeSwitchKey({
          ctrlKey: false,
          code: 'KeyT',
          shiftKey: true,
        } as KeyboardEvent)
      ).toBe(false);
    });
  });
});
