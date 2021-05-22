import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import cancelBtn from '@images/icons/cancel-big.svg';
import { toggleOverlay } from '@redux/actions';
import '@css/components/Overlay.css';
import { FunctionComponent } from 'react';

type Overlay = {};

export const Overlay: FunctionComponent = () => {
  const overlayConfig = useSelector((state) => state.overlay);

  const dispatch = useDispatch();

  const closeOverlay = () => {
    if (overlayConfig.onClose) {
      overlayConfig.onClose();
    }
    dispatch(toggleOverlay({ isOpen: false, template: null, sign: null }));
  };

  const variants = {
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

  return (
    <AnimatePresence>
      {overlayConfig.isOpen && (
        <motion.div
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          className="overlay-container"
        >
          {overlayConfig.template}
          {overlayConfig.canClose && (
            <img
              className="close-btn"
              src={cancelBtn}
              alt="Close"
              onClick={closeOverlay.bind(this)}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
