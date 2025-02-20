import { useEffect } from 'react';

type UseUnsubscribeImmediatelyArguments = {
  skipCancellationSurveyStep?: boolean;
  performUnsubscribe: () => Promise<void>;
};

const useUnsubscribeImmediately = ({
  performUnsubscribe,
  skipCancellationSurveyStep
}: UseUnsubscribeImmediatelyArguments) => {
  useEffect(() => {
    const unsubscribeImmediatelyIfNeeded = async () => {
      if (skipCancellationSurveyStep) {
        await performUnsubscribe();
      }
    };

    unsubscribeImmediatelyIfNeeded();
  }, []);
};

export default useUnsubscribeImmediately;
