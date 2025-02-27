import { CancellationReason } from 'containers/PlanDetails/PlanDetails.types';

export type UpdateSubscriptionProps = {
  customCancellationReasons?: CancellationReason[];
  skipAvailableDowngradesStep?: boolean;
  skipAvailableFreeExtensionStep?: boolean;
  skipCancellationSurveyStep?: boolean;
};
