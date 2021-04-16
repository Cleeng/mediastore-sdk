import { SET_CURRENT_PLAN, UPDATE_LIST } from 'redux/planDetails';

import planDetailsReducer from '../planDetails';

const planDetailsMock = [
  {
    offerId: 'S937144802_UA',
    status: 'active',
    expiresAt: 1582706082,
    nextPaymentPrice: 14.4,
    nextPaymentCurrency: 'EUR',
    paymentGateway: 'adyen',
    paymentMethod: 'mc',
    offerTitle: 'Monthly subscription with 7 days trial',
    period: 'month'
  },
  {
    offerId: 'S249781156_UA',
    status: 'active',
    expiresAt: 1597917717,
    nextPaymentPrice: 45.04,
    nextPaymentCurrency: 'EUR',
    paymentGateway: 'adyen',
    paymentMethod: 'mc',
    offerTitle: '6-Month without trial',
    period: '6months'
  }
];

describe('PlanDetails reducer', () => {
  it('should correctly call setCurrentPlan action', () => {
    const action = { type: SET_CURRENT_PLAN, payload: planDetailsMock };
    const expectedState = { currentPlan: planDetailsMock };

    expect(planDetailsReducer(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call updateList action', () => {
    const action = { type: UPDATE_LIST };
    const expectedState = {
      updateList: true
    };

    expect(planDetailsReducer(undefined, action)).toMatchObject(expectedState);
  });
});
