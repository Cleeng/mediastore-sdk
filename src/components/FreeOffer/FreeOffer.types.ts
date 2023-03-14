import { OfferProps } from 'components/Offer/Offer.types';

export type FreeOfferProps = {
  onPaymentComplete: OfferProps['onCouponSubmit'];
};
