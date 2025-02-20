import { useTranslation } from 'react-i18next';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import { useAppSelector } from 'appRedux/store';
import { selectUnsubscribe } from 'appRedux/unsubscribeSlice';
import {
  Pause,
  Downgrades,
  Survey,
  Confirmation,
  FreeExtension
} from 'components/UpdateSubscription/components';
import { Props } from './Unsubscribe.types';
import { STEPS } from './constants';
import useRetentionActions from './hooks/useRetentionActions';
import useUnsubscribe from './hooks/useUnsubscribe';
import useUnsubscribeSteps from './hooks/useUnsubscribeSteps';
import useUnsubscribeImmediately from './hooks/useUnsubscribeImmediately';

const Unsubscribe = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  skipCancellationSurveyStep,
  skipAvailableFreeExtensionStep
}: Props) => {
  const { error: isError } = useAppSelector(selectUnsubscribe);
  const { t } = useTranslation();

  const {
    checkedReason,
    handleUnsubscribe,
    scheduledSwitch,
    setCheckedReason
  } = useUnsubscribe(skipCancellationSurveyStep);
  const performUnsubscribe = async () => {
    await handleUnsubscribe(isPauseActive, showConfirmationStep);
  };
  const {
    downgradesWithoutPause,
    isPauseActive,
    pauseOffer,
    shouldShowDowngrades,
    shouldShowFreeExtension,
    shouldShowPauseScreen
  } = useRetentionActions({
    scheduledSwitch,
    skipAvailableDowngradesStep,
    skipAvailableFreeExtensionStep
  });
  const {
    currentStep,
    setCurrentStep,
    steps,
    isFreeExtensionSecondStep,
    setIsFreeExtensionSecondStep,
    goToNextStep,
    showConfirmationStep
  } = useUnsubscribeSteps({
    shouldShowDowngrades,
    shouldShowFreeExtension,
    shouldShowPauseScreen,
    skipCancellationSurveyStep
  });

  useUnsubscribeImmediately({
    skipCancellationSurveyStep,
    performUnsubscribe
  });

  if (!steps?.length || !currentStep) return null;

  return (
    <InnerPopupWrapper
      steps={isFreeExtensionSecondStep ? 2 : steps.length}
      popupTitle={t('unsubscribe-popup.title', 'Manage your plan')}
      isError={Boolean(isError)}
      currentStep={
        isFreeExtensionSecondStep ? 2 : steps.indexOf(currentStep) + 1
      }
    >
      {currentStep === STEPS.FREE_EXTENSION && (
        <FreeExtension
          handleUnsubscribe={goToNextStep}
          setIsFreeExtensionSecondStep={setIsFreeExtensionSecondStep}
        />
      )}
      {currentStep === STEPS.PAUSE && !!pauseOffer && (
        <Pause pauseOffer={pauseOffer} handleClick={goToNextStep} />
      )}
      {currentStep === STEPS.DOWNGRADES && (
        <Downgrades
          downgrades={downgradesWithoutPause}
          handleClick={goToNextStep}
        />
      )}
      {currentStep === STEPS.SURVEY && (
        <Survey
          customCancellationReasons={customCancellationReasons}
          checkedReason={checkedReason}
          shouldShowDowngrades={shouldShowDowngrades}
          shouldShowFreeExtension={shouldShowFreeExtension}
          handleCheckboxClick={setCheckedReason}
          setCurrentStep={setCurrentStep}
          scheduledSwitch={scheduledSwitch}
          handleUnsubscribe={performUnsubscribe}
        />
      )}
      {currentStep === STEPS.CONFIRMATION && <Confirmation />}
    </InnerPopupWrapper>
  );
};

export default Unsubscribe;
