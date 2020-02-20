/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

const SET_PAYMENT_DETAILS = 'SET_PAYMENT_DETAILS';
export const setPaymentDetails = createAction(SET_PAYMENT_DETAILS);

const initialState = {
  paymentDetails: []
};

const paymentDetailsReducer = createReducer(initialState, {
  SET_PAYMENT_DETAILS: (state, action) => {
    state.paymentDetails = action.payload;
  }
});

export default paymentDetailsReducer;
