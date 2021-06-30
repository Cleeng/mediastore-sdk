import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { ReactComponent as CheckmackIcon } from 'assets/images/greenCheckmark.svg';

import InnerPopupWrapper from 'components/InnerPopupWrapper';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import Adyen from 'components/Adyen';
import paymentMethods from './paymentMethods.const';
import {
  PaymentMethodStyled,
  PaymentMethodTextStyled,
  PaymentMethodTitleStyled,
  PaymentMethodDescStyled,
  PaymentMethodIconStyled,
  ImageWrapper,
  PPIconStyled
} from './UpdatePaymentDetailsPopupStyled';

const UpdatePaymentDetailsPopup = ({ hideInnerPopup, t }) => {
  const [step, setStep] = useState(1);
  const [newMethod, setNewMethod] = useState(null);

  // const addAdyenPaymentDetails = ({ data: { paymentMethod: card } }) => {
  //   console.log('card', card);
  //   setStep(currentStep => currentStep + 1);
  // };
  const addAdyenPaymentDetails = () => {
    setStep(currentStep => currentStep + 1);
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
            {paymentMethods.map(method => {
              const IconComponent = method.icon ? method.icon : React.Fragment;
              return (
                <PaymentMethodStyled
                  key={method.key}
                  onClick={() => {
                    setStep(currentStep => currentStep + 1);
                    setNewMethod(method.key);
                  }}
                >
                  <PaymentMethodIconStyled>
                    <IconComponent />
                  </PaymentMethodIconStyled>
                  <PaymentMethodTextStyled>
                    <PaymentMethodTitleStyled>
                      {method.title}
                    </PaymentMethodTitleStyled>
                    <PaymentMethodDescStyled>
                      {method.description}
                    </PaymentMethodDescStyled>
                  </PaymentMethodTextStyled>
                </PaymentMethodStyled>
              );
            })}
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
            <Button theme="simple" onClickFn={() => hideInnerPopup()}>
              {t('Cancel')}
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
            >
              <PPIconStyled />
              PayPal
            </Button>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={() => hideInnerPopup()}>
              {t('Cancel')}
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
  t: PropTypes.func
};

UpdatePaymentDetailsPopup.defaultProps = {
  hideInnerPopup: () => {},
  t: k => k
};

export { UpdatePaymentDetailsPopup as PureUpdatePaymentDetailsPopup };

export default withTranslation()(labeling()(UpdatePaymentDetailsPopup));
