import { useAppSelector } from 'appRedux/store';
import Unsubscribe from './Unsubscribe';
import Resubscribe from './Resubscribe';

import { UpdateSubscriptionProps } from './UpdateSubscription.types';

const UpdateSubscription = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  skipCancellationSurveyStep
}: UpdateSubscriptionProps) => {
  const { updateSubscription } = useAppSelector((state) => state.popupManager);

  switch (updateSubscription?.action) {
    case 'unsubscribe':
      return (
        <Unsubscribe
          customCancellationReasons={customCancellationReasons}
          skipAvailableDowngradesStep={skipAvailableDowngradesStep}
          skipCancellationSurveyStep={skipCancellationSurveyStep}
        />
      );
    case 'resubscribe':
      return <Resubscribe />;

    default:
      return null;
  }
};

export { UpdateSubscription as PureUpdateSubscription };

export default UpdateSubscription;
