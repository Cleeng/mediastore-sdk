/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const SHOW_MYACCOUNT_CONSENTS_POPUP = 'SHOW_MYACCOUNT_CONSENTS_POPUP';
export const showMyAccountConsentsPopup = createAction(
  SHOW_MYACCOUNT_CONSENTS_POPUP
);

export const HIDE_MYACCOUNT_CONSENTS_POPUP = 'HIDE_MYACCOUNT_CONSENTS_POPUP';
export const hideMyAccountConsentsPopup = createAction(
  HIDE_MYACCOUNT_CONSENTS_POPUP
);

const initialState = {
  isPopupShown: false,
  popupType: '',
  consents: []
};

const myAccountConsentsPopupReducer = createReducer(initialState, (builder) => {
  builder.addCase(SHOW_MYACCOUNT_CONSENTS_POPUP, (state, action) => {
    state.isPopupShown = true;
    state.popupType = action.payload.type;
    state.consents = action.payload.consents;
  });
  builder.addCase(HIDE_MYACCOUNT_CONSENTS_POPUP, (state) => {
    state.isPopupShown = false;
  });
});

export default myAccountConsentsPopupReducer;
