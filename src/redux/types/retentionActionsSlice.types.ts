type ExtensionDetails = {
  periodUnit: 'day' | 'week' | 'month' | '';
  amount: number;
};

export type RetentionActions = {
  extensionDetails: ExtensionDetails;
  type: '' | 'FREE_EXTENSION' | 'DOWNGRADE';
  offerId: string;
};

export type RetentionActionsInitialState = {
  error: string | null | undefined;
  isLoading: boolean;
  isApplyLoading: boolean;
  retentionActions: RetentionActions;
};
