import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  getPaymentMethods,
  submitPayment,
  submitPayPalPayment,
  submitPaymentWithoutDetails,
  updateOrder
} from 'api';
import Button from 'components/Button';
import Adyen from 'components/Adyen';
import Loader from 'components/Loader';
import {
  PaymentStyled,
  TitleStyled,
  MethodsWrapperStyled,
  ButtonImageStyled,
  PaymentErrorStyled,
  PayPalWrapperStyled,
  PayPalTextStyled
} from './PaymentStyled';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaymentFormDisplayed: false,
      isPayPal: false,
      isLoading: false,
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
    if (window.location.search && window.location.search.includes('message')) {
      this.setState({
        generalError: t('Your payment was not processed. Please, try again')
      });
    }
  }

  onAdyenSubmit = ({ data: { paymentMethod: card } }) => {
    const { onPaymentComplete, t } = this.props;
    this.setState({
      generalError: ''
    });
    submitPayment(card).then(paymentReponse => {
      if (paymentReponse.errors.length) {
        const notSupportedMethod = paymentReponse.errors[0].includes(
          'Payment details are not supported'
        );
        if (notSupportedMethod) {
          this.setState({
            generalError: t(
              'Payment method not supported. Try different payment method'
            )
          });
        } else {
          this.setState({
            generalError: t('The payment failed. Please try again.')
          });
        }
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

  choosePaymentMethod = (methodId, methodName) => {
    const orderId = localStorage.getItem('CLEENG_ORDER_ID');
    localStorage.setItem('CLEENG_PAYMENT_METHOD_ID', methodId);
    if (orderId) {
      updateOrder(orderId, {
        paymentMethodId: methodId
      });
    }
    if (methodName === 'paypal') {
      this.setState({
        isPayPal: true
      });
    } else {
      this.setState({
        isPayPal: false
      });
    }
  };

  submitPayPal = () => {
    const { t } = this.props;
    this.setState({
      isLoading: true
    });
    submitPayPalPayment()
      .then(resp => {
        window.location.href = resp.responseData.redirectUrl;
      })
      .catch(() =>
        this.setState({
          generalError: t('The payment failed. Please try again.'),
          isLoading: false
        })
      );
  };

  finishTransaction = () => {
    const { onPaymentComplete, t } = this.props;
    this.setState({
      generalError: ''
    });
    submitPaymentWithoutDetails().then(paymentReponse => {
      if (paymentReponse.errors.length) {
        this.setState({
          generalError: t('The payment failed. Please try again.')
        });
      } else {
        onPaymentComplete();
      }
    });
  };

  render() {
    const { isPaymentDetailsRequired, t } = this.props;
    const {
      isPaymentFormDisplayed,
      generalError,
      paymentMethods,
      isPayPal,
      isLoading
    } = this.state;

    return (
      <PaymentStyled>
        {isPaymentDetailsRequired ? (
          <>
            <TitleStyled>{t('Purchase using')}</TitleStyled>
            <MethodsWrapperStyled>
              {paymentMethods.map(method => (
                <Button
                  key={method.id}
                  onClickFn={() => {
                    this.setState({ isPaymentFormDisplayed: true });
                    this.choosePaymentMethod(method.id, method.methodName);
                  }}
                  theme="simple"
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
            {isPayPal && (
              <PayPalWrapperStyled>
                <PayPalTextStyled>
                  {t(
                    'To purchase using PayPal click "Pay with PayPal" button. You will be redirected to the PayPal site'
                  )}
                </PayPalTextStyled>
                <Button
                  type="button"
                  theme="payment"
                  onClickFn={this.submitPayPal}
                >
                  {isLoading ? (
                    <Loader buttonLoader color="#ffffff" />
                  ) : (
                    t('Pay with PayPal')
                  )}
                </Button>
              </PayPalWrapperStyled>
            )}
            {isPaymentFormDisplayed && !isPayPal && (
              <Adyen onSubmit={this.onAdyenSubmit} onChange={this.clearError} />
            )}
          </>
        ) : (
          <Button onClickFn={this.finishTransaction} theme="simple">
            {t('Complete purchase')}
          </Button>
        )}
      </PaymentStyled>
    );
  }
}

Payment.propTypes = {
  onPaymentComplete: PropTypes.func.isRequired,
  isPaymentDetailsRequired: PropTypes.bool,
  t: PropTypes.func
};

Payment.defaultProps = {
  isPaymentDetailsRequired: true,
  t: k => k
};

export default Payment;
