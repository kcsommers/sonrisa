import { useAppDispatch, useAppSelector } from '@redux';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Overlay.module.scss';

export const Overlay = () => {
  const dispatch = useAppDispatch();

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
  };

  return (
    <AnimatePresence>
      {/* {state.isOpen && (
        <motion.div
          className={`${styles.overlayContainer} overlay-container`}
          initial="enter"
          animate="center"
          exit="exit"
          variants={containerVariants}
          onClick={close.bind(this)}
        >
          <motion.div
            initial="enter"
            animate="center"
            exit="exit"
            variants={templateVariants}
          >
            {getTemplate(state.template, state.context)}
          </motion.div>
        </motion.div>
      )} */}
    </AnimatePresence>
  );
};
