/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { FontColor } from 'styles/variables';
import AdyenCheckout from '@adyen/adyen-web';
import createPaymentSession from 'api/Payment/createPaymentSession';
import usePrevious from 'util/usePreviousHook';
import useScript from 'util/useScriptHook';
import { AdyenStyled } from './AdyenStyled';
import '@adyen/adyen-web/dist/adyen.css';
import eventDispatcher, { MSSDK_ADYEN_ERROR } from '../../util/eventDispatcher';
import { CLIENT_KEY_LIVE, CLIENT_KEY_TEST } from './Adyen.utils';
import Loader from '../Loader';
import { toMinor } from './util/toMinor';
import getAdyenEnv from './util/getAdyenEnv';

const Adyen = ({
  onSubmit,
  isCheckout,
  selectPaymentMethod,
  isPayPalAvailable,
  selectedPaymentMethod,
  getDropIn,
  onAdditionalDetails,
  order: { currency, totalPrice, country }
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const [dropInInstance, setDropInInstance] = useState(null);
  const prevTotalPrice = usePrevious(totalPrice);
  useScript('https://pay.google.com/gp/p/js/pay.js');

  const onError = e => {
    const { error, fieldType } = e;
    eventDispatcher(MSSDK_ADYEN_ERROR, {
      error,
      fieldType
    });
  };

  const onSelect = component => {
    if (selectedPaymentMethod === component.data.paymentMethod.type) return;
    if (component.data.paymentMethod.type === 'scheme') {
      selectPaymentMethod('card');
      return;
    }
    selectPaymentMethod(component.data.paymentMethod.type);
  };

  const createDropInInstance = async (id, sessionData) => {
    const configuration = {
      environment: getAdyenEnv(),
      analytics: {
        enabled: true //  analytics data for Adyen
      },
      session: {
        id,
        sessionData
      },
      clientKey: getAdyenEnv() === 'test' ? CLIENT_KEY_TEST : CLIENT_KEY_LIVE,
      onSubmit,
      // onPaymentCompleted, TODO: most likely not needed, will be reviewed with redirect flow https://docs.adyen.com/online-payments/web-drop-in#handle-redirect-result
      onAdditionalDetails,
      onError, // TODO: handle errors
      paymentMethodsConfiguration: {
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          billingAddressRequired: true // required for 3DS
        },
        applepay: {
          amount: {
            value: totalPrice ? toMinor(currency, totalPrice) : 0,
            currency
          },
          countryCode: country
        },
        googlepay: {
          amount: {
            value: totalPrice ? toMinor(currency, totalPrice) : 0,
            currency
          },
          countryCode: country,
          environment: getAdyenEnv() === 'test' ? 'TEST' : 'PRODUCTION'
          // TODO: support for optional config https://docs.adyen.com/payment-methods/google-pay/web-drop-in?tab=_code_payments_code__2#payment-data
        }
      },
      showPayButton: false
      // instantPaymentTypes: ['applepay'] // defines which payment method should be on top - should be configurable by publisher
    };

    if (dropInInstance) {
      // recreate dropin when coupon was applied
      setIsLoading(true);
      dropInInstance.unmount();
    }

    const checkout = await AdyenCheckout(configuration);
    if (containerRef.current) {
      const dropin = checkout.create('dropin', {
        onSelect
      });
      dropin.mount(containerRef.current);
      setDropInInstance(dropin);
      getDropIn(dropin);
    }
    setIsLoading(false);
  };

  const createSession = async () => {
    const {
      responseData: { id, sessionData }
    } = await createPaymentSession();
    // TODO: handle error when id is missing
    if (id) {
      createDropInInstance(id, sessionData);
    }
  };

  useEffect(() => {
    createSession();
    // TODO: add loading indicator
  }, []);

  useEffect(() => {
    if (
      dropInInstance &&
      prevTotalPrice !== totalPrice &&
      selectedPaymentMethod !== 'paypal'
    ) {
      // TODO:: add nice loader
      // recreate Adyen Instance if price was changed
      createSession();
    }
  }, [totalPrice]);

  useEffect(() => {
    if (!selectedPaymentMethod || !dropInInstance) {
      return;
    }

    if (selectedPaymentMethod === 'paypal') {
      dropInInstance.closeActivePaymentMethod();
    }
  }, [selectedPaymentMethod]);

  return (
    <AdyenStyled
      isMyAccount={!isCheckout}
      isAdditionalPayment={isPayPalAvailable}
    >
      {isLoading && <Loader />}
      <div ref={containerRef} />
    </AdyenStyled>
  );
};

Adyen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isCheckout: PropTypes.bool,
  selectPaymentMethod: PropTypes.func.isRequired,
  isPayPalAvailable: PropTypes.bool.isRequired,
  selectedPaymentMethod: PropTypes.string.isRequired,
  getDropIn: PropTypes.func.isRequired,
  onAdditionalDetails: PropTypes.func.isRequired
};

Adyen.defaultProps = {
  isCheckout: true
};

export { Adyen as PureAdyen };

export default withTranslation()(labeling()(Adyen));
