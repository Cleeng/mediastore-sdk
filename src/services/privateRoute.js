/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types  */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './auth';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Auth.isLogged() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login'
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
