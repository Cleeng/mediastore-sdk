/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import AdyenCheckout from '@adyen/adyen-web';
import createPaymentSession from 'api/Payment/createPaymentSession';
import usePrevious from 'util/usePreviousHook';
import useScript from 'util/useScriptHook';
import { AdyenStyled } from './AdyenStyled';
import '@adyen/adyen-web/dist/adyen.css';
import eventDispatcher, { MSSDK_ADYEN_ERROR } from '../../util/eventDispatcher';
import Loader from '../Loader';
import { toMinor } from './util/toMinor';
import {
  getAdyenEnv,
  getAdyenClientKey,
  getGooglePayEnv
} from './util/getAdyenConfig';

const Adyen = ({
  onSubmit,
  isCheckout,
  selectPaymentMethod,
  isPayPalAvailable,
  selectedPaymentMethod,
  getDropIn,
  onAdditionalDetails,
  order: { currency, totalPrice, country, discount }
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

  const onSelect = ({
    data: {
      paymentMethod: { type }
    }
  }) => {
    if (selectedPaymentMethod === type) return;
    if (type === 'scheme') {
      selectPaymentMethod('card');
      return;
    }
    selectPaymentMethod(type);
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
      clientKey: getAdyenClientKey(),
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
        // TODO: test applepay and googlepay on production without these config object - probably it will work
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
          environment: getGooglePayEnv()
          // TODO: support for optional config https://docs.adyen.com/payment-methods/google-pay/web-drop-in?tab=_code_payments_code__2#payment-data
        }
      },
      showPayButton: false
      // TODO: instantPaymentTypes: ['applepay'] // defines which payment method should be on top - should be configurable by publisher
    };

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
    if (dropInInstance && prevTotalPrice !== totalPrice && discount.applied) {
      // recreate dropin when coupon was applied
      dropInInstance.unmount();
      setIsLoading(true); // TODO: hide paypal when dropin is rerendering
      createSession(); // recreate Adyen Instance if price was changed
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
