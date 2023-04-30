import { memo } from 'react';

interface LogoProps {
  logo: LogoTypes;
}

export type LogoTypes = {
  label?: string;
  href: string;
  icon?: string;
  alt?: string;
};

const Logo = ({ logo }: LogoProps) => {
  return (
    <a
      className="p-link layout-topbar-logo"
      href={logo.href}
      aria-label="DeHub"
    >
      {logo.icon ? (
        <img src={logo.icon} width="106px" height="25px" alt={logo.alt} />
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
