import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import updateAdyenPaymentDetails from 'api/PaymentDetails/updateAdyenPaymentDetails';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled,
  WarningMessageStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import Adyen from 'components/Adyen';
import { useTranslation } from 'react-i18next';
import deletePaymentDetails from 'api/PaymentDetails/deletePaymentDetails';
import { ErrorMessage } from '../UpdatePaymentDetailsPopupStyled';

const AddCard = ({
  setStep,
  selectedPaymentMethod,
  updatePaymentDetailsSection
}) => {
  const [isError, setIsError] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const publisherPaymentMethods = useSelector(
    state => state.paymentInfo.publisherPaymentMethods
  );
  const { t } = useTranslation();

  const addAdyenPaymentDetails = ({ data: { paymentMethod: card } }) => {
    setIsButtonLoading(true);
    setIsError(false);
    updateAdyenPaymentDetails(publisherPaymentMethods.adyen, card)
      .then(resp => {
        setIsButtonLoading(false);
        if (!resp.errors.length) {
          setStep(currentStep => currentStep + 1);
          updatePaymentDetailsSection();
          if (selectedPaymentMethod.id) {
            deletePaymentDetails(selectedPaymentMethod.id);
          }
        } else {
          setIsError(true);
        }
      })
      .catch(() => {
        setIsButtonLoading(false);
        setIsError(true);
      });
  };

  return (
    <>
      <ContentStyled>
        <TitleStyled>{t('Add your card')}</TitleStyled>
        <TextStyled>{t('Enter your card details here!')}</TextStyled>
        <Adyen
          onSubmit={addAdyenPaymentDetails}
          isCheckout={false}
          isPaymentProcessing={isButtonLoading}
        />
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

AddCard.propTypes = {
  setStep: PropTypes.func,
  updatePaymentDetailsSection: PropTypes.func,
  selectedPaymentMethod: PropTypes.objectOf(PropTypes.any)
};

AddCard.defaultProps = {
  setStep: () => {},
  updatePaymentDetailsSection: () => {},
  selectedPaymentMethod: {}
};

export default AddCard;
