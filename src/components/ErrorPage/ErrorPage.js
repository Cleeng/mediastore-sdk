/* eslint-disable import/no-dynamic-require */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ErrorPageStyled,
  MessageStyled,
  IconStyled,
  LogoutWrapper
} from './ErrorPageStyled';
import close from '../../assets/images/errors/close.svg';
import deleteCreditCard from '../../assets/images/errors/deleteCreditCard.svg';
import lock from '../../assets/images/errors/lock.svg';
import warning from '../../assets/images/errors/warning.svg';
import Logout from '../Logout/Logout';

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

const ErrorPage = ({ type, error }) => {
  const typeParams = errorTypes[type];
  return (
    <>
      <LogoutWrapper>
        <Logout />
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
  error: PropTypes.string
};
ErrorPage.defaultProps = {
  type: 'generalError',
  error: ''
};

export default ErrorPage;
