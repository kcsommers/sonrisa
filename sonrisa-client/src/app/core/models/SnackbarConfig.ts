import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface ISnackbarConfig {
  message: string;

  icon: IconProp;

  iconColor: string;

  duration: number;
}
