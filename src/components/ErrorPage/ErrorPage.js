/* eslint-disable import/no-dynamic-require */
import React from 'react';
import PropTypes from 'prop-types';
import Auth from 'services/auth';
import BackButton from 'components/BackButton';
import close from 'assets/images/errors/close.svg';
import deleteCreditCard from 'assets/images/errors/deleteCreditCard.svg';
import lock from 'assets/images/errors/lock.svg';
import warning from 'assets/images/errors/warning.svg';
import Logout from 'components/Logout';
import {
  ErrorPageStyled,
  MessageStyled,
  IconStyled,
  LogoutWrapper
} from './ErrorPageStyled';

const errorTypes = {
  offerNotExist: {
    icon: close,
    description: 'Offer does not exist.'
  },
  generalError: {
    icon: warning,
    description: 'Whoops'
  },
  alreadyHaveAccess: {
    icon: lock,
    description: 'You already have access to this offer.'
  },
  cannotPurchase: {
    icon: deleteCreditCard,
    description: 'Cannot purchase this offer.'
  }
};

const ErrorPage = ({ type, error, resetError }) => {
  const typeParams = errorTypes[type];

  return (
    <>
      <LogoutWrapper>
        {Auth.isLogged() ? (
          <Logout />
        ) : (
          type !== 'generalError' && <BackButton onClickFn={resetError} />
        )}
      </LogoutWrapper>

      <ErrorPageStyled>
        <IconStyled src={typeParams.icon} />
        <MessageStyled>{error || typeParams.description}</MessageStyled>
      </ErrorPageStyled>
    </>
  );
};

ErrorPage.propTypes = {
  type: PropTypes.oneOf(Object.keys(errorTypes)),
  error: PropTypes.string,
  resetError: PropTypes.func
};
ErrorPage.defaultProps = {
  type: 'generalError',
  error: '',
  resetError: () => {}
};

export default ErrorPage;
