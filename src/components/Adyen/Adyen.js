import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import AdyenCheckout from '@adyen/adyen-web';
import createPaymentSession from 'api/Payment/createPaymentSession';
import useScript from 'util/useScriptHook';
import { useSelector } from 'react-redux';
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

const Adyen = ({
  onSubmit,
  isMyAccount,
  selectPaymentMethod,
  isPayPalAvailable,
  getDropIn,
  onAdditionalDetails
}) => {
  const { discount, totalPrice } = useSelector(state => state.order.order);
  const { adyenConfiguration } = useSelector(state => state.publisherConfig);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedPaymentMethod } = useSelector(state => state.paymentMethods);

  const standardPaymentMethodsRef = useRef(null);
  const bankPaymentMethodsRef = useRef(null);
  const [standardDropInInstance, setStandardDropInInstance] = useState(null);
  const [bankDropInInstance, setBankDropInInstance] = useState(null);
  useScript('https://pay.google.com/gp/p/js/pay.js');

  const addAdditionalCopyForBankPaymentMethods = methodName => {
    const newEl = document.createElement('p');
    newEl.textContent +=
      'By using this payment method you will be charged 0,01EUR. Found will be refunded after successfull authorization';
    newEl.classList.add('adyen__bank-copy');

    const parentEl = document.querySelector(
      `.adyen-checkout__payment-method--${methodName}`
    );
    if (parentEl) {
      const details = parentEl.querySelector(
        '.adyen-checkout__payment-method__details'
      );
      parentEl.insertBefore(newEl, details);
    }
  };

  const showAdditionalText = () => {
    if (
      bankPaymentMethodsRef &&
      bankPaymentMethodsRef.current &&
      totalPrice === 0
    ) {
      const bankPaymentMethods = ['ideal', 'directEbanking', 'bcmc_mobile'];
      bankPaymentMethods.forEach(method =>
        addAdditionalCopyForBankPaymentMethods(method)
      );
    }
  };

  const onSelect = ({ type }) => {
    const typeMapper = {
      bcmc_mobile: 'bancontact_mobile',
      directEbanking: 'sofort',
      bcmc: 'bancontact_card'
    };
    selectPaymentMethod(typeMapper[type] || type);
  };

  const mountStandardDropIn = adyenCheckout => {
    if (standardPaymentMethodsRef?.current) {
      const dropin = adyenCheckout.create('dropin', {
        onSelect,
        openFirstPaymentMethod:
          adyenConfiguration?.openFirstPaymentMethod == null
            ? !window.matchMedia('(max-width:991px)').matches
            : adyenConfiguration?.openFirstPaymentMethod
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

  const onError = e => {
    const { error, fieldType } = e;
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
      locale: adyenConfiguration?.locale || 'en-US',
      translations: {
        ...defaultAdyenTranslations,
        ...adyenConfiguration?.translations
      },
      environment: getAdyenEnv(),
      analytics: adyenConfiguration?.analytics || {
        enabled: true //  analytics data for Adyen
      },
      session: {
        id,
        sessionData
      },
      clientKey: getAdyenClientKey(),
      onSubmit,
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
        }
      }
    };

    const adyenCheckout = await AdyenCheckout(configuration);
    if (type === 'bank') {
      mountBankDropIn(adyenCheckout);
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
    Promise.all([createSession('standard'), createSession('bank')]); // TODO: if it's not a 0 payment - should we create one Dropin only?
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
      <div ref={standardPaymentMethodsRef} />
      <div ref={bankPaymentMethodsRef} />
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

export default withTranslation()(labeling()(Adyen));
