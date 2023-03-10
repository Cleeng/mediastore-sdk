import { useTranslation } from 'react-i18next';

export type OfferProps = {
  onCouponSubmit: (str: string) => void;
  onPaymentComplete: () => void;
  t: ReturnType<typeof useTranslation>['t'];
};
