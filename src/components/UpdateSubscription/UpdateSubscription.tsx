import { useAppSelector } from 'appRedux/store';
import Unsubscribe from './Unsubscribe';
import Resubscribe from './Resubscribe';

import { UpdateSubscriptionProps } from './UpdateSubscription.types';

const UpdateSubscription = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  skipAvailableFreeExtensionStep,
  skipCancellationSurveyStep
}: UpdateSubscriptionProps) => {
  const { updateSubscription } = useAppSelector((state) => state.popupManager);

  if (updateSubscription?.action === 'unsubscribe') {
    return (
      <Unsubscribe
        customCancellationReasons={customCancellationReasons}
        skipAvailableDowngradesStep={skipAvailableDowngradesStep}
        skipAvailableFreeExtensionStep={skipAvailableFreeExtensionStep}
        skipCancellationSurveyStep={skipCancellationSurveyStep}
      />
    );
  }
  if (updateSubscription?.action === 'resubscribe') {
    return <Resubscribe />;
  }
  return <></>;
};

export { UpdateSubscription as PureUpdateSubscription };

export default UpdateSubscription;
