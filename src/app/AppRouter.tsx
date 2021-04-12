import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => <HomePage {...props} />} />
      </Switch>
    </Router>
  );
};
