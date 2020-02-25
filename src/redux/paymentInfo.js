/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
export const setPaymentMethod = createAction(SET_PAYMENT_METHOD);

const initialState = {
  paymentMethod: []
};

const paymentMethodReducer = createReducer(initialState, {
  SET_PAYMENT_METHOD: (state, action) => {
    state.paymentMethod = action.payload;
  }
});

export default paymentMethodReducer;
