import { AppRouter } from './AppRouter';
import { Footer, Overlay, Cart } from '@components';

export const App = () => {
  return (
    <div className="app-container">
      <div style={{ maxWidth: '1980px', margin: '0 auto' }}>
        <AppRouter></AppRouter>
      </div>
      <Footer />
      <Overlay />
      <Cart />
    </div>
  );
};
