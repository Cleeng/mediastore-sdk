/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { ReactComponent as AddIcon } from 'assets/images/add.svg';
import MyAccountError from 'components/MyAccountError';
import PaymentCard from 'components/PaymentCard';
import {
  WrapStyled,
  PaymentDetailsStyled,
  Message
} from './PaymentMethodStyled';

const PaymentMethod = ({
  paymentDetailsLoading,
  activePaymentMethod,
  showInnerPopup,
  error,
  t
}) => {
  const renderPaymentMethodItem = () => {
    const { paymentMethod, paymentGateway, id } = activePaymentMethod;
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
            activePaymentMethod={activePaymentMethod}
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
        <MyAccountError generalError fullHeight />
      ) : !activePaymentMethod ? (
        <MyAccountError
          icon={AddIcon}
          title={t('No payment method added!')}
          subtitle={t('Add a card to start your plan')}
          withBorder
          onClick={() => showInnerPopup()}
        />
      ) : (
        <PaymentDetailsStyled>{renderPaymentMethodItem()}</PaymentDetailsStyled>
      )}
    </WrapStyled>
  );
};

PaymentMethod.propTypes = {
  activePaymentMethod: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.arrayOf(PropTypes.string),
  paymentDetailsLoading: PropTypes.bool,
  showInnerPopup: PropTypes.func,
  t: PropTypes.func
};

PaymentMethod.defaultProps = {
  activePaymentMethod: {},
  error: [],
  paymentDetailsLoading: false,
  showInnerPopup: () => {},
  t: k => k
};

export { PaymentMethod as PurePaymentMethod };

export default withTranslation()(labeling()(PaymentMethod));
