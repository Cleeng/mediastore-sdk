import { Address } from 'components/AddressDetails/AddressDetails.types';

export type CustomCaptureSettingKey = `custom_${number}`;

type CaptureSettingBase = {
  enabled: boolean;
  required: boolean;
};

type BasicCaptureSetting = CaptureSettingBase & {
  key: 'email' | 'birthDate' | 'companyName' | 'phoneNumber';
  answer: string | null;
};

type NameCaptureSetting = CaptureSettingBase & {
  key: 'firstNameLastName';
  answer: {
    firstName: string;
    lastName: string;
  } | null;
};

export type AddressCaptureSetting = CaptureSettingBase & {
  key: 'address';
  answer: Address | null;
};

export type CustomCaptureSetting = CaptureSettingBase & {
  key: CustomCaptureSettingKey;
  answer: string | null;
  question: string;
  value: string;
  values: string[] | Array<Record<string, unknown>>;
};

export type CaptureSetting =
  | NameCaptureSetting
  | BasicCaptureSetting
  | AddressCaptureSetting
  | CustomCaptureSetting;

export type CaptureSettings = {
  address: AddressCaptureSetting;
  birthDate: BasicCaptureSetting;
  email: BasicCaptureSetting;
  phoneNumber: BasicCaptureSetting;
  companyName: BasicCaptureSetting;
};

export type CaptureProps = {
  onSuccess: () => void;
};

export type CaptureFormProps = {
  onSuccess: () => void;
  settings: CaptureSetting[];
};
