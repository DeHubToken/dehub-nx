import { createContext, ReactNode, useCallback, useState } from 'react';

export type ToastSeverityType = 'success' | 'info' | 'warn' | 'error';
type toastSignature = (title: string, description?: string) => void;
export interface ToastMetaMessage {
  title: string;
  description?: string;
  severity?: ToastSeverityType;
}

export interface ToastContextValue {
  toasts?: ToastMetaMessage[];
  clear?: () => void;
  remove?: (title: string) => void;
  toastError?: toastSignature;
  toastInfo?: toastSignature;
  toastWarning?: toastSignature;
  toastSuccess?: toastSignature;
}

const ToastContext = createContext<ToastContextValue>({});

interface ToastProviderProps {
  children?: ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastMetaMessage[]>([]);

  const toast = useCallback(
    ({ title, description, severity }: Omit<ToastMetaMessage, 'id'>) => {
      // check if already exist
      if (toasts.find(toast => toast.title === title)) {
        return;
      }

      setToasts(prevToasts => {
        // Remove any existing toasts with the same id
        const currentToasts = prevToasts.filter(
          prevToast => prevToast.title !== title
        );

        return [
          {
            title,
            description,
            severity,
          },
          ...currentToasts,
        ];
      });
    },
    [setToasts, toasts]
  );

  const toastError = useCallback(
    (title: string, description?: string) => {
      return toast({ title, description, severity: 'error' });
    },
    [toast]
  );

  const toastInfo = useCallback(
    (title: string, description?: string) => {
      return toast({ title, description, severity: 'info' });
    },
    [toast]
  );

  const toastWarning = useCallback(
    (title: string, description?: string) => {
      return toast({ title, description, severity: 'warn' });
    },
    [toast]
  );

  const toastSuccess = useCallback(
    (title: string, description?: string) => {
      return toast({ title, description, severity: 'success' });
    },
    [toast]
  );

  const clear = useCallback(() => {
    setToasts([]);
  }, []);

  const remove = useCallback((title: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.title !== title));
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        clear,
        remove,
        toastError,
        toastInfo,
        toastWarning,
        toastSuccess,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
