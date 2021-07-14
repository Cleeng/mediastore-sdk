import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Loader from 'components/Loader';
import Button from 'components/Button';
import deletePaymentDetails from 'api/PaymentDetails/deletePaymentDetails';
import { ErrorMessage } from '../UpdatePaymentDetailsPopupStyled';

const DeletePaymentMethod = ({
  hideInnerPopup,
  setStep,
  updatePaymentDetailsSection,
  paymentDetailsToDelete
}) => {
  const [isError, setIsError] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const deletePaymentMethod = () => {
    setIsError(false);
    setIsButtonLoading(true);
    deletePaymentDetails(paymentDetailsToDelete.id)
      .then(resp => {
        if (!resp.errors.length) {
          setIsButtonLoading(false);
          setStep(currentStep => currentStep + 1);
          updatePaymentDetailsSection();
        } else {
          setIsButtonLoading(false);
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
        <TitleStyled>Remove payment method?</TitleStyled>
        <TextStyled>
          By clicking the REMOVE button you agree to remove this payment method
          for all subscriptions without adding it again.
          <br />
          <br />
          After that all your subscription will be terminated.
        </TextStyled>
        {isError && (
          <ErrorMessage>Oops, something went wrong! Try again...</ErrorMessage>
        )}
      </ContentStyled>
      <ButtonWrapperStyled removeMargin>
        <Button theme="simple" onClickFn={() => hideInnerPopup()}>
          No, thanks
        </Button>
        <Button theme="danger" onClickFn={deletePaymentMethod}>
          {isButtonLoading ? <Loader buttonLoader color="#ffffff" /> : 'Remove'}
        </Button>
      </ButtonWrapperStyled>
    </>
  );
};

export default DeletePaymentMethod;

DeletePaymentMethod.propTypes = {
  paymentDetailsToDelete: PropTypes.objectOf(PropTypes.any),
  hideInnerPopup: PropTypes.func,
  updatePaymentDetailsSection: PropTypes.func,
  setStep: PropTypes.func
};

DeletePaymentMethod.defaultProps = {
  paymentDetailsToDelete: {},
  hideInnerPopup: () => {},
  updatePaymentDetailsSection: () => {},
  setStep: () => {}
};
