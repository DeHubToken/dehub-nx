import { ConnectWalletButton, useWeb3Context } from '@dehub/react/core';
import { Container } from '@dehub/react/ui';
import { getBalanceAmount, getDecimalAmount } from '@dehub/shared/utils';
import BigNumber from 'bignumber.js';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useCallback, useMemo } from 'react';
import { SwitchIconButton } from '../components/SwitchIconButton';
import { TokenInputPanel } from '../components/TokenInputPanel';
import { MAX_DECIMAL_DIGITS } from '../config/types';
import useTokenBalanceWithLoadingIndicator from '../hooks/useTokenBalanceWithLoadingIndicator';
import { useToken } from '../hooks/useTokenList';
import { useTradeExactInOut, useTradeInExactOut } from '../hooks/useTradeInOut';
import { useSwapActions, useSwapState } from '../states/swap/hooks';
import { Field } from '../states/swap/types';

const BuyDeHub: React.FC = () => {
  const { account } = useWeb3Context();
  const {
    independentField,
    typedValue,
    [Field.Input]: { currencyId: inputCurrencyId },
    [Field.Output]: { currencyId: outputCurrencyId },
  } = useSwapState();
  const { onUserInput, onSwitchTokens } = useSwapActions();

  const inputToken = useToken(inputCurrencyId);
  const outputToken = useToken(outputCurrencyId);

  const tokens = useMemo(
    () => ({
      [Field.Input]: inputToken,
      [Field.Output]: outputToken,
    }),
    [inputToken, outputToken]
  );
  const { balance } = useTokenBalanceWithLoadingIndicator(
    account,
    tokens[Field.Input]
  );
  const amountIn = useMemo(
    () =>
      inputToken && typedValue
        ? getDecimalAmount(new BigNumber(typedValue), inputToken.decimals)
        : undefined,
    [typedValue, inputToken]
  );
  const atMaxAmountInput = amountIn && balance.isEqualTo(amountIn);

  const isExactIn = independentField === Field.Input;
  const amountOnExactInOut = useTradeExactInOut(
    isExactIn ? inputToken : undefined,
    isExactIn ? amountIn : undefined,
    isExactIn ? outputToken : undefined
  );
  const amountOnInExactOut = useTradeInExactOut(
    !isExactIn ? inputToken : undefined,
    !isExactIn ? amountIn : undefined,
    !isExactIn ? outputToken : undefined
  );
  const amountOut = isExactIn ? amountOnExactInOut : amountOnInExactOut;

  const formattedAmount = useMemo(
    () => ({
      [Field.Input]:
        independentField === Field.Input
          ? typedValue
          : amountOut && inputToken
          ? getBalanceAmount(amountOut, inputToken.decimals)
              .decimalPlaces(MAX_DECIMAL_DIGITS)
              .toString()
          : '',
      [Field.Output]:
        independentField === Field.Input
          ? amountOut && outputToken
            ? getBalanceAmount(amountOut, outputToken.decimals)
                .decimalPlaces(MAX_DECIMAL_DIGITS)
                .toString()
            : ''
          : typedValue,
    }),
    [amountOut, typedValue, independentField, inputToken, outputToken]
  );

  const handleUserInput = useCallback(
    (value: string) => {
      onUserInput(Field.Input, value);
    },
    [onUserInput]
  );
  const handleUserMaxInput = useCallback(() => {
    onUserInput(
      Field.Input,
      getBalanceAmount(balance, tokens[independentField]?.decimals).toString()
    );
  }, [onUserInput, balance, independentField, tokens]);
  const handleUserOutput = useCallback(
    (value: string) => {
      onUserInput(Field.Output, value);
    },
    [onUserInput]
  );

  const handleSwitchCurrency = useCallback(() => {
    // onSwitchTokens();
  }, []);

  const header = (
    <div className="px-4 pt-4 pb-3 flex justify-content-between align-items-center">
      <div className="flex-grow-1 flex align-items-center text-white">
        <p className="p-card-title">Buy DeHub</p>
      </div>
      <i className="fa-regular fa-gear"></i>
    </div>
  );

  const footer = useMemo(() => {
    return account ? (
      <Button icon="fa-solid fa-arrow-right-arrow-left" label="Swap" />
    ) : (
      <ConnectWalletButton />
    );
  }, [account]);

  return (
    <Container style={{ maxWidth: '436px' }}>
      <h1>Buy DeHub</h1>

      <div className="my-8">
        <Card
          className="border-neon-1 overflow-hidden mt-5"
          header={header}
          footer={footer}
        >
          <TokenInputPanel
            value={formattedAmount[Field.Input]}
            onMax={handleUserMaxInput}
            onUserInput={handleUserInput}
            showMaxButton={!atMaxAmountInput}
            token={tokens[Field.Input]}
            disableTokenSelect={true}
          />

          <div className="flex justify-content-center m-2">
            <SwitchIconButton onSwitch={handleSwitchCurrency} />
          </div>

          <TokenInputPanel
            value={formattedAmount[Field.Output]}
            onUserInput={handleUserOutput}
            showMaxButton={false}
            token={tokens[Field.Output]}
            disableTokenSelect={true}
          />
        </Card>
      </div>
    </Container>
  );
};

export default BuyDeHub;
