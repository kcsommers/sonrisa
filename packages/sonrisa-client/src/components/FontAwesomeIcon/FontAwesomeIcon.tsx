import {
  FontAwesomeIcon as FAIcon,
  type FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

/**
 * Wrapper that defaults className to '' so FA's internal className.split() doesn't throw during SSR.
 */
export function FontAwesomeIcon(props: FontAwesomeIconProps) {
  return <FAIcon {...props} className={props.className ?? ''} />;
}

export type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export type { IconProp } from '@fortawesome/fontawesome-svg-core';
