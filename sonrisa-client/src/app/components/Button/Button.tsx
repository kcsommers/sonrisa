import { useEffect, useRef, useState } from 'react';
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
  const buttonEl = useRef<HTMLButtonElement>();

  const clicked = (event: React.MouseEvent) => {
    if (!onClick || !buttonEl.current || showSpinner) {
      return;
    }

    buttonEl.current.blur();
    onClick();
  };

  useEffect(() => {
    if (!buttonEl.current) {
      return;
    }

    const _btnWidth = buttonEl.current.getBoundingClientRect().width;
    buttonEl.current.style.minWidth = `${_btnWidth}px`;
  }, [buttonEl]);

  return (
    <button
      className={`app-btn ${styles.btn} ${styles[`btn-${size}`]} ${
        isFullWidth ? styles.btnFullWidth : ''
      }`}
      onClick={clicked}
      ref={(el: HTMLButtonElement) => (buttonEl.current = el)}
    >
      {showSpinner ? <LoadingSpinner size="xs" /> : text}
    </button>
  );
};
