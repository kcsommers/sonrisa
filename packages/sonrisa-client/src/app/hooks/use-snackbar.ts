import { useState } from 'react';
import { ISnackbarConfig } from '../components';

interface ISnackbarHook {
  snackbarVisible: boolean;
  snackbarConfig: ISnackbarConfig;
  setSnackbarVisible: (config: ISnackbarConfig) => void;
}

export const useSnackbar = (): ISnackbarHook => {
  const [isVisible, setIsVisible] = useState(false);

  const [snackbarConfig, setSnackbarConfig] = useState<ISnackbarConfig>();

  const setSnackbarVisible = (config: ISnackbarConfig): void => {
    setSnackbarConfig(config);
    setIsVisible(true);

    window.setTimeout(() => {
      setIsVisible(false);
    }, config.duration || 1000);
  };

  return {
    snackbarVisible: isVisible,
    snackbarConfig: snackbarConfig as ISnackbarConfig,
    setSnackbarVisible,
  };
};
