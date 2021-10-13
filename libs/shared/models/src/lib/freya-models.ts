/**
 * Light vs. Dark themes from Freya
 */
export type ThemeMode = 'dark' | 'light';

/**
 * Default theme for any app and the alternative to explore
 *
 * Alternative is used just for dev experience
 */
export type Themes = '' | '-alternative';

export interface MenuItem {
  label: string;
  icon?: string;
  routerLink?: string[];
  class?: string;
  badgeClass?: string;
  url?: string | string[];
  target?: '_blank' | '_parent' | '_top' | '_self';
  items?: MenuItem[];
  visible?: boolean;
  disabled?: boolean;
  command?: (event: unknown) => void;
}
