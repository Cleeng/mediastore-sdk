import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import { JWT_TOKEN_LOCAL_STORAGE_KEY } from './util/Constants';
import OfferContainer from './containers/OfferContainer';

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
    history.push(path);
  }

  return (
    <Router history={history}>
      <Switch>
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
      </Switch>
    </Router>
  );
};

export default App;
