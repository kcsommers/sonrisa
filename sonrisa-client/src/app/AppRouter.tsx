import { Cart, Footer, Header } from '@components';
import { MutableRefObject, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ScrollRefNames } from '@core';
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage';
import { HomePage } from './pages/HomePage/HomePage';
import { OrderSuccessPage } from './pages/OrderSuccessPage/OrderSuccessPage';

export const AppRouter = () => {
  const [cartVisible, setCartVisible] = useState(false);

  const aboutScrollRef = useRef<HTMLElement>();

  const contactScrollRef = useRef<HTMLElement>();

  const orderScrollRef = useRef<HTMLElement>();

  const setScrollRef = (elName: string, el: HTMLElement): void => {
    switch (elName) {
      case ScrollRefNames.ABOUT: {
        aboutScrollRef.current = el;
        return;
      }
      case ScrollRefNames.CONTACT: {
        contactScrollRef.current = el;
        return;
      }
      case ScrollRefNames.ORDER: {
        orderScrollRef.current = el;
        return;
      }
    }
  };

  return (
    <Router>
      <Header
        setCartVisible={setCartVisible}
        scrollRefs={{
          ABOUT: aboutScrollRef as MutableRefObject<HTMLElement>,
          CONTACT: contactScrollRef as MutableRefObject<HTMLElement>,
          ORDER: orderScrollRef as MutableRefObject<HTMLElement>,
        }}
      />
      <div
        style={{
          maxWidth: '1980px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          backgroundColor: '#fff',
        }}
      >
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <HomePage
                {...props}
                setScrollRef={setScrollRef}
                setCartVisible={setCartVisible}
              />
            )}
          />
          <Route
            exact
            path="/checkout"
            render={(props) => <CheckoutPage {...props} />}
          />
          <Route exact path="/checkout/complete" component={OrderSuccessPage} />
        </Switch>
      </div>
      <Footer />
      <Cart isVisible={cartVisible} setIsVisible={setCartVisible} />
    </Router>
  );
};
