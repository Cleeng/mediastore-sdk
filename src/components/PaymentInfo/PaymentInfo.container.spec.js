import {
  SET_PAYMENT_METHOD,
  SET_TRANSACTIONS_LIST,
  SET_TRANSACTIONS_TO_SHOW,
  SET_TRANSACTIONS_LIST_AS_FETCHED,
  HIDE_SHOW_MORE_BUTTON
} from 'redux/paymentInfo';
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
  it('should show previously added value', () => {
    const initialState = {
      paymentInfo: {
        paymentMethod: [planDetailsMock],
        transactionsList: [],
        transactionsToShow: [],
        isTransactionListFetched: false,
        isShowMoreButtonHidden: false
      }
    };
    expect(mapStateToProps(initialState).paymentInfo).toEqual({
      paymentMethod: [planDetailsMock],
      transactionsList: [],
      transactionsToShow: [],
      isTransactionListFetched: false,
      isShowMoreButtonHidden: false
    });
  });
  it('should dispatch SET_PAYMENT_METHOD action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).setPaymentMethod();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_PAYMENT_METHOD });
  });
  it('should dispatch SET_TRANSACTIONS_LIST action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).setTransactionsList();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_TRANSACTIONS_LIST });
  });
  it('should dispatch SET_TRANSACTIONS_TO_SHOW action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).setTransactionsToShow();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SET_TRANSACTIONS_TO_SHOW
    });
  });
  it('should dispatch SET_TRANSACTIONS_LIST_AS_FETCHED action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).setTransactionsListAsFetched();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SET_TRANSACTIONS_LIST_AS_FETCHED
    });
  });
  it('should dispatch HIDE_SHOW_MORE_BUTTON action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).hideShowMoreButton();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: HIDE_SHOW_MORE_BUTTON });
  });
});
