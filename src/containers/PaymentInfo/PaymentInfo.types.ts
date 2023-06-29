import { AdyenConfiguration } from 'redux/types/publisherConfigSlice.types';

export type PaymentInfoProps = {
  adyenConfiguration?: null | AdyenConfiguration;
  displayGracePeriodError: boolean;
};
