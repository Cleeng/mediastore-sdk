import React, { useState } from 'react';
import PropTypes from 'prop-types';
import updateAdyenPaymentDetails from 'api/PaymentDetails/updateAdyenPaymentDetails';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import Adyen from 'components/Adyen';

import { ErrorMessage } from '../UpdatePaymentDetailsPopupStyled';

const AddCard = ({
  paymentsSettings,
  setStep,
  updatePaymentDetailsSection
}) => {
  const [isError, setIsError] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const addAdyenPaymentDetails = ({ data: { paymentMethod: card } }) => {
    setIsButtonLoading(true);
    setIsError(false);
    updateAdyenPaymentDetails(paymentsSettings.adyen, card)
      .then(resp => {
        setIsButtonLoading(false);
        if (!resp.errors.length) {
          setStep(currentStep => currentStep + 1);
          updatePaymentDetailsSection();
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
        <TitleStyled>Credit Card</TitleStyled>
        <TextStyled>Add your credit card details.</TextStyled>
        <Adyen
          onSubmit={addAdyenPaymentDetails}
          isCheckout={false}
          isPaymentProcessing={isButtonLoading}
        />
        {isError && (
          <ErrorMessage>Oops, something went wrong! Try again...</ErrorMessage>
        )}
      </ContentStyled>
      <ButtonWrapperStyled removeMargin>
        <Button
          theme="simple"
          onClickFn={() => setStep(currentStep => currentStep - 1)}
        >
          Back
        </Button>
      </ButtonWrapperStyled>
    </>
  );
};

AddCard.propTypes = {
  setStep: PropTypes.func,
  updatePaymentDetailsSection: PropTypes.func,
  paymentsSettings: PropTypes.objectOf(PropTypes.any)
};

AddCard.defaultProps = {
  setStep: () => {},
  updatePaymentDetailsSection: () => {},
  paymentsSettings: null
};

export default AddCard;
