/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
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
import adyenTranslations from './util/AdyenTranslations';

const Adyen = ({
  onSubmit,
  isMyAccount,
  selectPaymentMethod,
  isPayPalAvailable,
  selectedPaymentMethod,
  getDropIn,
  onAdditionalDetails
}) => {
  const { discount } = useSelector(state => state.order.order);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const [dropInInstance, setDropInInstance] = useState(null);
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
    if (type === 'scheme') {
      selectPaymentMethod('card');
      return;
    }
    selectPaymentMethod(type);
  };

  const createDropInInstance = async ({
    id,
    sessionData,
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
      paymentMethods.find(item => item.type === 'applepay')?.configuration;
    const googlePayConfigurationObj =
      paymentMethods &&
      paymentMethods.find(item => item.type === 'googlepay')?.configuration;

    const configuration = {
      locale: 'en-US',
      translations: adyenTranslations,
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
      onError,
      paymentMethodsConfiguration: {
        card: {
          hasHolderName: true,
          holderNameRequired: true
          // billingAddressRequired: true // recommended for 3DS, to validate
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

    const checkout = await AdyenCheckout(configuration);
    if (containerRef.current) {
      const dropin = checkout.create('dropin', {
        onSelect,
        openFirstPaymentMethod: !window.matchMedia('(max-width:991px)').matches
      });
      dropin.mount(containerRef.current);
      setDropInInstance(dropin);
      getDropIn(dropin);
    }
    setIsLoading(false);
  };

  const createSession = async () => {
    const { responseData } = await createPaymentSession(isMyAccount);
    if (responseData?.id) {
      createDropInInstance(responseData);
    }
  };

  useEffect(() => {
    createSession();
  }, []);

  useEffect(() => {
    if (dropInInstance && discount?.applied) {
      // recreate dropin when coupon was applied
      dropInInstance.unmount();
      getDropIn(null);
      setIsLoading(true);
      createSession(); // recreate Adyen Instance if price was changed
    }
  }, [discount.applied]);

  useEffect(() => {
    if (!selectedPaymentMethod || !dropInInstance) {
      return;
    }

    if (selectedPaymentMethod === 'paypal') {
      dropInInstance.closeActivePaymentMethod();
    }
  }, [selectedPaymentMethod]);

  return (
    <AdyenStyled isMyAccount isAdditionalPayment={isPayPalAvailable}>
      {isLoading && <Loader />}
      <div ref={containerRef} />
    </AdyenStyled>
  );
};

Adyen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isMyAccount: PropTypes.bool,
  selectPaymentMethod: PropTypes.func.isRequired,
  isPayPalAvailable: PropTypes.bool.isRequired,
  selectedPaymentMethod: PropTypes.string,
  getDropIn: PropTypes.func.isRequired,
  onAdditionalDetails: PropTypes.func.isRequired
};

Adyen.defaultProps = {
  selectedPaymentMethod: '',
  isMyAccount: false
};

export { Adyen as PureAdyen };

export default withTranslation()(labeling()(Adyen));
