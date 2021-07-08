import { getColor } from '@core';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'lg';

  color?: string;
}

export const LoadingSpinner = ({ size = 'lg', color }: LoadingSpinnerProps) => {
  return (
    <div
      className={`${styles.loadingSpinner}${
        size === 'xs'
          ? ` ${styles.loadingSpinnerXSmall}`
          : size === 'sm'
          ? ` ${styles.loadingSpinnerSmall}`
          : ''
      }`}
      style={{
        borderLeftColor: `rgba(${getColor(color || 'yellow', true)}, 0.3)`,
        borderRightColor: `rgba(${getColor(color || 'yellow', true)}, 0.3)`,
        borderBottomColor: `rgba(${getColor(color || 'yellow', true)}, 0.3)`,
        borderTopColor: getColor(color || 'yellow'),
      }}
    ></div>
  );
};
