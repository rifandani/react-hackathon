import { useEffect } from 'react';

/**
 * A hook that executes a function after the component is mounted.
 */
export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
