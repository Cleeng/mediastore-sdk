import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import {
  getPaymentMethods,
  submitPayment,
  submitPaymentWithoutDetails,
  submitPayPalPayment,
  updateOrder
} from 'api';
import Button from 'components/Button';
import Adyen from 'components/Adyen';
import Loader from 'components/Loader';
import { getData } from 'util/appConfigHelper';
import Auth from 'services/auth';
import { ReactComponent as PaypalLogo } from 'assets/images/paymentMethods/payment-paypal.svg';
import { useSelector } from 'react-redux';
import {
  PaymentErrorStyled,
  PaymentStyled,
  PaymentWrapperStyled
} from './PaymentStyled';
import {
  supportedPaymentGateways,
  supportedPaymentMethods
} from './Payment.utils';
import eventDispatcher, {
  MSSDK_PURCHASE_FAILED,
  MSSDK_PURCHASE_SUCCESSFUL
} from '../../util/eventDispatcher';
import LegalNote from './LegalNote/LegalNote';
import PayPal from './PayPal/PayPal';
import DropInSection from './DropInSection/DropInSection';
import { ConfirmButtonStyled } from '../Adyen/AdyenStyled';
import { periodMapper } from '../../util';

const Payment = ({ t, onPaymentComplete, updatePriceBreakdown }) => {
  const { availablePaymentMethods } = useSelector(state => state.checkout);
  const order = useSelector(state => state.order.order);
  const { requiredPaymentDetails: isPaymentDetailsRequired } = order;
  const { period: offerPeriod } = useSelector(state => state.offer.offer);
  const period = offerPeriod
    ? periodMapper[offerPeriod].chargedForEveryText
    : null;
  const [isPaymentFormDisplayed, setIsPaymentFormDisplayed] = useState(true);
  const [isPayPal, setIsPayPal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validPaymentMethods, setValidPaymentMethods] = useState([]);
  const [generalError, setGeneralError] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [dropInInstance, setDropInInstance] = useState(null);

  const validatePaymentMethods = (paymentMethods, showError = true) => {
    if (!paymentMethods) return [];
    return paymentMethods.filter(method => {
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
  };
  const choosePaymentMethod = async (methodId, paymentGateway) => {
    setGeneralError('');
    const orderId = getData('CLEENG_ORDER_ID');
    if (orderId) {
      const { errors, responseData } = await updateOrder(orderId, {
        paymentMethodId: methodId
      });

      if (errors[0]?.includes('JWT')) {
        Auth.logout();
      }
      updatePriceBreakdown(responseData.order);
    }

    setIsPayPal(paymentGateway === 'paypal');
  };
  const selectPaymentMethod = gateway => {
    setSelectedPaymentMethod(gateway);
    choosePaymentMethod(
      validPaymentMethods.find(
        ({ paymentGateway }) => paymentGateway === gateway
      ).id,
      gateway
    );
  };

  const isGatewayAvailable = gateway =>
    !!validPaymentMethods.find(
      ({ paymentGateway }) => paymentGateway === gateway
    );

  const handlePayPalError = () => {
    const { search } = window.location;
    if (search?.includes('message')) {
      setGeneralError(t('Your payment was not processed. Please, try again'));
    }
  };

  const selectAvailablePaymentMethod = availableValidPaymentMethods => {
    setValidPaymentMethods(availableValidPaymentMethods);

    const defaultMethod = availableValidPaymentMethods.find(
      method => method.default
    );
    if (defaultMethod) {
      setIsPaymentFormDisplayed(true);
      setSelectedPaymentMethod(defaultMethod.paymentGateway);
      choosePaymentMethod(defaultMethod.id, defaultMethod.paymentGateway);
      return;
    }
    if (availableValidPaymentMethods.length >= 1) {
      const [paymentMethod] = availableValidPaymentMethods;
      const { id, paymentGateway } = paymentMethod;
      setIsPaymentFormDisplayed(true);
      setSelectedPaymentMethod(paymentGateway);
      choosePaymentMethod(id, paymentGateway);
    }
  };
  const fetchPaymentMethods = async () => {
    const response = await getPaymentMethods();
    const { paymentMethods } = response.responseData;
    const validMethodsFromResponse = validatePaymentMethods(
      paymentMethods,
      false
    );
    setValidPaymentMethods(validMethodsFromResponse);
    if (response.errors.length) {
      setGeneralError(t('Cannot fetch payment methods'));
      return;
    }

    if (!validMethodsFromResponse?.length) {
      // TODO: Check if optional chaining is available
      setGeneralError(t('Payment methods are not defined'));
      return;
    }

    if (validMethodsFromResponse.length >= 1) {
      const [paymentMethod] = validMethodsFromResponse;
      const { id, paymentGateway } = paymentMethod;
      setIsPaymentFormDisplayed(true);
      setSelectedPaymentMethod(paymentGateway);
      choosePaymentMethod(id, paymentGateway);
    }
  };
  useEffect(() => {
    const availableValidPaymentMethods = validatePaymentMethods(
      availablePaymentMethods
    );
    if (availableValidPaymentMethods.length) {
      selectAvailablePaymentMethod(availableValidPaymentMethods);
      return;
    }

    fetchPaymentMethods();
    handlePayPalError();
  }, []);

  const submitPayPal = async () => {
    setIsLoading(true);
    const {
      responseData: { redirectUrl }
    } = await submitPayPalPayment();
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      setIsLoading(false);
      setGeneralError(t('The payment failed. Please try again.'));
    }
  };

  const onAdyenSubmit = async ({ data: { paymentMethod } }) => {
    setGeneralError('');
    setIsLoading(true);

    const {
      errors,
      responseData: { payment }
    } = await submitPayment(paymentMethod);
    if (!errors.length) {
      eventDispatcher(MSSDK_PURCHASE_SUCCESSFUL, {
        payment
      });
      onPaymentComplete();
      return;
    }

    eventDispatcher(MSSDK_PURCHASE_FAILED, {
      reason: errors[0]
    });
    const notSupportedMethod = errors[0].includes(
      'Payment details are not supported'
    );
    setGeneralError(
      notSupportedMethod
        ? t('Payment method not supported. Try different payment method')
        : t('The payment failed. Please try again.')
    );
    setIsLoading(false);
  };

  const paymentWithoutDetails = async () => {
    setIsLoading(true);
    setGeneralError('');

    const { errors, responseData } = await submitPaymentWithoutDetails();
    if (errors.length) {
      setIsLoading(false);
      setGeneralError(t('The payment failed. Please try again.'));
      return;
    }

    eventDispatcher(MSSDK_PURCHASE_SUCCESSFUL, {
      payment: responseData
    });

    onPaymentComplete();
  };

  const getDropIn = drop => {
    setDropInInstance(drop);
  };

  const confirmButtonText =
    selectedPaymentMethod === 'paypal'
      ? 'Continue with PayPal'
      : t('Complete purchase');

  const handleConfirm = () => {
    if (selectedPaymentMethod === 'paypal') {
      submitPayPal();
      return;
    }
    if (!dropInInstance) {
      return;
    }

    dropInInstance.submit();
  };

  if (!isPaymentDetailsRequired) {
    return (
      <PaymentStyled>
        <Button
          onClickFn={paymentWithoutDetails}
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
      </PaymentStyled>
    );
  }

  return (
    <PaymentStyled>
      {generalError && <PaymentErrorStyled>{generalError}</PaymentErrorStyled>}
      {isPaymentFormDisplayed && (
        <PaymentWrapperStyled>
          {isGatewayAvailable('adyen') && (
            <Adyen
              onSubmit={onAdyenSubmit}
              onChange={() => setGeneralError('')}
              isPaymentProcessing={isLoading}
              selectPaymentMethod={selectPaymentMethod}
              selectedPaymentMethod={selectedPaymentMethod}
              isPayPalAvailable={isGatewayAvailable('paypal')}
              getDropIn={getDropIn}
            />
          )}
          {isGatewayAvailable('paypal') && dropInInstance && (
            <DropInSection
              isCardAvailable={isGatewayAvailable('adyen')}
              selectPaymentMethod={selectPaymentMethod}
              isSelected={selectedPaymentMethod === 'paypal'}
              title="PayPal"
              logo={<PaypalLogo />}
            >
              <PayPal totalPrice={order.totalPrice} offerId={order.offerId} />
            </DropInSection>
          )}
          <ConfirmButtonStyled>
            <Button
              size="big"
              {...{
                size: 'normal',
                width: '60%',
                margin: 'auto'
              }}
              theme="confirm"
              onClickFn={handleConfirm}
              disabled={isLoading || !selectedPaymentMethod}
            >
              {isLoading ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                confirmButtonText
              )}
            </Button>
          </ConfirmButtonStyled>
        </PaymentWrapperStyled>
      )}
      {(isPayPal || isPaymentFormDisplayed) &&
        order?.offerId?.charAt(0) === 'S' && (
          <LegalNote order={order} period={period} />
        )}
    </PaymentStyled>
  );
};

Payment.propTypes = {
  onPaymentComplete: PropTypes.func.isRequired,
  isPaymentDetailsRequired: PropTypes.bool,
  updatePriceBreakdown: PropTypes.func,
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
  period: null,
  availablePaymentMethods: null,
  t: k => k
};

export { Payment as PurePayment };

export default withTranslation()(labeling()(Payment));
