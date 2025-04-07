import { useEffect } from 'react';

type UseUnsubscribeImmediatelyArguments = {
  skipCancellationSurveyStep?: boolean;
  availableDowngrades?: Array<object>;
  skipAvailableDowngradesStep?: boolean;
  performUnsubscribe: () => Promise<void>;
};

const useUnsubscribeImmediately = ({
  performUnsubscribe,
  availableDowngrades,
  skipAvailableDowngradesStep,
  skipCancellationSurveyStep
}: UseUnsubscribeImmediatelyArguments) => {
  useEffect(() => {
    const unsubscribeImmediatelyIfNeeded = async () => {
      if (
        (skipCancellationSurveyStep && skipAvailableDowngradesStep) ||
        (skipCancellationSurveyStep && !availableDowngrades?.length)
      ) {
        await performUnsubscribe();
      }
    };

    unsubscribeImmediatelyIfNeeded();
  }, []);
};

export default useUnsubscribeImmediately;
