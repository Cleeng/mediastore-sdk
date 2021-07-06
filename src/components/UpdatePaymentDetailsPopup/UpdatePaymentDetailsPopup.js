import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import updatePayPalPaymentDetails from 'api/PaymentDetails/updatePayPalPaymentDetails';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { ReactComponent as CheckmackIcon } from 'assets/images/greenCheckmark.svg';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import SkeletonWrapper from 'components/SkeletonWrapper';
import Loader from 'components/Loader';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import Adyen from 'components/Adyen';
import { getPaymentMethods } from 'api';
import supportedPaymentGateways from './definedPaymentMethods.const';
import {
  PaymentMethodStyled,
  PaymentMethodTextStyled,
  PaymentMethodTitleStyled,
  PaymentMethodDescStyled,
  PaymentMethodIconStyled,
  ImageWrapper,
  PPIconStyled
} from './UpdatePaymentDetailsPopupStyled';

const UpdatePaymentDetailsPopup = ({
  hideInnerPopup,
  paymentsSettings,
  setPaymentsSettings,
  t
}) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [newMethod, setNewMethod] = useState(null);

  // const addAdyenPaymentDetails = ({ data: { paymentMethod: card } }) => {
  //   console.log('card', card);
  //   setStep(currentStep => currentStep + 1);
  // };

  useEffect(() => {
    if (!paymentsSettings) {
      setIsLoading(true);
      getPaymentMethods().then(resp => {
        if (resp.responseData) {
          const {
            responseData: { paymentMethods }
          } = resp;
          if (paymentMethods) {
            const adyenData = paymentMethods.find(
              item => item.paymentGateway === 'adyen'
            );
            const payPalData = paymentMethods.find(
              item => item.paymentGateway === 'paypal'
            );
            setPaymentsSettings({
              payPal: payPalData?.id,
              adyen: adyenData?.id
            });
          }
          setIsLoading(false);
        }
      });
    }
  }, []);

  const addAdyenPaymentDetails = () => {
    setStep(currentStep => currentStep + 1);
  };

  const addPayPalPaymentDetails = () => {
    setIsButtonLoading(true);
    updatePayPalPaymentDetails(paymentsSettings.payPal).then(resp => {
      window.location.href = resp.responseData.redirectUrl;
    });
  };

  return (
    <InnerPopupWrapper steps={3} isError={false} currentStep={step}>
      {step === 1 && (
        <>
          <ContentStyled>
            <TitleStyled>Edit payment details</TitleStyled>
            <TextStyled>
              Update current payment method or select a new one below to pay for
              Subscription Plans
            </TextStyled>
            <SkeletonWrapper showChildren={!isLoading} height={90}>
              {supportedPaymentGateways.map(item => {
                const IconComponent = item.icon ? item.icon : React.Fragment;
                if (paymentsSettings && paymentsSettings[item.paymentGateway]) {
                  return (
                    <PaymentMethodStyled
                      key={item.key}
                      onClick={() => {
                        setStep(currentStep => currentStep + 1);
                        setNewMethod(item.key);
                      }}
                    >
                      <PaymentMethodIconStyled>
                        <IconComponent />
                      </PaymentMethodIconStyled>
                      <PaymentMethodTextStyled>
                        <PaymentMethodTitleStyled>
                          {item.title}
                        </PaymentMethodTitleStyled>
                        <PaymentMethodDescStyled>
                          {item.description}
                        </PaymentMethodDescStyled>
                      </PaymentMethodTextStyled>
                    </PaymentMethodStyled>
                  );
                }
                return null;
              })}
            </SkeletonWrapper>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={() => hideInnerPopup()}>
              {t('Cancel')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {step === 2 && newMethod === 'card' && (
        <>
          <ContentStyled>
            <TitleStyled>Credit Card</TitleStyled>
            <TextStyled>Add your credit card details.</TextStyled>
            <Adyen onSubmit={addAdyenPaymentDetails} isCheckout={false} />
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button
              theme="simple"
              onClickFn={() => setStep(currentStep => currentStep - 1)}
            >
              {t('Back')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {step === 2 && newMethod === 'paypal' && (
        <>
          <ContentStyled>
            <TitleStyled>PayPal</TitleStyled>
            <TextStyled>
              Paying with PayPal is easy. Click the button below and sign in to
              your PayPal account
            </TextStyled>
            <Button
              size="normal"
              width="50%"
              margin="40px auto auto auto"
              theme="paypal"
              onClickFn={addPayPalPaymentDetails}
            >
              {isButtonLoading ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                <>
                  <PPIconStyled />
                  PayPal
                </>
              )}
            </Button>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button
              theme="simple"
              onClickFn={() => setStep(currentStep => currentStep - 1)}
            >
              {t('Back')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {step === 3 && (
        <>
          <ContentStyled>
            <ImageWrapper>
              <CheckmackIcon />
            </ImageWrapper>
            <TitleStyled>Thank you</TitleStyled>
            <TextStyled>
              Your payment method have been successfully updated.
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={() => hideInnerPopup()}>
              {t('Back to settings')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
    </InnerPopupWrapper>
  );
};

UpdatePaymentDetailsPopup.propTypes = {
  hideInnerPopup: PropTypes.func,
  setPaymentsSettings: PropTypes.func,
  paymentsSettings: PropTypes.objectOf(PropTypes.any),
  t: PropTypes.func
};

UpdatePaymentDetailsPopup.defaultProps = {
  hideInnerPopup: () => {},
  setPaymentsSettings: () => {},
  paymentsSettings: null,
  t: k => k
};

export { UpdatePaymentDetailsPopup as PureUpdatePaymentDetailsPopup };

export default withTranslation()(labeling()(UpdatePaymentDetailsPopup));
