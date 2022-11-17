/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { FontColor } from 'styles/variables';
import { getData } from 'util/appConfigHelper';
import AdyenCheckout from '@adyen/adyen-web';
import createPaymentSession from 'api/Payment/createPaymentSession';
import { AdyenStyled, ConfirmButtonStyled } from './AdyenStyled';
import '@adyen/adyen-web/dist/adyen.css';
import eventDispatcher, { MSSDK_ADYEN_ERROR } from '../../util/eventDispatcher';
import { CLIENT_KEY_LIVE, CLIENT_KEY_TEST } from './Adyen.utils';

const Adyen = ({
  onSubmit,
  onChange,
  t,
  isPaymentProcessing,
  isCheckout,
  selectPaymentMethod,
  children,
  selectedPaymentMethod
}) => {
  // const [isLoaded, setIsLoaded] = useState(false);
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

  const createDropInInstance = async (id, sessionData) => {
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
      // onChange, // supported ?
      onError, // TODO: is it working?
      paymentMethodsConfiguration: {
        card: {
          hasHolderName: true,
          holderNameRequired: true
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
    const dropin = checkout.create('dropin');
    dropin.mount(containerRef.current);
    setDropInInstance(dropin);
  };

  useEffect(() => {
    const createSession = async () => {
      const {
        responseData: { id, sessionData }
      } = await createPaymentSession();
      // TODO: handle error when id is missing
      if (id) {
        createDropInInstance(id, sessionData);
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

  const confirmButtonText = isCheckout ? t('Complete purchase') : t('Update');
  return (
    <AdyenStyled isMyAccount={!isCheckout}>
      <div
        ref={containerRef}
        onClick={() => selectPaymentMethod('card')}
      />
      {children}
      <ConfirmButtonStyled>
        <Button
          size="big"
          {...(isCheckout
            ? {}
            : {
                size: 'normal',
                width: '60%',
                margin: 'auto'
              })}
          theme="confirm"
          onClickFn={dropInInstance ? () => dropInInstance.submit() : () => {}}
          disabled={isPaymentProcessing}
        >
          {isPaymentProcessing ? (
            <Loader buttonLoader color="#ffffff" />
          ) : (
            confirmButtonText
          )}
        </Button>
      </ConfirmButtonStyled>
    </AdyenStyled>
  );
};

Adyen.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  isPaymentProcessing: PropTypes.bool,
  isCheckout: PropTypes.bool,
  selectPaymentMethod: PropTypes.func.isRequired,
  children: PropTypes.node,
  selectedPaymentMethod: PropTypes.string.isRequired,
};

Adyen.defaultProps = {
  children: '',
  t: k => k,
  onChange: () => {},
  isPaymentProcessing: false,
  isCheckout: true
};

export { Adyen as PureAdyen };

export default withTranslation()(labeling()(Adyen));
