import { useEffect, useRef } from 'react';

// Check if the tab is active in the user browser
export const useIsBrowserTabActive = () => {
  const isBrowserTabActiveRef = useRef(true);

  useEffect(() => {
    const onVisibilityChange = () => {
      isBrowserTabActiveRef.current = !document.hidden;
    };

    window.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return isBrowserTabActiveRef;
};
