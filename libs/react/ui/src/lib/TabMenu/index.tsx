import classNames from 'classnames';
import { Button } from 'primereact/button';
import { MenuItem } from 'primereact/menuitem';

export enum NavigationTabMenu {
  Home = 'Home',
  Stream = 'Stream',
  Game = 'Game',
  Shop = 'Shop',
  Learn = 'Learn',
  Earn = 'Earn',
  News = 'News',
  Legal = 'Legal',
}

export const tabMenuItems: MenuItem[] = [
  {
    label: NavigationTabMenu.Home,
    icon: 'fad fa-home',
    routerLink: 'https://dehub.net/web/home',
  },
  {
    label: NavigationTabMenu.Stream,
    icon: 'fad fa-tv',
    routerLink: 'https://dehub.net/web/stream',
  },
  {
    label: NavigationTabMenu.Game,
    icon: 'fad fa-gamepad-alt',
    routerLink: 'https://dehub.net/web/game',
  },
  {
    label: NavigationTabMenu.Shop,
    icon: 'fad fa-shopping-bag',
    routerLink: 'https://dehub.net/web/shop',
  },
  {
    label: NavigationTabMenu.Learn,
    icon: 'fad fa-lightbulb-on',
    routerLink: 'https://dehub.net/web/learn',
  },
  {
    label: NavigationTabMenu.Earn,
    icon: 'fad fa-coins',
    routerLink: 'https://dehub.net/web/earn',
  },
];

export const TabMenu = ({ activeTab }: { activeTab: string }) => {
  return (
    <div className="dhb-tab-menu">
      <div className="dhb-tab-menu-wrapper">
        {tabMenuItems.map((menuItem: MenuItem, index) => (
          <Button
            className={classNames(
              'p-button-text p-button-plain p-button-lg mt-3 mr-3',
              menuItem.label === activeTab ? 'active' : ''
            )}
            icon={menuItem.icon}
            label={menuItem.label}
            onClick={() => (window.location.href = menuItem.routerLink)}
          />
        ))}

        <div
          className="md:hidden flex absolute right-0 mr-3 fadeinleft animation-duration-1000 animation-ease-in-out"
          style={{
            marginTop: '63px',
          }}
        >
          <span className="flex align-items-center uppercase font-bold text-xs pr-1">
            swipe menu&nbsp;
          </span>
          <i className="flex align-items-center fal fa-long-arrow-right text-3xl"></i>
        </div>
      </div>
    </div>
  );
};

export default TabMenu;
