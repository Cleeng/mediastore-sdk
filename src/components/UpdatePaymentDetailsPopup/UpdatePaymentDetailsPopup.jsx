import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { fetchFinalizeAddPaymentDetails } from 'appRedux/finalizeAddPaymentDetailsSlice';
import {
  updatePaymentDetailsPopup,
  resetPaymentDetailsPopupState,
  PAYMENT_DETAILS_STEPS
} from 'appRedux/popupSlice';
import {
  shouldShowGatewayComponent,
  validatePaymentMethods
} from 'util/paymentMethodHelper';
import AmazonIcon from 'assets/images/paymentMethods/amazon_color.svg';
import AppleIcon from 'assets/images/paymentMethods/apple_color.svg';
import AndroidIcon from 'assets/images/paymentMethods/android_color.svg';
import PaypalIcon from 'assets/images/paymentMethods/paypal_color.svg';
import RokuIcon from 'assets/images/paymentMethods/roku_color.svg';
import updateAdyenPaymentDetails from 'api/PaymentDetails/updateAdyenPaymentDetails';
import eventDispatcher, {
  MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL,
  MSSDK_UPDATE_PAYMENT_DETAILS_FAILED,
  MSSDK_REMOVE_PAYMENT_DETAILS_BUTTON_CLICKED
} from 'util/eventDispatcher';
import { updatePaymentMethods } from 'appRedux/publisherConfigSlice';
import DropInSection from 'components/Payment/DropInSection/DropInSection';
import { setSelectedPaymentMethod } from 'appRedux/paymentMethodsSlice';
import { fetchPaymentDetails } from 'appRedux/paymentDetailsSlice';
import {
  RemoveLinkStyled,
  DeleteIconStyled,
  PopupImageStyled,
  PaymentMethodsWrapperStyled
} from './UpdatePaymentDetailsPopupStyled';
import {
  Success,
  DeletePaymentMethod,
  ErrorStep,
  FinalizeAddPaymentDetails
} from './Steps';
import Adyen from '../Adyen';
import PayPal from '../Payment/PayPal/PayPal';
import Loader from '../Loader';

const PaymentMethodIcons = {
  amazon: AmazonIcon,
  apple: AppleIcon,
  android: AndroidIcon,
  paypal: PaypalIcon,
  roku: RokuIcon
};

