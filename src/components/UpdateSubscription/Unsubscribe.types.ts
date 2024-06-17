import { RetentionActions } from 'appRedux/types';

type CancellationReason = {
  value: string;
  key: string;
};

export type Props = {
  customCancellationReasons?: CancellationReason[];
  skipAvailableDowngradesStep?: boolean;
  skipAvailableFreeExtensionStep?: boolean;
  retentionActions: RetentionActions;
};
