import { useTranslation } from 'react-i18next';

export type OfferProps = {
  onCouponSubmit: (...args: unknown[]) => void;
  onPaymentComplete: () => void;
  t: ReturnType<typeof useTranslation>['t'];
};
