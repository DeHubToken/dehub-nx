import { memo } from 'react';
import { LogoTypes } from './types';

interface LogoProps {
  logo: LogoTypes;
}

const Logo = ({ logo }: LogoProps) => {
  return (
    <a
      className="p-link layout-topbar-logo"
      href={logo.href}
      aria-label="DeHub"
    >
      {logo.icon ? (
        <img src={logo.icon} height="25px" alt={logo.alt} />
      ) : logo.label ? (
        <h1>{logo.label}</h1>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>&nbsp;</>
      )}
    </a>
  );
};

export default memo(Logo);
