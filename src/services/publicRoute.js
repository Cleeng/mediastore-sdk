/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types  */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './auth';

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Auth.isLogged() ? (
          <Redirect
            to={{
              pathname: '/offer'
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default PublicRoute;
