import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
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

  return (
    <Router history={history}>
      <Route
        path="/#:path"
        render={({
          match: {
            params: { path }
          }
        }) => <Redirect to={`/${path}`} />}
      />
      <Route
        path="/login"
        exact
        render={() => (
          <button type="button" onClick={onLoginComplete}>
            Login
          </button>
        )}
      />
      <Route
        path="/offer/:offerId"
        render={({
          match: {
            params: { offerId }
          }
        }) => <OfferContainer offerId={offerId} />}
      />
    </Router>
  );
};

export default App;
