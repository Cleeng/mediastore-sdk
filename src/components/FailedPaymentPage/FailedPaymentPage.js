import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from 'components/Header';
import Footer from 'components/Footer';
import { useTranslation, Trans } from 'react-i18next';
import { setShouldShowFinalizePaymentComponent } from 'redux/finalizePaymentSlice';

import { StyledOfferWrapper } from 'components/Offer/OfferStyled';
import {
  TitleStyled,
  MessageStyled,
  LinkStyled,
  ThankYouPageStyled
} from 'components/ThankYouPage/ThankYouPageStyled';
import { ReactComponent as WarningIcon } from 'assets/images/errors/warning.svg';

const FailedPaymentPage = () => {
  const { error } = useSelector(state => state.finalizeInitialPayment);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <StyledOfferWrapper data-testid="FailedPaymentPage-component">
      <Header />
      <ThankYouPageStyled>
        <WarningIcon />
        <TitleStyled>
          {t('oops-something-went-wrong', `Oops! Something went wrong`)}
        </TitleStyled>
        <MessageStyled>
          <strong>
            {t(
              'failed-payment-page.subtitle',
              `We weren't able to process your payment.`
            )}
          </strong>
        </MessageStyled>
        <MessageStyled>
          {error.includes('Refused') ? (
            <Trans i18nKey="failed-payment-page.desc-refused">
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
            <Trans i18nKey="failed-payment-page.desc-error">
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

export default FailedPaymentPage;
