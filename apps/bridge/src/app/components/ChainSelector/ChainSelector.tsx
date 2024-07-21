import { useWeb3Context } from '@dehub/react/core';
import { BalanceInput, Heading, Text } from '@dehub/react/ui';
import {
  DEHUB_DECIMALS,
  enableOptionsLocalStorageKey,
  Web3EnableOptions,
} from '@dehub/shared/model';
import {
  BIG_ZERO,
  getBalanceAmount,
  setupMetamaskNetwork,
} from '@dehub/shared/utils';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import arrow from '../../../assets/down-arrow-svgrepo-com.svg';
import { FetchStatus } from '../../config/constants/types';
import { MAX_VALUE, MIN_VALUE } from '../../constants/chains';
import {
  useGetDehubBalance,
  useGetDstDehubBalance,
} from '../../hooks/useTokenBalance';
import { useAppDispatch } from '../../state';
import { setTokenAmount } from '../../state/application';
import {
  useDstChain,
  useSourceChain,
  useTokenAmount,
} from '../../state/application/hooks';
import ChainDialog from '../../views/components/ChainDialog';

interface ChainSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  isSourceChain: boolean;
}

const ChainSelector = ({
  title,
  isSourceChain,
  ...props
}: ChainSelectorProps) => {
  const [openChainDialog, setOpenChainDialog] = useState<boolean>(false);
  const { chain: dstChain } = useDstChain();
  const { chain: sourceChain } = useSourceChain();
  const chain = isSourceChain ? sourceChain : dstChain;
  const { account, chainId } = useWeb3Context();
  const [balance, setBalance] = useState<string>('0.00');
  const [balance2, setBalance2] = useState<string>('0.00');
  const [warning, setWarning] = useState<string>('');
  const {
    userBalance: dehubBalance,
    fetchStatus: fetchBalanceStatus,
    // bridgeBalance,
  } = useGetDehubBalance();

  const { userBalance: dehubBalance2, fetchStatus: fetchBalanceStatus2 } =
    useGetDstDehubBalance();
  const { amount: tokenAmount } = useTokenAmount();
  const [value, setValue] = useState<string>(tokenAmount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // ToDo : Get balance of the account on chainID
    const balance2 =
      fetchBalanceStatus2 === FetchStatus.SUCCESS
        ? getBalanceAmount(dehubBalance2, DEHUB_DECIMALS).toNumber()
        : BIG_ZERO.toNumber();
    setBalance2(balance2.toString());
  }, [account, dstChain, dehubBalance2, fetchBalanceStatus2]);

  useEffect(() => {
    // ToDo : Get balance of the account on chainID
    const balance =
      fetchBalanceStatus === FetchStatus.SUCCESS
        ? getBalanceAmount(dehubBalance, DEHUB_DECIMALS).toNumber()
        : BIG_ZERO.toNumber();
    setBalance(balance.toString());
  }, [account, chainId, dehubBalance, fetchBalanceStatus]);

  useEffect(() => {
    if (isSourceChain && chain && chain.chainID !== chainId) {
      const enableOptions = JSON.parse(
        window.localStorage.getItem(enableOptionsLocalStorageKey) ?? '{}'
      ) as Web3EnableOptions;
      console.log('HHH - chainID', chain.chainID, enableOptions);
      // if (!enableOptions.provider) return;

      setupMetamaskNetwork(
        chain.chainID,
        () => true,
        () => true,
        (success: boolean) => {
          console.log('HHH - switch network to ', chainId);
        },
        (success: boolean) => {
          return true;
        }
      );
    }
  }, [chain, isSourceChain, chainId]);

  useEffect(() => {
    if (chain?.chainID !== chainId) {
      setWarning('Please switch network on wallet');
    } else {
      setWarning('');
    }
  }, [chain, chainId]);

  const showDialog = () => {
    handleModal(true);
  };

  const handleModal = (showOrHide: boolean) => {
    setOpenChainDialog(showOrHide);
  };

  const handleChange = (input: string) => {
    setValue(input);
  };

  useEffect(() => {
    const _value = Number(value);
    if (
      dehubBalance.div(10 ** DEHUB_DECIMALS).toNumber() >= _value &&
      // bridgeBalance.div(10 ** DEHUB_DECIMALS).toNumber() >= _value &&
      8000000000 >= _value &&
      MIN_VALUE <= _value &&
      MAX_VALUE >= _value
    ) {
      setWarning('');
    } else {
      setWarning('!!! Invalid input value');
    }
    dispatch(setTokenAmount({ amount: value }));
  }, [value, dispatch]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <div className="flex flex-column">
        <Heading>{title}</Heading>
        <div className="card gray shadow-2 mt-1 flex flex-column">
          <div className="grid">
            <div
              className="col-12 md:col-6 lg:col-6 flex flex-row align-self-center"
              onClick={() => {
                showDialog();
              }}
            >
              {chain ? (
                <>
                  <img
                    width={50}
                    height={50}
                    src={chain?.logo}
                    alt={chain?.name}
                  ></img>
                  <div
                    className="text right align-self-center"
                    style={{ fontSize: '20px', paddingLeft: '15px' }}
                  >
                    {chain?.name}
                  </div>
                </>
              ) : (
                <div className="flex justify-content-center">
                  <Text style={{ paddingLeft: '15px' }} fontSize="25px">
                    Select chain
                  </Text>
                </div>
              )}
              <img
                className="ml-3 align-self-center"
                width={30}
                height={30}
                src={arrow}
                alt="arrow"
              ></img>
            </div>
            <div className="col-12 md:col-6 lg:col-6 flex flex-row">
              <BalanceInput
                inputProps={{ width: '100%' }}
                value={isSourceChain ? value : tokenAmount}
                onUserInput={isSourceChain ? handleChange : () => {}}
                isDisabled={!isSourceChain}
                className="align-self-center p-dropdown-filter"
              ></BalanceInput>
            </div>
          </div>
          {isSourceChain ? (
            fetchBalanceStatus ? (
              <div className="flex flex-row align-self-end">
                <div
                  className="text-right align-self-center"
                  style={{ fontSize: '18px' }}
                >
                  $DHB Balance: {balance}{' '}
                </div>
                <Button
                  className="ml-5"
                  onClick={() => {
                    setValue(balance);
                  }}
                >
                  MAX
                </Button>
              </div>
            ) : (
              <div
                className="text-right align-self-center"
                style={{ fontSize: '18px' }}
              >
                $DHB Balance: ...{' '}
              </div>
            )
          ) : fetchBalanceStatus2 ? (
            <div className="flex flex-row align-self-end">
              <div
                className="text-right align-self-center"
                style={{ fontSize: '18px' }}
              >
                $DHB Balance: {balance2}{' '}
              </div>
            </div>
          ) : (
            <div
              className="text-right align-self-center"
              style={{ fontSize: '18px' }}
            >
              $DHB Balance: ...{' '}
            </div>
          )}
          {isSourceChain && value && warning ? (
            <div className="flex flex-row align-self-end ql-editor">
              <div className="ql-color-red">{warning}</div>
            </div>
          ) : null}
        </div>
      </div>
      <ChainDialog
        isSourceChain={isSourceChain}
        open={openChainDialog}
        onHide={() => handleModal(false)}
      />
    </>
  );
};

export default ChainSelector;
