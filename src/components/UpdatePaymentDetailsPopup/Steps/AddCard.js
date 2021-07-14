import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

const AddCard = ({ setStep, updatePaymentDetailsSection }) => {
  const [isError, setIsError] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const publisherPaymentMethods = useSelector(
    state => state.paymentInfo.publisherPaymentMethods
  );
  const addAdyenPaymentDetails = ({ data: { paymentMethod: card } }) => {
    setIsButtonLoading(true);
    setIsError(false);
    updateAdyenPaymentDetails(publisherPaymentMethods.adyen, card)
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
  updatePaymentDetailsSection: PropTypes.func
};

AddCard.defaultProps = {
  setStep: () => {},
  updatePaymentDetailsSection: () => {}
};

export default AddCard;
