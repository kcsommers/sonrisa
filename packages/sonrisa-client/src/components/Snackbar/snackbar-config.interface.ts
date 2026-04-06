import type { IconProp } from '../FontAwesomeIcon';
import React from 'react';

export interface ISnackbarConfig {
  message: string;
  icon: IconProp;
  iconColor: string;
  duration: number;
  onClick?: (event: React.MouseEvent) => void;
}
