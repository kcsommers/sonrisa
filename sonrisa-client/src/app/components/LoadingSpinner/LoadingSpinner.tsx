import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  size?: 'sm' | 'lg';
}

export const LoadingSpinner = ({ size = 'lg' }: LoadingSpinnerProps) => {
  return (
    <div
      className={`${styles.loadingSpinner}${
        size === 'sm' ? ` ${styles.loadingSpinnerSmall}` : ''
      }`}
    ></div>
  );
};
