/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const SHOW_POPUP = 'SHOW_POPUP';
export const showPopup = createAction(SHOW_POPUP);

export const HIDE_POPUP = 'HIDE_POPUP';
export const hidePopup = createAction(HIDE_POPUP);

const initialState = {
  isPopupShown: false,
  popupType: '',
  consents: [],
};

const popupReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showPopup, (state, action) => {
      state.isPopupShown = true;
      state.popupType = action.payload.type;
      state.consents = action.payload.consents;
    })
    .addCase(hidePopup, (state) => {
      state.isPopupShown = false;
    });
});

export default popupReducer;
