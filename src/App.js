import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Register from 'components/RegisterPage/Register';
import { AppStyled, AppContentStyled } from './AppStyled';
import history from './history';
import OfferContainer from './containers/OfferContainer';
import ThankYouPage from './components/ThankYouPage/ThankYouPage';
import Login from './components/LoginPage/Login';
import PasswordReset from './components/PasswordReset';
import PasswordResetSuccess from './components/PasswordResetSuccess';
import { JWT_TOKEN_LOCAL_STORAGE_KEY } from './util/Constants';

const App = () => {
  const onLoginComplete = () => {
    localStorage.setItem(
      JWT_TOKEN_LOCAL_STORAGE_KEY,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvZmZlcklkIjoiUzEyMzQ1Njc4OSJ9.VkXuGOeMZD6fXT4ebWuEL0Iat3nmbzMDNOrEJYetORM'
    );
    history.push(`/offer/${ENVIRONMENT_CONFIGURATION.OFFER_ID}`);
  };

  const path = history.location.hash.slice(1);
  if (path) {
    history.replace(path);
  }

  return (
    <Router history={history}>
      <AppStyled>
        <AppContentStyled>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/login" />
            </Route>
            <Route path="/login">
              <Login onLoginComplete={onLoginComplete} />
            </Route>
            <Route
              path="/register"
              render={({
                match: {
                  params: { offerId }
                }
              }) => (
                <Register
                  onRegistrationComplete={() =>
                    history.push(`/offer/${offerId}`)
                  }
                />
              )}
            />
            <Route
              path="/reset-password/:offerId"
              render={({
                match: {
                  params: { offerId }
                }
              }) => (
                <PasswordReset
                  offerId={offerId}
                  onSuccess={value =>
                    history.push(
                      `/password-reset-success/${offerId}/${encodeURIComponent(
                        value
                      )}`
                    )
                  }
                />
              )}
            />
            <Route
              path="/password-reset-success/:offerId/:email"
              render={({ match }) => {
                const email = decodeURIComponent(
                  (match && match.params && match.params.email) || ''
                );
                const {
                  params: { offerId }
                } = match;
                return <PasswordResetSuccess email={email} offerId={offerId} />;
              }}
            />
            <Route
              path="/offer/:offerId"
              render={({
                match: {
                  params: { offerId }
                }
              }) => (
                <OfferContainer
                  offerId={offerId}
                  onPaymentComplete={() => history.push('/thankyou')}
                />
              )}
            />
            <Route path="/thankyou">
              <ThankYouPage />
            </Route>
          </Switch>
        </AppContentStyled>
      </AppStyled>
    </Router>
  );
};

export default App;
