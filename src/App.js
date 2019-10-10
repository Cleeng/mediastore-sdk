import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import { JWT_TOKEN_LOCAL_STORAGE_KEY } from './util/Constants';
import OfferContainer from './containers/OfferContainer';
import ThankYouPage from './components/ThankYouPage/ThankYouPage';

const App = () => {
  const onLoginComplete = () => {
    localStorage.setItem(
      JWT_TOKEN_LOCAL_STORAGE_KEY,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvZmZlcklkIjoiUzEyMzQ1Njc4OSJ9.VkXuGOeMZD6fXT4ebWuEL0Iat3nmbzMDNOrEJYetORM'
    );
    history.push('/offer/S123456789');
  };

  const path = history.location.hash.slice(1);
  if (path) {
    history.replace(path);
  }

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <button type="button" onClick={onLoginComplete}>
            Login
          </button>
        </Route>
        <Route
          path="/offer/:offerId"
          render={({
            match: {
              params: { offerId }
            }
          }) => <OfferContainer offerId={offerId} />}
        />
        <Route path="/thankyou">
          <ThankYouPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
