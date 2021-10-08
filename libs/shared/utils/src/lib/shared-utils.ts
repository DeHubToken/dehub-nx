/**
 * Theme Switch key checker
 *
 * @param param0 keyboard event
 * @returns true if theme switch key combo was pressed
 */
export const isThemeSwitchKey = ({ ctrlKey, code, shiftKey }: KeyboardEvent) =>
  ctrlKey && shiftKey && code === 'KeyT';
