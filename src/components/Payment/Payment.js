import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createOrder from '../../api/createOrder';
import submitPayment from '../../api/submitPayment';
import {
  PaymentStyled,
  TitleStyled,
  MethodsWrapperStyled
} from './PaymentStyled';
import Button, { BUTTON_TYPE } from '../Button/Button';
import Adyen from '../Adyen';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaymentFormDisplayed: false,
      orderId: ''
    };
  }

  componentDidMount() {
    createOrder().then(({ orderId }) => this.setState({ orderId }));
  }

  onAdyenSubmit = ({ data: { paymentMethod: card } }) => {
    const { onPaymentComplete } = this.props;
    const { orderId } = this.state;
    submitPayment(orderId, card).then(onPaymentComplete);
  };

  render() {
    const { isPaymentFormDisplayed } = this.state;
    return (
      <PaymentStyled>
        <TitleStyled>Purchase using</TitleStyled>
        <MethodsWrapperStyled>
          <Button
            onClickFn={() => this.setState({ isPaymentFormDisplayed: true })}
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
        {isPaymentFormDisplayed && <Adyen onSubmit={this.onAdyenSubmit} />}
      </PaymentStyled>
    );
  }
}
Payment.propTypes = {
  onPaymentComplete: PropTypes.func.isRequired
};

export default Payment;
