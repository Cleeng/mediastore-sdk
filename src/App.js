/* istanbul ignore file */
import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Register from 'components/RegisterPage/Register';
import { AppStyled, AppContentStyled } from './AppStyled';
import history from './history';
import './i18NextInit';
import OfferContainer from './containers/OfferContainer';
import ThankYouPage from './components/ThankYouPage/ThankYouPage';
import Login from './components/LoginPage/Login';
import PasswordReset from './components/PasswordReset';
import ErrorPage from './components/ErrorPage';
import PasswordResetSuccess from './components/PasswordResetSuccess';
import RedirectWithQuery from './components/RedirectWithQuery';
import Loader from './components/Loader';

const App = () => {
  const onLoginComplete = () => history.push(`/offer/`);

  const onRegistrationComplete = () => history.push(`/offer`);

  const path = history.location.hash.slice(1);
  if (path) {
    history.replace(path);
  }

  return (
    <Suspense fallback={<Loader />}>
      <Router history={history}>
        <AppStyled>
          <AppContentStyled>
            <Switch>
              <Route path="/" exact component={RedirectWithQuery} />
              <Route
                path="/login"
                component={urlProps => (
                  <Login
                    onLoginComplete={onLoginComplete}
                    urlProps={urlProps}
                  />
                )}
              />
              <Route
                path="/register"
                component={urlProps => (
                  <Register
                    onRegistrationComplete={onRegistrationComplete}
                    urlProps={urlProps}
                  />
                )}
              />
              <Route
                path="/reset-password/"
                component={urlProps => (
                  <PasswordReset
                    onSuccess={value =>
                      history.push(
                        `/password-reset-success/${encodeURIComponent(value)}`
                      )
                    }
                    urlProps={urlProps}
                  />
                )}
              />
              <Route
                path="/password-reset-success/:email"
                render={({ match }) => {
                  const email = decodeURIComponent(
                    (match && match.params && match.params.email) || ''
                  );
                  return <PasswordResetSuccess email={email} />;
                }}
              />
              <Route
                path="/offer"
                component={urlProps => (
                  <OfferContainer
                    onPaymentComplete={() => history.push('/thankyou')}
                    urlProps={urlProps}
                  />
                )}
              />
              <Route path="/thankyou">
                <ThankYouPage />
              </Route>
              <Route
                path="*"
                render={() => {
                  return <ErrorPage type="generalError" />;
                }}
              />
            </Switch>
          </AppContentStyled>
        </AppStyled>
      </Router>
    </Suspense>
  );
};

export default App;
