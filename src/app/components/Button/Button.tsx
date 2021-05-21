import styles from './Button.module.scss';

export interface ButtonProps {
  text: string;

  size: 'lg' | 'md' | 'sm';
}

export const Button = (props: ButtonProps) => {
  return (
    <button className={`${styles.btn} ${styles[`btn-${props.size}`]}`}>
      {props.text}
    </button>
  );
};
