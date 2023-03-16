import { AdyenConfiguration } from 'redux/publisherConfigSlice';

export type OfferContainerProps = {
  offerId: string;
  adyenConfiguration?: AdyenConfiguration;
  onSuccess: (...args: unknown[]) => void;
};
