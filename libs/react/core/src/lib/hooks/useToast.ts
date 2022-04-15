import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastsProvider';

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('Toasts context undefined');
  }

  return context;
};
