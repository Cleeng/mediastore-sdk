import { useTranslation } from 'react-i18next';

export type PaymentProps = {
  onPaymentComplete: () => void;
  t: ReturnType<typeof useTranslation>['t'];
};
