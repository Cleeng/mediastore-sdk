export type Address = {
  address: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  postCode: string | null;
};

export type AddressDetailsProps = {
  data: {
    answer: Address;
    enabled: boolean;
    key: string;
    required: boolean;
  };
  isLoading?: boolean;
  updateCaptureOption: (params: { key: string; value: Address }) => void;
};
