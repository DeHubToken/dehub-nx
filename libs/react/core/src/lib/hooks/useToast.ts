import { useContext } from 'react';
import { ToastContext, ToastContextValue } from '../contexts/ToastsProvider';

export const useToast = (): ToastContextValue & { isToastEnabled: boolean } => {
  const context = useContext(ToastContext);
  if (!context) {
    return { isToastEnabled: false };
  }

  return { ...context, isToastEnabled: true };
};
