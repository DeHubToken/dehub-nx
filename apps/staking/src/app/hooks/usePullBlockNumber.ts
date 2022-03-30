import { useDebounce, useIsBrowserTabActive } from '@dehub/react/core';
import { useCallback, useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useAppDispatch } from '../state';
import { updateBlockNumber } from '../state/application';

const usePullBlockNumber = () => {
  const dispatch = useAppDispatch();
  const { chainId, web3 } = useMoralis();

  const isTabActive = useIsBrowserTabActive();

  const [state, setState] = useState<{
    chainId: string | null;
    blockNumber: number | null;
  }>({
    chainId,
    blockNumber: null,
  });

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState(prev => {
        if (chainId === prev.chainId) {
          if (typeof prev.blockNumber !== 'number')
            return {
              chainId,
              blockNumber,
            };
          return {
            chainId,
            blockNumber: Math.max(blockNumber, prev.blockNumber),
          };
        }
        return prev;
      });
    },
    [chainId, setState]
  );

  useEffect(() => {
    if (!web3 || !chainId || !isTabActive) return undefined;

    setState({ chainId, blockNumber: null });

    web3.getBlockNumber().then(blockNumberCallback);
    web3.on('block', blockNumberCallback);

    return () => {
      web3.removeListener('block', blockNumberCallback);
    };
  }, [web3, chainId, isTabActive, blockNumberCallback]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber || !isTabActive)
      return;
    dispatch(
      updateBlockNumber({
        chainId: debouncedState.chainId,
        blockNumber: debouncedState.blockNumber,
      })
    );
  }, [
    dispatch,
    isTabActive,
    debouncedState.chainId,
    debouncedState.blockNumber,
  ]);
};

export default usePullBlockNumber;
