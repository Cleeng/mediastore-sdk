import { useTranslation } from 'react-i18next';

export type OfferProps = {
  onSubmit: (str: string) => void;
  onPaymentComplete: () => void;
  t: ReturnType<typeof useTranslation>['t'];
};
