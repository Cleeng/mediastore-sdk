import { SET_PAYMENT_METHOD } from 'redux/paymentInfo';
import { mapStateToProps, mapDispatchToProps } from './PaymentInfo.container';

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

describe('<PaymentInfo/>', () => {
  describe('@renders', () => {
    it('should show previously added value', () => {
      const initialState = {
        paymentInfo: planDetailsMock
      };
      expect(mapStateToProps(initialState).paymentInfo).toEqual(
        planDetailsMock
      );
    });
    it('should dispatch SET_PAYMENT_DETAILS action', () => {
      expect(true).toBe(true);
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).setPaymentDetails();
      expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_PAYMENT_METHOD });
    });
  });
});
