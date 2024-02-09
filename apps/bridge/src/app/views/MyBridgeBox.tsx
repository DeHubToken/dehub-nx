import { ConnectWalletButton, useWeb3Context } from '@dehub/react/core';
import { Box, Text } from '@dehub/react/ui';
import { DEHUB_DECIMALS, DEHUB_DISPLAY_DECIMALS } from '@dehub/shared/model';
import { ethersToBigNumber, getFullDisplayBalance } from '@dehub/shared/utils';
import { Interface } from '@ethersproject/abi';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import { ContractReceipt, Event } from '@ethersproject/contracts';
import { id } from '@ethersproject/hash';
import BigNumber from 'bignumber.js';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChainSelector } from '../components/ChainSelector';
import { CHAININFO, FEE, MIN_VALUE } from '../constants/chains';
import { useBridgeContract, useDehubTokenContract } from '../hooks/useContract';
import { useApproved } from '../hooks/useTokenBalance';
import { useAppDispatch } from '../state';
import { setTokenAmount } from '../state/application';
import {
  useDstChain,
  useSourceChain,
  useTokenAmount,
  useValidAmount,
} from '../state/application/hooks';

const MyBridgeBox = () => {
  const { account } = useWeb3Context();
  // const stakingContract = usePickStakingContract();

  // const [, setOpenStakeModal] = useState<boolean>(false);
  // const [, setOpenUnstakeModal] = useState<boolean>(false);
  // const [openRestakeModal, setOpenRestakeModal] = useState<boolean>(false);
  const [isTxPending, setIsTxPending] = useState(false);
  // const [, setValue] = useState<string>('0.00');
  // const [errorMessage] = useState<string | null>(null);
  const { chain: sourceChain } = useSourceChain();
  const { chain: dstChain } = useDstChain();
  const dehubTokenContract = useDehubTokenContract();
  // const { bridgeBalance } = useGetDehubBalance();
  const bridgeContract = useBridgeContract();
  const { approved } = useApproved();
  const { amount } = useTokenAmount();
  const isValidAmount = useValidAmount();
  const [sendTx, setSendTx] = useState<string>('');
  const dispatch = useAppDispatch();

  const toast = useRef<Toast>(null);

  const isReady = useMemo(() => {
    return account != null && sourceChain && dstChain;
  }, [account, sourceChain, dstChain]);

  useEffect(() => {
    // ToDo : change the network on metamask
    // alert('network changed');
  }, [sourceChain]);

  const send = async () => {
    if (!bridgeContract || !sourceChain || !dstChain) return;
    try {
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
          value: EthersBigNumber.from(
            BigNumber(amount)
              .multipliedBy(Math.pow(10, 18))
              .multipliedBy(FEE[sourceChain.chainID])
              .toFixed(0)
              .toString()
          ),
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
                )} $DHB has been successfully approved!`}
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

  // const handleClaim = async () => {
  //   if (!stakingContract) return;

  //   try {
  //     const ClaimedTopic = id('Claimed(address,uint256)');
  //     const ClaimedInterface = new Interface([
  //       'event Claimed(address indexed user, uint256 amount)',
  //     ]);

  //     setIsTxPending(true);
  //     const tx = await stakingContract['claim']();
  //     await tx.wait().then((receipt: ContractReceipt) => {
  //       updatePool();
  //       updateUser();

  //       const events = receipt.events?.filter(
  //         (event: Event) => event.topics[0] === ClaimedTopic
  //       );
  //       const lastEvent =
  //         events && events.length > 0 ? events.slice(-1)[0] : undefined;
  //       if (!lastEvent) return;

  //       const parsed = ClaimedInterface.parseLog(lastEvent);

  //       toast?.current?.show({
  //         severity: 'success',
  //         summary: `Success`,
  //         detail: (
  //           <Box>
  //             <Text style={{ marginBottom: '8px', fontSize: '18px' }}>
  //               {`${getFullDisplayBalance(
  //                 ethersToBigNumber(parsed.args['amount']),
  //                 DEHUB_DECIMALS,
  //                 DEHUB_DISPLAY_DECIMALS
  //               )} $DHB has been successfully claimed!`}
  //             </Text>
  //           </Box>
  //         ),
  //         life: 4000,
  //       });
  //     });
  //   } catch (error) {
  //     let errMsg;
  //     if (error instanceof Error && error.message) {
  //       errMsg = error.message;
  //     } else if ((error as { data: { message: string } }).data.message) {
  //       errMsg = (error as { data: { message: string } }).data.message;
  //     } else {
  //       console.error(error);
  //       throw new Error('unknown error during handling claim');
  //     }
  //     toast?.current?.show({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: `Staking failed - ${errMsg}`,
  //       life: 4000,
  //     });
  //   }
  //   setIsTxPending(false);
  // };

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
            <div className="w-full flex flex-column align-center text-center">
              {/* <div
                className="w-full flex align-center"
                style={{
                  marginBottom: '8px',
                  fontSize: '18px',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ marginRight: '5px', fontSize: '18px' }}>
                  FEE :
                </Text>
                <Text style={{ fontSize: '18px' }}>0.3 BNB</Text>
              </div> */}
              <div
                className="flex align-center"
                style={{
                  marginBottom: '8px',
                  fontSize: '18px',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ marginRight: '5px', fontSize: '18px' }}>
                  {window?.innerWidth <= 768 ? 'Min' : 'Minimum'}:
                </Text>
                <Text style={{ fontSize: '18px' }}>
                  {MIN_VALUE.toString()} $DHB
                </Text>
              </div>
              <div
                className="flex align-center"
                style={{
                  marginBottom: '8px',
                  fontSize: '18px',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ marginRight: '5px', fontSize: '18px' }}>
                  {window?.innerWidth <= 768 ? 'Max' : 'Maximum Amount'}:
                </Text>
                <Text style={{ fontSize: '18px' }}>
                  {/* {getFullDisplayBalance(
                      bridgeBalance,
                      DEHUB_DECIMALS,
                      DEHUB_DISPLAY_DECIMALS
                    )} */}
                  {'8,000,000,000'} $DHB
                </Text>
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
              <Link to={`https://layerzeroscan.com/tx/${sendTx}`}>
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
// function updatePool() {
//   throw new Error('Function not implemented.');
// }

// function updateUser() {
//   throw new Error('Function not implemented.');
// }
