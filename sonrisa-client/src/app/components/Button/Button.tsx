import { useState } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  text: string;

  size?: 'lg' | 'md' | 'sm';

  isFullWidth?: boolean;

  onClick?: () => void;
};

export const Button = ({
  text,
  isFullWidth = true,
  size = 'md',
  onClick,
}: ButtonProps) => {
  const [buttonEl, setButtonEl] = useState<HTMLButtonElement>();

  const clicked = (event: React.MouseEvent) => {
    if (!onClick || !buttonEl) {
      return;
    }

    buttonEl.blur();
    onClick();
  };

  return (
    <button
      className={`app-btn ${styles.btn} ${styles[`btn-${size}`]} ${
        isFullWidth ? styles.btnFullWidth : ''
      }`}
      onClick={clicked}
      ref={(el: HTMLButtonElement) => setButtonEl(el)}
    >
      {text}
    </button>
  );
};
