import styles from './Button.module.scss';

export interface ButtonProps {
  text: string;

  size: 'lg' | 'md' | 'sm';

  isFullWidth: boolean;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${styles[`btn-${props.size}`]} ${
        props.isFullWidth ? styles.btnFullWidth : ''
      }`}
    >
      {props.text}
    </button>
  );
};
