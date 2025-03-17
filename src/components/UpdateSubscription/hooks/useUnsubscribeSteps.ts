import { useState, useMemo } from 'react';
import { INITIAL_STEPS_ARRAY, STEPS } from '../constants';

type UseUnsubscribeStepsArguments = {
  availableDowngrades?: Array<object>;
  skipCancellationSurveyStep?: boolean;
  skipAvailableDowngradesStep?: boolean;
};

const initializeUnsubscribeSteps = ({
  availableDowngrades,
  skipAvailableDowngradesStep,
  skipCancellationSurveyStep
}: UseUnsubscribeStepsArguments) => {
  const copiedStepsArray = INITIAL_STEPS_ARRAY.slice();

  if (skipCancellationSurveyStep) {
    copiedStepsArray.shift();
  }

  if (
    availableDowngrades?.length &&
    !skipAvailableDowngradesStep &&
    !copiedStepsArray.includes(STEPS.DOWNGRADES)
  ) {
    copiedStepsArray.unshift(STEPS.DOWNGRADES);
  }

  return copiedStepsArray;
};

const useUnsubscribeSteps = ({
  skipAvailableDowngradesStep,
  skipCancellationSurveyStep
}: UseUnsubscribeStepsArguments) => {
  const steps = useMemo(
    () =>
      initializeUnsubscribeSteps({
        skipAvailableDowngradesStep,
        skipCancellationSurveyStep
      }),
    [skipAvailableDowngradesStep, skipCancellationSurveyStep]
  );

  const [currentStep, setCurrentStep] = useState<STEPS>(steps[0]);

  const goToNextStep = () =>
    setCurrentStep(steps[steps.indexOf(currentStep) + 1]);

  const showConfirmationStep = () => setCurrentStep(STEPS.CONFIRMATION);

  return {
    currentStep,
    goToNextStep,
    setCurrentStep,
    showConfirmationStep,
    steps
  };
};

export default useUnsubscribeSteps;
