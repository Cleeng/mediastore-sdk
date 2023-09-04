import { AdyenConfiguration } from 'redux/types/publisherConfigSlice.types';

export type OfferContainerProps = {
  adyenConfiguration?: AdyenConfiguration;
  couponCode?: string;
  offerId: string;
  onSuccess: (...args: unknown[]) => void;
  onRedeemClick: () => void;
};
