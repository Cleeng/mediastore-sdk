import { AdyenConfiguration } from 'redux/publisherConfigSlice';

export type PaymentInfoProps = {
  adyenConfiguration?: null | AdyenConfiguration;
  displayGracePeriodError: boolean;
};
