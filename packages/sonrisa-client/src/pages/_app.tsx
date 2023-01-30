import { useState } from 'react';
import { Header } from '../components/Header/Header';
import { SharedHead } from '../components/shared-head/SharedHead';
import '../styles/main.scss';

export default ({ Component }) => {
  const [cartVisible, setCartVisible] = useState(false);

  return (
    <>
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
    </>
  );
};
