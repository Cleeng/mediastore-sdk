import { SET_PAYMENT_DETAILS } from 'redux/planDetails';
import { mapStateToProps, mapDispatchToProps } from './PlanDetails.container';

const planDetailsMock = {
  id: 193925086,
  customerId: 280372348,
  token: '8315816736477319',
  paymentGateway: 'adyen',
  paymentMethod: 'card',
  paymentMethodSpecificParams: {
    variant: 'mc',
    lastCardFourDigits: '1111',
    holderName: 'dsadsadsa',
    cardExpirationDate: '10/2020',
    socialSecurityNumber: ''
  },
  paymentMethodId: null
};

describe('<PlanDetails/>', () => {
  describe('@renders', () => {
    it('should show previously added value', () => {
      const initialState = {
        planDetails: planDetailsMock
      };
      expect(mapStateToProps(initialState).planDetails).toEqual(
        planDetailsMock
      );
    });
    it('should dispatch SET_PAYMENT_DETAILS action', () => {
      expect(true).toBe(true);
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).setPaymentDetails();
      expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_PAYMENT_DETAILS });
    });
  });
});
