import { SET_CURRENT_USER } from 'redux/userProfile';
import { SET_CURRENT_PLAN } from 'redux/planDetails';
import { mapDispatchToProps, mapStateToProps } from './MyAccount.container';

describe('<MyAccount/>', () => {
  describe('@container', () => {
    it('should show previously added value', () => {
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
        }
      ];

      const initialState = {
        planDetails: currentPlanMock,
        userProfile: {}
      };
      expect(mapStateToProps(initialState).planDetails).toEqual(
        currentPlanMock
      );
      expect(mapStateToProps(initialState).userProfile).toEqual({});
    });
    it('should dispatch SET_CURRENT_USER action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).setCurrentUser();
      expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_CURRENT_USER });
    });
    it('should dispatch SET_CURRENT_PLAN action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).setCurrentPlan();
      expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_CURRENT_PLAN });
    });
  });
});
