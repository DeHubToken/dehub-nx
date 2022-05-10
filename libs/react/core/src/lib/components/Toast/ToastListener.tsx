import { Toast, ToastMessage } from 'primereact/toast';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ToastMetaMessage } from '../../contexts/ToastsProvider';
import { useToast } from '../../hooks/useToast';

const ToastListener = () => {
  const { isToastEnabled, toasts, remove } = useToast();
  const [prevToasts, setPrevToasts] = useState<ToastMetaMessage[]>([]);

  const toast = useRef<Toast>(null);

  const onRemove = useCallback(
    (message: ToastMessage) => {
      if (isToastEnabled && remove) remove(message.summary as string);
    },
    [isToastEnabled, remove]
  );

  useEffect(() => {
    if (toast && toasts) {
      const diff = toasts.filter(
        toast => !prevToasts.find(prevToast => prevToast.title === toast.title)
      );

      if (diff.length > 0) {
        toast?.current?.show(
          diff.map(toast => ({
            summary: toast.title,
            detail: toast.description,
            severity: toast.severity,
            life: 4000,
          }))
        );
      }
      setPrevToasts(toasts);
    }
  }, [toast, prevToasts, toasts]);

  return <Toast ref={toast} onRemove={onRemove} />;
};

export default ToastListener;
