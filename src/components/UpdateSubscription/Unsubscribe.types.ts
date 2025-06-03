type CancellationReason = {
  value: string;
  key: string;
};

export type Props = {
  customCancellationReasons?: CancellationReason[];
  skipAvailableDowngradesStep?: boolean;
  skipAvailableFreeExtensionStep?: boolean;
  skipCancellationSurveyStep?: boolean;
};
