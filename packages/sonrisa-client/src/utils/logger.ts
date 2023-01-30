export const logger = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    console.log(...args);
  },

  error: (...args: any[]) => {
    console.error(...args);
  },
};
