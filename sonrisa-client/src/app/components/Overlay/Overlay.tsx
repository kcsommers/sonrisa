import { useAppDispatch, useAppSelector } from '@redux';
import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import styles from './Overlay.module.scss';

type OverlayProps = PropsWithChildren<{
  isOpen: boolean;

  onClose: () => void;
}>;

export const Overlay = ({
  children,
  onClose,
  isOpen = false,
}: OverlayProps) => {
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

  const close = (event: React.MouseEvent) => {
    if (!(event.target as Element).classList.contains('overlay-container')) {
      return;
    }

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`${styles.overlayContainer} overlay-container`}
          initial="enter"
          animate="center"
          exit="exit"
          variants={containerVariants}
          onClick={close}
        >
          <motion.div
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
