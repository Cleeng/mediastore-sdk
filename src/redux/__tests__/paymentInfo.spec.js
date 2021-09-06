import {
  SET_PAYMENT_DETAILS,
  SET_TRANSACTIONS_LIST,
  SET_TRANSACTIONS_TO_SHOW,
  SET_TRANSACTIONS_LIST_AS_FETCHED,
  HIDE_SHOW_MORE_BUTTON
} from 'redux/paymentInfo';
import paymentInfoReducer from '../paymentInfo';

const paypalPaymentMethod = {
  id: 457654757,
  customerId: 338816933,
  paymentGateway: 'paypal',
  paymentMethod: 'paypal',
  paymentMethodSpecificParams: {
    holderName: 'User'
  },
  active: true,
  bound: false
};

const iosPaymentMethod = {
  id: 457654757,
  customerId: 338816933,
  paymentGateway: 'paypal',
  paymentMethod: 'paypal',
  paymentMethodSpecificParams: {
    holderName: 'User'
  },
  active: true,
  bound: false
};

const paymentDetailsMock = [
  {
    id: 680860225,
    customerId: 338816933,
    paymentGateway: 'adyen',
    paymentMethod: 'card',
    paymentMethodSpecificParams: {
      variant: 'mc',
      lastCardFourDigits: '1111',
      holderName: 'Sample card',
      cardExpirationDate: '10/2020',
      socialSecurityNumber: ''
    },
    active: false,
    bound: false
  },
  {
    ...iosPaymentMethod
  },
  {
    ...paypalPaymentMethod
  }
];

const transactionListPayload = [
  {
    transactionId: 'T650862998',
    transactionDate: 1584361260,
    offerId: 'S568296139_ZW',
    offerType: 'subscription',
    offerTitle: 'Annual subscription (recurring) to pride&amp;prejudice'
  }
];

describe('PaymentInfo reducer', () => {
  it('should correctly call setPaymentDetails action and select active and bound payment details', () => {
    const action = { type: SET_PAYMENT_DETAILS, payload: paymentDetailsMock };
    const expectedState = {
      paymentDetails: paymentDetailsMock,
      activeOrBoundPaymentDetails: [paypalPaymentMethod, iosPaymentMethod]
    };

    expect(paymentInfoReducer(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call setTransactionList action', () => {
    const action = {
      type: SET_TRANSACTIONS_LIST,
      payload: transactionListPayload
    };
    const expectedState = { transactionsList: transactionListPayload };

    expect(paymentInfoReducer(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call setTransactionsToShow action without payload', () => {
    const action = {
      type: SET_TRANSACTIONS_TO_SHOW
    };
    const expectedState = { transactionsToShow: [] };

    expect(paymentInfoReducer(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call setTransactionsToShow action with payload', () => {
    const action = {
      type: SET_TRANSACTIONS_TO_SHOW,
      payload: 1
    };
    const expectedStateToShow = { transactionsToShow: [] };

    expect(paymentInfoReducer(undefined, action)).toMatchObject(
      expectedStateToShow
    );
  });
  it('should correctly call setTransactionsListAsFetched action', () => {
    const action = {
      type: SET_TRANSACTIONS_LIST_AS_FETCHED
    };
    const expectedState = { isTransactionListFetched: true };

    expect(paymentInfoReducer(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call hideShowMoreButton action', () => {
    const action = {
      type: HIDE_SHOW_MORE_BUTTON
    };
    const expectedState = { isShowMoreButtonHidden: true };

    expect(paymentInfoReducer(undefined, action)).toMatchObject(expectedState);
  });
});
