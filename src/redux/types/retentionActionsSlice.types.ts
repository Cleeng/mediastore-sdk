type ExtensionDetails = {
  // some period type?
  periodUnit: string;
  amount: number;
};

export type RetentionActions = {
  extensionDetails: ExtensionDetails;
  type: '' | 'FREE_EXTENSION' | 'DOWNGRADE';
};

export type RetentionActionsInitialState = {
  error: string | null | undefined;
  isLoading: boolean;
  retentionActions: RetentionActions;
};
