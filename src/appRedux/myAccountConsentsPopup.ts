/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ConsentsPopupInitialState,
  ConsentsPopupTypes,
  Consent
} from 'appRedux/types';

const initialState: ConsentsPopupInitialState = {
  isPopupShown: false,
  popupType: '',
  consents: []
};

const myAccountConsentsPopupSlice = createSlice({
  name: 'myAccountConsentsPopup',
  initialState,
  reducers: {
    showMyAccountConsentsPopup: (
      state,
      action: PayloadAction<{ type: ConsentsPopupTypes; consents: Consent[] }>
    ) => {
      state.isPopupShown = true;
      state.popupType = action.payload.type;
      state.consents = action.payload.consents;
    },
    hideMyAccountConsentsPopup: (state) => {
      state.isPopupShown = false;
    }
  }
});

export const { showMyAccountConsentsPopup, hideMyAccountConsentsPopup } =
  myAccountConsentsPopupSlice.actions;

export default myAccountConsentsPopupSlice.reducer;
