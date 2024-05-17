export type OfferProps = {
  hideRedeemButton: boolean;
  isCheckout?: boolean;
  onCouponSubmit: (couponCode: string) => void;
  onPaymentComplete: () => void;
  onRedeemClick: () => void;
};
