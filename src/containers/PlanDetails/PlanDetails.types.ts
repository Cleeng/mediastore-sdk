import { PaymentGateway } from 'redux/types';

export type CancellationReason = {
  key: string;
  value: string;
};

export type PlanDetailsProps = {
  customCancellationReasons: CancellationReason[];
  skipAvailableDowngradesStep: boolean;
  skipAvailableFreeExtensionStep: boolean;
  displayGracePeriodError: boolean;
};

export type CustomersOffer = {
  expiresAt: number;
  externalPaymentId: string;
  inTrial: boolean;
  nextPaymentAt: number;
  nextPaymentCurrency: string;
  nextPaymentPrice: number;
  offerId: string;
  offerTitle: string;
  offerType: string;
  paymentGateway: PaymentGateway;
  paymentMethod: string;
  pendingSwitchId: string;
  period: string;
  startedAt: number;
  status: string;
  subscriptionId?: number;
  totalPrice: number;
  customerCurrency: string;
};
