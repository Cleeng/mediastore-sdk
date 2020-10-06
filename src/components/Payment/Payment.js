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
import SectionHeader from 'components/SectionHeader';
import Loader from 'components/Loader';
import { getData, setData } from 'util/appConfigHelper';
import PaymentMethodButton from 'components/PaymentMethodButton';
import {
  PaymentStyled,
  MethodsWrapperStyled,
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
      setData(
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
    const orderId = getData('CLEENG_ORDER_ID');
    setData('CLEENG_PAYMENT_METHOD_ID', methodId);
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
      isLoading: true,
      generalError: ''
    });
    submitPaymentWithoutDetails().then(paymentReponse => {
      if (paymentReponse.errors.length) {
        this.setState({
          generalError: t('The payment failed. Please try again.'),
          isLoading: false
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
            <SectionHeader center>{t('Purchase using')}</SectionHeader>
            <MethodsWrapperStyled>
              {paymentMethods.map(method => (
                <PaymentMethodButton
                  key={method.id}
                  methodName={method.methodName}
                  onClickFn={() => {
                    this.setState({ isPaymentFormDisplayed: true });
                    this.choosePaymentMethod(method.id, method.methodName);
                  }}
                />
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
          <Button
            onClickFn={this.finishTransaction}
            theme="confirm"
            width="250px"
            size="big"
            margin="20px auto 0 auto"
          >
            {isLoading ? (
              <Loader buttonLoader color="#ffffff" />
            ) : (
              t('Complete purchase')
            )}
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
