import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line react/no-deprecated
import { render } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import { selectDeliveryDetails } from 'appRedux/deliveryDetailsSlice';
import { fetchUpdateOrder, selectOnlyOrder } from 'appRedux/orderSlice';
import PropTypes from 'prop-types';
import AdyenCheckout from '@adyen/adyen-web';
import getAdyenPaymentMethods from 'api/Payment/getAdyenPaymentMethods';
import { selectOnlyOffer } from 'appRedux/offerSlice';
import useScript from 'util/useScriptHook';
import {
  bankPaymentMethods,
  standardPaymentMethods,
  bankPaymentMethodsMapper,
  getStandardCopy
} from 'util/paymentMethodHelper';
import CheckboxLegacy from 'components/CheckboxLegacy';
import { PaymentErrorStyled } from 'components/Payment/PaymentStyled';
import { validateDeliveryDetailsForm } from 'components/DeliveryDetails/RecipientForm/validators';
import { selectTermsUrl } from 'appRedux/publisherConfigSlice';
import eventDispatcher, { MSSDK_ADYEN_ERROR } from 'util/eventDispatcher';
import AdyenStyled from './AdyenStyled';
import Loader from '../Loader';
import {
  getAdyenEnv,
  getAdyenClientKey,
  getGooglePayEnv
} from './util/getAdyenConfig';
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
  const offer = useAppSelector(selectOnlyOffer);
  const termsUrl = useAppSelector(selectTermsUrl);

  const {
    id: orderId,
    buyAsAGift,
    discount,
    totalPrice,
    offerId,
    priceBreakdown: { discountAmount }
  } = order;

  const { adyenConfiguration, paymentMethods: publisherPaymentMethods } =
    useAppSelector((state) => state.publisherConfig);

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
  const [shouldFadeOutDropIn, setShouldFadeOutDropIn] = useState(false);
  const [shouldHideDropIn, setShouldHideDropIn] = useState(false);

  useScript('https://pay.google.com/gp/p/js/pay.js');

  const { t, i18n } = useTranslation();

  const dispatch = useAppDispatch();

  const getBankCopy = () => {
    const isFree = totalPrice === 0;
    const isSubscription = offerId?.charAt(0) === 'S';
    if (isMyAccount || (isFree && isSubscription)) {
      // TODO: add link to T&C
      return t(
        'offer-bank-consent-copy.free-subscription',
        'By ticking this, you agree to the Terms and Conditions of our service. Your account will be charged €0.10 for authentication purposes. This amount will be refunded once the transaction is completed. Your account will be charged on a recurring basis for the full subscription amount. Your subscription will continue until you cancel.'
      );
    }

    if (isSubscription) {
      // TODO: add link to T&C
      return t(
        'offer-bank-consent-copy.paid-subscription',
        'By ticking this, you agree to the Terms and Conditions of our service. Your account will be charged on a recurring basis for the full subscription amount. Your subscription will continue until you cancel.'
      );
    }

    return t(
      // TODO: add link to T&C
      'offer-bank-consent-copy.paid-not-subscription',
      'By ticking this, you agree to the Terms and Conditions of our service.'
    );
  };

  const addLegalCheckboxForPaymentMethod = (methodName, type = 'standard') => {
    const parentEl = document.querySelector(
      `.adyen-checkout__payment-method--${methodName}`
    );

    const checkbox = (
      <CheckboxLegacy
        className={`adyen-checkout__bank-checkbox ${methodName}-inputWrapper`}
        checked={false}
        id={`${methodName}-input`}
        onClickFn={(e, _, setIsChecked) => {
          e.target.classList.remove('adyen-checkout__bank-checkbox--error');

          if (e.key === ' ') {
            e.target.parentElement.classList.remove(
              'adyen-checkout__bank-checkbox--error'
            );
          }

          setIsChecked(!e.target.checked);
        }}
        termsUrl={termsUrl}
      >
        {type === 'bank'
          ? getBankCopy()
          : getStandardCopy(isMyAccount, offer, order, deliveryDetails?.isGift)}
      </CheckboxLegacy>
    );

    if (parentEl) {
      const paymentDetailsWrapper = parentEl.querySelector(
        `.adyen-checkout__payment-method__details`
      );

      const doesCheckboxExist = document.querySelector(`#${methodName}-input`);

      if (!doesCheckboxExist) {
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.classList.add('checkbox-wrapper');

        render(checkbox, checkboxWrapper);
        parentEl.insertBefore(checkboxWrapper, paymentDetailsWrapper);
      }
    }
  };

  const showAdditionalText = () => {
    if (paymentMethodsRef?.current) {
      bankPaymentMethods.forEach((method) =>
        addLegalCheckboxForPaymentMethod(method, 'bank')
      );

      standardPaymentMethods.forEach((method) =>
        addLegalCheckboxForPaymentMethod(method)
      );
    }
  };

  const onSelect = async ({ type }) =>
    selectPaymentMethod(bankPaymentMethodsMapper[type] || type);

  const mountDropIn = (adyenCheckout) => {
    if (paymentMethodsRef?.current) {
      const dropin = adyenCheckout.create('dropin', {
        onSelect,
        openFirstPaymentMethod:
          adyenConfiguration?.openFirstPaymentMethod == null
            ? !window.matchMedia('(max-width:991px)').matches
            : adyenConfiguration?.openFirstPaymentMethod,
        onReady: showAdditionalText
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

  const isCheckboxChecked = (methodName) => {
    const isBancontactCard =
      selectedPaymentMethodRef?.current?.methodName === 'bancontact_card';

    let checkbox = document.querySelector(`#${methodName}-input`);
    let checkboxWrapper = document.querySelector(`.${methodName}-inputWrapper`);

    // condition below needs to be verified when new 'scheme' is added
    if (methodName === 'scheme') {
      const schemeCheckbox = document.querySelector(
        `#${isBancontactCard ? 'bcmc' : 'card'}-input`
      );

      const schemeCheckboxWrapper = document.querySelector(
        `.${isBancontactCard ? 'bcmc' : 'card'}-inputWrapper`
      );

      checkbox = schemeCheckbox;
      checkboxWrapper = schemeCheckboxWrapper;
    }

    if (!checkbox?.checked) {
      checkboxWrapper.classList.add('adyen-checkout__bank-checkbox--error');
      return false;
    }

    return true;
  };

  const createDropInInstance = async ({
    shopperStatement: merchantName,
    amount,
    countryCode,
    paymentMethods
  }) => {
    const amountObj = {
      amount,
      countryCode
    };
    const applePayConfigurationObj =
      paymentMethods &&
      paymentMethods.find((item) => item.type === 'applepay')?.configuration;
    const googlePayConfigurationObj =
      paymentMethods &&
      paymentMethods.find((item) => item.type === 'googlepay')?.configuration;

    const configuration = {
      paymentMethodsResponse: { paymentMethods },
      locale: adyenConfiguration?.locale || i18n?.language || 'en-US',
      translations: {
        ...defaultAdyenTranslations,
        ...adyenConfiguration?.translations
      },
      environment: getAdyenEnv(),
      analytics: adyenConfiguration?.analytics || {
        enabled: true //  analytics data for Adyen
      },
      setStatusAutomatically: false,

      clientKey: getAdyenClientKey(),
      onSubmit: async (state, component) => {
        const {
          data: { paymentMethod }
        } = state;

        const methodName = paymentMethod?.type;

        if (!isCheckboxChecked(methodName)) {
          return false;
        }

        component.setStatus('loading');

        const areDeliveryDetailsValid = await handleDeliveryDetails();

        if (!areDeliveryDetailsValid) {
          component.setStatus('ready');
          return false;
        }

        setShouldFadeOutDropIn(true);

        return onSubmit(state, component);
      },
      onActionHandled: () => {
        setShouldHideDropIn(true);
      },
      onAdditionalDetails,
      onError,
      paymentMethodsConfiguration: {
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          ...adyenConfiguration?.paymentMethodsConfiguration?.card
        },
        applepay: {
          onClick: async (resolve) => {
            if (!isCheckboxChecked('applepay')) {
              return;
            }

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
            if (!isCheckboxChecked('googlepay')) {
              return;
            }

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

  const setAdyenAdvancedFlow = async (paymentMethodsType) => {
    try {
      const response = await getAdyenPaymentMethods(
        paymentMethodsType,
        isMyAccount
      );

      if (response.paymentMethods.length) {
        createDropInInstance(response, paymentMethodsType);
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
      <div
        ref={paymentMethodsRef}
        style={{
          ...(shouldHideDropIn && { display: 'none' }),
          ...(shouldFadeOutDropIn && {
            opacity: '0.2',
            pointerEvents: 'none'
          })
        }}
      />
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
