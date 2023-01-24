import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Footer from 'components/Footer';
import { withTranslation, Trans } from 'react-i18next';
import labeling from 'containers/labeling';
import { setShouldShowFinalizePaymentComponent } from 'redux/finalizePaymentSlice';

import { StyledOfferWrapper } from 'components/Offer/OfferStyled';
import {
  TitleStyled,
  MessageStyled,
  LinkStyled,
  ThankYouPageStyled
} from 'components/ThankYouPage/ThankYouPageStyled';
import { ReactComponent as WarningIcon } from 'assets/images/errors/warning.svg';

const FailedPaymentPage = ({ t }) => {
  const { error } = useSelector(state => state.finalizeInitialPayment);
  const dispatch = useDispatch();

  return (
    <StyledOfferWrapper data-testid="FailedPaymentPage-component">
      <Header />
      <ThankYouPageStyled>
        <WarningIcon />
        <TitleStyled>
          {t('payment-error-title', `Oops! Something went wrong`)}
        </TitleStyled>
        <MessageStyled>
          <strong>
            {t(
              'payment-error-subtitle',
              `We weren't able to process your payment.`
            )}
          </strong>
        </MessageStyled>
        <MessageStyled>
          {error === 'Refused' ? (
            <Trans i18nKey="payment-error-desc.refused">
              To complete your purchase, please
              <LinkStyled
                as="button"
                onClick={() =>
                  dispatch(setShouldShowFinalizePaymentComponent(false))
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                try again
              </LinkStyled>
              using a different payment method.
            </Trans>
          ) : (
            <Trans i18nKey="payment-error-desc.error">
              To complete your purchase, please
              <LinkStyled
                as="button"
                onClick={() =>
                  dispatch(setShouldShowFinalizePaymentComponent(false))
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                try again.
              </LinkStyled>
            </Trans>
          )}
        </MessageStyled>
      </ThankYouPageStyled>
      <Footer />
    </StyledOfferWrapper>
  );
};

FailedPaymentPage.propTypes = {
  t: PropTypes.func
};

FailedPaymentPage.defaultProps = {
  t: k => k
};

export default withTranslation()(labeling()(FailedPaymentPage));
