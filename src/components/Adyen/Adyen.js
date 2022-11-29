/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { FontColor } from 'styles/variables';
import { getData } from 'util/appConfigHelper';
import AdyenCheckout from '@adyen/adyen-web';
import createPaymentSession from 'api/Payment/createPaymentSession';
import { AdyenStyled } from './AdyenStyled';
import '@adyen/adyen-web/dist/adyen.css';
import eventDispatcher, { MSSDK_ADYEN_ERROR } from '../../util/eventDispatcher';
import { CLIENT_KEY_LIVE, CLIENT_KEY_TEST } from './Adyen.utils';
import Loader from '../Loader';

const Adyen = ({
  onSubmit,
  isCheckout,
  selectPaymentMethod,
  isPayPalAvailable,
  selectedPaymentMethod,
  getDropIn,
  onAdditionalDetails
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const [dropInInstance, setDropInInstance] = useState(null);
  const getAdyenEnv = () =>
    getData('CLEENG_ENVIRONMENT') === 'production' ? 'live' : 'test';

  const onError = e => {
    const { error, fieldType } = e;
    eventDispatcher(MSSDK_ADYEN_ERROR, {
      error,
      fieldType
    });
  };

  const createDropInInstance = async (id, sessionData, paymentMethods) => {
    const configuration = {
      environment: getAdyenEnv(),
      analytics: {
        enabled: false // Set to false to not send analytics data to Adyen.
      },
      session: {
        id,
        sessionData
      },
      clientKey: getAdyenEnv() === 'live' ? CLIENT_KEY_LIVE : CLIENT_KEY_TEST,
      onSubmit,
      onAdditionalDetails,
      paymentMethods: { paymentMethods },
      // onChange, // supported ?
      onError, // TODO: is it working?
      paymentMethodsConfiguration: {
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          billingAddressRequired: true // recommended for 3DS
        },
        applepay: {
          // TODO: get values from the redux -> order, check if this is really needed
          amount: {
            value: 1000,
            currency: 'EUR'
          },
          countryCode: 'PL'
        }
      },
      showPayButton: false
    };

    // const cardConfiguration = {
    //   styles: {
    //     base: {
    //       color: FontColor
    //     }
    //   }
    // };

    const checkout = await AdyenCheckout(configuration);
    if (containerRef.current) {
      const dropin = checkout.create('dropin');
      dropin.mount(containerRef.current);
      setDropInInstance(dropin);
      getDropIn(dropin);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const createSession = async () => {
      const {
        responseData: { id, sessionData, paymentMethods }
      } = await createPaymentSession();
      // TODO: handle error when id is missing
      if (id) {
        createDropInInstance(id, sessionData, paymentMethods);
      }
    };
    createSession();
    // TODO: add loading indicator
  }, []);

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
      <div ref={containerRef} onClick={() => selectPaymentMethod('adyen')} />
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
