import { AddressCaptureSetting } from 'types/Capture.types';

export type Address = {
  address: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  postCode: string;
};

export type AddressDetailsProps = {
  data: AddressCaptureSetting;
  isLoading?: boolean;
  updateCaptureOption: (params: { key: string; value: Address }) => void;
};
