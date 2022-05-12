import {
  ConnectWalletButton,
  useApproveConfirmTransaction,
  useToast,
  useWeb3Context,
} from '@dehub/react/core';
import { Container } from '@dehub/react/ui';
import {
  BIG_ZERO,
  ethersToBigNumber,
  getBalanceAmount,
  getContract,
  getDecimalAmount,
} from '@dehub/shared/utils';
import { MaxUint256 } from '@ethersproject/constants';
import { Web3Provider } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useCallback, useMemo, useState } from 'react';
import { environment } from '../../environments/environment';
import { SwitchIconButton } from '../components/SwitchIconButton';
import { TokenInputPanel } from '../components/TokenInputPanel';
import Bep20Abi from '../config/abis/erc20.json';
import { MAX_DECIMAL_DIGITS } from '../config/types';
import { useDehubContract } from '../hooks/useContract';
import useInitialize from '../hooks/useInitialize';
import useSwap from '../hooks/useSwap';
import useTokenBalanceWithLoadingIndicator from '../hooks/useTokenBalanceWithLoadingIndicator';
import { useToken } from '../hooks/useTokenList';
import { useTradeExactInOut, useTradeInExactOut } from '../hooks/useTradeInOut';
import { useSwapActions, useSwapState } from '../states/swap/hooks';
import { Field } from '../states/swap/types';
import { getDehubAddress, getRouterAddress } from '../utils/addresses';

const BuyDeHub: React.FC = () => {
  const { account, web3 } = useWeb3Context();
  const dehubContract = useDehubContract();

  const {
    independentField,
    typedValue,
    [Field.Input]: { currencyId: inputCurrencyId },
    [Field.Output]: { currencyId: outputCurrencyId },
  } = useSwapState();
  const { onUserInput } = useSwapActions();
  const { fetchPairReserves } = useInitialize();

  const [executing, setExecuting] = useState<boolean>(false);

  const inputToken = useToken(inputCurrencyId);
  const outputToken = useToken(outputCurrencyId);

  const { isToastEnabled, toastInfo, toastError, toastSuccess } = useToast();

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
  const allowedSlippage = environment.swap.slippage;
  const amountIn = useMemo(
    () =>
      independentField === Field.Input && inputToken && typedValue
        ? getDecimalAmount(new BigNumber(typedValue), inputToken.decimals)
        : undefined,
    [independentField, typedValue, inputToken]
  );
  const amountOut = useMemo(
    () =>
      independentField === Field.Output && outputToken && typedValue
        ? getDecimalAmount(new BigNumber(typedValue), outputToken.decimals)
        : undefined,
    [independentField, typedValue, outputToken]
  );
  const atMaxAmountInput = amountIn && balance.isEqualTo(amountIn);
  const isSwapDisabled = useMemo(
    () =>
      executing ||
      ((!amountIn || amountIn.eq(BIG_ZERO)) &&
        (!amountOut || amountOut.eq(BIG_ZERO))),
    [executing, amountIn, amountOut]
  );

  const isExactIn = independentField === Field.Input;
  const tradeOnExactInOut = useTradeExactInOut(
    isExactIn ? inputToken : undefined,
    isExactIn ? amountIn : undefined,
    isExactIn ? outputToken : undefined
  );
  const tradeOnInExactOut = useTradeInExactOut(
    !isExactIn ? inputToken : undefined,
    !isExactIn ? amountOut : undefined,
    !isExactIn ? outputToken : undefined
  );
  const bestTrade = isExactIn ? tradeOnExactInOut : tradeOnInExactOut;

  const formattedAmount = useMemo(
    () => ({
      [Field.Input]: isExactIn
        ? typedValue
        : bestTrade && bestTrade.amountIn && inputToken
        ? getBalanceAmount(bestTrade.amountIn, inputToken.decimals)
            .decimalPlaces(Math.min(inputToken.decimals, MAX_DECIMAL_DIGITS))
            .toString()
        : '',
      [Field.Output]: isExactIn
        ? bestTrade && bestTrade.amountOut && outputToken
          ? getBalanceAmount(bestTrade.amountOut, outputToken.decimals)
              .decimalPlaces(Math.min(outputToken.decimals, MAX_DECIMAL_DIGITS))
              .toString()
          : ''
        : typedValue,
    }),
    [typedValue, isExactIn, inputToken, outputToken, bestTrade]
  );

  const { onSwap } = useSwap(bestTrade, allowedSlippage);
  const { isApproved, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async (
        provider: Web3Provider,
        approvalAccount: string
      ) => {
        try {
          const tokenContract = getContract(
            getDehubAddress(),
            Bep20Abi,
            provider,
            approvalAccount
          );

          const response = await tokenContract['allowance'](
            approvalAccount,
            getRouterAddress()
          );
          const currentAllowance = ethersToBigNumber(response);
          return currentAllowance.gt(0);
        } catch (error) {
          return false;
        }
      },
      onApprove: async () => {
        try {
          if (!dehubContract) return false;
          setExecuting(true);
          return await dehubContract['approve'](getRouterAddress(), MaxUint256);
        } catch (error) {
          console.error(error);
          setExecuting(false);
          return false;
        }
      },
      onApproveSuccess: async () => {
        if (isToastEnabled && toastInfo) {
          toastInfo('Approved', 'Contract enabled - you can now buy $DeHub');
        }
        handleConfirm();
      },
      onConfirm: async () => {
        if (!onSwap) {
          throw new Error('Swap hook function error');
        }
        setExecuting(true);
        return onSwap();
      },
      onFail: async () => {
        setExecuting(false);
      },
      onSuccess: async () => {
        if (isToastEnabled && toastSuccess) {
          toastSuccess('Buy DeHub', `You've successfully purchased DeHub`);
        }
        setExecuting(false);
        fetchPairReserves();
      },
      onToast: toastError,
    });

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

  const handleSwitchCurrency = useCallback(async () => {
    console.log('switch currency');
  }, []);

  const handleSwap = useCallback(() => {
    isApproved ? handleConfirm() : handleApprove();
  }, [isApproved, handleConfirm, handleApprove]);

  const header = (
    <div className="px-4 pt-4 pb-3 flex justify-content-between align-items-center">
      <div className="flex-grow-1 flex align-items-center text-white">
        <p className="p-card-title">Swap</p>
      </div>
      {/* <i className="fa-regular fa-gear"></i> */}
    </div>
  );

  const footer = useMemo(() => {
    return account ? (
      <Button
        loadingIcon={'pi pi-spin pi-spinner'}
        icon="fa-solid fa-arrow-right-arrow-left"
        label="Swap"
        loading={executing}
        disabled={isSwapDisabled}
        onClick={handleSwap}
      />
    ) : (
      <ConnectWalletButton />
    );
  }, [isSwapDisabled, executing, account, handleSwap]);

  return (
    <Container style={{ maxWidth: '436px' }}>
      <h1>Buy DeHub</h1>

      <div className="my-8">
        <Card
          className="border-neon-1 overflow-hidden mt-5"
          header={header}
          footer={<div className="text-center mb-3">{footer}</div>}
        >
          <TokenInputPanel
            value={formattedAmount[Field.Input]}
            onMax={handleUserMaxInput}
            onUserInput={handleUserInput}
            showMaxButton={!atMaxAmountInput}
            token={tokens[Field.Input]}
            disableTokenSelect={true}
            disableWarning={false}
            disableInput={executing}
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
            disableWarning={true}
            disableInput={executing}
          />
        </Card>
      </div>
    </Container>
  );
};

export default BuyDeHub;
