/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types  */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './auth';

function PrivateRoute({ component: Component, isMyAccount = false, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Auth.isLogged() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: isMyAccount
                ? Auth.myAccount.loginPage
                : Auth.checkout.loginPage
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
