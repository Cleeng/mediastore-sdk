import { PaymentGateway } from 'redux/types';

type GeneralCustomerOffer = {
  offerId: string;
  status: string;
  startedAt: number;
  expiresAt: number;
  offerType: string;
  totalPrice: number;
  offerTitle: string;
};

export type CustomerOffer =
  | (GeneralCustomerOffer & {
      externalPaymentId: string;
      inTrial: boolean;
      nextPaymentAt: number;
      nextPaymentCurrency: string;
      nextPaymentPrice: number;
      paymentGateway: PaymentGateway;
      paymentMethod: string;
      pendingSwitchId: unknown;
      period: string;
      subscriptionId?: number;
    })
  | (GeneralCustomerOffer & { customerCurrency: string });
