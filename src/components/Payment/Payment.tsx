import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getPaymentMethods, submitPayment, submitPayPalPayment } from 'api';
import { submitPaymentWithoutDetails } from 'appRedux/paymentSlice';
import Button from 'components/Button';
import Adyen from 'components/Adyen';
import Loader from 'components/Loader';
import SectionHeader from 'components/SectionHeader';
import { validateDeliveryDetailsForm } from 'components/DeliveryDetails/RecipientForm/validators';
import {
  fetchFinalizeInitialPayment,
  selectFinalizePayment
} from 'appRedux/finalizePaymentSlice';
import { selectDeliveryDetails } from 'appRedux/deliveryDetailsSlice';
import Auth from 'services/auth';
import {
  validatePaymentMethods,
  shouldShowGatewayComponent
} from 'util/paymentMethodHelper';
import {
  updatePaymentMethods,
  selectPublisherConfig
} from 'appRedux/publisherConfigSlice';
import { fetchUpdateOrder, selectOnlyOrder } from 'appRedux/orderSlice';
import { setSelectedPaymentMethod } from 'appRedux/paymentMethodsSlice';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import RedirectElement from '@adyen/adyen-web';
import ReCAPTCHA from 'react-google-recaptcha';
import useCaptchaVerification from 'hooks/useCaptchaVerification';
import {
  PaymentErrorStyled,
  PaymentStyled,
  PaymentWrapperStyled
} from './PaymentStyled';
import eventDispatcher, {
  MSSDK_PURCHASE_FAILED,
  MSSDK_PURCHASE_SUCCESSFUL,
  MSSDK_AUTH_FAILED,
  MSSDK_PAYMENT
} from '../../util/eventDispatcher';
import PayPal from './PayPal/PayPal';
import DropInSection from './DropInSection/DropInSection';
import { PaymentProps } from './Payment.types';

type ErrorMapType = {
  [key: string]: [string, string];
};

const GERNERAL_ERRORS_MAP: ErrorMapType = {
  CPT0002: [
    'payment.error.captcha-verification-failed',
    'An error occurred during payment. Please try again later. If the issue persists, please reach out to our support team for assistance.'
  ],
  ADYEN_DEFAULT: [
    'payment.error.payment-not-processed',
    'The payment has not been processed. Please, try again with a different payment method.'
  ],
  PAYPAL_DEFAULT: [
    'payment.error.paypal-failed',
    'The payment failed. Please try again.'
  ]
};

