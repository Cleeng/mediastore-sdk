export type CustomSetting = {
  answer?: string;
  key: string;
  question: string;
  value: string;
  values: string[];
};

export type AdditionalProfileInfoProps = {
  data: CustomSetting[] | null;
  isLoading: boolean;
  updateCaptureOption: (option: { key: string; value: string }) => void;
};
