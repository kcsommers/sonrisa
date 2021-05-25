import { useEffect } from 'react';
import { AppRouter } from './AppRouter';

export const App = () => {
  useEffect(() => {
    const btns = document.querySelectorAll('button');
    btns.forEach((b) => {
      b.addEventListener('click', () => b.blur());
    });
    return () => {};
  }, []);

  return (
    <div className="app-container">
      <AppRouter></AppRouter>
    </div>
  );
};
