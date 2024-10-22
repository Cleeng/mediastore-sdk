import {
  PlanDetailsInitialState,
  SwitchSettings,
  SwitchDetail,
  SwitchDetails
} from 'appRedux/types/planDetailsSlice.types';
import { CustomersOffer } from '../containers/PlanDetails/PlanDetails.types';

const customerOfferMock: CustomersOffer = {
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
  pendingSwitchId: 'switch123',
  offerType: 'S',
  offerTitle: 'Test',
  period: 'month',
  totalPrice: 90,
  customerCurrency: 'USD'
};

// Mock SwitchSettings
const switchSettingsMock: SwitchSettings = {
  S131174549_PL: {
    available: [
      {
        toOfferId: 'S111111111_PL',
        algorithm: 'deferred',
        switchDirection: 'upgrade',
        title: 'Upgrade to Premium',
        price: 100,
        currency: 'USD',
        currencySymbol: '$',
        period: 'month',
        nextPaymentPrice: 100,
        nextPaymentPriceCurrency: 'USD',
        nextPaymentPriceCurrencySymbol: '$'
      }
    ],
    unavailable: [
      {
        toOfferId: 'S999999999_PL',
        algorithm: 'deferred',
        switchDirection: 'downgrade',
        title: 'Downgrade to Basic',
        price: 50,
        currency: 'USD',
        currencySymbol: '$',
        period: 'month',
        nextPaymentPrice: 50,
        nextPaymentPriceCurrency: 'USD',
        nextPaymentPriceCurrencySymbol: '$',
        reason: {
          code: '',
          message: 'You have exceeded the downgrade quota.'
        }
      }
    ]
  }
};

const switchDetailMock: SwitchDetail = {
  id: 'switch123',
  customerId: 456,
  direction: 'upgrade',
  algorithm: 'periodMatch',
  fromOfferId: 'S131174549_PL',
  toOfferId: 'S111111111_PL',
  subscriptionId: '280213389',
  status: 'pending',
  createdAt: 1675332884,
  updatedAt: 1675332884
};

const switchDetailsMock: SwitchDetails = {
  switch123: switchDetailMock
};

const planMock: PlanDetailsInitialState = {
  currentPlan: {
    data: [customerOfferMock],
    loading: false,
    error: null
  },
  offerToSwitch: customerOfferMock,
  updateList: false,
  switchSettings: {
    data: switchSettingsMock,
    loading: false,
    error: null
  },
  switchDetails: {
    data: switchDetailsMock,
    loading: false,
    error: null
  }
};

export default planMock;
