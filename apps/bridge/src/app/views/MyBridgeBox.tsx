import { ConnectWalletButton, useWeb3Context } from '@dehub/react/core';
import { BalanceInput, Box, Heading, Text } from '@dehub/react/ui';
import { DEHUB_DECIMALS, DEHUB_DISPLAY_DECIMALS } from '@dehub/shared/model';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import BigNumber from 'bignumber.js';
import {
  BIG_ZERO,
  ethersToBigNumber,
  getFullDisplayBalance,
} from '@dehub/shared/utils';
import { Interface } from '@ethersproject/abi';
import {
  ContractFunction,
  ContractReceipt,
  Event,
} from '@ethersproject/contracts';
import { id } from '@ethersproject/hash';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useBridgeContract,
  useDehubTokenContract,
  usePickStakingContract,
} from '../hooks/useContract';
import { ChainSelector } from '../components/ChainSelector';
import {
  useDstChain,
  useSourceChain,
  useTokenAmount,
  useValidAmount,
} from '../state/application/hooks';
import { useApproved, useGetDehubBalance } from '../hooks/useTokenBalance';
import { CHAININFO, FEE, MAX_VALUE, MIN_VALUE } from '../constants/chains';
import { chain } from 'lodash';
import { useAppDispatch } from '../state';
import { setTokenAmount, setUpdateState } from '../state/application';
import { Link } from 'react-router-dom';

