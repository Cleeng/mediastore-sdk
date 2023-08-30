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
  gift: Gift | Record<string, never>;
  verifiedGift: unknown;
  loading: boolean;
  error: string | null | undefined;
};
