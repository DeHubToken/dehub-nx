import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { LogoTypes } from './types';

interface LogoProps {
  logo: LogoTypes;
}

const Logo = ({ logo }: LogoProps) => {
  const history = useHistory();

  return (
    <button
      className="p-link layout-topbar-logo"
      onClick={() => history.push(logo.href)}
    >
      {logo.icon ? (
        <img src={logo.icon} alt={logo.alt} />
      ) : logo.label ? (
        <h1>{logo.label}</h1>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>&nbsp;</>
      )}
    </button>
  );
};

export default memo(Logo);
