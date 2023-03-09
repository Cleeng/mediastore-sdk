import { useTranslation } from 'react-i18next';

export type PayPalProps = {
  onSubmit: () => void;
  isLoading: boolean;
  t?: ReturnType<typeof useTranslation>['t'];
  totalPrice?: number;
  offerId?: string;
};
