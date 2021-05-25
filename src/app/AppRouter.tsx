import { Cart, Footer, Overlay, Header } from '@components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage';
import { HomePage } from './pages/HomePage/HomePage';

export const AppRouter = () => {
  return (
    <Router>
      <Header />
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
          <Route exact path="/" render={(props) => <HomePage {...props} />} />
          <Route
            exact
            path="/checkout"
            render={(props) => <CheckoutPage {...props} />}
          />
        </Switch>
      </div>
      <Footer />
      <Overlay />
      <Cart />
    </Router>
  );
};
