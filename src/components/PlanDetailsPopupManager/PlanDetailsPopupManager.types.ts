export type CancellationReason = {
  key: string;
  value: string;
};

export type PlanDetailsPopupManagerProps = {
  customCancellationReasons?: CancellationReason[];
  skipAvailableDowngradesStep?: boolean;
  onCancel?: () => void;
  onSwitchSuccess?: () => void;
  onSwitchError?: () => void;
};
