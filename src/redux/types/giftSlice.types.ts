type DeliveryDetails = {
  personalNote: string;
  recipientEmail: string;
  deliveryDate: number;
};

export type Gift = {
  code: string;
  deliveryDetails: DeliveryDetails;
  id: number;
  offerId: string;
  redeemedAt: number;
  sentAt: number;
};

export type GiftInitialState = {
  error: string | null | undefined;
  gift: Gift | Record<string, never>;
  isUpdateLoading: boolean;
  loading: boolean;
};
