'use client';

import { createContext, useContext, useState } from 'react';
import type { MutableRefObject } from 'react';

export type ScrollRefs = {
  [refName: string]: MutableRefObject<HTMLElement | null | undefined>;
};

type ShellContextValue = {
  cartVisible: boolean;
  setCartVisible: (v: boolean) => void;
  scrollRefs: ScrollRefs | null;
  setScrollRefs: (refs: ScrollRefs | null) => void;
};

const ShellContext = createContext<ShellContextValue | null>(null);

export function ShellProvider({ children }: { children: React.ReactNode }) {
  const [cartVisible, setCartVisible] = useState(false);
  const [scrollRefs, setScrollRefs] = useState<ScrollRefs | null>(null);

  return (
    <ShellContext.Provider
      value={{ cartVisible, setCartVisible, scrollRefs, setScrollRefs }}
    >
      {children}
    </ShellContext.Provider>
  );
}

export function useShell() {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error('useShell must be used within ShellProvider');
  return ctx;
}
