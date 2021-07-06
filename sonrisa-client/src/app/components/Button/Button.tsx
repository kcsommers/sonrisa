import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import styles from './Button.module.scss';

type ButtonProps = {
  text: string;

  size?: 'lg' | 'md' | 'sm';

  isFullWidth?: boolean;

  showSpinner?: boolean;

  onClick?: () => void;
};

export const Button = ({
  text,
  isFullWidth = true,
  size = 'md',
  showSpinner = false,
  onClick,
}: ButtonProps) => {
  const [buttonEl, setButtonEl] = useState<HTMLButtonElement>();

  const clicked = (event: React.MouseEvent) => {
    if (!onClick || !buttonEl || showSpinner) {
      return;
    }

    buttonEl.blur();
    onClick();
  };

  useEffect(() => {
    if (!buttonEl) {
      return;
    }

    const _btnWidth = buttonEl.getBoundingClientRect().width;
    buttonEl.style.minWidth = `${_btnWidth}px`;
  }, [buttonEl]);

  return (
    <button
      className={`app-btn ${styles.btn} ${styles[`btn-${size}`]} ${
        isFullWidth ? styles.btnFullWidth : ''
      }`}
      onClick={clicked}
      ref={(el: HTMLButtonElement) => setButtonEl(el)}
    >
      {showSpinner ? <LoadingSpinner size="xs" /> : text}
    </button>
  );
};
