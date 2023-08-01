import { PaymentGateway } from 'redux/types';

export type CustomerOffer = {
  offerId: string;
  status: string;
  startedAt: number;
  expiresAt: number;
  offerType: string;
  totalPrice: number;
  offerTitle: string;
  customerCurrency: string;
  // optional params exists only for subscriptions
  externalPaymentId?: string;
  inTrial?: boolean;
  nextPaymentAt?: number;
  nextPaymentCurrency?: string;
  nextPaymentPrice?: number;
  paymentGateway?: PaymentGateway;
  paymentMethod?: string;
  pendingSwitchId?: string;
  period?: string;
  subscriptionId?: number;
  isExternallyManaged?: boolean;
};
