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
import { selectSwitchSettings } from 'appRedux/planDetailsSlice';
import { Props } from './Unsubscribe.types';
import { STEPS } from './constants';
import useUnsubscribe from './hooks/useUnsubscribe';
import useUnsubscribeSteps from './hooks/useUnsubscribeSteps';
import useUnsubscribeImmediately from './hooks/useUnsubscribeImmediately';

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
  const offerId = updateSubscription?.offerData?.offerId || '';
  const { data: allSwitchSettings } = useAppSelector(selectSwitchSettings);
  const availableDowngrades =
    allSwitchSettings[offerId]?.available?.filter(
      ({ switchDirection }) => switchDirection === 'downgrade'
    ) || [];

  const performUnsubscribe = async () => {
    await handleUnsubscribe(showConfirmationStep);
  };

  const {
    currentStep,
    setCurrentStep,
    steps,
    goToNextStep,
    showConfirmationStep
  } = useUnsubscribeSteps({
    availableDowngrades,
    skipAvailableDowngradesStep,
    skipCancellationSurveyStep
  });

  useUnsubscribeImmediately({
    skipCancellationSurveyStep,
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
          handleClick={goToNextStep}
        />
      )}
      {currentStep === STEPS.SURVEY && (
        <Survey
          customCancellationReasons={customCancellationReasons}
          checkedReason={checkedReason}
          shouldShowDowngrades={steps.length === 3}
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
