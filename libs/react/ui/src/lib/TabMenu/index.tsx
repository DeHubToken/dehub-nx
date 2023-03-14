import { NavigationTabMenu } from '@dehub/shared/model';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { MenuItem } from 'primereact/menuitem';

export const tabMenuItems: MenuItem[] = [
  {
    label: NavigationTabMenu.Home,
    icon: 'fad fa-home',
    url: 'https://dehub.net/web/home',
  },
  {
    label: NavigationTabMenu.Stream,
    icon: 'fad fa-tv',
    url: 'https://dehub.net/web/stream',
  },
  {
    label: NavigationTabMenu.Game,
    icon: 'fad fa-gamepad-alt',
    url: 'https://dehub.net/web/game',
  },
  {
    label: NavigationTabMenu.Shop,
    icon: 'fad fa-shopping-bag',
    url: 'https://dehub.net/web/shop',
  },
  {
    label: NavigationTabMenu.Learn,
    icon: 'fad fa-lightbulb-on',
    url: 'https://dehub.net/web/learn',
  },
  {
    label: NavigationTabMenu.Clubs,
    icon: 'fad fa-people-group',
    url: 'https://dehub.net/web/clubs',
  },
];

export const TabMenu = ({ activeTab }: { activeTab: string }) => {
  return (
    <div className="dhb-tab-menu">
      <div className="dhb-tab-menu-wrapper">
        {tabMenuItems.map((menuItem: MenuItem, index) => (
          <Button
            key={index}
            className={classNames(
              'p-button-text p-button-plain p-button-lg mt-3 mr-3',
              menuItem.label === activeTab ? 'active' : ''
            )}
            icon={menuItem.icon}
            label={menuItem.label}
            onClick={() => (window.location.href = menuItem['url'] || '')}
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
