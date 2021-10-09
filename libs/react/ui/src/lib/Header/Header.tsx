import { ReactElement, memo } from 'react';
import Logo from './Logo';
import { LogoTypes } from './types';

/* eslint-disable-next-line */
export interface HeaderProps {
  userMenu?: ReactElement;
  logo: LogoTypes;
}

function Header({
  userMenu,
  logo
}: HeaderProps) {
  return (
    <div className="layout-topbar-dark">
      <div className="layout-topbar">
        <div className="layout-topbar-wrapper">
          <div className="layout-topbar-left">
            <Logo logo={logo} />
          </div>
          <div className="layout-topbar-right">
            {userMenu}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Header);