import { useEffect, useCallback, useRef, useState } from 'react';

export interface IUseIntervalHook {
  resetInterval: () => void;

  toggleInterval: () => void;

  intervalIsRunning: boolean;
}

export const useInterval = (
  callback: () => void,
  delay: number,
  immediate: boolean
): IUseIntervalHook => {
  const savedCallback = useRef<() => void>();

  const intervalId = useRef(0);

  const [intervalIsRunning, setIntervalIsRunning] = useState(!!immediate);

  const clear = useCallback(() => {
    window.clearInterval(intervalId.current);
  }, []);

  const toggleInterval = useCallback(() => {
    console.log('[toggleInterval::::]', intervalIsRunning, immediate);
    setIntervalIsRunning(!intervalIsRunning);
  }, [intervalIsRunning]);

  const resetInterval = useCallback(() => {
    if (intervalId.current) {
      clear();
    }

    console.log('[resetInterval]:::: ', intervalIsRunning, delay);
    if (!intervalIsRunning) {
      return;
    }

    const tick = () => {
      if (!savedCallback.current) {
        return;
      }

      savedCallback.current();
    };

    if (delay !== null) {
      intervalId.current = window.setInterval(tick, delay);
    }
  }, [clear, intervalIsRunning, delay]);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    console.log('reset effect::::', intervalIsRunning);
    resetInterval();
  }, [intervalIsRunning, clear, resetInterval]);

  // cleanup
  useEffect(() => {
    console.log('init::::', intervalIsRunning, immediate);
    return () => {
      window.clearInterval(intervalId.current);
    };
  }, []);

  return { resetInterval, toggleInterval, intervalIsRunning };
};
