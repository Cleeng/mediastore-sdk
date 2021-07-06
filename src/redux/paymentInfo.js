/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
export const setPaymentMethod = createAction(SET_PAYMENT_METHOD);

export const SET_TRANSACTIONS_LIST = 'SET_TRANSACTIONS_LIST';
export const setTransactionsList = createAction(SET_TRANSACTIONS_LIST);

export const SET_TRANSACTIONS_TO_SHOW = 'SET_TRANSACTIONS_TO_SHOW';
export const setTransactionsToShow = createAction(SET_TRANSACTIONS_TO_SHOW);

export const SET_TRANSACTIONS_LIST_AS_FETCHED =
  'SET_TRANSACTIONS_LIST_AS_FETCHED';
export const setTransactionsListAsFetched = createAction(
  SET_TRANSACTIONS_LIST_AS_FETCHED
);

export const HIDE_SHOW_MORE_BUTTON = 'HIDE_SHOW_MORE_BUTTON';
export const hideShowMoreButton = createAction(HIDE_SHOW_MORE_BUTTON);

export const SET_PAYMENTS_SETTINGS = 'SET_PAYMENTS_SETTINGS';
export const setPaymentsSettings = createAction(SET_PAYMENTS_SETTINGS);

const initialState = {
  paymentMethod: [],
  transactionsList: [],
  transactionsToShow: [],
  isTransactionListFetched: false,
  isShowMoreButtonHidden: false,
  activePaymentMethod: null,
  paymentsSettings: null
};

const paymentMethodReducer = createReducer(initialState, {
  SET_PAYMENT_METHOD: (state, action) => {
    state.paymentMethod = action.payload;
    state.activePaymentMethod = action.payload.length
      ? action.payload.filter(item => item.active).slice(-1)[0]
      : null;
  },
  SET_TRANSACTIONS_LIST: (state, action) => {
    state.transactionsList = action.payload;
  },
  SET_TRANSACTIONS_TO_SHOW: (state, action) => {
    if (!action.payload) {
      state.transactionsToShow = [...state.transactionsList];
    } else {
      state.transactionsToShow = state.transactionsList.slice(
        0,
        action.payload
      );
    }
  },
  SET_TRANSACTIONS_LIST_AS_FETCHED: state => {
    state.isTransactionListFetched = true;
  },
  HIDE_SHOW_MORE_BUTTON: state => {
    state.isShowMoreButtonHidden = true;
  },
  SET_PAYMENTS_SETTINGS: (state, action) => {
    state.paymentsSettings = action.payload;
  }
});

export default paymentMethodReducer;
