import { useTranslation } from 'react-i18next';

export type OfferCheckoutCardProps = {
  isDataLoaded: boolean;
  t: ReturnType<typeof useTranslation>['t'];
};
