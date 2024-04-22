import { CustomersOffer } from 'containers/PlanDetails/PlanDetails.types';

const currentPlanMock = {
  subscriptionId: 280213389,
  offerId: 'S131174549_PL',
  status: 'active',
  startedAt: 1675332884,
  expiresAt: 1677752084,
  nextPaymentPrice: 90,
  nextPaymentCurrency: 'EUR',
  nextPaymentAt: 1677492884,
  paymentGateway: 'adyen',
  paymentMethod: 'card',
  externalPaymentId: 'D2RGHBT7PGNG5S82',
  inTrial: false,
  pendingSwitchId: '',
  offerType: 'S',
  offerTitle: 'Test',
  period: 'month',
  totalPrice: 90,
  customerCurrency: 'USD'
} as CustomersOffer;

export default currentPlanMock;
