import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import {
  submitPayment,
  submitPayPalPayment,
  submitPaymentWithoutDetails,
  updateOrder,
  getPaymentMethods
} from 'api';
import Button from 'components/Button';
import Adyen from 'components/Adyen';
import SectionHeader from 'components/SectionHeader';
import Loader from 'components/Loader';
import { getData } from 'util/appConfigHelper';
import PaymentMethodButton from 'components/PaymentMethodButton';
import Auth from 'services/auth';
import { currencyFormat } from 'util/planHelper';
import {
  PaymentStyled,
  MethodsWrapperStyled,
  PaymentErrorStyled,
  PayPalWrapperStyled,
  PayPalTextStyled,
  LegalNoteWrapperStyled,
  LegalTextStyled
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
    const { t, availablePaymentMethods } = this.props;
    const validPaymentMethods = this.validatePaymentMethods(
      availablePaymentMethods
    );
    if (validPaymentMethods.length) {
      this.setState({
        paymentMethods: validPaymentMethods
      });
      const defaultMethod = validPaymentMethods.find(method => method.default);
      if (defaultMethod) {
        this.setState({ isPaymentFormDisplayed: true });
        this.choosePaymentMethod(defaultMethod.id, defaultMethod.methodName);
      }
      if (validPaymentMethods.length === 1) {
        const paymentMethod = validPaymentMethods[0];
        this.setState({ isPaymentFormDisplayed: true });
        this.choosePaymentMethod(paymentMethod.id, paymentMethod.methodName);
      }
    } else {
      try {
        const response = await getPaymentMethods();
        const { paymentMethods } = response.responseData;
        const validMethodsFromResponse = this.validatePaymentMethods(
          paymentMethods,
          false
        );
        if (validMethodsFromResponse) {
          if (!validMethodsFromResponse.length) {
            this.setState({
              generalError: t('Payment methods are not defined')
            });
          } else {
            this.setState({
              paymentMethods: validMethodsFromResponse
            });
          }
        } else if (!response.errors.length) {
          this.setState({
            generalError: t('Cannot fetch payment methods')
          });
        }
      } catch {
        this.setState({
          generalError: t('Cannot fetch payment methods')
        });
      }
    }

    if (window.location.search && window.location.search.includes('message')) {
      this.setState({
        generalError: t('Your payment was not processed. Please, try again')
      });
    }
  }

  validatePaymentMethods = (paymentMethods, showError = true) => {
    if (!paymentMethods) return [];
    const supportedPaymentMethods = ['card', 'paypal'];
    const supportedPaymentGateways = ['adyen', 'paypal'];
    const validPaymentMethods = paymentMethods.filter(method => {
      if (
        supportedPaymentMethods.includes(method.methodName) &&
        supportedPaymentGateways.includes(method.paymentGateway)
      )
        return true;

      if (showError)
        // eslint-disable-next-line no-console
        console.error(`Payment method not supported (id: ${method.id})`);
      return false;
    });
    return validPaymentMethods;
  };

  onAdyenSubmit = ({ data: { paymentMethod: card } }) => {
    const { onPaymentComplete, t } = this.props;
    this.setState({
      generalError: '',
      isLoading: true
    });
    submitPayment(card).then(paymentReponse => {
      if (paymentReponse.errors.length) {
        window.dispatchEvent(
          new CustomEvent('MSSDK:purchase-failed', {
            detail: {
              reason: paymentReponse.errors[0]
            }
          })
        );
        const notSupportedMethod = paymentReponse.errors[0].includes(
          'Payment details are not supported'
        );
        if (notSupportedMethod) {
          this.setState({
            generalError: t(
              'Payment method not supported. Try different payment method'
            ),
            isLoading: false
          });
        } else {
          this.setState({
            generalError: t('The payment failed. Please try again.'),
            isLoading: false
          });
        }
      } else {
        window.dispatchEvent(
          new CustomEvent('MSSDK:purchase-successful', {
            detail: {
              payment: paymentReponse.responseData
            }
          })
        );
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
    this.clearError();
    const orderId = getData('CLEENG_ORDER_ID');
    if (orderId) {
      updateOrder(orderId, {
        paymentMethodId: methodId
      }).then(response => {
        const { updatePriceBreakdown } = this.props;
        if (response.errors.length && response.errors[0].includes('JWT')) {
          Auth.logout();
        }
        updatePriceBreakdown(response.responseData.order);
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
        window.dispatchEvent(
          new CustomEvent('MSSDK:purchase-successful', {
            detail: {
              payment: paymentReponse.responseData
            }
          })
        );
        onPaymentComplete();
      }
    });
  };

  gernerateLegalNote = () => {
    const { order, period } = this.props;
    const discountApplied = order.discount && order.discount.applied;
    const isInTrial = discountApplied && order.discount.type === 'trial';
    const readablePrice = `${currencyFormat[order.currency]}${
      order.priceBreakdown.offerPrice
    }${period ? `/${period}` : ''}`;

    return (
      <LegalNoteWrapperStyled>
        <LegalTextStyled>
          <strong>
            {discountApplied
              ? 'After any free trial and/or promotional period'
              : `By clicking 'Complete purchase'`}
            , you will be charged {readablePrice} or then-current price plus
            applicable taxes on a recurring basis.{' '}
          </strong>
          {isInTrial &&
            'If you do not cancel the service during its free trial period, you will be charged. '}
          Your subscription will automatically continue until you cancel. To
          cancel, log into{' '}
          <a
            href={getData('CLEENG_MY_ACCOUNT_URL')}
            style={{
              textDecoration: getData('CLEENG_MY_ACCOUNT_URL')
                ? 'underline'
                : 'none'
            }}
          >
            your account
          </a>{' '}
          and click &apos;Manage Subscription&apos;.
        </LegalTextStyled>
        <LegalTextStyled>
          By clicking &apos;Complete Purchase&apos; above, I expressly
          acknowledge and agree to the above terms as well as the full Terms of
          Service.
        </LegalTextStyled>
      </LegalNoteWrapperStyled>
    );
  };

  render() {
    const { isPaymentDetailsRequired, order, t } = this.props;
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
            {paymentMethods.length !== 1 && (
              <>
                <SectionHeader marginTop="25px" center>
                  {t('Purchase using')}
                </SectionHeader>
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
              </>
            )}
            {generalError && (
              <PaymentErrorStyled>{generalError}</PaymentErrorStyled>
            )}
            {isPayPal && (
              <PayPalWrapperStyled>
                <PayPalTextStyled>
                  {t('Click ‘Continue with PayPal’ to complete your purchase.')}
                </PayPalTextStyled>
                <Button
                  type="button"
                  theme="payment"
                  onClickFn={this.submitPayPal}
                >
                  {isLoading ? (
                    <Loader buttonLoader color="#ffffff" />
                  ) : (
                    t('Continue with PayPal')
                  )}
                </Button>
              </PayPalWrapperStyled>
            )}
            {isPaymentFormDisplayed && !isPayPal && (
              <Adyen
                onSubmit={this.onAdyenSubmit}
                onChange={this.clearError}
                isPaymentProcessing={isLoading}
              />
            )}
            {(isPayPal || isPaymentFormDisplayed) &&
              order.offerId.charAt(0) === 'S' &&
              this.gernerateLegalNote()}
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
  updatePriceBreakdown: PropTypes.func,
  order: PropTypes.objectOf(PropTypes.any),
  period: PropTypes.string,
  availablePaymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      methodName: PropTypes.string.isRequired,
      paymentGateway: PropTypes.string.isRequired,
      default: PropTypes.bool
    })
  ),
  t: PropTypes.func
};

Payment.defaultProps = {
  isPaymentDetailsRequired: true,
  updatePriceBreakdown: () => {},
  order: {},
  period: null,
  availablePaymentMethods: null,
  t: k => k
};

export { Payment as PurePayment };

export default withTranslation()(labeling()(Payment));
