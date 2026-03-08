'use client';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { Cart } from '../components/Cart/Cart';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { AuthContextProvider, StoreProvider } from '../context';
import { ShellProvider } from '../context/shell/shell-context';
import '../styles/main.scss';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <StoreProvider>
        <ShellProvider>
          <Header />
          {children}
          <Cart />
          <Footer />
        </ShellProvider>
      </StoreProvider>
    </AuthContextProvider>
  );
}
