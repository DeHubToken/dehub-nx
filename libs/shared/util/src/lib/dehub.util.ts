import { NavigationTabMenu } from '@dehub/shared/model';
import { startCase } from 'lodash';

export const getTabMenuItems = (
  landing: string,
  bridgeUrl?: string
): { label: string; icon: string; url: string; routerLink: string[] }[] =>
  [
    {
      label: NavigationTabMenu.Home,
      icon: 'fad fa-home',
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
    {
      label: NavigationTabMenu.Bridge,
      icon: 'fad fa-bridge',
    },
  ].map(menuItem => {
    if (menuItem.label === NavigationTabMenu.Bridge) {
      return {
        ...menuItem,
        label: startCase(menuItem.label),
        url: `${bridgeUrl}`,
        routerLink: [menuItem.label],
      };
    } else {
      return {
        ...menuItem,
        label: startCase(menuItem.label),
        url: `${landing}/${menuItem.label}`,
        routerLink: [menuItem.label],
      };
    }
  });

export const getBuyDehubMenuItems = (
  landing: string,
  cexUrl: string,
  downloadMetamaskUrl: string,
  onSwap: () => void,
  useRouterLink = false
): {
  label: string;
  icon: string;
  command?: (event: unknown) => void;
  routerLink?: string[];
  target?: string;
}[] => [
  {
    label: 'Swap',
    command: onSwap,
    icon: 'fad fa-bolt',
  },
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
