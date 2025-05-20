import { useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { pauseSubscription as postPauseSubscription } from 'api';
import { updateList } from 'appRedux/planDetailsSlice';
import { hidePopup, selectPopupManager } from 'appRedux/popupSlice';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import Button from 'components/Button';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import Loader from 'components/Loader';
import Select from 'components/Select';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import SkeletonWrapper from 'components/SkeletonWrapper';
import checkmarkIcon from 'assets/images/checkmarkBase';
import CloseIcon from 'assets/images/errors/close.svg';
import formatNumber from 'util/formatNumber';
import { currencyFormat, dateFormat } from 'util/planHelper';
import {
  ImageWrapper,
  ArrowStyled,
  SubscriptionIconStyled
} from './PauseSubscriptionPopupStyled';

const maxBillingCycles = 3;

type PauseDetails = {
  failedResumes: unknown[];
  pauseDate: number;
  requestedAt: number;
  resumeDate: number;
};

const PauseSubscriptionPopup = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [selectedBillingCycles, setSelectedBillingCycles] = useState<
    string | null
  >(null);

  const [pauseDetails, setPauseDetails] = useState<PauseDetails | null>(null);
  const { offerToSwitch: fromOffer } = useAppSelector((state) => state.plan);
  const { isLoading: isPopupLoading, pauseSubscription } =
    useAppSelector(selectPopupManager);

  const { offerData } = pauseSubscription || {};

  const billingCycleOptions = Array.from(
    { length: maxBillingCycles },
    (_, i) => ({
      label: `${i + 1}`,
      value: `${i + 1}`
    })
  );

  useEffect(() => {
    setSelectedBillingCycles(billingCycleOptions[0].value);
  }, []);

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const handlePauseSubscription = async () => {
    setIsLoading(true);

    if (!selectedBillingCycles || !offerData?.subscriptionId) {
      return;
    }

    try {
      const { pause } = await postPauseSubscription(
        offerData?.subscriptionId,
        Number(selectedBillingCycles)
      );

      setPauseDetails(pause);
      setStep(2);
    } catch {
      setIsLoading(false);
      setError(true);
    }
  };

  const closePopupAndRefresh = () => {
    dispatch(hidePopup());
    dispatch(updateList());
  };

  if (isPopupLoading || !offerData) {
    return (
      <InnerPopupWrapper
        steps={2}
        popupTitle={t('pausesubscription-popup.pausing-plan', 'Pausing plan')}
        currentStep={1}
      >
        <SkeletonWrapper
          showChildren={false}
          height={200}
          width={450}
          margin='auto'
        />
      </InnerPopupWrapper>
    );
  }

  if (isError) {
    return (
      <InnerPopupWrapper
        steps={2}
        popupTitle={t('pausesubscription-popup.pausing-plan', 'Pausing plan')}
        currentStep={1}
      >
        <>
          <ContentStyled>
            <ImageWrapper>
              <CloseIcon />
            </ImageWrapper>
            <TitleStyled $step={step}>
              {t('pausesubscription-popup.error-title', 'An error occurred.')}
            </TitleStyled>
            <TextStyled>
              {t(
                'pausesubscription-popup.error-description',
                'We have been unable to pause your plan as an error occurred. Sorry for the inconvenience, please try again.'
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button variant='confirm' onClickFn={closePopupAndRefresh}>
              {t('pausesubscription-popup.back-button', 'Back to My Account')}
            </Button>
          </ButtonWrapperStyled>
        </>
      </InnerPopupWrapper>
    );
  }

  return (
    <InnerPopupWrapper
      steps={2}
      popupTitle={t('pausesubscription-popup.pausing-plan', 'Pausing plan')}
      currentStep={2}
    >
      {step === 1 && (
        <>
          <ContentStyled>
            <ImageWrapper>
              <SubscriptionIconStyled
                period={fromOffer.period}
                showLabel='Current'
              />
              <ArrowStyled />
              <SubscriptionIconStyled showLabel='Paused' />
            </ImageWrapper>
            <TitleStyled $step={step} $textTransform='capitalize'>
              {t('pausesubscription-popup.details.title', 'Subscription pause')}
            </TitleStyled>
            <TextStyled>
              <Trans
                i18nKey='pausesubscription-popup.details.info'
                values={{
                  offerTitle: offerData?.offerTitle,
                  expireDate: dateFormat(offerData.expiresAt),
                  price: `${formatNumber(offerData.nextPaymentPrice)} ${
                    currencyFormat[offerData.nextPaymentCurrency]
                  }`
                }}
                components={{
                  strong: <strong />
                }}
                defaults="You will continue to have access to <strong>{{ offerTitle }}</strong> until <strong>{{ expireDate }}</strong>. From that time your subscription will be paused, and you won't be charged for a specific number of billing cycles. After that, your subscription will automatically resume, and you will be charged <strong>{{ price }}</strong> on a recurring basis, until you cancel. You can manually resume the subscription at any moment."
              />
            </TextStyled>
            <TextStyled>
              {t(
                'pausesubscription-popup.details.note',
                'For how many billing cycles would you like to pause your subscription?'
              )}
            </TextStyled>
            {selectedBillingCycles && (
              <Select
                label='For how many billing cycles would you like to pause your subscription?'
                name='billingCycles'
                value={{
                  label: selectedBillingCycles,
                  value: selectedBillingCycles
                }}
                values={billingCycleOptions}
                required
                onChange={(_, settingValue: { value: string }) =>
                  setSelectedBillingCycles(settingValue.value)
                }
              />
            )}
            <TextStyled>
              <Trans
                i18nKey='pausesubscription-popup.details.question'
                values={{
                  selectedBillingCycles
                }}
                components={{
                  strong: <strong />
                }}
                defaults='Your subscription will be automatically resumed after <strong>{{ selectedBillingCycles }}</strong> billing cycles'
              />
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled $removeMargin>
            <Button variant='simple' onClickFn={() => dispatch(hidePopup())}>
              {t('pausesubscription-popup.details.close', 'Close')}
            </Button>
            <Button variant='confirm' onClickFn={handlePauseSubscription}>
              {isLoading ? (
                <Loader buttonLoader color='#ffffff' />
              ) : (
                t(
                  'pausesubscription-popup.confirm-button',
                  'Pause subscription'
                )
              )}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {step === 2 && pauseDetails && (
        <>
          <ContentStyled>
            <ImageWrapper>
              <img src={checkmarkIcon} alt='checkmark icon' />
            </ImageWrapper>
            <TitleStyled $step={step}>
              {t('pausesubscription-popup.confirmation.title', 'Thank You!')}
            </TitleStyled>
            <TextStyled>
              <Trans
                i18nKey='pausesubscription-popup.confirmation.info'
                values={{
                  offerTitle: offerData?.offerTitle,
                  resumeDate: dateFormat(pauseDetails?.resumeDate),
                  price: `${formatNumber(offerData.nextPaymentPrice)} ${
                    currencyFormat[offerData.nextPaymentCurrency]
                  }`
                }}
                components={{
                  strong: <strong />
                }}
                defaults='You have successfully paused your plan <strong>{{ offerTitle }}</strong>. Subscription will automatically resume on <strong>{{ resumeDate }}</strong> and you’ll continue to be charged the then-current price.'
              />
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button variant='confirm' onClickFn={closePopupAndRefresh}>
              {t('pausesubscription-popup.resign-button', 'Back to My Account')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
    </InnerPopupWrapper>
  );
};

export default PauseSubscriptionPopup;
