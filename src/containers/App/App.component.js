/* istanbul ignore file */
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isHosted } from 'util/layoutHelper';
import 'i18NextInit';
import RedirectWithQuery from 'components/RedirectWithQuery';
import Loader from 'components/Loader';
import PrivateRoute from 'services/privateRoute';
import PublicRoute from 'services/publicRoute';

import Capture from 'components/Capture/Capture';
import CheckoutConsents from 'components/CheckoutConsents';
import history from '../../history';
import OfferContainer from '../OfferContainer';
import { AppStyled, AppContentStyled } from './AppStyled';

const Register = React.lazy(() => import('components/RegisterPage/Register'));
const Login = React.lazy(() => import('components/LoginPage/Login'));
const PasswordReset = React.lazy(() => import('components/PasswordReset'));
const PasswordResetSuccess = React.lazy(() =>
  import('components/PasswordResetSuccess')
);
const ThankYouPage = React.lazy(() =>
  import('components/ThankYouPage/ThankYouPage')
);
const ErrorPage = React.lazy(() => import('components/ErrorPage'));
const MyAccount = React.lazy(() => import('../MyAccount/MyAccount.container'));

const App = () => {
  const isAppHosted = isHosted();

  return (
    <AppStyled hosted={isAppHosted}>
      <Suspense fallback={<Loader centered />}>
        <Router>
          <AppContentStyled hosted={isAppHosted}>
            <Switch>
              <PublicRoute path="/" exact component={RedirectWithQuery} />
              <PublicRoute
                path="/login"
                component={urlProps => <Login urlProps={urlProps} />}
              />
              <PublicRoute
                path="/my-account/login"
                isMyAccount
                component={urlProps => (
                  <Login urlProps={urlProps} isMyAccount />
                )}
              />
              <PublicRoute
                path="/register"
                component={urlProps => <Register urlProps={urlProps} />}
              />
              <PublicRoute
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
              <PublicRoute
                path="/password-reset-success/:email"
                component={urlProps => (
                  <PasswordResetSuccess
                    email={decodeURIComponent(urlProps.match.params.email)}
                  />
                )}
              />
              <PrivateRoute
                path="/capture"
                component={urlProps => (
                  <Capture
                    urlProps={urlProps}
                    settings={urlProps.location.state.settings}
                    redirectUrl={urlProps.location.state.redirectUrl}
                  />
                )}
              />
              <PrivateRoute
                path="/consents"
                component={urlProps => (
                  <CheckoutConsents
                    urlProps={urlProps}
                    redirectUrl={urlProps.location.state.redirectUrl}
                  />
                )}
              />
              <PrivateRoute
                path="/offer"
                component={urlProps => (
                  <OfferContainer
                    onSuccess={() => history.push('/thankyou')}
                    urlProps={urlProps}
                  />
                )}
              />
              <PrivateRoute
                path="/thankyou"
                component={() => <ThankYouPage />}
              />
              <PrivateRoute
                isMyAccount
                path="/my-account"
                component={({ match }) => <MyAccount routeMatch={match} />}
              />
              <Route
                path="*"
                render={() => {
                  return <ErrorPage type="generalError" />;
                }}
              />
            </Switch>
          </AppContentStyled>
        </Router>
      </Suspense>
    </AppStyled>
  );
};

export default App;
