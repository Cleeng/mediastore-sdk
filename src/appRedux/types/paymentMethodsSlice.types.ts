import {
  PaymentGateway,
  PaymentMethodName
} from './publisherConfigSlice.types';

export type PaymentMethod = {
  id: number;
  logoUrl: string;
  methodName: PaymentMethodName;
  paymentGateway: PaymentGateway;
};

export type PaymentMethodsInitialState = {
  selectedPaymentMethod: PaymentMethod | null;
};
