import env from '../../environment';

export const logger = {
  log: (...args: any[]) => {
    if (env.NODE_ENV !== 'development') {
      return;
    }

    console.log(...args);
  },

  error: (...args: any[]) => {
    console.error(...args);
  },
};
