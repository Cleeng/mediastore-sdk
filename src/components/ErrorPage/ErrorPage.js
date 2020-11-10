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
import Header from 'components/Header';
import { ErrorPageStyled, MessageStyled, IconStyled } from './ErrorPageStyled';

const errorTypes = {
  offerNotExist: {
    icon: close,
    description: 'Offer does not exist or is not provided.'
  },
  generalError: {
    icon: warning,
    description: 'Whoops'
  },
  alreadyHaveAccess: {
    icon: lock,
    description:
      'Good news! Your account already gives you access to the content that comes with this plan.'
  },
  cannotPurchase: {
    icon: deleteCreditCard,
    description:
      'We are sorry! The content you are trying to access is not available in your country.'
  }
};

const ErrorPage = ({ type, error, resetError }) => {
  const typeParams = errorTypes[type];

  return (
    <>
      <Header>
        {Auth.isLogged() ? (
          <Logout />
        ) : (
          type !== 'generalError' && <BackButton onClickFn={resetError} />
        )}
      </Header>

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
