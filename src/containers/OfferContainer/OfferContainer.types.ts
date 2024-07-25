import { AdyenConfiguration } from 'appRedux/types/publisherConfigSlice.types';

export type OfferContainerProps = {
  adyenConfiguration?: AdyenConfiguration;
  couponCode?: string | null | undefined;
  hideRedeemButton: boolean;
  isCheckout?: boolean;
  offerId: string;
  onSuccess: (...args: unknown[]) => void;
  onRedeemClick: () => void;
};
