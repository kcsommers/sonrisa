import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faExclamationCircle, faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Alert.module.scss';

interface IAlertProps {
  message: string;

  type?: 'info' | 'danger' | 'warning';
}

const alertIcons = {
  info: faInfo,

  danger: faExclamationCircle,

  warning: faExclamationCircle,
};

export const Alert = ({ message, type = 'info' }: IAlertProps) => {
  return (
    <div className={`${styles.alertWrap} ${styles[`alert${type}`]}`}>
      <div className={styles.alertInner}>
        <FontAwesomeIcon icon={alertIcons[type] as IconProp} />
        <span className={styles.alertMessage}>{message}</span>
      </div>
    </div>
  );
};
