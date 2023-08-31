import React, { useState, useEffect, useRef, useCallback } from 'react';
import { render } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { selectDeliveryDetails } from 'redux/deliveryDetailsSlice';
import { fetchUpdateOrder, selectOnlyOrder } from 'redux/orderSlice';
import PropTypes from 'prop-types';
import AdyenCheckout from '@adyen/adyen-web';
import createPaymentSession from 'api/Payment/createPaymentSession';
import { selectOnlyOffer } from 'redux/offerSlice';
import useScript from 'util/useScriptHook';
import {
  getAvailablePaymentMethods,
  bankPaymentMethods,
  standardPaymentMethods,
  bankPaymentMethodsMapper,
  STANDARD_PAYMENT_METHODS,
  BANK_PAYMENT_METHODS,
  getStandardCopy
} from 'util/paymentMethodHelper';
import Checkbox from 'components/Checkbox';
import { PaymentErrorStyled } from 'components/Payment/PaymentStyled';
import { validateDeliveryDetailsForm } from 'components/DeliveryDetails/RecipientForm/validators';
import AdyenStyled from './AdyenStyled';
import eventDispatcher, { MSSDK_ADYEN_ERROR } from '../../util/eventDispatcher';
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

  const { id: orderId, buyAsAGift, discount, totalPrice, offerId } = order;

  const {
    adyenConfiguration,
    paymentMethods: publisherPaymentMethods,
    visiblePaymentMethods
  } = useAppSelector(state => state.publisherConfig);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedPaymentMethod } = useAppSelector(
    state => state.paymentMethods
  );

  const deliveryDetails = useAppSelector(selectDeliveryDetails);
  const deliveryDetailsRef = useRef(null);
  const buyAsAGiftRef = useRef(buyAsAGift || null);

  useEffect(() => {
    deliveryDetailsRef.current = deliveryDetails;
    buyAsAGiftRef.current = buyAsAGift;
  }, [deliveryDetails, buyAsAGift]);

  const standardPaymentMethodsRef = useRef(null);
  const bankPaymentMethodsRef = useRef(null);
  const [standardDropInInstance, setStandardDropInInstance] = useState(null);
  const [bankDropInInstance, setBankDropInInstance] = useState(null);

  const [standardPaymentSession, setStandardPaymentSession] = useState(false);

  const [standardSessionError, setStandardSessionError] = useState(null);
  const [bankSessionError, setBankSessionError] = useState(null);

  const [noPaymentMethods, setNoPaymentMethods] = useState(false);

  const [
    shouldFadeOutStandardDropIn,
    setShouldFadeOutStandardDropIn
  ] = useState(false);
  const [shouldFadeOutBankDropIn, setShouldFadeOutBankDropIn] = useState(false);

  const [shouldHideStandardDropIn, setShouldHideStandardDropIn] = useState(
    false
  );
  const [shouldHideBankDropIn, setShouldHideBankDropIn] = useState(false);

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
      <Checkbox
        className={`adyen-checkout__bank-checkbox checkbox-${methodName}`}
        checked={false}
        onClickFn={(e, _, setIsChecked) => {
          e.target.parentElement.classList.remove(
            'adyen-checkout__bank-checkbox--error'
          );

          setIsChecked(!e.target.checked);
        }}
      >
        {type === 'bank'
          ? getBankCopy()
          : getStandardCopy(isMyAccount, offer, order)}
      </Checkbox>
    );

    if (parentEl) {
      const paymentDetailsWrapper = parentEl.querySelector(
        `.adyen-checkout__payment-method__details`
      );

      const doesCheckboxExist = document.querySelector(
        `.checkbox-${methodName}`
      );

      if (!doesCheckboxExist) {
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.classList.add('checkbox-wrapper');

        render(checkbox, checkboxWrapper);
        parentEl.insertBefore(checkboxWrapper, paymentDetailsWrapper);
      }
    }
  };

  const showAdditionalText = () => {
    if (bankPaymentMethodsRef?.current) {
      bankPaymentMethods.forEach(method =>
        addLegalCheckboxForPaymentMethod(method, 'bank')
      );
    }
    if (standardPaymentMethodsRef?.current) {
      standardPaymentMethods.forEach(method =>
        addLegalCheckboxForPaymentMethod(method)
      );
    }
  };

  const onSelect = async ({ type }) =>
    selectPaymentMethod(bankPaymentMethodsMapper[type] || type);

  const mountStandardDropIn = adyenCheckout => {
    if (standardPaymentMethodsRef?.current) {
      const dropin = adyenCheckout.create('dropin', {
        onSelect,
        openFirstPaymentMethod:
          adyenConfiguration?.openFirstPaymentMethod == null
            ? !window.matchMedia('(max-width:991px)').matches
            : adyenConfiguration?.openFirstPaymentMethod,
        onReady: showAdditionalText
      });
      dropin.mount(standardPaymentMethodsRef.current);
      setStandardDropInInstance(dropin);
      getDropIn(dropin, STANDARD_PAYMENT_METHODS);
    }
  };

  const mountBankDropIn = adyenCheckout => {
    if (bankPaymentMethodsRef?.current) {
      const dropin = adyenCheckout.create('dropin', {
        onSelect,
        onReady: showAdditionalText,
        openFirstPaymentMethod: false
      });
      dropin.mount(bankPaymentMethodsRef.current);
      setBankDropInInstance(dropin);
      getDropIn(dropin, BANK_PAYMENT_METHODS);
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

      const {
        recipientEmail,
        deliveryDate,
        message
      } = deliveryDetailsRef.current;

      await dispatch(
        fetchUpdateOrder({
          id: orderId,
          payload: {
            buyAsAGift: true,
            deliveryDetails: {
              recipientEmail: recipientEmail.value,
              deliveryDate: new Date(deliveryDate.value).valueOf() / 1000,
              personalNote: message.value
            }
          }
        })
      )
        .unwrap()
        .catch(err => {
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
        .catch(err => {
          throw new Error(err);
        });

      return true;
    }

    return true;
  };

  const isCheckboxChecked = methodName => {
    const checkbox = document.querySelector(`.checkbox-${methodName}`);

    if (!checkbox?.checked) {
      checkbox.classList.add('adyen-checkout__bank-checkbox--error');
      return false;
    }

    return true;
  };

  const createDropInInstance = async (
    {
      id,
      sessionData,
      shopperStatement: merchantName,
      amount,
      countryCode,
      paymentMethods
    },
    type
  ) => {
    const amountObj = {
      amount,
      countryCode
    };
    const applePayConfigurationObj =
      paymentMethods &&
      paymentMethods.find(item => item.type === 'applepay')?.configuration;
    const googlePayConfigurationObj =
      paymentMethods &&
      paymentMethods.find(item => item.type === 'googlepay')?.configuration;

    const configuration = {
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
      session: {
        id,
        sessionData
      },
      clientKey: getAdyenClientKey(),
      onSubmit: async (state, component) => {
        const methodName = component.activePaymentMethod.type;

        if (!isCheckboxChecked(methodName)) {
          return false;
        }

        component.setStatus('loading');

        const areDeliveryDetailsValid = await handleDeliveryDetails();

        if (!areDeliveryDetailsValid) {
          component.setStatus('ready');
          return false;
        }

        if (type === BANK_PAYMENT_METHODS) {
          setShouldFadeOutStandardDropIn(true);
        } else {
          setShouldFadeOutBankDropIn(true);
        }

        return onSubmit(state, component);
      },
      onActionHandled: () => {
        if (type === BANK_PAYMENT_METHODS) {
          setShouldHideStandardDropIn(true);
        } else {
          setShouldHideBankDropIn(true);
        }
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
          onClick: async resolve => {
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
          onClick: async resolve => {
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
    if (type === BANK_PAYMENT_METHODS) {
      mountBankDropIn(adyenCheckout);
      setIsLoading(false);
      return;
    }
    mountStandardDropIn(adyenCheckout);
    setIsLoading(false);
  };

  const createSession = async paymentMethodsType => {
    try {
      const response = await createPaymentSession(
        paymentMethodsType,
        visiblePaymentMethods,
        isMyAccount
      );

      if (response?.id) {
        createDropInInstance(response, paymentMethodsType);
      }
    } catch (err) {
      if (paymentMethodsType === BANK_PAYMENT_METHODS) {
        setBankSessionError(err.message);
      } else {
        setStandardSessionError(err.message);
      }
      setIsLoading(false);
    }
  };

  const generateDropIns = () => {
    const availablePaymentMethods = getAvailablePaymentMethods(
      publisherPaymentMethods,
      visiblePaymentMethods
    );

    if (!availablePaymentMethods.length) {
      setNoPaymentMethods(true);
      setIsLoading(false);
      return;
    }

    if (isMyAccount || totalPrice === 0) {
      const shouldCreateStandardPaymentSession = availablePaymentMethods.some(
        ({ methodName }) => !bankPaymentMethods.includes(methodName)
      );

      if (shouldCreateStandardPaymentSession) {
        setStandardPaymentSession(true);

        createSession(STANDARD_PAYMENT_METHODS);
      }

      const shouldCreateBankPaymentSession = availablePaymentMethods.some(
        ({ methodName }) => bankPaymentMethods.includes(methodName)
      );
      if (shouldCreateBankPaymentSession) {
        createSession(BANK_PAYMENT_METHODS);
      }
    } else {
      createSession();
    }
  };

  useEffect(() => {
    generateDropIns();
    return () => {
      setStandardDropInInstance(null);
      setBankDropInInstance(null);
    };
  }, []);

  const closeBank = useCallback(() => {
    if (bankDropInInstance) {
      bankDropInInstance.closeActivePaymentMethod();
    }
  }, [bankDropInInstance]);

  const closeStandard = useCallback(() => {
    if (standardDropInInstance) {
      standardDropInInstance.closeActivePaymentMethod();
    }
  }, [standardDropInInstance]);

  const recreateDropIn = () => {
    // recreate Adyen Instance if coupon was applied
    bankPaymentMethodsRef.current.removeEventListener('click', closeStandard);
    standardPaymentMethodsRef.current.removeEventListener('click', closeBank);

    if (standardDropInInstance) {
      standardDropInInstance.unmount();
      setStandardDropInInstance(null);
      getDropIn(null, STANDARD_PAYMENT_METHODS);
    }

    if (bankDropInInstance) {
      bankDropInInstance.unmount();
      setBankDropInInstance(null);
      getDropIn(null, BANK_PAYMENT_METHODS);
    }
    setIsLoading(true);

    generateDropIns();
  };

  const isDropInPresent = standardDropInInstance || bankDropInInstance;

  useEffect(() => {
    if (bankDropInInstance && standardDropInInstance) {
      standardPaymentMethodsRef.current.addEventListener('click', closeBank);
      bankPaymentMethodsRef.current.addEventListener('click', closeStandard);
    }
  }, [standardDropInInstance, bankDropInInstance]);

  useEffect(() => {
    if (isDropInPresent && discount?.applied) {
      recreateDropIn();
    }
  }, [discount.applied, discount.type]);

  useEffect(() => {
    if (isDropInPresent) {
      recreateDropIn();
    }
  }, [i18n.language]);

  useEffect(() => {
    if (selectedPaymentMethod?.methodName === 'paypal') {
      if (standardDropInInstance)
        standardDropInInstance.closeActivePaymentMethod();
      if (bankDropInInstance) bankDropInInstance.closeActivePaymentMethod();
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

  const shouldShowSessionError =
    (standardSessionError && bankSessionError) ||
    (bankSessionError && !standardPaymentSession);

  if (shouldShowSessionError && !isPayPalAvailable) {
    return <PaymentErrorStyled>{bankSessionError}</PaymentErrorStyled>;
  }

  return (
    <AdyenStyled isMyAccount isAdditionalPayment={isPayPalAvailable}>
      {isLoading && <Loader />}
      <div
        ref={standardPaymentMethodsRef}
        style={{
          ...(shouldHideStandardDropIn && { display: 'none' }),
          ...(shouldFadeOutStandardDropIn && {
            opacity: '0.2',
            pointerEvents: 'none'
          })
        }}
      />
      <div
        ref={bankPaymentMethodsRef}
        style={{
          ...(shouldHideBankDropIn && { display: 'none' }),
          ...(shouldFadeOutBankDropIn && {
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
