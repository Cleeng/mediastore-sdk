/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const POPUP_TYPES = {
  editPassword: 'editPassword',
  paymentDetails: 'paymentDetails',
  updateSubscription: 'updateSubscription',
  switchPlan: 'switchPlan',
  cancelSwitch: 'cancelSwitch',
  cancelPause: 'cancelPause',
  resumeSubscription: 'resumeSubscription',
};

export const SHOW_INNER_POPUP = 'SHOW_INNER_POPUP';
export const showInnerPopup = createAction(SHOW_INNER_POPUP);

export const HIDE_INNER_POPUP = 'HIDE_INNER_POPUP';
export const hideInnerPopup = createAction(HIDE_INNER_POPUP);

const initialState = {
  isOpen: false,
  type: '',
  data: {},
};

const popupReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showInnerPopup, (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.data = action.payload.data;
    })
    .addCase(hideInnerPopup, (state) => {
      state.isOpen = false;
      state.type = '';
      state.data = {};
    });
});

export default popupReducer;
