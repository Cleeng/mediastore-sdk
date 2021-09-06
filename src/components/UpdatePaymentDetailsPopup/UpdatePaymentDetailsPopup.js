import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
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
import { ReactComponent as AmazonIcon } from 'assets/images/paymentMethods/amazon_color.svg';
import { ReactComponent as AppleIcon } from 'assets/images/paymentMethods/apple_color.svg';
import { ReactComponent as AndroidIcon } from 'assets/images/paymentMethods/android_color.svg';
import { ReactComponent as PaypalIcon } from 'assets/images/paymentMethods/paypal_color.svg';
import { ReactComponent as RokuIcon } from 'assets/images/paymentMethods/roku_color.svg';
import {
  PaymentMethodStyled,
  PaymentMethodTextStyled,
  PaymentMethodTitleStyled,
  PaymentMethodDescStyled,
  PaymentMethodIconStyled,
  RemoveLinkStyled,
  DeleteIconStyled,
  PopupImageStyled
} from './UpdatePaymentDetailsPopupStyled';
import supportedPaymentGateways, {
  ACTIONS
} from './definedPaymentMethods.const';
import { AddCard, AddPayPal, Success, DeletePaymentMethod } from './Steps';

const PaymentMethodIcons = {
  amazon: AmazonIcon,
  apple: AppleIcon,
  android: AndroidIcon,
  paypal: PaypalIcon,
  roku: RokuIcon
};

const UpdatePaymentDetailsPopup = ({
  hideInnerPopup,
  setPublisherPaymentMethods,
  updatePaymentDetailsSection,
  selectedPaymentMethod
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState(null);
  const publisherPaymentMethods = useSelector(
    state => state.paymentInfo.publisherPaymentMethods
  );

  useEffect(() => {
    if (!publisherPaymentMethods) {
      setIsLoading(true);
      getPaymentMethods().then(resp => {
        if (resp.responseData) {
          const {
            responseData: { paymentMethods }
          } = resp;
          if (paymentMethods) {
            const adyenData = paymentMethods.find(
              item => item.methodName === 'card'
            );
            const paypalData = paymentMethods.find(
              item => item.methodName === 'paypal'
            );
            setPublisherPaymentMethods({
              paypal: paypalData?.id,
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
            setStep={setStep}
            updatePaymentDetailsSection={updatePaymentDetailsSection}
            selectedPaymentMethod={selectedPaymentMethod}
          />
        );
      case ACTIONS.addPayPal:
        return (
          <AddPayPal
            setStep={setStep}
            selectedPaymentMethod={selectedPaymentMethod}
          />
        );
      case ACTIONS.delete:
        return (
          <DeletePaymentMethod
            hideInnerPopup={hideInnerPopup}
            paymentDetailsToDelete={selectedPaymentMethod}
            setStep={setStep}
            updatePaymentDetailsSection={updatePaymentDetailsSection}
          />
        );
      default:
        return '';
    }
  };
  if (selectedPaymentMethod.bound) {
    const LogoComponent =
      PaymentMethodIcons[selectedPaymentMethod.paymentMethod];
    return (
      <InnerPopupWrapper
        steps={1}
        isError={false}
        currentStep={step}
        popupTitle={t('Update payment details')}
      >
        <ContentStyled>
          {PaymentMethodIcons[selectedPaymentMethod.paymentMethod] && (
            <PopupImageStyled>
              <LogoComponent />
            </PopupImageStyled>
          )}
          <TitleStyled textTransform="normal">
            {t('It looks like your payments cannot be managed from here')}
          </TitleStyled>
          <TextStyled>
            {t('You are currently paying for your subscription via')}{' '}
            {selectedPaymentMethod.paymentMethod}.
            <br />
            <br />
            {t(
              'This means that your payment information cannot be changed from here right now.'
            )}
          </TextStyled>
        </ContentStyled>
        <ButtonWrapperStyled removeMargin>
          <Button theme="simple" onClickFn={() => hideInnerPopup()}>
            {t('Back')}
          </Button>
        </ButtonWrapperStyled>
      </InnerPopupWrapper>
    );
  }

  return (
    <InnerPopupWrapper
      steps={3}
      isError={false}
      currentStep={step}
      popupTitle={t('Update payment details')}
    >
      {step === 1 && (
        <>
          <ContentStyled>
            <TitleStyled>{t('Update payment details')}</TitleStyled>
            <TextStyled>
              {t('Update your current payment method, or add a new one.')}
            </TextStyled>
            <SkeletonWrapper showChildren={!isLoading} height={90}>
              {supportedPaymentGateways.map(item => {
                const IconComponent = item.icon ? item.icon : React.Fragment;
                if (
                  publisherPaymentMethods &&
                  publisherPaymentMethods[item.paymentGateway]
                ) {
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
                          {t(item.title)}
                        </PaymentMethodTitleStyled>
                        <PaymentMethodDescStyled>
                          {t(item.description)}
                        </PaymentMethodDescStyled>
                      </PaymentMethodTextStyled>
                    </PaymentMethodStyled>
                  );
                }
                return null;
              })}
            </SkeletonWrapper>
            <SkeletonWrapper showChildren={!isLoading}>
              {selectedPaymentMethod.id && (
                <RemoveLinkStyled
                  onClick={() => {
                    setStep(currentStep => currentStep + 1);
                    setAction(ACTIONS.delete);
                  }}
                >
                  <DeleteIconStyled />
                  {t('Remove your payment method')}
                </RemoveLinkStyled>
              )}
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
  setPublisherPaymentMethods: PropTypes.func,
  updatePaymentDetailsSection: PropTypes.func,
  selectedPaymentMethod: PropTypes.objectOf(PropTypes.any)
};

UpdatePaymentDetailsPopup.defaultProps = {
  hideInnerPopup: () => {},
  setPublisherPaymentMethods: () => {},
  updatePaymentDetailsSection: () => {},
  selectedPaymentMethod: {}
};

export default UpdatePaymentDetailsPopup;
