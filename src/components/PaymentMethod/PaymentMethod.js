/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ReactComponent as AddIcon } from 'assets/images/add.svg';
import MyAccountError from 'components/MyAccountError';
import PaymentCard from 'components/PaymentCard';
import { POPUP_TYPES } from 'redux/innerPopupReducer';
import { WrapStyled, CardsWrapper, Message } from './PaymentMethodStyled';

const PaymentMethod = ({
  paymentDetailsLoading,
  activeOrBoundPaymentDetails,
  showInnerPopup,
  error
}) => {
  const { t } = useTranslation();
  const renderPaymentMethodItem = paymentDetail => {
    const { paymentMethod, id } = paymentDetail;
    switch (paymentMethod) {
      case 'card':
      case 'paypal':
      case 'apple':
      case 'android':
      case 'amazon':
      case 'roku':
        return (
          <PaymentCard
            key={id}
            details={paymentDetail}
            showInnerPopup={showInnerPopup}
          />
        );
      default:
        return <Message>{t('Managed by external service')}</Message>;
    }
  };
  const activeItems = activeOrBoundPaymentDetails.find(item => item.active);

  return paymentDetailsLoading ? (
    <CardsWrapper numberOfItems={1}>
      <PaymentCard isDataLoaded={false} />
    </CardsWrapper>
  ) : (
    <WrapStyled>
      {error.length !== 0 ? (
        <MyAccountError generalError />
      ) : (
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
                showInnerPopup({ type: POPUP_TYPES.paymentDetails })
              }
              isSmallCard
            />
          )}
        </CardsWrapper>
      )}
    </WrapStyled>
  );
};

PaymentMethod.propTypes = {
  activeOrBoundPaymentDetails: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.any)
  ),
  error: PropTypes.arrayOf(PropTypes.string),
  paymentDetailsLoading: PropTypes.bool,
  showInnerPopup: PropTypes.func
};

PaymentMethod.defaultProps = {
  activeOrBoundPaymentDetails: [],
  error: [],
  paymentDetailsLoading: false,
  showInnerPopup: () => {}
};

export default PaymentMethod;
