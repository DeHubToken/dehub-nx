import { useWeb3Context } from '@dehub/react/core';
import { BalanceInput, Text } from '@dehub/react/ui';
import { ReactComponent as BscIcon } from '@dehub/shared/asset/dehub/icons/bsc.svg';
import { DEHUB_DISPLAY_DECIMALS } from '@dehub/shared/config';
import { getFullDisplayBalance } from '@dehub/shared/utils';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import React, { useCallback, useMemo } from 'react';
import { ETHERToken, Token } from '../../config/types';
import useTokenBalanceWithLoadingIndicator from '../../hooks/useTokenBalanceWithLoadingIndicator';
import { StyledLogo } from './Logo';

const TokenLogo = ({
  token,
  size = '24px',
  style,
}: {
  token: Token;
  size?: string;
  style?: React.CSSProperties;
}) => {
  const getTokenLogoUrl = useCallback(
    (address: string) =>
      `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`,
    []
  );

  const logoUrl = useMemo(() => {
    if (token === ETHERToken) return null;
    if (token.logoUri) return token.logoUri;
    if (token.address) return getTokenLogoUrl(token.address);
    return null;
  }, [token, getTokenLogoUrl]);

  if (token === ETHERToken) {
    return <BscIcon style={{ width: size, height: size }} />;
  }

  return (
    <StyledLogo
      alt={token.name}
      src={logoUrl ?? ''}
      size={size}
      style={style}
    />
  );
};

interface TokenInputPanelProps {
  value: string;
  onUserInput: (value: string) => void;
  onMax?: () => void;
  showMaxButton: boolean;
  token?: Token | null;
  disableTokenSelect?: boolean;
}

const TokenInputPanel = ({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  token,
  disableTokenSelect,
}: TokenInputPanelProps) => {
  const { account } = useWeb3Context();

  const handleSelectToken = () => {
    console.log('handleSelectToken');
  };

  const { balance, fetchStatus } = useTokenBalanceWithLoadingIndicator(
    account,
    token
  );

  return (
    <div className="flex flex-column">
      <div className="flex justify-content-between align-items-center mb-2">
        <Button
          className="p-button-text p-button-plain flex align-items-centers px-2 py-1"
          onClick={() => {
            if (!disableTokenSelect) {
              handleSelectToken();
            }
          }}
        >
          {token && (
            <div className="flex align-items-center">
              <TokenLogo token={token} />
              <Text className="mx-2">{token.name}</Text>
              {!disableTokenSelect && (
                <i className="fa-solid fa-chevron-down"></i>
              )}
            </div>
          )}
        </Button>

        {account && fetchStatus === 'not-fetched' ? (
          <Skeleton width="6rem" height="2.4rem" />
        ) : fetchStatus === 'success' ? (
          <Text textAlign="right" fontSize="12px">
            Balance:{' '}
            {getFullDisplayBalance(
              balance,
              token?.decimals,
              DEHUB_DISPLAY_DECIMALS
            )}
          </Text>
        ) : null}
      </div>

      <BalanceInput value={value} onUserInput={onUserInput} />

      <div className="flex justify-content-end mt-2">
        {showMaxButton && (
          <Button
            className="p-button-outlined text-500 border-primary"
            label="Max"
            onClick={() => onMax && onMax()}
          />
        )}
      </div>
    </div>
  );
};

export default TokenInputPanel;
