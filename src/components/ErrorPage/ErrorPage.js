import React from 'react';
import PropTypes from 'prop-types';
import close from 'assets/images/errors/close.svg';
import deleteCreditCard from 'assets/images/errors/deleteCreditCard.svg';
import lock from 'assets/images/errors/lock.svg';
import warning from 'assets/images/errors/warning.svg';
import Header from 'components/Header';
import {
  ErrorPageWrapper,
  ErrorPageStyled,
  MessageStyled,
  IconStyled
} from './ErrorPageStyled';

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
  },
  inactive: {
    icon: close,
    description: 'We are sorry! This offer is no longer available'
  }
};

const ErrorPage = ({ type, error }) => {
  const typeParams = errorTypes[type];

  return (
    <ErrorPageWrapper>
      <Header />
      <ErrorPageStyled>
        <IconStyled src={typeParams.icon} />
        <MessageStyled>{error || typeParams.description}</MessageStyled>
      </ErrorPageStyled>
    </ErrorPageWrapper>
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
