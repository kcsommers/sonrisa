import styles from './Button.module.scss';

export interface ButtonProps {
  text: string;
}

export const Button = (props: ButtonProps) => {
  return <button className={styles.btn}>{props.text}</button>;
};