const UpdatePaymentDetailsPopup = () => {
  const STEPS_NUMBERS = {
    PAYMENT_DETAILS_UPDATE: 1,
    FINALIZE_ADYEN: 2,
    DELETE_PAYMENT_DETAILS: 2,
    SUCCESS: 2,
    ERROR: 2
  };

  const { isLoading, step, initPaymentMethod } = useSelector(
    (state) => state.popupManager.paymentDetails
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [dropInInstance, setDropInInstance] = useState(null);

  const { paymentMethods, isPayPalHidden } = useSelector(
    (state) => state.publisherConfig
  );
  const { paymentDetails } = useSelector((state) => state.paymentDetails);
  const { loading: isFinalizeAddPaymentDetailsLoading } = useSelector(
    (state) => state.finalizeAddPaymentDetails
  );
  const [isActionHandlingProcessing, setIsActionHandlingProcessing] =
    useState(false);
  const selectPaymentMethodHandler = (paymentMethodName) => {
    const paymentMethodObj = paymentMethods.find(
      ({ methodName }) => methodName === paymentMethodName
    );
    dispatch(setSelectedPaymentMethod(paymentMethodObj));
  };

  useEffect(() => {
    if (!paymentMethods.length) {
      getPaymentMethods().then((resp) => {
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
    return () => {
      dispatch(resetPaymentDetailsPopupState());
    };
  }, []);

  if (initPaymentMethod?.bound) {
    const LogoComponent = PaymentMethodIcons[initPaymentMethod.paymentMethod];
    return (
      <InnerPopupWrapper
        steps={1}
        isError={false}
        currentStep={STEPS_NUMBERS[step]}
        popupTitle={t(
          'update-payment-details-popup.title',
          'Update payment details'
        )}
      >
        <ContentStyled>
          {PaymentMethodIcons[initPaymentMethod.paymentMethod] && (
            <PopupImageStyled>
              <LogoComponent />
            </PopupImageStyled>
          )}
          <TitleStyled>
            {t(
              'update-payment-details-popup.cannot-be-managed',
              'It looks like your payments cannot be managed from here'
            )}
          </TitleStyled>
          <TextStyled>
            {t(
              'update-payment-details-popup.current-method',
              'You are currently paying for your subscription via'
            )}{' '}
            {initPaymentMethod.paymentMethod}.
            <br />
            <br />
            {t(
              'update-payment-details-popup.cannot-be-changed',
              'This means that your payment information cannot be changed from here right now.'
            )}
          </TextStyled>
        </ContentStyled>
        <ButtonWrapperStyled $removeMargin>
          <Button
            variant='simple'
            onClickFn={() =>
              dispatch(updatePaymentDetailsPopup({ isOpen: false }))
            }
          >
            {t('update-payment-details-popup.back', 'Back')}
          </Button>
        </ButtonWrapperStyled>
      </InnerPopupWrapper>
    );
  }

  const onAdditionalDetails = (state) => {
    const {
      data: { details }
    } = state;
    dispatch(
      fetchFinalizeAddPaymentDetails({
        details
      })
    )
      .unwrap()
      .then(() => {
        dispatch(
          updatePaymentDetailsPopup({
            isOpen: true,
            isLoading: false,
            step: PAYMENT_DETAILS_STEPS.SUCCESS
          })
        );
      })
      .catch(() => {
        dispatch(
          updatePaymentDetailsPopup({
            isOpen: true,
            isLoading: false,
            step: PAYMENT_DETAILS_STEPS.ERROR
          })
        );
      })
      .finally(() => {
        setIsActionHandlingProcessing(false);
        dispatch(fetchPaymentDetails());
      });
  };

  const addAdyenPaymentDetails = async (state, component) => {
    const {
      data: { paymentMethod, browserInfo, billingAddress }
    } = state;
    dispatch(updatePaymentDetailsPopup({ isLoading: true }));
    const { errors, responseData } = await updateAdyenPaymentDetails(
      paymentMethod,
      browserInfo,
      billingAddress
    );
    if (errors.length) {
      eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_FAILED);
      dispatch(
        updatePaymentDetailsPopup({
          step: PAYMENT_DETAILS_STEPS.ERROR,
          errorMessage: errors[0]
        })
      );
      return;
    }
    if (responseData?.action) {
      if (responseData.action.type !== 'redirect') {
        setIsActionHandlingProcessing(true);
      }
      component.handleAction(responseData.action);
      return;
    }
    eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL);
    dispatch(
      updatePaymentDetailsPopup({
        isLoading: false,
        step: PAYMENT_DETAILS_STEPS.SUCCESS
      })
    );
    dispatch(fetchPaymentDetails());
  };

  const getDropIn = (drop) => {
    setDropInInstance(drop);
  };

  const submitPayPal = () => {
    const paymentMethodId = paymentMethods.find(
      (item) => item.paymentGateway === 'paypal' && item.methodName === 'paypal'
    )?.id;
    dispatch(updatePaymentDetailsPopup({ isLoading: true }));
    updatePayPalPaymentDetails(paymentMethodId)
      .then((resp) => {
        eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL);
        window.location.href = resp.responseData.redirectUrl;
      })
      .catch(() => {
        eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_FAILED);
        dispatch(
          updatePaymentDetailsPopup({ step: PAYMENT_DETAILS_STEPS.ERROR })
        );
      })
      .finally(() => {
        dispatch(updatePaymentDetailsPopup({ isLoading: false }));
      });
  };

  const shouldShowPayPal = isPayPalHidden
    ? false
    : shouldShowGatewayComponent('paypal', paymentMethods);

  const shouldShowAdyen = shouldShowGatewayComponent('adyen', paymentMethods);

  const showPayPalWhenAdyenIsReady = () =>
    shouldShowAdyen ? !!dropInInstance : true;

  if (step === PAYMENT_DETAILS_STEPS.DELETE_PAYMENT_DETAILS) {
    return (
      <InnerPopupWrapper
        steps={2}
        isError={false}
        currentStep={STEPS_NUMBERS[step]}
        popupTitle={t(
          'update-payment-details-popup.title',
          'Update payment details'
        )}
      >
        <DeletePaymentMethod />
      </InnerPopupWrapper>
    );
  }

  if (step === PAYMENT_DETAILS_STEPS.FINALIZE_ADYEN) {
    return (
      <InnerPopupWrapper
        steps={2}
        isError={false}
        currentStep={STEPS_NUMBERS[step]}
        popupTitle={t(
          'update-payment-details-popup.title',
          'Update payment details'
        )}
      >
        <ContentStyled>
          <FinalizeAddPaymentDetails />
        </ContentStyled>
      </InnerPopupWrapper>
    );
  }

  if (step === PAYMENT_DETAILS_STEPS.SUCCESS) {
    return (
      <InnerPopupWrapper
        steps={2}
        isError={false}
        currentStep={STEPS_NUMBERS[step]}
        popupTitle={t(
          'update-payment-details-popup.title',
          'Update payment details'
        )}
      >
        <Success
          hideInnerPopup={() =>
            dispatch(updatePaymentDetailsPopup({ isOpen: false }))
          }
        />
      </InnerPopupWrapper>
    );
  }
  if (step === PAYMENT_DETAILS_STEPS.ERROR) {
    return (
      <InnerPopupWrapper
        steps={2}
        isError={false}
        currentStep={STEPS_NUMBERS[step]}
        popupTitle={t(
          'update-payment-details-popup.title',
          'Update payment details'
        )}
      >
        <ErrorStep />
      </InnerPopupWrapper>
    );
  }
  if (isFinalizeAddPaymentDetailsLoading) {
    return (
      <InnerPopupWrapper
        steps={2}
        isError={false}
        currentStep={STEPS_NUMBERS[step]}
        popupTitle={t(
          'update-payment-details-popup.title',
          'Update payment details'
        )}
      >
        <ContentStyled>
          <Loader />
        </ContentStyled>
      </InnerPopupWrapper>
    );
  }

  return (
    <InnerPopupWrapper
      steps={2}
      isError={false}
      currentStep={STEPS_NUMBERS[step]}
      popupTitle={t(
        'update-payment-details-popup.title',
        'Update payment details'
      )}
    >
      <ContentStyled>
        <TitleStyled>
          {t('update-payment-details-popup.title', 'Update payment details')}
        </TitleStyled>
        <TextStyled>
          {t(
            'update-payment-details-popup.update-current-method',
            'Update your current payment method, or add a new one.'
          )}
        </TextStyled>
        <PaymentMethodsWrapperStyled>
          {shouldShowAdyen && (
            <Adyen
              isMyAccount
              onSubmit={addAdyenPaymentDetails}
              selectPaymentMethod={selectPaymentMethodHandler}
              isPayPalAvailable={shouldShowPayPal}
              getDropIn={getDropIn}
              onAdditionalDetails={onAdditionalDetails}
            />
          )}
          {shouldShowPayPal &&
            showPayPalWhenAdyenIsReady() &&
            !isActionHandlingProcessing && (
              <DropInSection
                selectPaymentMethod={selectPaymentMethodHandler}
                title='PayPal'
                logo='paypal'
                isLoading={isLoading}
              >
                <PayPal
                  isMyAccount
                  onSubmit={submitPayPal}
                  isLoading={isLoading}
                />
              </DropInSection>
            )}
        </PaymentMethodsWrapperStyled>
        {paymentDetails.find((item) => item.active)?.id && (
          <RemoveLinkStyled
            onClick={() => {
              eventDispatcher(MSSDK_REMOVE_PAYMENT_DETAILS_BUTTON_CLICKED);
              dispatch(
                updatePaymentDetailsPopup({
                  step: PAYMENT_DETAILS_STEPS.DELETE_PAYMENT_DETAILS
                })
              );
            }}
          >
            <DeleteIconStyled />
            {t(
              'update-payment-details-popup.remove-method',
              'Remove your payment method'
            )}
          </RemoveLinkStyled>
        )}
      </ContentStyled>
      <ButtonWrapperStyled $removeMargin>
        <Button
          variant='simple'
          onClickFn={() =>
            dispatch(
              updatePaymentDetailsPopup({
                isOpen: false
              })
            )
          }
        >
          {t(
            'update-payment-details-popup.success.back',
            'Back to Payment Details'
          )}
        </Button>
      </ButtonWrapperStyled>
      <WarningMessageStyled>
        {t(
          'update-payment-details-popup.warning-message',
          'Your new details will replace the details used for your other active subscriptions.'
        )}
      </WarningMessageStyled>
    </InnerPopupWrapper>
  );
};

export default UpdatePaymentDetailsPopup;
