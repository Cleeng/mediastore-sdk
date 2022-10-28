/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
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

const COMPONENT_CONTAINER_ID = 'component-container';

const Adyen = ({ onSubmit, onChange, t, isPaymentProcessing, isCheckout }) => {
  // const [isLoaded, setIsLoaded] = useState(false);
  const [dropInInstance, setDropInInstance] = useState();
  const getAdyenEnv = () =>
    getData('CLEENG_ENVIRONMENT') === 'production' ? 'live' : 'test';

  const onError = e => {
    const { error, fieldType } = e;
    window.dispatchEvent(
      new CustomEvent('MSSDK:Adyen-error', {
        detail: {
          error,
          fieldType
        }
      })
    );
  };

  const renderCheckout = async (id, sessionData) => {
    const configuration = {
      environment: getAdyenEnv(),
      analytics: {
        enabled: false // Set to false to not send analytics data to Adyen.
      },
      session: {
        id,
        sessionData
      },
      clientKey:
        getAdyenEnv() === 'live'
          ? 'live_BQDOFBYTGZB3XKF62GBYSLPUJ4YW2TPL'
          : 'test_I4OFGUUCEVB5TI222AS3N2Y2LY6PJM3K',
      onSubmit,
      // onChange, // supported ?
      onError,
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
    dropin.mount(`#${COMPONENT_CONTAINER_ID}`);
    setDropInInstance(dropin);
  };

  useEffect(() => {
    createPaymentSession().then(resp => {
      const {
        responseData: { id, sessionData }
      } = resp;
      if (id) {
        renderCheckout(id, sessionData);
      }
    });
    // setIsLoaded(false);
    return () => {};
  }, []);

  const confirmButtonText = isCheckout ? t('Complete purchase') : t('Update');
  return (
    <AdyenStyled isMyAccount={!isCheckout}>
      <div id={COMPONENT_CONTAINER_ID} />
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
  isCheckout: PropTypes.bool
};

Adyen.defaultProps = {
  t: k => k,
  onChange: () => {},
  isPaymentProcessing: false,
  isCheckout: true
};

export { Adyen as PureAdyen };

export default withTranslation()(labeling()(Adyen));
