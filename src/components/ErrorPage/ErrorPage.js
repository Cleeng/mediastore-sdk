import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Close } from 'assets/images/errors/close.svg';
import { ReactComponent as DeleteCreditCard } from 'assets/images/errors/deleteCreditCard.svg';
import { ReactComponent as Lock } from 'assets/images/errors/lock.svg';
import { ReactComponent as Warning } from 'assets/images/errors/warning.svg';
import Header from 'components/Header';
import {
  ErrorPageWrapper,
  ErrorPageStyled,
  MessageStyled,
  IconStyled
} from './ErrorPageStyled';

const errorTypes = {
  offerNotExist: {
    icon: Close,
    description: 'Offer does not exist or is not provided.',
    translationKey: 'offer-error.not-exist'
  },
  generalError: {
    icon: Warning,
    description: 'Whoops',
    translationKey: 'whoops'
  },
  alreadyHaveAccess: {
    icon: Lock,
    description:
      'Good news! Your account already gives you access to the content that comes with this plan.',
    translationKey: 'offer-error.access-granted'
  },
  cannotPurchase: {
    icon: DeleteCreditCard,
    description:
      'We are sorry! The content you are trying to access is not available in your country.',
    translationKey: 'offer-error.geo-restrictions'
  },
  inactive: {
    icon: Close,
    description: 'We are sorry! This offer is no longer available',
    translationKey: 'offer-error.not-available'
  }
};

const ErrorPage = ({ type, error }) => {
  const { t } = useTranslation();
  const typeParams = errorTypes[type];
  const Icon = typeParams.icon;

  return (
    <ErrorPageWrapper>
      <Header />
      <ErrorPageStyled>
        <IconStyled>
          <Icon />
        </IconStyled>
        <MessageStyled>
          {error || t(typeParams.translationKey, typeParams.description)}
        </MessageStyled>
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