const MyBridgeBox = () => {
  const { account } = useWeb3Context();
  const stakingContract = usePickStakingContract();

  const [openStakeModal, setOpenStakeModal] = useState<boolean>(false);
  const [openUnstakeModal, setOpenUnstakeModal] = useState<boolean>(false);
  // const [openRestakeModal, setOpenRestakeModal] = useState<boolean>(false);
  const [isTxPending, setIsTxPending] = useState(false);
  const [value, setValue] = useState<string>('0.00');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { chain: sourceChain } = useSourceChain();
  const { chain: dstChain } = useDstChain();
  const dehubTokenContract = useDehubTokenContract();
  const {
    userBalance: dehubBalance,
    fetchStatus: fetchBalanceStatus,
    bridgeBalance,
  } = useGetDehubBalance();
  const bridgeContract = useBridgeContract();
  const { approved, approvedAmount } = useApproved();
  const { amount } = useTokenAmount();
  const isValidAmount = useValidAmount();
  const [sendTx, setSendTx] = useState<string>('');
  const dispatch = useAppDispatch();

  const toast = useRef<Toast>(null);

  const now = new Date();

  const isReady = useMemo(() => {
    return account != null && sourceChain && dstChain;
  }, [account, sourceChain, dstChain]);

  useEffect(() => {
    // ToDo : change the network on metamask
    // alert('network changed');
  }, [sourceChain]);

  const handleModal = (modal: string, showOrHide: boolean) => {
    if (modal === 'stake') {
      setOpenStakeModal(showOrHide);
    } else if (modal === 'unstake') {
      setOpenUnstakeModal(showOrHide);
    } /* else if (modal === 'restake') {
      setOpenRestakeModal(showOrHide);
    } */
  };

  const showFieldWarning = !!account && errorMessage !== null;

  const handleChange = (input: string) => {
    setValue(input);
  };

  const send = async () => {
    if (!bridgeContract || !sourceChain || !dstChain) return;
    try {
      const ClaimedTopic = id('Approval(address,address,uint256)');
      const ClaimedInterface = new Interface([
        'event Approval(address indexed owner, address indexed spender, uint256 amount)',
      ]);

      setIsTxPending(true);
      const tx = await bridgeContract['bridgeToken'](
        EthersBigNumber.from(
          BigNumber(amount).multipliedBy(Math.pow(10, 18)).toString()
        ),
        account,
        EthersBigNumber.from(
          BigNumber(amount).multipliedBy(Math.pow(10, 18)).toString()
        ),
        dstChain.layerzeroID, 
        {
          from: account,
          value: EthersBigNumber.from(BigNumber(amount).multipliedBy(Math.pow(10, 18)).multipliedBy(FEE[sourceChain.chainID]).toString()),
        }
      );

      await tx.wait().then((receipt: ContractReceipt) => {
        dispatch(setTokenAmount({ amount: '0' + amount }));
        setSendTx(receipt.transactionHash);
        toast?.current?.show({
          severity: 'success',
          summary: `Success`,
          detail: (
            <Box>
              <Text style={{ marginBottom: '8px', fontSize: '18px' }}>
                Send successfully!
              </Text>
            </Box>
          ),
          life: 4000,
        });
      });
    } catch (error) {
      let errMsg;
      if (error instanceof Error && error.message) {
        errMsg = error.message;
      } else if ((error as { data: { message: string } }).data?.message) {
        errMsg = (error as { data: { message: string } }).data.message;
      } else {
        console.error(error);
      }
      toast?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: `Send failed - ${errMsg}`,
        life: 4000,
      });
    }
    setIsTxPending(false);
  };

  const approve = async () => {
    if (!dehubTokenContract || !sourceChain) return;
    try {
      const ClaimedTopic = id('Approval(address,address,uint256)');
      const ClaimedInterface = new Interface([
        'event Approval(address indexed owner, address indexed spender, uint256 amount)',
      ]);

      setIsTxPending(true);
      const tx = await dehubTokenContract['approve'](
        CHAININFO[sourceChain.chainID].bridgeContract,
        EthersBigNumber.from(
          BigNumber(amount).multipliedBy(Math.pow(10, 18)).toString()
        )
      );
      await tx.wait().then((receipt: ContractReceipt) => {
        const events = receipt.events?.filter(
          (event: Event) => event.topics[0] === ClaimedTopic
        );
        dispatch(setTokenAmount({ amount: '0' + amount }));
        const lastEvent =
          events && events.length > 0 ? events.slice(-1)[0] : undefined;
        if (!lastEvent) return;

        const parsed = ClaimedInterface.parseLog(lastEvent);

        toast?.current?.show({
          severity: 'success',
          summary: `Success`,
          detail: (
            <Box>
              <Text style={{ marginBottom: '8px', fontSize: '18px' }}>
                {`${getFullDisplayBalance(
                  ethersToBigNumber(parsed.args['amount']),
                  DEHUB_DECIMALS,
                  DEHUB_DISPLAY_DECIMALS
                )} $DeHub has been successfully approved!`}
              </Text>
            </Box>
          ),
          life: 4000,
        });
      });
    } catch (error) {
      let errMsg;
      if (error instanceof Error && error.message) {
        errMsg = error.message;
      } else if ((error as { data: { message: string } }).data?.message) {
        errMsg = (error as { data: { message: string } }).data.message;
      } else {
        console.error(error);
        // throw new Error('unknown error during handling approve');
      }
      console.log('HHH - Error', errMsg);
      toast?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: `Approve failed - ${errMsg}`,
        life: 4000,
      });
    }
    setIsTxPending(false);
  };

  const handleClaim = async () => {
    if (!stakingContract) return;

    try {
      const ClaimedTopic = id('Claimed(address,uint256)');
      const ClaimedInterface = new Interface([
        'event Claimed(address indexed user, uint256 amount)',
      ]);

      setIsTxPending(true);
      const tx = await stakingContract['claim']();
      await tx.wait().then((receipt: ContractReceipt) => {
        updatePool();
        updateUser();

        const events = receipt.events?.filter(
          (event: Event) => event.topics[0] === ClaimedTopic
        );
        const lastEvent =
          events && events.length > 0 ? events.slice(-1)[0] : undefined;
        if (!lastEvent) return;

        const parsed = ClaimedInterface.parseLog(lastEvent);

        toast?.current?.show({
          severity: 'success',
          summary: `Success`,
          detail: (
            <Box>
              <Text style={{ marginBottom: '8px', fontSize: '18px' }}>
                {`${getFullDisplayBalance(
                  ethersToBigNumber(parsed.args['amount']),
                  DEHUB_DECIMALS,
                  DEHUB_DISPLAY_DECIMALS
                )} $DeHub has been successfully claimed!`}
              </Text>
            </Box>
          ),
          life: 4000,
        });
      });
    } catch (error) {
      let errMsg;
      if (error instanceof Error && error.message) {
        errMsg = error.message;
      } else if ((error as { data: { message: string } }).data.message) {
        errMsg = (error as { data: { message: string } }).data.message;
      } else {
        console.error(error);
        throw new Error('unknown error during handling claim');
      }
      toast?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: `Staking failed - ${errMsg}`,
        life: 4000,
      });
    }
    setIsTxPending(false);
  };

  return (
    <>
      <Toast ref={toast} />
      <Card className="border-neon-1 overflow-hidden">
        <Box style={{ padding: '1rem' }}>
          <ChainSelector title="From:" isSourceChain={true}></ChainSelector>
          <div className="flex col-12 justify-content-center mt-5"></div>
          <ChainSelector
            className="shadow-2 mt-5"
            title="To:"
            isSourceChain={false}
          ></ChainSelector>
          <div className="mt-5">
            <div className="grid">
              <div className="col- md:col-6 lg:col-6 flex flex-column">
                <div className="overview-info text-left w-full">
                  <>
                    <Text
                      className="text-right"
                      style={{ marginBottom: '8px', fontSize: '18px' }}
                    >
                      Minimum Amount:
                    </Text>
                    <Text
                      className="text-right"
                      style={{ marginBottom: '8px', fontSize: '18px' }}
                    >
                      Maximum Amount:
                    </Text>
                    {/* <Text
                      className="text-right"
                      style={{ marginBottom: '8px' , fontSize:'18px'}}
                    >
                      Available to Bridge:
                    </Text> */}
                  </>
                </div>
              </div>

              <div className="col-6 md:col-6 lg:col-6 flex flex-column">
                <div className="overview-info text-left w-full">
                  <>
                    <Text
                      className="text-right"
                      style={{ marginBottom: '8px', fontSize: '18px' }}
                    >
                      {MIN_VALUE.toString()} $DeHub
                    </Text>
                    {/* <Text
                      className="text-right"
                      style={{ marginBottom: '8px' , fontSize:'18px'}}
                    >
                      {MAX_VALUE.toString()} $DeHub
                    </Text> */}
                    <Text
                      className="text-right"
                      style={{ marginBottom: '8px', fontSize: '18px' }}
                    >
                      {getFullDisplayBalance(
                        bridgeBalance,
                        DEHUB_DECIMALS,
                        DEHUB_DISPLAY_DECIMALS
                      )}{' '}
                      $DeHub
                    </Text>
                  </>
                </div>
              </div>
            </div>
          </div>

          <div className="grid mt-2 justify-content-center">
            <div>
              {!account ? (
                <ConnectWalletButton />
              ) : (
                <div className="flex flex-column">
                  <Button
                    className="p-button mt-2 justify-content-center mr-5 ml-5"
                    style={{ fontSize: '22px' }}
                    onClick={() => {
                      approved ? send() : approve();
                    }}
                    loading={isTxPending}
                    disabled={!isReady || !isValidAmount || isTxPending}
                    label={approved ? 'Send' : 'Approve'}
                  />
                </div>
              )}
            </div>
          </div>
          {sendTx ? (
            <div className="flex align-self-end">
              <Link to={`https://testnet.layerzeroscan.com/tx/${sendTx}`}>
                Transaction Link
              </Link>
            </div>
          ) : null}
        </Box>
      </Card>
    </>
  );
};

export default MyBridgeBox;
function updatePool() {
  throw new Error('Function not implemented.');
}

function updateUser() {
  throw new Error('Function not implemented.');
}
