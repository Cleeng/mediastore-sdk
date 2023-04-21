import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { createRoot } from 'react-dom/client';
import labeling from 'containers/labeling';
import AdyenCheckout from '@adyen/adyen-web';
import createPaymentSession from 'api/Payment/createPaymentSession';
import useScript from 'util/useScriptHook';
import { useSelector } from 'react-redux';
import Checkbox from 'components/Checkbox';
import AdyenStyled from './AdyenStyled';
import '@adyen/adyen-web/dist/adyen.css';
import eventDispatcher, { MSSDK_ADYEN_ERROR } from '../../util/eventDispatcher';
import Loader from '../Loader';
import {
  getAdyenEnv,
  getAdyenClientKey,
  getGooglePayEnv
} from './util/getAdyenConfig';
import defaultAdyenTranslations from './util/defaultAdyenTranslations';

const bankPaymentMethods = [
  'ideal',
  'sofort',
  'directEbanking',
  'bcmc_mobile',
  'bancontact_mobile'
];

const Adyen = ({
  onSubmit,
  isMyAccount,
  selectPaymentMethod,
  isPayPalAvailable,
  getDropIn,
  onAdditionalDetails,
  t
}) => {
  const { discount, totalPrice, offerId } = useSelector(
    state => state.order.order
  );
  const publisherConfig = useSelector(state => state.publisherConfig);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedPaymentMethod } = useSelector(state => state.paymentMethods);

  const standardPaymentMethodsRef = useRef(null);
  const bankPaymentMethodsRef = useRef(null);
  const [standardDropInInstance, setStandardDropInInstance] = useState(null);
  const [bankDropInInstance, setBankDropInInstance] = useState(null);

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

  const getBankCopy = () => {
    const isFree = totalPrice === 0;
    const isSubscription = offerId?.charAt(0) === 'S' && isMyAccount;

    if (isFree && isSubscription) {
      return t(
        'offer-bank-consent-copy.free-subscription',
        'You accept the terms and conditions of this agreement and that your account will be charged €0.10 for authentication purposes. This amount will be refunded once the transaction is completed. And your account will be debited on a recurring basis for the full subscription amount.'
      );
    }

    if (isSubscription) {
      return t(
        'offer-bank-consent-copy.paid-subscription',
        'You accept the terms and conditions of this agreement. Your account will be debited on a recurring basis for the full subscription amount.'
      );
    }

    return t(
      'offer-bank-consent-copy.paid-not-subscription',
      'You accept the terms and conditions of this agreement.'
    );
  };

  const addAdditionalCopyForBankPaymentMethods = methodName => {
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
        {getBankCopy()}
      </Checkbox>
    );

    if (parentEl) {
      const details = parentEl.querySelector(
        '.adyen-checkout__payment-method__details'
      );

      const doesCheckboxExist = document.querySelector(
        `.checkbox-${methodName}`
      );

      if (!doesCheckboxExist) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('checkbox-wrapper');

        const root = createRoot(wrapper);
        root.render(checkbox);

        details.before(wrapper);
      }
    }
  };

  const showAdditionalText = () => {
    if (bankPaymentMethodsRef && bankPaymentMethodsRef.current) {
      bankPaymentMethods.forEach(method =>
        addAdditionalCopyForBankPaymentMethods(method)
      );
    }
  };

  const onSelect = async ({ type }) => {
    const typeMapper = {
      bcmc_mobile: 'bancontact_mobile',
      directEbanking: 'sofort',
      bcmc: 'bancontact_card'
    };

    selectPaymentMethod(typeMapper[type] || type);
  };

  const mountStandardDropIn = adyenCheckout => {
    const { adyenConfiguration } = publisherConfig;

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
      getDropIn(dropin, 'standard');
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
      getDropIn(dropin, 'bank');
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
    const { adyenConfiguration } = publisherConfig;

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
      locale: adyenConfiguration?.locale || 'en-US',
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

        if (bankPaymentMethods.includes(methodName)) {
          const checkbox = document.querySelector(`.checkbox-${methodName}`);

          if (!checkbox.checked) {
            checkbox.classList.add('adyen-checkout__bank-checkbox--error');
            return false;
          }
        }

        component.setStatus('loading');

        if (type === 'bank') {
          setShouldFadeOutStandardDropIn(true);
        } else {
          setShouldFadeOutBankDropIn(true);
        }

        return onSubmit(state, component);
      },
      onActionHandled: () => {
        if (type === 'bank') {
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
          })
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
          ...amountObj
        },
        ideal: {
          ...adyenConfiguration?.paymentMethodsConfiguration?.ideal
        },
        bcmc: {
          ...adyenConfiguration?.paymentMethodsConfiguration?.bancontactCard,
          ...(isMyAccount && {
            hasHolderName: true
          })
        }
      }
    };

    const adyenCheckout = await AdyenCheckout(configuration);
    if (type === 'bank') {
      mountBankDropIn(adyenCheckout);
      setIsLoading(false);
      return;
    }
    mountStandardDropIn(adyenCheckout);
    setIsLoading(false);
  };

  const createSession = async paymentMethodsType => {
    const { responseData } = await createPaymentSession(
      isMyAccount,
      paymentMethodsType
    );
    if (responseData?.id) {
      createDropInInstance(responseData, paymentMethodsType);
    }
  };

  const generateDropIns = () => {
    const { paymentMethods } = publisherConfig;

    if (isMyAccount || totalPrice === 0) {
      const shouldCreateBankPaymentSession = paymentMethods.some(
        ({ methodName }) => bankPaymentMethods.includes(methodName)
      );

      const shouldCreateStandardPaymentSession = paymentMethods.some(
        ({ methodName }) => !bankPaymentMethods.includes(methodName)
      );

      if (shouldCreateStandardPaymentSession) {
        createSession('standard');
      }

      if (shouldCreateBankPaymentSession) {
        createSession('bank');
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

  useEffect(() => {
    if (bankDropInInstance && standardDropInInstance) {
      standardPaymentMethodsRef.current.addEventListener('click', closeBank);
      bankPaymentMethodsRef.current.addEventListener('click', closeStandard);
    }
  }, [standardDropInInstance, bankDropInInstance]);

  useEffect(() => {
    if (standardDropInInstance && discount?.applied) {
      // recreate Adyen Instance if coupon was applied
      bankPaymentMethodsRef.current.removeEventListener('click', closeStandard);
      standardPaymentMethodsRef.current.removeEventListener('click', closeBank);
      if (standardDropInInstance) {
        standardDropInInstance.unmount();
        setStandardDropInInstance(null);
        getDropIn(null, 'standard');
      }

      if (bankDropInInstance) {
        bankDropInInstance.unmount();
        setBankDropInInstance(null);
        getDropIn(null, 'bank');
      }
      setIsLoading(true);
      generateDropIns();
    }
  }, [discount.applied]);

  useEffect(() => {
    if (!selectedPaymentMethod?.methodName || !standardDropInInstance) {
      return;
    }

    if (selectedPaymentMethod?.methodName === 'paypal') {
      if (standardDropInInstance)
        standardDropInInstance.closeActivePaymentMethod();
      if (bankDropInInstance) bankDropInInstance.closeActivePaymentMethod();
    }
  }, [selectedPaymentMethod]);

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
  onAdditionalDetails: PropTypes.func.isRequired,
  t: PropTypes.func
};

Adyen.defaultProps = {
  isMyAccount: false,
  t: k => k
};

export default withTranslation()(labeling()(Adyen));
