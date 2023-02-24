import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import { PopupImageStyled } from 'components/UpdatePaymentDetailsPopup/UpdatePaymentDetailsPopupStyled';
import Loader from 'components/Loader';
import Button from 'components/Button';
import deletePaymentDetails from 'api/PaymentDetails/deletePaymentDetails';
import { useTranslation } from 'react-i18next';
import { ReactComponent as PaypalIcon } from 'assets/images/paymentMethods/paypal_color.svg';
import { ReactComponent as VisaIcon } from 'assets/images/paymentMethods/visa_color.svg';
import { fetchPaymentDetails } from 'redux/paymentDetailsSlice';

import {
  PAYMENT_DETAILS_STEPS,
  updatePaymentDetailsPopup
} from 'redux/popupSlice';
import { ErrorMessage } from '../UpdatePaymentDetailsPopupStyled';

const PaymentMethodIcons = {
  paypal: PaypalIcon,
  visa: VisaIcon
};

const DeletePaymentMethod = ({ paymentDetailsToDelete }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const { activeOrBoundPaymentDetails } = useSelector(
    state => state.paymentDetails
  );
  const activePaymentDetails = activeOrBoundPaymentDetails.find(
    ({ active }) => active
  );

  const deletePaymentMethod = () => {
    window.dispatchEvent(
      new CustomEvent('MSSDK:remove-payment-details-action-confirmed')
    );
    setIsError(false);
    setIsButtonLoading(true);
    deletePaymentDetails(activePaymentDetails.id)
      .then(resp => {
        if (!resp.errors.length) {
          setIsButtonLoading(false);
          dispatch(
            updatePaymentDetailsPopup({ step: PAYMENT_DETAILS_STEPS.SUCCESS })
          );
          dispatch(fetchPaymentDetails());
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

  const cancelDeleteAction = () => {
    window.dispatchEvent(
      new CustomEvent('MSSDK:remove-payment-details-action-cancelled')
    );
    dispatch(updatePaymentDetailsPopup({ isOpen: false }));
  };

  const { paymentMethodSpecificParams } = paymentDetailsToDelete;
  const LogoComponent = PaymentMethodIcons[paymentMethodSpecificParams?.variant]
    ? PaymentMethodIcons[paymentMethodSpecificParams.variant]
    : PaymentMethodIcons[paymentDetailsToDelete.paymentMethod];

  return (
    <>
      <ContentStyled>
        {LogoComponent && (
          <PopupImageStyled>
            <LogoComponent />
          </PopupImageStyled>
        )}
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
        <Button theme="simple" onClickFn={() => cancelDeleteAction()}>
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
  paymentDetailsToDelete: PropTypes.objectOf(PropTypes.any)
};

DeletePaymentMethod.defaultProps = {
  paymentDetailsToDelete: {}
};
