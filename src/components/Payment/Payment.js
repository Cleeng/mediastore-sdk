import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import createOrder from 'api/createOrder';
import updateOrder from 'api/updateOrder';
import submitPayment from 'api/submitPayment';
import Button, { BUTTON_TYPE } from 'components/Button/Button';
import Adyen from 'components/Adyen';
import getPaymentMethods from 'api/getPaymentMethods';
import {
  PaymentStyled,
  TitleStyled,
  MethodsWrapperStyled,
  ButtonImageStyled,
  PaymentErrorStyled
} from './PaymentStyled';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaymentFormDisplayed: false,
      paymentMethods: [],
      generalError: ''
    };
  }

  async componentDidMount() {
    const { t } = this.props;
    const response = await getPaymentMethods();
    if (response.responseData && response.responseData.paymentMethods) {
      this.setState({
        paymentMethods: response.responseData.paymentMethods
      });
      localStorage.setItem(
        'CLEENG_PAYMENT_METHOD_ID',
        response.responseData.paymentMethods[0].id
      );
    } else {
      this.setState({
        generalError: t('Cannot fetch payment methods')
      });
    }
  }

  onAdyenSubmit = ({ data: { paymentMethod: card } }) => {
    const { onPaymentComplete } = this.props;
    this.setState({
      generalError: ''
    });
    submitPayment(card).then(paymentReponse => {
      if (paymentReponse.errors.length) {
        this.setState({
          generalError: 'The payment failed. Please try again.'
        });
      } else {
        onPaymentComplete();
      }
    });
  };

  clearError = () => {
    this.setState({
      generalError: ''
    });
  };

  choosePaymentMethod = methodId => {
    const orderId = localStorage.getItem('CLEENG_ORDER_ID');
    localStorage.setItem('CLEENG_PAYMENT_METHOD_ID', methodId);
    if (orderId) {
      updateOrder(orderId, {
        paymentMethodId: methodId
      });
    }
  };

  render() {
    const { t } = this.props;
    const { isPaymentFormDisplayed, generalError, paymentMethods } = this.state;
    return (
      <PaymentStyled>
        <TitleStyled>{t('Purchase using')}</TitleStyled>
        <MethodsWrapperStyled>
          {paymentMethods.map(method => (
            <Button
              key={method.methodName}
              onClickFn={() => {
                this.setState({ isPaymentFormDisplayed: true });
                this.choosePaymentMethod(method.id);
              }}
              variant={BUTTON_TYPE.PAYMENT}
              disabled={method.methodName === 'paypal'}
            >
              {method.logoUrl ? (
                <ButtonImageStyled
                  alt={method.methodName}
                  src={method.logoUrl}
                />
              ) : (
                method.methodName.toUpperCase()
              )}
            </Button>
          ))}
        </MethodsWrapperStyled>
        {generalError && (
          <PaymentErrorStyled>{generalError}</PaymentErrorStyled>
        )}
        {isPaymentFormDisplayed && (
          <Adyen onSubmit={this.onAdyenSubmit} onChange={this.clearError} />
        )}
      </PaymentStyled>
    );
  }
}

Payment.propTypes = {
  onPaymentComplete: PropTypes.func.isRequired,
  t: PropTypes.func
};

Payment.defaultProps = {
  t: k => k
};

export default Payment;
