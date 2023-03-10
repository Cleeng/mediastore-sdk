// eslint-disable-next-line no-use-before-define
import React from 'react';
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
import { Errors, ErrorPageProps } from './ErrorPage.types';

const errorTypes: Record<
  Errors,
  { icon: React.ElementType; description: string }
> = {
  offerNotExist: {
    icon: Close,
    description: 'Offer does not exist or is not provided.'
  },
  generalError: {
    icon: Warning,
    description: 'Whoops'
  },
  alreadyHaveAccess: {
    icon: Lock,
    description:
      'Good news! Your account already gives you access to the content that comes with this plan.'
  },
  cannotPurchase: {
    icon: DeleteCreditCard,
    description:
      'We are sorry! The content you are trying to access is not available in your country.'
  },
  inactive: {
    icon: Close,
    description: 'We are sorry! This offer is no longer available'
  }
};

const ErrorPage = ({ type = 'generalError', error = '' }: ErrorPageProps) => {
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
        <MessageStyled>{error || t(typeParams.description)}</MessageStyled>
      </ErrorPageStyled>
    </ErrorPageWrapper>
  );
};

export default ErrorPage;
