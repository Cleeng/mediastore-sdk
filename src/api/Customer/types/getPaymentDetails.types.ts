import { PaymentGateway } from 'redux/types';

type GeneralPaymentDetail = {
  id: number;
  customerId: number;
  paymentGateway: PaymentGateway;
  paymentMethodId: number;
  active: boolean;
  bound: boolean;
};

type PaymentDetailCardGooglePay = GeneralPaymentDetail & {
  paymentMethod:
    | 'card'
    | 'googlepay'
    | 'paypal'
    | 'apple'
    | 'roku'
    | 'applepay'
    | 'amazon'
    | 'android';
  paymentMethodSpecificParams: {
    holderName: string;
    cardExpirationDate: string;
    lastCardFourDigits: string;
    merchantAccount: string;
    socialSecurityNumber: string;
    variant: 'visa' | 'visacredit' | 'amex' | 'mc' | 'discover' | 'diners';
  };
};

type PaymentDetailPayPal = GeneralPaymentDetail & {
  paymentMethod: 'paypal';
  paymentMethodSpecificParams: {
    payerId: string;
    holderName: string;
  };
};

export type PaymentDetail = PaymentDetailCardGooglePay | PaymentDetailPayPal;
