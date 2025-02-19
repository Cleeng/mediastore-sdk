import { AdyenConfiguration } from 'appRedux/types/publisherConfigSlice.types';

export type PaymentInfoProps = {
  adyenConfiguration?: null | AdyenConfiguration;
  displayGracePeriodError: boolean;
};
