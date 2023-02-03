import '@fortawesome/fontawesome-svg-core/styles.css';
import { MutableRefObject, useState } from 'react';
import { Cart } from '../components/Cart/Cart';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { SharedHead } from '../components/shared-head/SharedHead';
import { StoreProvider } from '../context';
import '../styles/main.scss';

export default ({ Component }) => {
  const [cartVisible, setCartVisible] = useState(false);
  const [scrollRefs, setScrollRefs] = useState<{
    [refName: string]: MutableRefObject<HTMLElement>;
  }>(null);

  return (
    <StoreProvider>
      <SharedHead />
      <Header setCartVisible={setCartVisible} scrollRefs={scrollRefs} />
      <Component
        setScrollRefs={setScrollRefs}
        setCartVisible={setCartVisible}
      />
      <Cart isVisible={cartVisible} setIsVisible={setCartVisible} />
      <Footer />
    </StoreProvider>
  );
};
