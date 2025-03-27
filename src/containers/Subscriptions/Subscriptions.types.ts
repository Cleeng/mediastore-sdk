import { CancellationReason } from 'containers/PlanDetails/PlanDetails.types';

export type SubscriptionsProps = {
  customCancellationReasons?: CancellationReason[];
  skipAvailableDowngradesStep?: boolean;
  skipCancellationSurveyStep?: boolean;
};
