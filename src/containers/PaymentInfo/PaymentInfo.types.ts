import { useTranslation } from 'react-i18next';
import { AdyenConfiguration } from 'redux/publisherConfigSlice';

export type PaymentInfoProps = {
  adyenConfiguration?: null | AdyenConfiguration;
  displayGracePeriodError: boolean;
  t: ReturnType<typeof useTranslation>['t'];
};
