import { SwitchSetting } from './planDetailsSlice.types';

type ExtensionDetails = {
  periodUnit: 'day' | 'week' | 'month' | '';
  amount: number;
};

type DowngradeDetails = {
  offers: SwitchSetting[];
};

export type RetentionActions = {
  downgradeDetails: DowngradeDetails;
  extensionDetails: ExtensionDetails;
  pauseDetails: object;
  offerId: string;
  type: '' | 'FREE_EXTENSION' | 'DOWNGRADE' | 'PAUSE';
};

export type RetentionActionsInitialState = {
  error: string | null | undefined;
  isLoading: boolean;
  isApplyLoading: boolean;
  retentionActions: RetentionActions;
};
