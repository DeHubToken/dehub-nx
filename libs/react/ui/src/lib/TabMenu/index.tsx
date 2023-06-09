import { getTabMenuItems } from '@dehub/shared/utils';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { MenuItem } from 'primereact/menuitem';

export const TabMenu = ({
  activeTab,
  landing,
}: {
  activeTab: string;
  landing: string;
}) => {
  return (
    <div className="dhb-tab-menu">
      <div className="dhb-tab-menu-wrapper">
        {getTabMenuItems(landing).map((menuItem: MenuItem, index) => (
          <Button
            key={index}
            className={classNames(
              'p-button-text p-button-plain p-button-lg mt-3 mr-3',
              menuItem.label?.toLowerCase() === activeTab.toLowerCase()
                ? 'active'
                : ''
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
          <i className="flex align-items-center fal fa-long-arrow-right text-3xl fa-fade"></i>
        </div>
      </div>
    </div>
  );
};

export default TabMenu;
