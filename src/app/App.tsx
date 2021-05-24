import { AppRouter } from './AppRouter';
import { Footer, Overlay, Cart } from '@components';

export const App = () => {
  return (
    <div className="app-container">
      <div
        style={{
          maxWidth: '1980px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          backgroundColor: '#fff',
        }}
      >
        <AppRouter></AppRouter>
      </div>
      <Footer />
      <Overlay />
      <Cart />
    </div>
  );
};
