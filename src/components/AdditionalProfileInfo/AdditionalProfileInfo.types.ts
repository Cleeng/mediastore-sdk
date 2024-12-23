import { CustomCaptureSetting } from 'types/Capture.types';

export type CustomSetting = {
  answer?: string;
  key: string;
  question: string;
  value: string;
  values: string[];
};

export type AdditionalProfileInfoProps = {
  data: CustomCaptureSetting[] | null;
  isLoading: boolean;
  updateCaptureOption: (option: { key: string; value: string }) => void;
};
