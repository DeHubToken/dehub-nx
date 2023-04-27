import { NavigationTabMenu } from '@dehub/shared/model';
import { startCase } from 'lodash';

export const getTabMenuItems = (
  landing: string
): { label: string; icon: string; url: string; routerLink: string[] }[] =>
  [
    {
      label: NavigationTabMenu.Home,
      icon: 'fad fa-home',
    },
    {
      label: NavigationTabMenu.News,
      icon: 'fad fa-newspaper',
    },
    {
      label: NavigationTabMenu.Stream,
      icon: 'fad fa-tv',
    },
    {
      label: NavigationTabMenu.Game,
      icon: 'fad fa-gamepad-alt',
    },
    {
      label: NavigationTabMenu.Shop,
      icon: 'fad fa-shopping-bag',
    },
    {
      label: NavigationTabMenu.Learn,
      icon: 'fad fa-lightbulb-on',
    },
    {
      label: NavigationTabMenu.Clubs,
      icon: 'fad fa-people-group',
    },
  ].map(menuItem => ({
    ...menuItem,
    label: startCase(menuItem.label),
    url: `${landing}/${menuItem.label}`,
    routerLink: [menuItem.label],
  }));

export const getBuyDehubMenuItems = (
  landing: string,
  cexUrl: string,
  downloadMetamaskUrl: string,
  useRouterLink = false
): {
  label: string;
  icon: string;
  command?: (event: unknown) => void;
  routerLink?: string[];
  target?: string;
}[] => [
  {
    label: 'Direct',
    ...(useRouterLink
      ? { routerLink: [NavigationTabMenu.Shop] }
      : {
          command: () =>
            window.open(`${landing}/${NavigationTabMenu.Shop}`, '_blank'),
        }),
    icon: 'fad fa-shopping-bag',
  },
  {
    label: 'CEX',
    command: () => window.open(cexUrl, '_blank'),
    icon: 'fad fa-chart-line',
  },
  {
    label: 'Download Wallet',
    command: () => window.open(downloadMetamaskUrl, '_blank'),
    icon: 'fad fa-wallet',
  },
];
