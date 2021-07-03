import { Cart, Footer, Header } from '@components';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage';
import { HomePage } from './pages/HomePage/HomePage';
import { OrderSuccessPage } from './pages/OrderSuccessPage/OrderSuccessPage';

export const AppRouter = () => {
  const [cartVisible, setCartVisible] = useState(false);

  return (
    <Router>
      <Header setCartVisible={setCartVisible} />
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
              <HomePage {...props} setCartVisible={setCartVisible} />
            )}
          />
          <Route
            exact
            path="/checkout"
            render={(props) => <CheckoutPage {...props} />}
          />
          <Route exact path="/checkout/success" component={OrderSuccessPage} />
        </Switch>
      </div>
      <Footer />
      <Cart isVisible={cartVisible} setIsVisible={setCartVisible} />
    </Router>
  );
};
