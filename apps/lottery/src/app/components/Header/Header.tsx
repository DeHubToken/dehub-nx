import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const history = useHistory();

  return (
    <div className="layout-topbar-dark">
      <div className="layout-topbar">
        <div className="layout-topbar-wrapper">
          <div className="layout-topbar-left">
            <button className="p-link layout-topbar-logo" onClick={() => history.push('/')}>
              <img src="assets/dehub/logo.png" alt="DeHUB logo" />
            </button>
          </div>

          <div className="layout-topbar-right">
            <ul className="layout-topbar-actions">
              <li>
                <button className="landing-button p-button">
                  <span className="p-button-text">0x5eb7...6a59</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Header)