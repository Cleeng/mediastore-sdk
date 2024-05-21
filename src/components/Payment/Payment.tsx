import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getPaymentMethods, submitPayment, submitPayPalPayment } from 'api';
import { submitPaymentWithoutDetails } from 'redux/paymentSlice';
import Button from 'components/Button';
import Adyen from 'components/Adyen';
import Loader from 'components/Loader';
import SectionHeader from 'components/SectionHeader';
import { validateDeliveryDetailsForm } from 'components/DeliveryDetails/RecipientForm/validators';
import {
  fetchFinalizeInitialPayment,
  selectFinalizePayment
} from 'redux/finalizePaymentSlice';
import { selectDeliveryDetails } from 'redux/deliveryDetailsSlice';
import Auth from 'services/auth';
import {
  validatePaymentMethods,
  shouldShowGatewayComponent,
  getAvailablePaymentMethods,
  BANK_PAYMENT_METHODS,
  STANDARD_PAYMENT_METHODS
} from 'util/paymentMethodHelper';
import {
  updatePaymentMethods,
  selectPublisherConfig
} from 'redux/publisherConfigSlice';
import { fetchUpdateOrder, selectOnlyOrder } from 'redux/orderSlice';
import { setSelectedPaymentMethod } from 'redux/paymentMethodsSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import RedirectElement from '@adyen/adyen-web';
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

type paymentMethodType =
  | typeof STANDARD_PAYMENT_METHODS
  | typeof BANK_PAYMENT_METHODS;

const Payment = ({ onPaymentComplete }: PaymentProps) => {
  const {
    paymentMethods: publisherPaymentMethods,
    isPayPalHidden,
    visiblePaymentMethods
  } = useAppSelector(selectPublisherConfig);

  const order = useAppSelector(selectOnlyOrder);
  const deliveryDetails = useAppSelector(selectDeliveryDetails);

  const { t } = useTranslation();

  const { requiredPaymentDetails: isPaymentDetailsRequired } = order;
  const { loading: isPaymentFinalizationInProgress } = useAppSelector(
    selectFinalizePayment
  );

  const [isLoading, setIsLoading] = useState(false);

  const [generalError, setGeneralError] = useState<string>('');
  const [adyenKey, setAdyenKey] = useState<number | null>(null);

  const [standardDropInInstance, setStandardDropInInstance] = useState<
    typeof RedirectElement | null
  >(null);
  const [bankDropInInstance, setBankDropInInstance] = useState<
    typeof RedirectElement | null
  >(null);

  const [isActionHandlingProcessing, setIsActionHandlingProcessing] =
    useState(false);

  const dispatch = useAppDispatch();

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
            eventDispatcher(MSSDK_AUTH_FAILED);
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

  // PayPal
  const submitPayPal = async () => {
    const { isGift } = deliveryDetails;
    const { id, buyAsAGift } = order;

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
    const { responseData } = await submitPayPalPayment();
    if (responseData?.redirectUrl) {
      window.location.href = responseData.redirectUrl;
    } else {
      setIsLoading(false);
      setGeneralError(
        t(
          'payment.error.paypal-failed',
          'The payment failed. Please try again.'
        )
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
    const { errors, responseData } = await submitPayment(
      paymentMethod,
      browserInfo,
      billingAddress
    );
    if (errors?.length) {
      eventDispatcher(MSSDK_PURCHASE_FAILED, {
        reason: errors[0]
      });
      const notSupportedMethod = errors[0].includes(
        'Payment details are not supported'
      );
      setGeneralError(
        notSupportedMethod
          ? t(
              'payment.error.payment-method-not-supported',
              'Payment method not supported. Try different payment method'
            )
          : t(
              'payment.error.payment-not-processed',
              'The payment has not been processed. Please, try again with a different payment method.'
            )
      );

      setIsLoading(false);
      // force Adyen remount
      setStandardDropInInstance(null);
      setBankDropInInstance(null);
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

  const getDropIn = (drop: typeof RedirectElement, type: paymentMethodType) => {
    // TODO check if paymentMethodType is correct
    if (type === BANK_PAYMENT_METHODS) {
      setBankDropInInstance(drop);
    } else {
      setStandardDropInInstance(drop);
    }
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

  const availablePaymentMethods = getAvailablePaymentMethods(
    publisherPaymentMethods,
    visiblePaymentMethods
  );

  const shouldShowAdyen = shouldShowGatewayComponent(
    'adyen',
    availablePaymentMethods
  );

  const noPaymentMethods =
    !publisherPaymentMethods.length ||
    (!availablePaymentMethods.length && !shouldShowPayPal);

  const showPayPalWhenAdyenIsReady = () =>
    shouldShowAdyen ? !!standardDropInInstance || !!bankDropInInstance : true;

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
          theme='confirm'
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
        {generalError && (
          <PaymentErrorStyled>{generalError}</PaymentErrorStyled>
        )}
      </PaymentWrapperStyled>
    </PaymentStyled>
  );
};

export { Payment as PurePayment };

export default Payment;
