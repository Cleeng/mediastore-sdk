/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as AddIcon } from 'assets/images/add.svg';
import MyAccountError from 'components/MyAccountError';
import PaymentCard from 'components/PaymentCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentDetails } from 'redux/paymentDetailsSlice';
import { WrapStyled, CardsWrapper, Message } from './PaymentMethodStyled';
import {
  PAYMENT_DETAILS_STEPS,
  updatePaymentDetailsPopup
} from '../../redux/popupSlice';

const PaymentMethod = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const {
    paymentDetails,
    error,
    loading,
    activeOrBoundPaymentDetails
  } = useSelector(state => state.paymentDetails);

  const renderPaymentMethodItem = paymentDetail => {
    const { paymentMethod, id } = paymentDetail;
    switch (paymentMethod) {
      case 'card':
      case 'paypal':
      case 'apple':
      case 'android':
      case 'amazon':
      case 'roku':
      case 'googlepay':
      case 'applepay':
      case 'ideal':
      case 'bancontact_card':
      case 'bancontact_mobile':
      case 'sofort':
        return <PaymentCard key={id} details={paymentDetail} />;
      default:
        return <Message>{t('Managed by external service')}</Message>;
    }
  };
  const activeItems = activeOrBoundPaymentDetails.find(item => item.active);

  useEffect(() => {
    if (paymentDetails?.length === 0) {
      dispatch(fetchPaymentDetails());
    }
  }, []);

  if (loading) {
    return (
      <CardsWrapper numberOfItems={1}>
        <PaymentCard isDataLoaded={false} />
      </CardsWrapper>
    );
  }

  if (error.length !== 0) {
    return (
      <WrapStyled>
        <MyAccountError generalError />
      </WrapStyled>
    );
  }

  return (
    <WrapStyled>
      <CardsWrapper
        numberOfItems={
          !activeItems
            ? activeOrBoundPaymentDetails.length + 1
            : activeOrBoundPaymentDetails.length
        }
      >
        {activeOrBoundPaymentDetails.map(paymentDetail =>
          renderPaymentMethodItem(paymentDetail)
        )}
        {!activeItems && (
          <MyAccountError
            icon={AddIcon}
            title={t('Add a payment method!')}
            subtitle={t('Set up a new payment method for your account')}
            withBorder
            onClick={() =>
              dispatch(
                updatePaymentDetailsPopup({
                  isOpen: true,
                  isLoading: false,
                  step: PAYMENT_DETAILS_STEPS.PAYMENT_DETAILS_UPDATE
                })
              )
            }
            direction="row"
            fullWidth
          />
        )}
      </CardsWrapper>
    </WrapStyled>
  );
};

export default PaymentMethod;
