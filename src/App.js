import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Register from 'components/RegisterPage/Register';
import { AppStyled, AppContentStyled } from './AppStyled';
import history from './history';
import OfferContainer from './containers/OfferContainer';
import ThankYouPage from './components/ThankYouPage/ThankYouPage';
import Login from './components/LoginPage/Login';
import PasswordReset from './components/PasswordReset';
import PasswordResetSuccess from './components/PasswordResetSuccess';
import RedirectWithQuery from './components/RedirectWithQuery';
import { JWT_TOKEN_LOCAL_STORAGE_KEY } from './util/Constants';

const App = () => {
  const onLoginComplete = () => {
    localStorage.setItem(
      JWT_TOKEN_LOCAL_STORAGE_KEY,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvZmZlcklkIjoiUzEyMzQ1Njc4OSJ9.VkXuGOeMZD6fXT4ebWuEL0Iat3nmbzMDNOrEJYetORM'
    );
    history.push('/offer');
  };

  const onRegistrationComplete = () => history.push(`/offer`);

  const path = history.location.hash.slice(1);
  if (path) {
    history.replace(path);
  }

  return (
    <Router history={history}>
      <AppStyled>
        <AppContentStyled>
          <Switch>
            <Route path="/" exact component={RedirectWithQuery} />
            <Route
              path="/login"
              component={urlProps => Login({ onLoginComplete, urlProps })}
            />
            <Route
              path="/register"
              component={urlProps =>
                Register({ onRegistrationComplete, urlProps })
              }
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
              component={urlProps =>
                OfferContainer({
                  onPaymentComplete: () => history.push('/thankyou'),
                  urlProps
                })
              }
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
