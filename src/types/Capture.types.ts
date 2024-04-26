// * the disable below is because template literals in types are supported from prettier@2.2.0 and we don't have it yet
// eslint-disable-next-line
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

type AddressCaptureSetting = CaptureSettingBase & {
  key: 'address';
  answer: {
    address: string;
    address2: string;
    city: string;
    country: 'string';
    postCode: 'string';
    state: 'string';
  } | null;
};

export type CustomCaptureSetting = CaptureSettingBase & {
  key: CustomCaptureSettingKey;
  answer: string | null;
  question: string;
  value: string;
};

export type CaptureSetting =
  | NameCaptureSetting
  | BasicCaptureSetting
  | AddressCaptureSetting
  | CustomCaptureSetting;

export type CaptureProps = {
  onSuccess: () => void;
  settings: CaptureSetting[];
};
