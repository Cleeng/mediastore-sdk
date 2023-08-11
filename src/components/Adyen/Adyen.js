import React, { useState, useEffect, useRef, useCallback } from 'react';
import { render } from 'react-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import AdyenCheckout from '@adyen/adyen-web';
import createPaymentSession from 'api/Payment/createPaymentSession';
import useScript from 'util/useScriptHook';
import {
  getAvailablePaymentMethods,
  bankPaymentMethods,
  standardPaymentMethods,
  bankPaymentMethodsMapper,
  STANDARD_PAYMENT_METHODS,
  BANK_PAYMENT_METHODS
} from 'util/paymentMethodHelper';
import { currencyFormat, isPeriod, periodMapper } from 'util/planHelper';
import { useSelector } from 'react-redux';
import Checkbox from 'components/Checkbox';
import { PaymentErrorStyled } from 'components/Payment/PaymentStyled';
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
  const {
    discount,
    totalPrice,
    offerId,
    currency,
    priceBreakdown: { offerPrice }
  } = useSelector(state => state.order.order);
  const { period: offerPeriod } = useSelector(state => state.offer.offer);
  const {
    adyenConfiguration,
    paymentMethods: publisherPaymentMethods,
    visiblePaymentMethods
  } = useSelector(state => state.publisherConfig);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedPaymentMethod } = useSelector(state => state.paymentMethods);

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

  const chargedForEveryText =
    offerPeriod && isPeriod(offerPeriod)
      ? periodMapper[offerPeriod].chargedForEveryText
      : null;
  const readablePrice = `${currencyFormat[currency]}${offerPrice}`;
  const readablePeriod = chargedForEveryText ? `/${chargedForEveryText}` : '';

  const getBankCopy = () => {
    const isFree = totalPrice === 0;
    const isSubscription = offerId?.charAt(0) === 'S';
    // TODO before the release: standarize transaltions keys
    // TODO: test if purchase is blocked if checkbox is not checked
    // TODO: add copy and checkbox to PayPal

    if (isMyAccount || (isFree && isSubscription)) {
      // TODO: add link to T&C
      return t(
        'offer-bank-consent-copy.free-subscription',
        `By ticking this, you agree to the Terms and Conditions of our service. Your account will be charged €0.10 for authentication purposes. This amount will be refunded once the transaction is completed. Your account will be charged on a recurring basis for the full subscription amount. Your subscription will continue until you cancel.`
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

  const getStandardCopy = () => {
    // TODO: add link to T&C
    if (isMyAccount) {
      return t(
        'offer-standard-consent-copy.my-account',
        `By ticking this, you agree to the Terms and Conditions of our service. Your account will be charged on a recurring basis for the full subscription amount. Your subscription will continue until you cancel.`
      );
    }

    if (discount?.applied && discount.type === 'trial') {
      // TODO: add link to T&C
      return t(
        `legal-notes.trial.period-${offerPeriod}`,
        "After any free trial and/or promotional period, you will be charged {{readablePrice}}{{readablePeriod}} or the then-current price, plus applicable taxes, on a recurring basis. Your subscription will automatically continue until you cancel. To cancel, log into your account, click 'Manage' next to your subscription and then click 'Cancel'. By checking the box, you expressly acknowledge and agree to these terms as well as the full Terms of Service.",
        { readablePrice, readablePeriod }
      );
    }

    if (discount?.applied && discount.type !== 'trial') {
      // TODO: add link to T&C
      return t(
        `legal-notes.discount.period-${offerPeriod}`,
        "After any promotional period, you will be charged {{readablePrice}}{{readablePeriod}} or the then-current price, plus applicable taxes, on a recurring basis. Your subscription will automatically continue until you cancel. To cancel, log into your account, click 'Manage' next to your subscription and then click 'Cancel'. By checking the box, you expressly acknowledge and agree to these terms as well as the full Terms of Service.",
        { readablePrice, readablePeriod }
      );
    }

    // TODO: add link to T&C
    return t(
      'offer-standard-consent-copy.checkout-subscription',
      "You will be charged {{readablePrice}}{{readablePeriod}} or the then-current price, plus applicable taxes, on a recurring basis. Your subscription will automatically continue until you cancel. To cancel, log into your account, click 'Manage' next to your subscription and then click ‘Cancel.’ By checking the box, you expressly acknowledge and agree to these terms as well as the full Terms of Service.",
      { readablePrice, readablePeriod }
    );
  };

  const addAdditionalCopyForBankPaymentMethods = (
    methodName,
    type = 'standard'
  ) => {
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
        {type === 'bank' ? getBankCopy() : getStandardCopy()}
      </Checkbox>
    );

    if (parentEl) {
      const doesCheckboxExist = document.querySelector(
        `.checkbox-${methodName}`
      );

      if (!doesCheckboxExist) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('checkbox-wrapper');

        render(checkbox, wrapper);
        parentEl.appendChild(wrapper);
      }
    }
  };

  // TO REFACTOR
  const showAdditionalText = () => {
    if (bankPaymentMethodsRef?.current) {
      bankPaymentMethods.forEach(method =>
        addAdditionalCopyForBankPaymentMethods(method, 'bank')
      );
    }
    if (standardPaymentMethodsRef?.current) {
      standardPaymentMethods.forEach(method =>
        addAdditionalCopyForBankPaymentMethods(method)
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
      onSubmit: (state, component) => {
        const {
          data: {
            paymentMethod: { type: methodName }
          }
        } = state;
        console.log({ methodName });
        if (
          bankPaymentMethods.includes(methodName) ||
          standardPaymentMethods.includes(methodName)
        ) {
          const checkbox = document.querySelector(
            `.checkbox-${methodName === 'scheme' ? 'card' : methodName}`
          );

          if (!checkbox.checked) {
            checkbox.classList.add('adyen-checkout__bank-checkbox--error');
            return false;
          }
        }

        component.setStatus('loading');

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
  }, [discount.applied]);

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
