import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'lg';
}

export const LoadingSpinner = ({ size = 'lg' }: LoadingSpinnerProps) => {
  return (
    <div
      className={`${styles.loadingSpinner}${
        size === 'xs'
          ? ` ${styles.loadingSpinnerXSmall}`
          : size === 'sm'
          ? ` ${styles.loadingSpinnerSmall}`
          : ''
      }`}
    ></div>
  );
};
