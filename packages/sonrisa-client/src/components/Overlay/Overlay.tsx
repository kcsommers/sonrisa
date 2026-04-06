'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Overlay.module.scss';

type OverlayProps = PropsWithChildren<{
  isOpen: boolean;

  setIsOpen: (isOpen: boolean) => void;
}>;

export const Overlay = ({
  children,
  setIsOpen,
  isOpen = false,
}: OverlayProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) {
      return;
    }

    body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const onContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
      return;
    }
    if ((event.target as HTMLElement).closest?.('.close-overlay')) {
      setIsOpen(false);
    }
  };

  if (!mounted) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={styles.overlayContainer}
      onClick={onContainerClick}
      role='presentation'
    >
      <div className={styles.overlayInner}>
        <div className={styles.overlaySheet}>{children}</div>
      </div>
    </div>,
    document.body
  );
};
