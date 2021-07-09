import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import SkeletonWrapper from 'components/SkeletonWrapper';
import Button from 'components/Button';
import { getPaymentMethods } from 'api';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import { AddCard, AddPayPal, Success, DeletePaymentMethod } from './Steps';
import supportedPaymentGateways, {
  ACTIONS
} from './definedPaymentMethods.const';
import {
  PaymentMethodStyled,
  PaymentMethodTextStyled,
  PaymentMethodTitleStyled,
  PaymentMethodDescStyled,
  PaymentMethodIconStyled,
  RemoveLinkStyled,
  DeleteIconStyled
} from './UpdatePaymentDetailsPopupStyled';

const UpdatePaymentDetailsPopup = ({
  hideInnerPopup,
  paymentsSettings,
  setPaymentsSettings,
  updatePaymentDetailsSection,
  t
}) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState(null);

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

  const renderMainStep = () => {
    switch (action) {
      case ACTIONS.addCard:
        return (
          <AddCard
            paymentsSettings={paymentsSettings}
            setStep={setStep}
            updatePaymentDetailsSection={updatePaymentDetailsSection}
          />
        );
      case ACTIONS.addPayPal:
        return (
          <AddPayPal paymentsSettings={paymentsSettings} setStep={setStep} />
        );
      case ACTIONS.delete:
        return <DeletePaymentMethod hideInnerPopup={hideInnerPopup} />;
      default:
        return '';
    }
  };

  return (
    <InnerPopupWrapper
      steps={3}
      isError={false}
      currentStep={step}
      popupTitle="Edit payment details"
    >
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
                        setAction(item.key);
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
            <SkeletonWrapper showChildren={!isLoading}>
              <RemoveLinkStyled
                onClick={() => {
                  setStep(currentStep => currentStep + 1);
                  setAction(ACTIONS.delete);
                }}
              >
                <DeleteIconStyled />
                Remove your payment method
              </RemoveLinkStyled>
            </SkeletonWrapper>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={() => hideInnerPopup()}>
              {t('Cancel')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {step === 2 && renderMainStep()}
      {step === 3 && <Success hideInnerPopup={hideInnerPopup} />}
    </InnerPopupWrapper>
  );
};

UpdatePaymentDetailsPopup.propTypes = {
  hideInnerPopup: PropTypes.func,
  setPaymentsSettings: PropTypes.func,
  updatePaymentDetailsSection: PropTypes.func,
  paymentsSettings: PropTypes.objectOf(PropTypes.any),
  t: PropTypes.func
};

UpdatePaymentDetailsPopup.defaultProps = {
  hideInnerPopup: () => {},
  setPaymentsSettings: () => {},
  updatePaymentDetailsSection: () => {},
  paymentsSettings: null,
  t: k => k
};

export { UpdatePaymentDetailsPopup as PureUpdatePaymentDetailsPopup };

export default withTranslation()(labeling()(UpdatePaymentDetailsPopup));
