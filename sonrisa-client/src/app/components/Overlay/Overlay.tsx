import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren, useEffect } from 'react';
import styles from './Overlay.module.scss';

type OverlayProps = PropsWithChildren<{
  isOpen: boolean;

  setIsOpen: (isOpen: boolean) => void;
}>;

const templateVariants = {
  enter: {
    y: '100%',
  },
  center: {
    y: '0%',
  },
  exit: {
    y: '100%',
  },
};

const containerVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const Overlay = ({
  children,
  setIsOpen,
  isOpen = false,
}: OverlayProps) => {
  const close = (event: React.MouseEvent) => {
    if (!(event.target as Element).classList.contains(styles.overlayInner)) {
      return;
    }

    setIsOpen(false);
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) {
      return;
    }

    body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlayContainer}
          initial="enter"
          animate="center"
          exit="exit"
          variants={containerVariants}
          onClick={close}
        >
          <motion.div
            className={styles.overlayInner}
            initial="enter"
            animate="center"
            exit="exit"
            variants={templateVariants}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
