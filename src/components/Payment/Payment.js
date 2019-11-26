import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import createOrder from 'api/createOrder';
import updateOrder from 'api/updateOrder';
import submitPayment from 'api/submitPayment';
import Button, { BUTTON_TYPE } from 'components/Button/Button';
import Adyen from 'components/Adyen';
import {
  PaymentStyled,
  TitleStyled,
  MethodsWrapperStyled,
  PaymentErrorStyled
} from './PaymentStyled';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaymentFormDisplayed: false,
      generalError: ''
    };
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

  choosePaymentMethod = () => {
    const orderId = localStorage.getItem('CLEENG_ORDER_ID');
    if (orderId) {
      updateOrder(orderId, {
        paymentMethodId: '828628202'
      });
    }
  };

  render() {
    const { isPaymentFormDisplayed, generalError } = this.state;
    return (
      <PaymentStyled>
        <TitleStyled>Purchase using</TitleStyled>
        <MethodsWrapperStyled>
          <Button
            onClickFn={() => {
              this.setState({ isPaymentFormDisplayed: true });
              this.choosePaymentMethod();
            }}
            variant={BUTTON_TYPE.CREDIT_CARD}
          >
            Credit card
          </Button>
          <Button
            onClickFn={() => this.setState({ isPaymentFormDisplayed: true })}
            variant={BUTTON_TYPE.CREDIT_CARD}
            disabled
          >
            PayPal
          </Button>
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
  onPaymentComplete: PropTypes.func.isRequired
};

export default Payment;
