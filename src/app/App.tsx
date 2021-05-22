import { AppRouter } from './AppRouter';
import { Footer } from '@components';
import { Overlay } from './components/Overlay/Overlay';

export const App = () => {
  return (
    <div className="app-container">
      <div style={{ maxWidth: '1980px', margin: '0 auto' }}>
        <AppRouter></AppRouter>
      </div>
      <Footer />
      <Overlay />
    </div>
  );
};
