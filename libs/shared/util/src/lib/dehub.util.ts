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
