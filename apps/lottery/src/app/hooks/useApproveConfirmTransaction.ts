import { useEffect, useReducer, useRef } from 'react';
import { Hooks } from '@dehub/react/core';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

type LoadingState = 'idle' | 'loading' | 'success' | 'fail';

type Action =
  | { type: 'idle' }
  | { type: 'requires_approval' }
  | { type: 'approve_sending' }
  | { type: 'approve_receipt' }
  | { type: 'approve_error' }
  | { type: 'confirm_sending' }
  | { type: 'confirm_receipt' }
  | { type: 'confirm_error' };

interface State {
  approvalState: LoadingState;
  confirmState: LoadingState;
}

const initialState: State = {
  approvalState: 'idle',
  confirmState: 'idle',
};

const reducer = (state: State, actions: Action): State => {
  switch (actions.type) {
    case 'idle':
      return {
        ...state,
        approvalState: 'idle',
      };
    case 'requires_approval':
      return {
        ...state,
        approvalState: 'success',
      };
    case 'approve_sending':
      return {
        ...state,
        approvalState: 'loading',
      };
    case 'approve_receipt':
      return {
        ...state,
        approvalState: 'success',
      };
    case 'approve_error':
      return {
        ...state,
        approvalState: 'fail',
      };
    case 'confirm_sending':
      return {
        ...state,
        confirmState: 'loading',
      };
    case 'confirm_receipt':
      return {
        ...state,
        confirmState: 'success',
      };
    case 'confirm_error':
      return {
        ...state,
        confirmState: 'fail',
      };
    default:
      return state;
  }
};

interface OnSuccessProps {
  state: State;
  receipt: ethers.providers.TransactionReceipt;
}

interface ApproveConfirmTransaction {
  onApprove: () => Promise<ethers.providers.TransactionResponse>;
  onConfirm: () => Promise<ethers.providers.TransactionResponse>;
  onRequiresApproval?: (
    web3Provider: Web3Provider,
    account: string
  ) => Promise<boolean>;
  onSuccess: ({ state, receipt }: OnSuccessProps) => void;
  onApproveSuccess?: ({ state, receipt }: OnSuccessProps) => void;
  onToast?: (severity: string, detail: string) => void;
}

const useApproveConfirmTransaction = ({
  onApprove,
  onConfirm,
  onRequiresApproval,
  onSuccess, // = noop,
  onApproveSuccess, // = noop,
  onToast,
}: ApproveConfirmTransaction) => {
  const { account, authProvider } = Hooks.useMoralisEthers();
  const [state, dispatch] = useReducer(reducer, initialState);
  // https://stackoverflow.com/questions/56450975/to-fix-cancel-all-subscriptions-and-asynchronous-tasks-in-a-useeffect-cleanup-f
  const mountedRef = useRef(true);

  const handlePreApprove = useRef(onRequiresApproval);

  useEffect(() => {
    mountedRef.current = true;
    if (account && handlePreApprove.current && authProvider) {
      handlePreApprove.current(authProvider, account).then(result => {
        console.log('handlePreApprove,', result, mountedRef.current);
        if (!mountedRef.current) {
          return;
        }
        if (result) {
          dispatch({ type: 'requires_approval' });
        } else {
          dispatch({ type: 'idle' });
        }
      });
    }
    return () => {
      mountedRef.current = false;
    };
  }, [account, authProvider, handlePreApprove]);

  return {
    isApproving: state.approvalState === 'loading',
    isApproved: state.approvalState === 'success',
    isConfirming: state.confirmState === 'loading',
    isConfirmed: state.confirmState === 'success',
    handleApprove: async () => {
      try {
        const tx = await onApprove();
        dispatch({ type: 'approve_sending' });
        const receipt = await tx.wait();
        if (receipt.status) {
          dispatch({ type: 'approve_receipt' });
          onApproveSuccess && onApproveSuccess({ state, receipt });
        }
      } catch (error) {
        dispatch({ type: 'approve_error' });
        onToast &&
          onToast(
            'error',
            'Please try again. Confirm the transaction and make sure you are paying enough gas!'
          );
      }
    },
    handleConfirm: async () => {
      dispatch({ type: 'confirm_sending' });
      try {
        const tx = await onConfirm();
        const receipt = await tx.wait();
        if (receipt.status) {
          dispatch({ type: 'confirm_receipt' });
          onSuccess({ state, receipt });
        }
      } catch (error) {
        dispatch({ type: 'confirm_error' });
        onToast &&
          onToast(
            'error',
            'Please try again. Confirm the transaction and make sure you are paying enough gas!'
          );
      }
    },
  };
};

export default useApproveConfirmTransaction;
