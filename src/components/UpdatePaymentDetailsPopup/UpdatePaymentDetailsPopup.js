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
import updateAdyenPaymentDetails from 'api/PaymentDetails/updateAdyenPaymentDetails';
import eventDispatcher, {
  MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL,
  MSSDK_UPDATE_PAYMENT_DETAILS_FAILED,
  MSSDK_REMOVE_PAYMENT_DETAILS_BUTTON_CLICKED
} from 'util/eventDispatcher';
import {
  // PaymentMethodStyled,
  // PaymentMethodTextStyled,
  // PaymentMethodTitleStyled,
  // PaymentMethodDescStyled,
  // PaymentMethodIconStyled,
  RemoveLinkStyled,
  DeleteIconStyled,
  PopupImageStyled
} from './UpdatePaymentDetailsPopupStyled';
import { Success, DeletePaymentMethod } from './Steps';
import Adyen from '../Adyen';
import PayPal from '../Payment/PayPal/PayPal';

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
  const STEPS = {
    PAYMENT_DETAILS_UPDATE: 'PAYMENT_DETAILS_UPDATE',
    DELETE_PAYMENT_DETAILS: 'DELETE_PAYMENT_DETAILS',
    SUCCESS: 'SUCCESS'
  };

  const STEPS_NUMBERS = {
    PAYMENT_DETAILS_UPDATE: 1,
    DELETE_PAYMENT_DETAILS: 2,
    SUCCESS: 2
  };

  const { t } = useTranslation();
  const [step, setStep] = useState(STEPS.PAYMENT_DETAILS_UPDATE);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [dropInInstance, setDropInInstance] = useState(null);
  const publisherPaymentMethods = useSelector(
    state => state.paymentInfo.publisherPaymentMethods
  );

  const selectMethod = method => setSelectedMethod(method);

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
          <TitleStyled>
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

  const addAdyenPaymentDetails = async ({ data: { paymentMethod } }) => {
    // TODO: handle loading and errors
    const { errors } = await updateAdyenPaymentDetails(
      publisherPaymentMethods.adyen,
      paymentMethod
    );
    if (errors.length) {
      eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_FAILED);
      return;
    }
    eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL);
    setStep(STEPS.SUCCESS);
    updatePaymentDetailsSection();
  };

  const getDropIn = drop => {
    setDropInInstance(drop);
  };

  const handleConfirm = () => {
    if (selectedPaymentMethod === 'paypal') {
      submitPayPal();
      return;
    }
    if (!dropInInstance) {
      return;
    }
    dropInInstance.submit();
  };

  return (
    <InnerPopupWrapper
      steps={2}
      isError={false}
      currentStep={STEPS_NUMBERS[step]}
      popupTitle={t('Update payment details')}
    >
      {step === STEPS.PAYMENT_DETAILS_UPDATE && (
        <>
          <ContentStyled>
            <TitleStyled>{t('Update payment details')}</TitleStyled>
            <TextStyled>
              {t('Update your current payment method, or add a new one.')}
            </TextStyled>
            <SkeletonWrapper showChildren={!isLoading} height={90}>
              <Adyen
                isMyAccount
                onSubmit={addAdyenPaymentDetails}
                // onChange={() => setGeneralError('')}
                // isPaymentProcessing={isLoading}
                selectPaymentMethod={selectMethod}
                selectedPaymentMethod={selectedPaymentMethod}
                // isPayPalAvailable={isGatewayAvailable('paypal')}
                getDropIn={getDropIn}
                // onAdditionalDetails={onAdditionalDetails}
              />
            </SkeletonWrapper>
            <SkeletonWrapper showChildren={!isLoading}>
              {selectedPaymentMethod.id && (
                <RemoveLinkStyled
                  onClick={() => {
                    eventDispatcher(
                      MSSDK_REMOVE_PAYMENT_DETAILS_BUTTON_CLICKED
                    );
                    setStep(STEPS.DELETE_PAYMENT_DETAILS);
                  }}
                >
                  <DeleteIconStyled />
                  {t('Remove your payment method')}
                </RemoveLinkStyled>
              )}
            </SkeletonWrapper>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="primary" onClickFn={handleConfirm}>
              {t('Update payment details')}
            </Button>
            <Button theme="simple" onClickFn={() => hideInnerPopup()}>
              {t('Cancel')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {step === STEPS.DELETE_PAYMENT_DETAILS && (
        <DeletePaymentMethod
          hideInnerPopup={hideInnerPopup}
          paymentDetailsToDelete={selectedPaymentMethod}
          setStep={setStep}
          updatePaymentDetailsSection={updatePaymentDetailsSection}
        />
      )}
      {step === STEPS.SUCCESS && <Success hideInnerPopup={hideInnerPopup} />}
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
