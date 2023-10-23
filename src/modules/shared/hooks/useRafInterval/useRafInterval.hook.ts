import { isNumber } from '@rifandani/nxact-yutiriti';
import { useCallback, useEffect, useRef } from 'react';
import { useLatest } from '../useLatest/useLatest.hook';

interface Handle {
  id: number | NodeJS.Timer;
}

const setRafInterval = (callback: () => void, delay = 0): Handle => {
  if (typeof requestAnimationFrame === typeof undefined) {
    return {
      id: setInterval(callback, delay),
    };
  }
  let start = new Date().getTime();
  const handle: Handle = {
    id: 0,
  };
  const loop = () => {
    const current = new Date().getTime();
    if (current - start >= delay) {
      callback();
      start = new Date().getTime();
    }
    handle.id = requestAnimationFrame(loop);
  };
  handle.id = requestAnimationFrame(loop);
  return handle;
};

function cancelAnimationFrameIsNotDefined(t: unknown): t is NodeJS.Timer {
  return typeof cancelAnimationFrame === typeof undefined;
}

const clearRafInterval = (handle: Handle) => {
  if (cancelAnimationFrameIsNotDefined(handle.id)) {
    /** @ts-expect-error ignore it */
    clearInterval(handle.id);
    return;
  }
  cancelAnimationFrame(handle.id);
};

/**
 * A hook implements with `requestAnimationFrame` for better performance. The API is consistent with `useInterval`, the advantage is that the execution of the timer can be stopped when the page is not rendering, such as page hiding or minimization.
 *
 * Please note that the following two cases are likely to be inapplicable, and `useInterval` is preferred:
 *
 * - the time interval is less than `16ms`
 * - want to execute the timer when page is not rendering;
 *
 * `requestAnimationFrame` will automatically downgrade to `setInterval` in node environment
 */
export function useRafInterval(
  fn: () => void,
  delay: number | undefined,
  options?: {
    immediate?: boolean;
  },
) {
  const immediate = options?.immediate;

  const fnRef = useLatest(fn);
  const timerRef = useRef<Handle>();

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) {
      return;
    }
    if (immediate) {
      fnRef.current();
    }
    timerRef.current = setRafInterval(() => {
      fnRef.current();
    }, delay);

    // eslint-disable-next-line consistent-return
    return () => {
      if (timerRef.current) {
        clearRafInterval(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearRafInterval(timerRef.current);
    }
  }, []);

  return clear;
}
