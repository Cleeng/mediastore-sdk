import { useTranslation } from 'react-i18next';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import { useAppSelector } from 'appRedux/store';
import { selectUnsubscribe } from 'appRedux/unsubscribeSlice';
import {
  Downgrades,
  Survey,
  Confirmation
} from 'components/UpdateSubscription/components';
import { selectPopupManager } from 'appRedux/popupSlice';
import type { Props } from './Unsubscribe.types';
import { STEPS } from './constants';
import useUnsubscribe from './hooks/useUnsubscribe';
import useUnsubscribeSteps from './hooks/useUnsubscribeSteps';
import useUnsubscribeImmediately from './hooks/useUnsubscribeImmediately';
import useAvailableDowngrades from './hooks/useAvailableDowngrades';

const Unsubscribe = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  skipCancellationSurveyStep
}: Props) => {
  const { error: isError } = useAppSelector(selectUnsubscribe);
  const { t } = useTranslation();

  const {
    checkedReason,
    handleUnsubscribe,
    scheduledSwitch,
    setCheckedReason
  } = useUnsubscribe(skipCancellationSurveyStep);

  const { updateSubscription } = useAppSelector(selectPopupManager);
  const availableDowngrades = useAvailableDowngrades(
    updateSubscription?.offerData?.offerId ?? ''
  );

  const performUnsubscribe = async () => {
    await handleUnsubscribe(showConfirmationStep);
  };

  const {
    currentStep,
    setCurrentStep,
    steps,
    showConfirmationStep,
    goToNextStep
  } = useUnsubscribeSteps({
    availableDowngrades,
    skipAvailableDowngradesStep,
    skipCancellationSurveyStep
  });

  useUnsubscribeImmediately({
    skipCancellationSurveyStep,
    availableDowngrades,
    skipAvailableDowngradesStep,
    performUnsubscribe
  });

  if (!steps?.length || !currentStep) return null;

  return (
    <InnerPopupWrapper
      steps={steps.length}
      popupTitle={t('unsubscribe-popup.title', 'Manage your plan')}
      isError={Boolean(isError)}
      currentStep={steps.indexOf(currentStep) + 1}
    >
      {currentStep === STEPS.DOWNGRADES && (
        <Downgrades
          downgrades={availableDowngrades}
          handleClick={
            skipCancellationSurveyStep ? performUnsubscribe : goToNextStep
          }
        />
      )}
      {currentStep === STEPS.SURVEY && (
        <Survey
          customCancellationReasons={customCancellationReasons}
          checkedReason={checkedReason}
          shouldShowDowngrades={
            !!availableDowngrades.length && !skipAvailableDowngradesStep
          }
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
