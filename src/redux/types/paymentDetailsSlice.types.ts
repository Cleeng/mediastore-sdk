import { PaymentDetail } from 'api/Customer/types';
import { Error } from './common';

export type PaymentDetailsInitialState = {
  paymentDetails: PaymentDetail[];
  activeOrBoundPaymentDetails: PaymentDetail[];
  loading: boolean;
  error: Error;
};
