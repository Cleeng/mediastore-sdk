import {
  PaymentGateway,
  PaymentMethodName
} from './publisherConfigSlice.types';

export type SelectedPaymentMethod = {
  id: number;
  methodName: PaymentMethodName;
  paymentGateway: PaymentGateway;
};

export type PaymentMethodsInitialState = {
  selectedPaymentMethod: SelectedPaymentMethod | null;
};
