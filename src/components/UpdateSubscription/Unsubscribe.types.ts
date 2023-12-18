import { RetentionActions } from 'redux/types';

type CancellationReason = {
  value: string;
  key: string;
};

export type Props = {
  customCancellationReasons?: CancellationReason[];
  skipAvailableDowngradesStep?: boolean;
  retentionActions: RetentionActions;
};
