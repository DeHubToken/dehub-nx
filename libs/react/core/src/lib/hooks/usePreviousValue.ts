import { useEffect, useRef } from 'react';

/**
 * Returns the previous value of the given value
 *
 * @see https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 */
export const usePreviousValue = (value: number | Date) => {
  const ref = useRef<number | Date | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
