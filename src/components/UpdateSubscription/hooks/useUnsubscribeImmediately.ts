import { useEffect } from 'react';

type UseUnsubscribeImmediatelyArguments = {
  skipCancellationSurveyStep?: boolean;
  performUnsubscribe: () => void;
};

const useUnsubscribeImmediately = ({
  performUnsubscribe,
  skipCancellationSurveyStep
}: UseUnsubscribeImmediatelyArguments) => {
  useEffect(() => {
    const unsubscribeImmediatelyIfNeeded = async () => {
      if (skipCancellationSurveyStep) {
        performUnsubscribe();
      }
    };

    unsubscribeImmediatelyIfNeeded();
  }, []);
};

export default useUnsubscribeImmediately;
