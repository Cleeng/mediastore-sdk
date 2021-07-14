/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { ReactComponent as AddIcon } from 'assets/images/add.svg';
import MyAccountError from 'components/MyAccountError';
import PaymentCard from 'components/PaymentCard';
import { POPUP_TYPES } from 'redux/innerPopupReducer';
import {
  WrapStyled,
  PaymentDetailsStyled,
  Message
} from './PaymentMethodStyled';

const PaymentMethod = ({
  paymentDetailsLoading,
  activeOrBoundPaymentDetails,
  showInnerPopup,
  error,
  t
}) => {
  const renderPaymentMethodItem = paymentDetail => {
    const { paymentMethod, paymentGateway, id } = paymentDetail;
    const generateDesc = () => {
      switch (paymentGateway) {
        case 'ios':
        case 'tvos':
          return 'Paid & managed via iTunes';
        case 'android':
          return 'Paid via Android In-app Billing';
        case 'amazon':
          return 'Paid via Amazon In-app Purchasing';
        default:
          return 'Paid by external provider';
      }
    };
    switch (paymentMethod) {
      case 'card':
      case 'paypal':
        return (
          <PaymentCard
            key={id}
            details={paymentDetail}
            showInnerPopup={showInnerPopup}
          />
        );
      default:
        return <Message>{generateDesc()}</Message>;
    }
  };

  return paymentDetailsLoading ? (
    <PaymentCard isDataLoaded={false} />
  ) : (
    <WrapStyled>
      {error.length !== 0 ? (
        <MyAccountError generalError />
      ) : !activeOrBoundPaymentDetails.length ? (
        <MyAccountError
          icon={AddIcon}
          title={t('No payment method added!')}
          subtitle={t('Add a card to start your plan')}
          withBorder
          onClick={() => showInnerPopup({ type: POPUP_TYPES.paymentDetails })}
        />
      ) : (
        activeOrBoundPaymentDetails.map(paymentDetail => (
          <PaymentDetailsStyled key={paymentDetail.id}>
            {renderPaymentMethodItem(paymentDetail)}
          </PaymentDetailsStyled>
        ))
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
  showInnerPopup: PropTypes.func,
  t: PropTypes.func
};

PaymentMethod.defaultProps = {
  activeOrBoundPaymentDetails: [],
  error: [],
  paymentDetailsLoading: false,
  showInnerPopup: () => {},
  t: k => k
};

export { PaymentMethod as PurePaymentMethod };

export default withTranslation()(labeling()(PaymentMethod));
