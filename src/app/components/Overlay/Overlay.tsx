import { OverlayTemplates } from '@core';
import { toggleOverlay, useAppDispatch, useAppSelector } from '@redux';
import { AnimatePresence, motion } from 'framer-motion';
import { getTemplate } from './overlay-templates';
import styles from './Overlay.module.scss';

export const Overlay = () => {
  const state = useAppSelector((state) => state.overlay);

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

  const close = () => {
    dispatch(
      toggleOverlay({
        isOpen: false,
        template: OverlayTemplates.NONE,
      })
    );
  };

  return state ? (
    <AnimatePresence>
      {state.isOpen && (
        <motion.div
          className={styles.overlayContainer}
          initial="enter"
          animate="center"
          exit="exit"
          variants={containerVariants}
          onClick={close.bind(this)}
        >
          <motion.div
            className={`${styles.templateWrap} max-1280`}
            initial="enter"
            animate="center"
            exit="exit"
            variants={templateVariants}
          >
            {getTemplate(state.template, null)}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  ) : null;
};
