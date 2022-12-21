import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import {
  getPaymentMethods,
  submitPayment,
  submitPaymentWithoutDetails,
  submitPayPalPayment
} from 'api';
import Button from 'components/Button';
import Adyen from 'components/Adyen';
import Loader from 'components/Loader';
import SectionHeader from 'components/SectionHeader';
import Auth from 'services/auth';
import { ReactComponent as PaypalLogo } from 'assets/images/paymentMethods/payment-paypal.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  validatePaymentMethods,
  shouldShowGatewayComponent
} from 'util/paymentMethodHelper';
import { updateAvailableAndValidPaymentMethods } from 'redux/publisherConfigSlice';
import usePrevious from 'util/usePreviousHook';
import { fetchUpdateOrder } from 'redux/orderSlice';
import {
  PaymentErrorStyled,
  PaymentStyled,
  PaymentWrapperStyled
} from './PaymentStyled';
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
  const { availableAndValidPaymentMethods } = useSelector(
    state => state.publisherConfig
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const prevSelectedPaymentMethod = usePrevious(selectedPaymentMethod);

  const order = useSelector(state => state.order.order);
  const { requiredPaymentDetails: isPaymentDetailsRequired } = order;
  const { period: offerPeriod } = useSelector(state => state.offer.offer);
  const period = offerPeriod
    ? periodMapper[offerPeriod].chargedForEveryText
    : null;
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [dropInInstance, setDropInInstance] = useState(null);
  const [adyenKey, setAdyenKey] = useState(false);
  const dispatch = useDispatch();

  // order updates
  const updateOrderWithPaymentMethodId = async methodId => {
    setGeneralError('');
    const { id, paymentMethodId } = order;
    if (id && methodId && methodId !== paymentMethodId) {
      dispatch(
        fetchUpdateOrder({
          id,
          payload: { paymentMethodId: methodId }
        })
      )
        .unwrap()
        .then(responseData => {
          updatePriceBreakdown(responseData.order);
        })
        .catch(errors => {
          if (errors && errors[0]?.includes('JWT')) {
            Auth.logout();
          }
        });
    }
  };

  // payment methods
  const selectPaymentMethodHandler = paymentMethodName => {
    if (selectedPaymentMethod?.methodName === paymentMethodName) return;
    const paymentMethodObj = availableAndValidPaymentMethods.find(
      ({ methodName }) => methodName === paymentMethodName
    );
    setSelectedPaymentMethod(paymentMethodObj);
    if (prevSelectedPaymentMethod !== paymentMethodObj?.id) {
      updateOrderWithPaymentMethodId(paymentMethodObj.id);
    }
  };

  const fetchPaymentMethods = async () => {
    const response = await getPaymentMethods();
    const { paymentMethods } = response.responseData;
    const validMethodsFromResponse = validatePaymentMethods(
      paymentMethods,
      false
    );
    if (response.errors.length) {
      setGeneralError(t('Cannot fetch payment methods'));
      return;
    }

    dispatch(updateAvailableAndValidPaymentMethods(validMethodsFromResponse));

    if (!validMethodsFromResponse?.length) {
      setGeneralError(t('Payment methods are not defined'));
      return;
    }

    if (validMethodsFromResponse.length === 1) {
      const [paymentMethod] = validMethodsFromResponse;
      setSelectedPaymentMethod(paymentMethod);
    }
  };

  const handlePayPalError = () => {
    const { search } = window.location;
    if (search?.includes('message')) {
      setGeneralError(t('Your payment was not processed. Please, try again'));
    }
  };

  useEffect(() => {
    if (availableAndValidPaymentMethods.length) {
      const [paymentMethod] = availableAndValidPaymentMethods;
      setSelectedPaymentMethod(paymentMethod);
      return;
    }

    fetchPaymentMethods();
    handlePayPalError();
  }, []);

  // PayPal
  const submitPayPal = async () => {
    setIsLoading(true);
    const { responseData } = await submitPayPalPayment();
    if (responseData?.redirectUrl) {
      window.location.href = responseData.redirectUrl;
    } else {
      setIsLoading(false);
      setGeneralError(t('The payment failed. Please try again.'));
    }
  };

  // Adyen
  const onAdditionalDetails = async state => {
    console.log('onAdditionalDetails event');
    const {
      data: { details }
    } = state;
    console.log('data for finilize initial payment', details);
  };

  const onAdyenSubmit = async (state, component) => {
    const {
      data: { paymentMethod, browserInfo, billingAddress }
    } = state;
    setGeneralError('');
    setIsLoading(true);
    const { errors, responseData } = await submitPayment(
      paymentMethod,
      browserInfo,
      billingAddress
    );

    if (errors.length) {
      eventDispatcher(MSSDK_PURCHASE_FAILED, {
        reason: errors[0]
      });
      const notSupportedMethod = errors[0].includes(
        'Payment details are not supported'
      );
      setGeneralError(
        notSupportedMethod
          ? t('Payment method not supported. Try different payment method')
          : t(
              'The payment has not been processed. Please, try again with a different payment method.'
            )
      );
      setIsLoading(false);
      // force Adyen remount
      setDropInInstance(null);
      setAdyenKey(key => !key);
      return;
    }

    const { action, payment } = responseData;
    console.log('action', action);
    if (action) {
      component.handleAction(action);
      return;
    }
    eventDispatcher(MSSDK_PURCHASE_SUCCESSFUL, {
      payment
    });
    onPaymentComplete();
  };

  const getDropIn = drop => {
    setDropInInstance(drop);
  };

  // Payment without payment details
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

  const handleConfirm = () => {
    if (selectedPaymentMethod.methodName === 'paypal') {
      submitPayPal();
      return;
    }
    if (!dropInInstance) {
      return;
    }

    dropInInstance.submit();
  };

  // helpers
  const confirmButtonText =
    selectedPaymentMethod?.methodName === 'paypal'
      ? 'Continue with PayPal'
      : t('Complete purchase');

  const shouldShowAdyen = shouldShowGatewayComponent(
    'adyen',
    availableAndValidPaymentMethods
  );
  const shouldShowPayPal = shouldShowGatewayComponent(
    'paypal',
    availableAndValidPaymentMethods
  );
  console.log({ availableAndValidPaymentMethods });
  console.log({ shouldShowPayPal });
  const showPayPalWhenAdyenIsReady = () =>
    shouldShowAdyen ? !!dropInInstance : true;

  if (!availableAndValidPaymentMethods.length) {
    return (
      <PaymentStyled>
        <SectionHeader marginTop="25px" center>
          {t('Purchase using')}
        </SectionHeader>
        {generalError && (
          <PaymentErrorStyled>{generalError}</PaymentErrorStyled>
        )}
      </PaymentStyled>
    );
  }

  if (!isPaymentDetailsRequired) {
    return (
      <PaymentStyled>
        {generalError && (
          <PaymentErrorStyled>{generalError}</PaymentErrorStyled>
        )}
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
      <SectionHeader marginTop="25px" center>
        {t('Purchase using')}
      </SectionHeader>
      <PaymentWrapperStyled>
        {shouldShowAdyen && (
          <Adyen
            key={adyenKey}
            onSubmit={onAdyenSubmit}
            isPaymentProcessing={isLoading}
            selectPaymentMethod={selectPaymentMethodHandler}
            selectedPaymentMethod={selectedPaymentMethod?.methodName}
            isPayPalAvailable={shouldShowPayPal}
            getDropIn={getDropIn}
            onAdditionalDetails={onAdditionalDetails}
          />
        )}
        {shouldShowPayPal && showPayPalWhenAdyenIsReady() && (
          <DropInSection
            isCardAvailable={shouldShowAdyen}
            selectPaymentMethod={selectPaymentMethodHandler}
            isSelected={selectedPaymentMethod?.methodName === 'paypal'}
            title="PayPal"
            logo={<PaypalLogo />}
            fadeOutSection={
              isLoading && selectedPaymentMethod?.methodName !== 'paypal'
            }
          >
            <PayPal totalPrice={order.totalPrice} offerId={order.offerId} />
          </DropInSection>
        )}

        <ConfirmButtonStyled>
          {generalError && (
            <PaymentErrorStyled>{generalError}</PaymentErrorStyled>
          )}
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
      {order?.offerId?.charAt(0) === 'S' && (
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
  t: PropTypes.func
};

Payment.defaultProps = {
  isPaymentDetailsRequired: true,
  updatePriceBreakdown: () => {},
  period: null,
  t: k => k
};

export { Payment as PurePayment };

export default withTranslation()(labeling()(Payment));
