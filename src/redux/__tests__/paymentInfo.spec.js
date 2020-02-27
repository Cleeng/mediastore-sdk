import { SET_PAYMENT_METHOD } from 'redux/paymentInfo';
import paymentInfoReducer from '../paymentInfo';

const paymentDetailsMock = [
  {
    id: 680860225,
    customerId: 338816933,
    token: '8315815183716450',
    paymentGateway: 'adyen',
    paymentMethod: 'card',
    paymentMethodSpecificParams: {
      variant: 'mc',
      lastCardFourDigits: '1111',
      holderName: 'Sample card',
      cardExpirationDate: '10/2020',
      socialSecurityNumber: ''
    },
    paymentMethodId: null
  }
];

describe('PaymentInfo reducer', () => {
  it('should correctly call paymentMethod action', () => {
    const action = { type: SET_PAYMENT_METHOD, payload: paymentDetailsMock };
    const expectedState = { paymentMethod: paymentDetailsMock };

    expect(paymentInfoReducer(undefined, action)).toMatchObject(expectedState);
  });
});
