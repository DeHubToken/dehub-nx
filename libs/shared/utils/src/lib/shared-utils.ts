/**
 * Theme Switch key checker
 *
 * @param param0 keyboard event
 * @returns true if theme switch key combo was pressed
 */
export const isThemeSwitchKey = ({ code, shiftKey }: KeyboardEvent) =>
  shiftKey && code === 'IntlBackslash';
