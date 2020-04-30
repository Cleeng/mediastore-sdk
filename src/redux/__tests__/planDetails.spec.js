import {
  SET_CURRENT_PLAN,
  SHOW_SURVEY,
  HIDE_SURVEY,
  UPDATE_LIST,
  SET_UPDATE_ACTION
} from 'redux/planDetails';
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
  it('should correctly call showSurvey action', () => {
    const action = { type: SHOW_SURVEY, payload: planDetailsMock[0] };
    const expectedState = {
      isSurveyShown: true,
      offerToUpdate: planDetailsMock[0]
    };

    expect(planDetailsReducer(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call hideSurvey action', () => {
    const action = { type: HIDE_SURVEY };
    const expectedState = {
      isSurveyShown: false,
      offerToUpdate: { offerId: '', expiresAt: null, price: null }
    };

    expect(planDetailsReducer(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call updateList action', () => {
    const action = { type: UPDATE_LIST };
    const expectedState = {
      updateList: true
    };

    expect(planDetailsReducer(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call setUpdateAction action', () => {
    const action = { type: SET_UPDATE_ACTION, payload: 'unsubscribe' };
    const expectedState = {
      updateAction: 'unsubscribe'
    };

    expect(planDetailsReducer(undefined, action)).toMatchObject(expectedState);
  });
});
