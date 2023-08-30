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

export type VerifiedGift = {
  redeemable: boolean;
  redeemMode: string;
  redeemRefusalReason: string | null;
  extendedSubscriptionId: number;
  offerId: string;
};

export type GiftInitialState = {
  gift: Gift | Record<string, never>;
  verifiedGift: VerifiedGift | Record<string, never>;
  loading: boolean;
  error: string | null | undefined;
};
