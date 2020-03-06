import { SET_PAYMENT_METHOD } from 'redux/paymentInfo';
import { SHOW_LOADER, HIDE_LOADER } from 'redux/loader';
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

const loaderMock = {
  isLoading: true
};

describe('<PaymentInfo/>', () => {
  it('should show previously added value', () => {
    const initialState = {
      paymentInfo: planDetailsMock,
      loader: loaderMock
    };
    expect(mapStateToProps(initialState).paymentInfo).toEqual(planDetailsMock);
    expect(mapStateToProps(initialState).isLoading).toEqual(
      loaderMock.isLoading
    );
  });
  it('should dispatch SET_PAYMENT_METHOD action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).setPaymentMethod();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_PAYMENT_METHOD });
  });
  it('should dispatch SHOW_LOADER action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).showLoader();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: SHOW_LOADER });
  });
  it('should dispatch HIDE_LOADER action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).hideLoader();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: HIDE_LOADER });
  });
});
