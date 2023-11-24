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
  error: string | null | undefined;
  gift: Gift | Record<string, never>;
  isUpdateLoading: boolean;
  isRedeemLoading: boolean;
  isVerifyLoading: boolean;
  loading: boolean;
  verifiedGift: VerifiedGift | Record<string, never>;
};
