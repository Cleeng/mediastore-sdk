/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const SET_CURRENT_PLAN = 'SET_CURRENT_PLAN';
export const setCurrentPlan = createAction(SET_CURRENT_PLAN);

const initialState = {
  currentPlan: []
};

const paymentDetailsReducer = createReducer(initialState, {
  SET_CURRENT_PLAN: (state, action) => {
    state.currentPlan = action.payload;
  }
});

export default paymentDetailsReducer;
