import {
  SET_CURRENT_PLAN,
  UPDATE_LIST,
  SET_OFFER_TO_SWITCH,
  SET_SWITCH_SETTINGS
} from 'redux/planDetails';
import { SHOW_INNER_POPUP, HIDE_INNER_POPUP } from 'redux/innerPopupReducer';
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
  it('should dispatch SHOW_INNER_POPUP action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).showInnerPopup();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: SHOW_INNER_POPUP });
  });
  it('should dispatch HIDE_INNER_POPUP action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).hideInnerPopup();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: HIDE_INNER_POPUP });
  });
  it('should dispatch UPDATE_LIST action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).updateList();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: UPDATE_LIST });
  });
  it('should dispatch SET_OFFER_TO_SWITCH action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).setOfferToSwitch();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_OFFER_TO_SWITCH });
  });
  it('should dispatch SET_SWITCH_SETTINGS action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).setSwitchSettings();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_SWITCH_SETTINGS });
  });
});
