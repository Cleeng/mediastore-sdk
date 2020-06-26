import {
  SET_CURRENT_PLAN,
  SHOW_SURVEY,
  HIDE_SURVEY,
  UPDATE_LIST,
  SET_UPDATE_ACTION
} from 'redux/planDetails';
import { mapStateToProps, mapDispatchToProps } from './PlanDetails.container';

const currentPlanMock = [
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

describe('<PaymentInfo/>', () => {
  it('should show previously added value', () => {
    const initialState = {
      planDetails: currentPlanMock
    };
    expect(mapStateToProps(initialState).planDetails).toEqual(currentPlanMock);
  });
  it('should dispatch SET_CURRENT_PLAN action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).setCurrentPlan();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_CURRENT_PLAN });
  });
  it('should dispatch SHOW_SURVEY action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).showSurvey();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: SHOW_SURVEY });
  });
  it('should dispatch HIDE_SURVEY action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).hideSurvey();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: HIDE_SURVEY });
  });
  it('should dispatch UPDATE_LIST action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).updateList();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: UPDATE_LIST });
  });
  it('should dispatch SET_UPDATE_ACTION action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).setUpdateAction();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_UPDATE_ACTION });
  });
});
