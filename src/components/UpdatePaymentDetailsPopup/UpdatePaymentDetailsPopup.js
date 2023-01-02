import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import Button from 'components/Button';
import { getPaymentMethods, updatePayPalPaymentDetails } from 'api';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled,
  WarningMessageStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import {
  shouldShowGatewayComponent,
  validatePaymentMethods
} from 'util/paymentMethodHelper';
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
import { updatePaymentMethods } from 'redux/publisherConfigSlice';
import DropInSection from 'components/Payment/DropInSection/DropInSection';
import {
  RemoveLinkStyled,
  DeleteIconStyled,
  PopupImageStyled,
  PaymentMethodsWrapperStyled
} from './UpdatePaymentDetailsPopupStyled';
import { Success, DeletePaymentMethod, Error } from './Steps';
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
  updatePaymentDetailsSection
}) => {
  const STEPS = {
    PAYMENT_DETAILS_UPDATE: 'PAYMENT_DETAILS_UPDATE',
    DELETE_PAYMENT_DETAILS: 'DELETE_PAYMENT_DETAILS',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
  };

  const STEPS_NUMBERS = {
    PAYMENT_DETAILS_UPDATE: 1,
    DELETE_PAYMENT_DETAILS: 2,
    SUCCESS: 2,
    ERROR: 2
  };

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [step, setStep] = useState(STEPS.PAYMENT_DETAILS_UPDATE);
  const [isUpdatingPaymentDetails, setIsUpdatingPaymentDetails] = useState(
    false
  );
  const [dropInInstance, setDropInInstance] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const { paymentMethods } = useSelector(state => state.publisherConfig);
  const { paymentDetails } = useSelector(state => state.paymentInfo);

  const selectPaymentMethodHandler = paymentMethodName => {
    if (selectedPaymentMethod?.methodName === paymentMethodName) return;
    const paymentMethodObj = paymentMethods.find(
      ({ methodName }) => methodName === paymentMethodName
    );
    setSelectedPaymentMethod(paymentMethodObj);
  };

  useEffect(() => {
    if (!paymentMethods.length) {
      getPaymentMethods().then(resp => {
        const { responseData } = resp;
        if (responseData) {
          const { paymentMethods: paymentMethodsFromBackend } = responseData;
          dispatch(
            updatePaymentMethods(
              validatePaymentMethods(paymentMethodsFromBackend)
            )
          );
        }
      });
    }
  }, []);

  if (selectedPaymentMethod?.bound) {
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

  const onAdditionalDetails = async state => {
    // TODO: handle additional actions (3DSecure)
    console.log('onAdditionalDetails event');
    const {
      data: { details }
    } = state;
    console.log('data for finilize update payment details', details);
  };

  const addAdyenPaymentDetails = async (state, component) => {
    const {
      data: { paymentMethod, browserInfo, billingAddress }
    } = state;

    const selectedPaymentMethodName =
      paymentMethod.type === 'scheme' ? 'card' : paymentMethod.type;
    const paymentMethodId = paymentMethods.find(
      item =>
        item.paymentGateway === 'adyen' &&
        item.methodName === selectedPaymentMethodName
    )?.id;
    setIsUpdatingPaymentDetails(true);
    const { errors, action } = await updateAdyenPaymentDetails(
      paymentMethodId,
      paymentMethod,
      browserInfo,
      billingAddress
    );
    if (errors.length) {
      eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_FAILED);
      setStep(STEPS.ERROR);
      return;
    }
    if (action) {
      component.handleAction(action);
      return;
    }
    eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL);
    setIsUpdatingPaymentDetails(false);
    setStep(STEPS.SUCCESS);
    updatePaymentDetailsSection();
  };

  const getDropIn = drop => {
    setDropInInstance(drop);
  };

  const submitPayPal = () => {
    const paymentMethodId = paymentMethods.find(
      item => item.paymentGateway === 'paypal' && item.methodName === 'paypal'
    )?.id;
    setIsUpdatingPaymentDetails(true);
    updatePayPalPaymentDetails(paymentMethodId)
      .then(resp => {
        eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL);
        window.location.href = resp.responseData.redirectUrl;
      })
      .catch(() => {
        eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_FAILED);
        setStep(STEPS.ERROR);
      })
      .finally(() => {
        setIsUpdatingPaymentDetails(false);
      });
  };

  const shouldShowAdyen = shouldShowGatewayComponent('adyen', paymentMethods);
  const shouldShowPayPal = shouldShowGatewayComponent('paypal', paymentMethods);

  const showPayPalWhenAdyenIsReady = () =>
    shouldShowAdyen ? !!dropInInstance : true;

  if (step === STEPS.DELETE_PAYMENT_DETAILS) {
    return (
      <InnerPopupWrapper
        steps={2}
        isError={false}
        currentStep={STEPS_NUMBERS[step]}
        popupTitle={t('Update payment details')}
      >
        <DeletePaymentMethod
          hideInnerPopup={hideInnerPopup}
          showSuccessPage={() => setStep(STEPS.SUCCESS)}
          updatePaymentDetailsSection={updatePaymentDetailsSection}
        />
      </InnerPopupWrapper>
    );
  }

  if (step === STEPS.SUCCESS) {
    return (
      <InnerPopupWrapper
        steps={2}
        isError={false}
        currentStep={STEPS_NUMBERS[step]}
        popupTitle={t('Update payment details')}
      >
        <Success hideInnerPopup={hideInnerPopup} />
      </InnerPopupWrapper>
    );
  }
  if (step === STEPS.ERROR) {
    return (
      <InnerPopupWrapper
        steps={2}
        isError={false}
        currentStep={STEPS_NUMBERS[step]}
        popupTitle={t('Update payment details')}
      >
        <Error hideInnerPopup={hideInnerPopup} />
      </InnerPopupWrapper>
    );
  }

  return (
    <InnerPopupWrapper
      steps={2}
      isError={false}
      currentStep={STEPS_NUMBERS[step]}
      popupTitle={t('Update payment details')}
    >
      <ContentStyled>
        <TitleStyled>{t('Update payment details')}</TitleStyled>
        <TextStyled>
          {t('Update your current payment method, or add a new one.')}
        </TextStyled>
        <PaymentMethodsWrapperStyled>
          {shouldShowAdyen && (
            <Adyen
              isMyAccount
              onSubmit={addAdyenPaymentDetails}
              selectPaymentMethod={selectPaymentMethodHandler}
              isPayPalAvailable={shouldShowPayPal}
              selectedPaymentMethod={selectedPaymentMethod?.methodName}
              getDropIn={getDropIn}
              onAdditionalDetails={onAdditionalDetails}
            />
          )}
          {shouldShowPayPal && showPayPalWhenAdyenIsReady() && (
            <DropInSection
              isCardAvailable={shouldShowAdyen}
              selectPaymentMethod={selectPaymentMethodHandler}
              isSelected={selectedPaymentMethod?.methodName === 'paypal'}
              title="PayPal"
              logo="paypal"
              fadeOutSection={
                isUpdatingPaymentDetails &&
                selectedPaymentMethod?.methodName !== 'paypal'
              }
            >
              <PayPal
                onSubmit={submitPayPal}
                isLoading={isUpdatingPaymentDetails}
              />
            </DropInSection>
          )}
        </PaymentMethodsWrapperStyled>
        {paymentDetails.find(item => item.active)?.id && (
          <RemoveLinkStyled
            onClick={() => {
              eventDispatcher(MSSDK_REMOVE_PAYMENT_DETAILS_BUTTON_CLICKED);
              setStep(STEPS.DELETE_PAYMENT_DETAILS);
            }}
          >
            <DeleteIconStyled />
            {t('Remove your payment method')}
          </RemoveLinkStyled>
        )}
      </ContentStyled>
      <ButtonWrapperStyled removeMargin>
        <Button theme="simple" onClickFn={() => hideInnerPopup()}>
          {t('Cancel')}
        </Button>
      </ButtonWrapperStyled>
      <WarningMessageStyled>
        Your new details will replace the details used for your other active
        subscriptions.
      </WarningMessageStyled>
    </InnerPopupWrapper>
  );
};

UpdatePaymentDetailsPopup.propTypes = {
  hideInnerPopup: PropTypes.func,
  updatePaymentDetailsSection: PropTypes.func
};

UpdatePaymentDetailsPopup.defaultProps = {
  hideInnerPopup: () => {},
  updatePaymentDetailsSection: () => {}
};

export default UpdatePaymentDetailsPopup;