const Payment = ({ onPaymentComplete }: PaymentProps) => {
  const { paymentMethods: publisherPaymentMethods, isPayPalHidden } =
    useAppSelector(selectPublisherConfig);
  const order = useAppSelector(selectOnlyOrder);
  const deliveryDetails = useAppSelector(selectDeliveryDetails);
  const { loading: isPaymentFinalizationInProgress } = useAppSelector(
    selectFinalizePayment
  );
  const { getCaptchaToken, recaptchaRef, showCaptchaOnPurchase, sitekey } =
    useCaptchaVerification();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string>('');
  const [adyenKey, setAdyenKey] = useState<number | null>(null);
  const [dropInInstance, setDropInInstance] = useState<
    typeof RedirectElement | null
  >(null);
  const [isActionHandlingProcessing, setIsActionHandlingProcessing] =
    useState(false);

  const { requiredPaymentDetails: isPaymentDetailsRequired } = order;

  // order updates
  const updateOrderWithPaymentMethodId = (methodId: number) => {
    setGeneralError('');
    const { id } = order;
    if (id && methodId) {
      // TODO: (nice to have) validate if order.paymentId !== methodId. Pay attention to redux store and async
      dispatch(
        fetchUpdateOrder({
          id,
          payload: { paymentMethodId: methodId }
        })
      )
        .unwrap()
        .catch((errors) => {
          if (errors.includes('JWT')) {
            eventDispatcher(MSSDK_AUTH_FAILED, {
              source: 'Payment'
            });
            Auth.logout(); // TODO: support properly the logout function
          }
        });
    }
  };

  // payment methods
  const selectPaymentMethodHandler = (paymentMethodName: string) => {
    const paymentMethodObj = publisherPaymentMethods.find(
      ({ methodName }) => methodName === paymentMethodName
    );
    if (paymentMethodObj) {
      dispatch(setSelectedPaymentMethod(paymentMethodObj));
      updateOrderWithPaymentMethodId(paymentMethodObj.id);
    }
  };

  const fetchPaymentMethods = async () => {
    setIsLoading(true);
    const response = await getPaymentMethods();
    const { paymentMethods: paymentMethodsFromBackend } = response.responseData;
    const validMethodsFromResponse = validatePaymentMethods(
      paymentMethodsFromBackend,
      false
    );
    if (response.errors.length) {
      setGeneralError(
        t(
          'payment.error.cannot-fetch-payment-methods',
          'Cannot fetch payment methods'
        )
      );
      return;
    }
    dispatch(updatePaymentMethods(validMethodsFromResponse));
    setIsLoading(false);

    if (!validMethodsFromResponse?.length) {
      setGeneralError(
        t(
          'payment.error.payment-methods-not-defined',
          'Payment methods are not defined'
        )
      );
    }
  };

  useEffect(() => {
    if (publisherPaymentMethods.length === 1) {
      const [paymentMethod] = publisherPaymentMethods;
      selectPaymentMethodHandler(paymentMethod.methodName);
    }
  }, [publisherPaymentMethods]);

  const handlePayPalError = () => {
    const { search } = window.location;
    if (search?.includes('message')) {
      setGeneralError(
        t(
          'payment.error.paypal-not-processed',
          'Your payment was not processed. Please, try again'
        )
      );
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
    handlePayPalError();
    eventDispatcher(MSSDK_PAYMENT);
  }, []);

  const handleCaptchaVerification = async () => {
    if (!showCaptchaOnPurchase) {
      return {
        shouldProceed: true,
        captchaToken: ''
      };
    }

    const {
      recaptchaError: captchaError,
      hasCaptchaSucceeded,
      captchaToken
    } = await getCaptchaToken();

    if (!hasCaptchaSucceeded) {
      setIsLoading(false);
      setGeneralError(captchaError);

      return {
        shouldProceed: false,
        captchaToken: ''
      };
    }

    return {
      captchaToken,
      shouldProceed: true
    };
  };

  // PayPal
  const submitPayPal = async () => {
    const { isGift } = deliveryDetails;
    const { id, buyAsAGift } = order;

    const { captchaToken, shouldProceed } = await handleCaptchaVerification();

    if (!shouldProceed) {
      return;
    }

    if (isGift) {
      const areDeliveryDetailsValid = validateDeliveryDetailsForm();

      if (!areDeliveryDetailsValid) {
        return;
      }

      const { recipientEmail, deliveryDate, deliveryTime, message } =
        deliveryDetails;

      await dispatch(
        fetchUpdateOrder({
          id: order.id,
          payload: {
            buyAsAGift: true,
            deliveryDetails: {
              recipientEmail: recipientEmail.value,
              personalNote: message.value,
              deliveryDate:
                new Date(
                  `${deliveryDate.value}T${deliveryTime.value}`
                ).valueOf() / 1000
            }
          }
        })
      )
        .unwrap()
        .catch((err) => {
          throw new Error(err);
        });
    }

    if (buyAsAGift && !isGift) {
      await dispatch(
        fetchUpdateOrder({
          id,
          payload: {
            buyAsAGift: false
          }
        })
      )
        .unwrap()
        .catch((err) => {
          throw new Error(err);
        });
    }

    setIsLoading(true);
    const { responseData, code } = await submitPayPalPayment(captchaToken);
    if (responseData?.redirectUrl) {
      window.location.href = responseData.redirectUrl;
    } else {
      setIsLoading(false);
      setGeneralError(
        t(...(GERNERAL_ERRORS_MAP[code] || GERNERAL_ERRORS_MAP.PAYPAL_DEFAULT))
      );
    }
  };

  // Adyen
  const onAdditionalDetails = async (state: {
    data: { details: Record<string, unknown> };
  }) => {
    const {
      data: { details }
    } = state;
    dispatch(fetchFinalizeInitialPayment({ orderId: order.id, details }));
  };

  const onAdyenSubmit = async (
    state: {
      data: {
        paymentMethod: unknown;
        browserInfo: unknown;
        billingAddress: unknown;
      };
    },
    component: unknown
  ) => {
    const {
      data: { paymentMethod, browserInfo, billingAddress }
    } = state;
    setGeneralError('');
    setIsLoading(true);

    const { captchaToken, shouldProceed } = await handleCaptchaVerification();

    if (!shouldProceed) {
      setIsLoading(false);
      return;
    }

    const { errors, responseData, code } = await submitPayment({
      paymentMethod,
      browserInfo,
      billingAddress,
      captchaValue: captchaToken
    });
    if (errors?.length) {
      eventDispatcher(MSSDK_PURCHASE_FAILED, {
        reason: errors[0]
      });
      setGeneralError(
        t(...(GERNERAL_ERRORS_MAP[code] || GERNERAL_ERRORS_MAP.ADYEN_DEFAULT))
      );

      setIsLoading(false);
      // force Adyen remount
      setDropInInstance(null);
      setAdyenKey((key) => (key ? null : 1));
      return;
    }

    const { action, payment } = responseData;
    if (action) {
      if (action.type !== 'redirect') {
        setIsActionHandlingProcessing(true);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      component.handleAction(action);
      return;
    }
    eventDispatcher(MSSDK_PURCHASE_SUCCESSFUL, {
      payment
    });
    if (onPaymentComplete) {
      onPaymentComplete();
    }
  };

  const getDropIn = (drop: typeof RedirectElement) => {
    // TODO check if paymentMethodType is correct
    setDropInInstance(drop);
  };

  // Payment without payment details
  const paymentWithoutDetails = async () => {
    setIsLoading(true);
    setGeneralError('');

    dispatch(submitPaymentWithoutDetails())
      .unwrap()
      .then((payment) => {
        eventDispatcher(MSSDK_PURCHASE_SUCCESSFUL, {
          payment: {
            ...payment,
            offerId: order?.offerId
          }
        });
        if (onPaymentComplete) {
          onPaymentComplete();
        }
      })
      .catch(() => {
        setIsLoading(false);
        setGeneralError(
          t('payment.error.failed', 'The payment failed. Please try again.')
        );
      });
  };

  const shouldShowPayPal = isPayPalHidden
    ? false
    : shouldShowGatewayComponent('paypal', publisherPaymentMethods);

  const shouldShowAdyen = shouldShowGatewayComponent(
    'adyen',
    publisherPaymentMethods
  );

  const noPaymentMethods = !publisherPaymentMethods.length;

  const showPayPalWhenAdyenIsReady = () =>
    shouldShowAdyen ? !!dropInInstance : true;

  if (noPaymentMethods && !isLoading) {
    return (
      <PaymentStyled>
        <SectionHeader marginTop='25px' center>
          <>{t('payment.purchase-using', 'Purchase using')}</>
        </SectionHeader>
        {generalError ? (
          <PaymentErrorStyled>{generalError}</PaymentErrorStyled>
        ) : (
          <PaymentErrorStyled>
            {t(
              'payment.error.payment-methods-not-available',
              'Payment methods not available'
            )}
          </PaymentErrorStyled>
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
          variant='confirm'
          width='250px'
          size='big'
          margin='20px auto 0 auto'
        >
          {isLoading ? (
            <Loader buttonLoader color='#ffffff' />
          ) : (
            <>{t('payment.complete-purchase', 'Complete purchase')}</>
          )}
        </Button>
      </PaymentStyled>
    );
  }

  const handleCaptchaChange = () => {
    if (
      generalError ===
      t('validators.captcha-invalid', 'Google reCAPTCHA verification required.')
    ) {
      setGeneralError('');
    }
  };

  return (
    <PaymentStyled>
      <SectionHeader marginTop='25px' paddingBottom='33px' center>
        <>{t('payment.purchase-using', 'Purchase using')}</>
      </SectionHeader>
      <PaymentWrapperStyled>
        {isPaymentFinalizationInProgress && <Loader />}
        {shouldShowAdyen && (
          <Adyen
            key={adyenKey}
            onSubmit={onAdyenSubmit}
            selectPaymentMethod={selectPaymentMethodHandler}
            isPayPalAvailable={shouldShowPayPal}
            getDropIn={getDropIn}
            onAdditionalDetails={onAdditionalDetails}
          />
        )}
        {shouldShowPayPal &&
          showPayPalWhenAdyenIsReady() &&
          !isActionHandlingProcessing && (
            <DropInSection
              selectPaymentMethod={selectPaymentMethodHandler}
              title='PayPal'
              logo='paypal'
              isLoading={isLoading}
            >
              <PayPal
                totalPrice={order.totalPrice}
                offerId={order.offerId}
                onSubmit={submitPayPal}
                isLoading={isLoading}
              />
            </DropInSection>
          )}
        {showCaptchaOnPurchase && (
          <ReCAPTCHA
            ref={recaptchaRef}
            size='invisible'
            badge='bottomright'
            sitekey={sitekey}
            onChange={handleCaptchaChange}
          />
        )}
        {generalError && (
          <PaymentErrorStyled>{generalError}</PaymentErrorStyled>
        )}
      </PaymentWrapperStyled>
    </PaymentStyled>
  );
};

export { Payment as PurePayment };

export default Payment;
