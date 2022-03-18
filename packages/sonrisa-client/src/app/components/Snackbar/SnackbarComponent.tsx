import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { getColor } from '../../utils';
import { ISnackbarConfig } from './snackbar-config.interface';
import styles from './SnackbarComponent.module.scss';

type SnackbarProps = {
  config: ISnackbarConfig;
  isVisible: boolean;
};

const variants = {
  enter: {
    opacity: 0,
    scale: 0.75,
    x: '-50%',
  },
  center: {
    opacity: 1,
    scale: 1,
    x: '-50%',
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    x: '-50%',
  },
};

export const SnackbarComponent = ({ config, isVisible }: SnackbarProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.snackbarWrap}
          style={{
            cursor: !!config.onClick ? 'pointer' : 'initial',
          }}
          initial="enter"
          animate="center"
          transition={{
            default: { duration: 1, type: 'spring', bounce: 0.55 },
          }}
          exit="exit"
          variants={variants}
          onClick={config.onClick}
        >
          {!!config.icon && (
            <FontAwesomeIcon
              icon={config.icon}
              color={getColor(config.iconColor)}
            ></FontAwesomeIcon>
          )}
          <span>{config.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
