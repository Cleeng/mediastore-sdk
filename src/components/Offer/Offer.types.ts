export type OfferProps = {
  isCheckout?: boolean;
  onCouponSubmit: (couponCode: string) => void;
  onPaymentComplete: () => void;
  onRedeemClick: () => void;
};
