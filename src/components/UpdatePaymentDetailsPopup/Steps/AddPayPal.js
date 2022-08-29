import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import updatePayPalPaymentDetails from 'api/PaymentDetails/updatePayPalPaymentDetails';
import Loader from 'components/Loader';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled,
  WarningMessageStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';
import { PPIconStyled, ErrorMessage } from '../UpdatePaymentDetailsPopupStyled';

const AddPayPal = ({ setStep }) => {
  const { t } = useTranslation();
  const [isError, setIsError] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const publisherPaymentMethods = useSelector(
    state => state.paymentInfo.publisherPaymentMethods
  );
  const addPayPalPaymentDetails = () => {
    setIsButtonLoading(true);
    setIsError(false);
    updatePayPalPaymentDetails(publisherPaymentMethods.paypal)
      .then(resp => {
        window.dispatchEvent(
          new CustomEvent('MSSDK:update-payment-details-successful')
        );
        window.location.href = resp.responseData.redirectUrl;
      })
      .catch(() => {
        window.dispatchEvent(
          new CustomEvent('MSSDK:update-payment-details-failed')
        );
        setIsButtonLoading(false);
        setIsError(true);
      });
  };

  return (
    <>
      <ContentStyled>
        <TitleStyled>PayPal</TitleStyled>
        <TextStyled>
          {t(
            'Paying with PayPal is easy. Click the button below and sign in to your PayPal account.'
          )}
          <br />
          {t(
            'Note, PayPal is subject to an additional 8% fee that will be added to your next payments.'
          )}
        </TextStyled>
        <Button
          size="normal"
          width="50%"
          margin="40px auto auto auto"
          theme="paypal"
          onClickFn={addPayPalPaymentDetails}
        >
          {isButtonLoading ? (
            <Loader buttonLoader color="#ffffff" />
          ) : (
            <>
              <PPIconStyled />
              PayPal
            </>
          )}
        </Button>
        {isError && (
          <ErrorMessage>
            {t('Oops, something went wrong! Try again...')}
          </ErrorMessage>
        )}
      </ContentStyled>
      <ButtonWrapperStyled removeMargin>
        <Button
          theme="simple"
          onClickFn={() => setStep(currentStep => currentStep - 1)}
        >
          {t('Back')}
        </Button>
      </ButtonWrapperStyled>
      <WarningMessageStyled>
        Your new details will replace the details used for your other active
        subscriptions.
      </WarningMessageStyled>
    </>
  );
};

export default AddPayPal;

AddPayPal.propTypes = {
  setStep: PropTypes.func
};

AddPayPal.defaultProps = {
  setStep: () => {}
};
