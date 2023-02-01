import '@fortawesome/fontawesome-svg-core/styles.css';
import { useState } from 'react';
import { Cart } from '../components/Cart/Cart';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { SharedHead } from '../components/shared-head/SharedHead';
import { StoreProvider } from '../context';
import '../styles/main.scss';

export default ({ Component }) => {
  const [cartVisible, setCartVisible] = useState(false);

  return (
    <StoreProvider>
      <SharedHead />
      <Header
        setCartVisible={setCartVisible}
        // scrollRefs={{
        //   ABOUT: aboutScrollRef as MutableRefObject<HTMLElement>,
        //   CONTACT: contactScrollRef as MutableRefObject<HTMLElement>,
        //   ORDER: orderScrollRef as MutableRefObject<HTMLElement>,
        //   PHOTOS: photosScrollRef as MutableRefObject<HTMLElement>,
        // }}
      />
      <Component />
      <Cart isVisible={cartVisible} setIsVisible={setCartVisible} />
      <Footer />
    </StoreProvider>
  );
};
