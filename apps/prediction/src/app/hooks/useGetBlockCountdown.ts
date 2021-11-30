import { useEffect, useRef, useState } from 'react';
import { Hooks } from '@dehub/react/core';
import { BSC_BLOCK_TIME } from '../config';
import { Constants } from '@dehub/shared/config';
import { getChainId } from '../config/constants';

/**
 * Returns a countdown in seconds of a given block
 */
const useBlockCountdown = (blockNumber: number) => {
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  const { authProvider, chainId } = Hooks.useMoralisEthers();

  useEffect(() => {
    const startCountdown = async () => {
      if (
        authProvider &&
        chainId === '0x' + Constants[getChainId()].CHAIN_ID_HEX
      ) {
        const currentBlock = await authProvider.getBlockNumber();

        if (blockNumber > currentBlock) {
          setSecondsRemaining((blockNumber - currentBlock) * BSC_BLOCK_TIME);

          // Clear previous interval
          if (timer.current) {
            clearInterval(timer.current);
          }

          timer.current = setInterval(() => {
            setSecondsRemaining(prevSecondsRemaining => {
              if (prevSecondsRemaining === 1) {
                clearInterval(timer.current as NodeJS.Timeout);
              }

              return prevSecondsRemaining - 1;
            });
          }, 1000);
        }
      }
    };

    startCountdown();

    return () => {
      clearInterval(timer.current as NodeJS.Timeout);
    };
  }, [setSecondsRemaining, blockNumber, authProvider, timer, chainId]);

  return secondsRemaining;
};

export default useBlockCountdown;
