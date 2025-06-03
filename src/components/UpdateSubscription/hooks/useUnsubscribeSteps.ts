import { useState, useMemo } from 'react';
import { INITIAL_STEPS_ARRAY, STEPS } from '../constants';

type UseUnsubscribeStepsArguments = {
  skipCancellationSurveyStep?: boolean;
  shouldShowDowngrades: boolean;
  shouldShowPauseScreen: boolean;
  shouldShowFreeExtension: boolean;
};

const initializeUnsubscribeSteps = ({
  shouldShowDowngrades,
  shouldShowPauseScreen,
  shouldShowFreeExtension,
  skipCancellationSurveyStep
}: UseUnsubscribeStepsArguments) => {
  const copiedStepsArray = INITIAL_STEPS_ARRAY.slice();

  if (skipCancellationSurveyStep) {
    copiedStepsArray.shift();
  }

  if (shouldShowDowngrades && !copiedStepsArray.includes(STEPS.DOWNGRADES)) {
    copiedStepsArray.unshift(STEPS.DOWNGRADES);
  }
  if (shouldShowPauseScreen && !copiedStepsArray.includes(STEPS.PAUSE)) {
    copiedStepsArray.unshift(STEPS.PAUSE);
  }

  if (
    shouldShowFreeExtension &&
    !copiedStepsArray.includes(STEPS.FREE_EXTENSION)
  ) {
    copiedStepsArray.unshift(STEPS.FREE_EXTENSION);
  }

  return copiedStepsArray;
};

const useUnsubscribeSteps = ({
  shouldShowDowngrades,
  shouldShowFreeExtension,
  shouldShowPauseScreen,
  skipCancellationSurveyStep
}: UseUnsubscribeStepsArguments) => {
  const steps = useMemo(
    () =>
      initializeUnsubscribeSteps({
        shouldShowDowngrades,
        shouldShowPauseScreen,
        shouldShowFreeExtension,
        skipCancellationSurveyStep
      }),
    [
      shouldShowDowngrades,
      shouldShowPauseScreen,
      shouldShowFreeExtension,
      skipCancellationSurveyStep
    ]
  );

  const [currentStep, setCurrentStep] = useState<STEPS>(steps[0]);
  const [isFreeExtensionSecondStep, setIsFreeExtensionSecondStep] =
    useState(false);

  const goToNextStep = () =>
    setCurrentStep(steps[steps.indexOf(currentStep) + 1]);

  const showConfirmationStep = () => setCurrentStep(STEPS.CONFIRMATION);

  return {
    currentStep,
    isFreeExtensionSecondStep,
    goToNextStep,
    setCurrentStep,
    setIsFreeExtensionSecondStep,
    showConfirmationStep,
    steps
  };
};

export default useUnsubscribeSteps;
