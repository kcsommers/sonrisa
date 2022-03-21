import { Cart, Footer, Header, ProtectedRoute } from './components';
import { MutableRefObject, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthContextProvider, StoreProvider } from './context';
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage';
import { HomePage } from './pages/HomePage/HomePage';
import { OrderSuccessPage } from './pages/OrderSuccessPage/OrderSuccessPage';
import { ScrollRefNames, LoginPage, AdminPage } from './pages';

export const AppRouter = () => {
  const [cartVisible, setCartVisible] = useState(false);

  const aboutScrollRef = useRef<HTMLElement>();

  const contactScrollRef = useRef<HTMLElement>();

  const orderScrollRef = useRef<HTMLElement>();

  const photosScrollRef = useRef<HTMLElement>();

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
      case ScrollRefNames.PHOTOS: {
        photosScrollRef.current = el;
        return;
      }
    }
  };

  return (
    <Router>
      <StoreProvider>
        <Header
          setCartVisible={setCartVisible}
          scrollRefs={{
            ABOUT: aboutScrollRef as MutableRefObject<HTMLElement>,
            CONTACT: contactScrollRef as MutableRefObject<HTMLElement>,
            ORDER: orderScrollRef as MutableRefObject<HTMLElement>,
            PHOTOS: photosScrollRef as MutableRefObject<HTMLElement>,
          }}
        />
        <div
          style={{
            maxWidth: '1980px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
            backgroundColor: '#fff',
            minHeight: 'calc(100vh - 315px)',
          }}
        >
          <AuthContextProvider>
            <Switch>
              <Route exact path='/login' component={LoginPage} />
              <ProtectedRoute exact path='/admin' component={AdminPage} />
            </Switch>
          </AuthContextProvider>
          <Switch>
            <Route
              exact
              path='/'
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
              path='/checkout'
              render={(props) => <CheckoutPage {...props} />}
            />
            <Route
              exact
              path='/checkout/complete'
              component={OrderSuccessPage}
            />
          </Switch>
          <Cart isVisible={cartVisible} setIsVisible={setCartVisible} />
        </div>
        <Footer />
      </StoreProvider>
    </Router>
  );
};
