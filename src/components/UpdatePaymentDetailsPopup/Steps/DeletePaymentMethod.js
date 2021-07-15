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
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '../UpdatePaymentDetailsPopupStyled';

const DeletePaymentMethod = ({
  hideInnerPopup,
  setStep,
  updatePaymentDetailsSection,
  paymentDetailsToDelete
}) => {
  const { t } = useTranslation();

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
        <TitleStyled>{t('Remove payment method?')}</TitleStyled>
        <TextStyled>
          {t(
            'By clicking the REMOVE button you will delete this payment method.'
          )}
          <br />
          <br />
          {t(
            'Any subscriptions connected with this payment method will not be renewed, unless another payment method is added.'
          )}
        </TextStyled>
        {isError && (
          <ErrorMessage>
            {t('Oops, something went wrong! Try again...')}
          </ErrorMessage>
        )}
      </ContentStyled>
      <ButtonWrapperStyled removeMargin>
        <Button theme="simple" onClickFn={() => hideInnerPopup()}>
          {t('No, thanks')}
        </Button>
        <Button theme="danger" onClickFn={deletePaymentMethod}>
          {isButtonLoading ? (
            <Loader buttonLoader color="#ffffff" />
          ) : (
            t('Remove')
          )}
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
