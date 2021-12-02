import { useEffect, useRef, useState } from 'react';
import { BSC_BLOCK_TIME } from '../config';
import { simpleRpcProvider } from '../utils/contractHelpers';

/**
 * Returns a countdown in seconds of a given block
 */
const useBlockCountdown = (blockNumber: number) => {
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const startCountdown = async () => {
      const currentBlock = await simpleRpcProvider.getBlockNumber();

      if (blockNumber > currentBlock) {
        if (!mountedRef.current) {
          return;
        }
        setSecondsRemaining((blockNumber - currentBlock) * BSC_BLOCK_TIME);

        // Clear previous interval
        if (timer.current) {
          clearInterval(timer.current);
        }

        timer.current = setInterval(() => {
          if (!mountedRef.current) {
            return;
          }
          setSecondsRemaining(prevSecondsRemaining => {
            if (prevSecondsRemaining === 1) {
              clearInterval(timer.current as NodeJS.Timeout);
            }

            return prevSecondsRemaining - 1;
          });
        }, 1000);
      }
    };

    startCountdown();

    return () => {
      clearInterval(timer.current as NodeJS.Timeout);
    };
  }, [setSecondsRemaining, blockNumber, timer]);

  return secondsRemaining;
};

export default useBlockCountdown;
