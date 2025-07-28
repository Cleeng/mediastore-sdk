import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import { selectDeliveryDetails } from 'appRedux/deliveryDetailsSlice';
import { fetchUpdateOrder, selectOnlyOrder } from 'appRedux/orderSlice';
import PropTypes from 'prop-types';
import AdyenCheckout from '@adyen/adyen-web';
import getAdyenPaymentMethods from 'api/Payment/getAdyenPaymentMethods';
import useScript from 'util/useScriptHook';
import { bankPaymentMethodsMapper } from 'util/paymentMethodHelper';
import { PaymentErrorStyled } from 'components/Payment/PaymentStyled';
import { validateDeliveryDetailsForm } from 'components/DeliveryDetails/RecipientForm/validators';
import { selectPublisherConfig } from 'appRedux/publisherConfigSlice';
import eventDispatcher, { MSSDK_ADYEN_ERROR } from 'util/eventDispatcher';
import AdyenStyled from './AdyenStyled';
import Loader from '../Loader';
import { getAdyenEnv, getGooglePayEnv } from './util/getAdyenConfig';
import defaultAdyenTranslations from './util/defaultAdyenTranslations';

const Adyen = ({
  onSubmit,
  isMyAccount,
  selectPaymentMethod,
  isPayPalAvailable,
  getDropIn,
  onAdditionalDetails
}) => {
  const order = useAppSelector(selectOnlyOrder);

  const {
    id: orderId,
    buyAsAGift,
    discount,
    priceBreakdown: { discountAmount }
  } = order;

  const { adyenConfiguration, paymentMethods: publisherPaymentMethods } =
    useAppSelector(selectPublisherConfig);

  const [isLoading, setIsLoading] = useState(true);
  const { selectedPaymentMethod } = useAppSelector(
    (state) => state.paymentMethods
  );

  const selectedPaymentMethodRef = useRef(selectedPaymentMethod);

  const deliveryDetails = useAppSelector(selectDeliveryDetails);
  const deliveryDetailsRef = useRef(null);
  const buyAsAGiftRef = useRef(buyAsAGift || null);

  useEffect(() => {
    deliveryDetailsRef.current = deliveryDetails;
    buyAsAGiftRef.current = buyAsAGift;
  }, [deliveryDetails, buyAsAGift]);

  useEffect(() => {
    selectedPaymentMethodRef.current = selectedPaymentMethod;
  }, [selectedPaymentMethod]);

  const paymentMethodsRef = useRef(null);

  const [dropInInstance, setDropInInstance] = useState(null);
  const [sessionError, setSessionError] = useState(null);
  const [noPaymentMethods, setNoPaymentMethods] = useState(false);

  useScript('https://pay.google.com/gp/p/js/pay.js');

  const { t, i18n } = useTranslation();

  const dispatch = useAppDispatch();

  const onSelect = async ({ type }) =>
    selectPaymentMethod(bankPaymentMethodsMapper[type] || type);

  const mountDropIn = (adyenCheckout) => {
    if (paymentMethodsRef?.current) {
      const dropin = adyenCheckout.create('dropin', {
        onSelect,
        openFirstPaymentMethod:
          adyenConfiguration?.openFirstPaymentMethod ?? true
      });
      dropin.mount(paymentMethodsRef.current);
      setDropInInstance(dropin);
      getDropIn(dropin);
    }
  };

  const onError = ({ error, fieldType }) => {
    eventDispatcher(MSSDK_ADYEN_ERROR, {
      error,
      fieldType
    });
  };

  const handleDeliveryDetails = async () => {
    const { isGift } = deliveryDetailsRef.current;

    if (isGift) {
      const areDeliveryDetailsValid = validateDeliveryDetailsForm();

      if (!areDeliveryDetailsValid) {
        return false;
      }

      const { recipientEmail, deliveryDate, deliveryTime, message } =
        deliveryDetailsRef.current;

      await dispatch(
        fetchUpdateOrder({
          id: orderId,
          payload: {
            buyAsAGift: true,
            deliveryDetails: {
              recipientEmail: recipientEmail.value,
              deliveryDate:
                new Date(
                  `${deliveryDate.value}T${deliveryTime.value}`
                ).valueOf() / 1000,
              personalNote: message.value
            }
          }
        })
      )
        .unwrap()
        .catch((err) => {
          throw new Error(err);
        });

      return true;
    }

    if (buyAsAGiftRef.current && !isGift) {
      await dispatch(
        fetchUpdateOrder({
          id: orderId,
          payload: {
            buyAsAGift: false
          }
        })
      )
        .unwrap()
        .catch((err) => {
          throw new Error(err);
        });

      return true;
    }

    return true;
  };

  const createDropInInstance = async ({
    amount,
    countryCode,
    clientKey,
    paymentMethods,
    region,
    shopperStatement: merchantName
  }) => {
    const amountObj = {
      amount,
      countryCode
    };

    const applePayConfigurationObj = paymentMethods?.find(
      (item) => item.type === 'applepay'
    )?.configuration;
    const googlePayConfigurationObj = paymentMethods?.find(
      (item) => item.type === 'googlepay'
    )?.configuration;

    const configuration = {
      amount,
      paymentMethodsResponse: { paymentMethods },
      locale: adyenConfiguration?.locale || i18n?.language || 'en-US',
      translations: {
        ...defaultAdyenTranslations,
        ...adyenConfiguration?.translations
      },
      environment: getAdyenEnv(region),
      analytics: adyenConfiguration?.analytics || {
        enabled: true //  analytics data for Adyen
      },
      setStatusAutomatically: false,
      clientKey,
      onSubmit: async (state, component) => {
        component.setStatus('loading');

        const areDeliveryDetailsValid = await handleDeliveryDetails();

        if (!areDeliveryDetailsValid) {
          component.setStatus('ready');
          return false;
        }

        return onSubmit(state, component);
      },
      onAdditionalDetails,
      onError,
      paymentMethodsConfiguration: {
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          billingAddressRequired: true,
          billingAddressMode: 'partial',
          ...adyenConfiguration?.paymentMethodsConfiguration?.card
        },
        applepay: {
          onClick: async (resolve) => {
            const areDeliveryDetailsValid = await handleDeliveryDetails();

            if (!areDeliveryDetailsValid) {
              return;
            }

            resolve();
          },
          ...amountObj,
          ...(applePayConfigurationObj && {
            configuration: {
              merchantName,
              merchantId: applePayConfigurationObj.merchantId
            }
          }),
          ...adyenConfiguration?.paymentMethodsConfiguration?.applePay
        },
        googlepay: {
          onClick: async (resolve) => {
            const areDeliveryDetailsValid = await handleDeliveryDetails();

            if (!areDeliveryDetailsValid) {
              return;
            }

            resolve();
          },
          environment: getGooglePayEnv(),
          ...(googlePayConfigurationObj && {
            configuration: {
              merchantName,
              gatewayMerchantId: googlePayConfigurationObj.gatewayMerchantId,
              merchantId: googlePayConfigurationObj.merchantId
            }
          }),
          ...adyenConfiguration?.paymentMethodsConfiguration?.googlePay,
          ...amountObj
        },
        ideal: {
          ...adyenConfiguration?.paymentMethodsConfiguration?.ideal
        },
        bcmc: {
          ...adyenConfiguration?.paymentMethodsConfiguration?.bancontactCard,
          hasHolderName: true,
          holderNameRequired: true,
          positionHolderNameOnTop: true
        }
      }
    };

    const adyenCheckout = await AdyenCheckout(configuration);

    mountDropIn(adyenCheckout);
    setIsLoading(false);
  };

  const setAdyenAdvancedFlow = async () => {
    try {
      const response = await getAdyenPaymentMethods(isMyAccount);

      if (response.paymentMethods.length) {
        createDropInInstance(response);
      }
    } catch (err) {
      setSessionError(err.message);
      setIsLoading(false);
    }
  };

  const generateDropIn = () => {
    if (!publisherPaymentMethods.length) {
      setNoPaymentMethods(true);
      setIsLoading(false);
      return;
    }

    setAdyenAdvancedFlow();
  };

  useEffect(() => {
    generateDropIn();
    return () => {
      setDropInInstance(null);
    };
  }, []);

  const recreateDropIn = () => {
    // recreate Adyen Instance if coupon was applied

    if (dropInInstance) {
      dropInInstance.unmount();
      setDropInInstance(null);
      getDropIn(null);
    }

    setIsLoading(true);
    generateDropIn();
  };

  useEffect(() => {
    if (dropInInstance && discount?.applied) {
      recreateDropIn();
    }
  }, [discount.applied, discount.type, discountAmount]);

  useEffect(() => {
    if (dropInInstance) {
      recreateDropIn();
    }
  }, [i18n.language, deliveryDetails?.isGift]);

  useEffect(() => {
    if (selectedPaymentMethod?.methodName === 'paypal') {
      if (dropInInstance) dropInInstance.closeActivePaymentMethod();
    }
  }, [selectedPaymentMethod]);

  if (noPaymentMethods) {
    return (
      <PaymentErrorStyled>
        {t(
          'payment-methods.error.not-available',
          'Payment methods not available'
        )}
      </PaymentErrorStyled>
    );
  }

  if (sessionError && !isPayPalAvailable) {
    return <PaymentErrorStyled>{sessionError}</PaymentErrorStyled>;
  }

  return (
    <AdyenStyled $isMyAccount $isAdditionalPayment={isPayPalAvailable}>
      {isLoading && <Loader />}
      <div ref={paymentMethodsRef} />
    </AdyenStyled>
  );
};

Adyen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isMyAccount: PropTypes.bool,
  selectPaymentMethod: PropTypes.func.isRequired,
  isPayPalAvailable: PropTypes.bool.isRequired,
  getDropIn: PropTypes.func.isRequired,
  onAdditionalDetails: PropTypes.func.isRequired
};

Adyen.defaultProps = {
  isMyAccount: false
};

export default Adyen;
