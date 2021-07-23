import { AnimatePresence, motion } from 'framer-motion';
import {
  cloneElement,
  PropsWithChildren,
  ReactElement,
  useEffect,
} from 'react';
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
    const _classList = (event.target as Element).classList;
    if (
      !_classList.contains(styles.overlayInner) &&
      !_classList.contains('close-overlay')
    ) {
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
            {cloneElement(children as ReactElement, { closeOverlay: close })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
