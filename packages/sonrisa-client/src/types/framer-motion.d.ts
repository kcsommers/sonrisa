import type { ReactNode } from 'react';

declare module 'framer-motion' {
  export interface AnimatePresenceProps {
    children?: ReactNode;
    mode?: 'sync' | 'wait' | 'popLayout';
  }
}
