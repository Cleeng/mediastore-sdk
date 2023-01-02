/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const SET_PAYMENT_DETAILS = 'SET_PAYMENT_DETAILS';
export const setPaymentDetails = createAction(SET_PAYMENT_DETAILS);

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

const initialState = {
  paymentDetails: [],
  transactionsList: [],
  transactionsToShow: [],
  isTransactionListFetched: false,
  isShowMoreButtonHidden: false,
  activeOrBoundPaymentDetails: []
};

const paymentMethodReducer = createReducer(initialState, {
  SET_PAYMENT_DETAILS: (state, action) => {
    state.paymentDetails = action.payload;
    state.activeOrBoundPaymentDetails = action.payload.filter(
      item => item.active || item.bound
    );
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
  }
});

export default paymentMethodReducer;
