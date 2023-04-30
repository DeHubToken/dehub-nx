import { memo, ReactElement } from 'react';
import Logo, { LogoTypes } from './Logo';

export interface HeaderProps {
  userMenu?: ReactElement;
  logo: LogoTypes;
}

function Header({ userMenu, logo }: HeaderProps) {
  return (
    <div className="layout-topbar-dark">
      <div className="layout-topbar">
        <div className="layout-topbar-wrapper flex-column sm:flex-row">
          <div className="layout-topbar-left">
            <Logo logo={logo} />
          </div>
          <div className="layout-topbar-right">{userMenu}</div>
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
