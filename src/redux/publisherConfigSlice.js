import { createSlice } from '@reduxjs/toolkit';
import { validatePaymentMethods } from 'util/paymentMethodHelper';

const initialState = {
  offerId: '',
  availableAndValidPaymentMethods: []
};

export const publisherConfigSlice = createSlice({
  name: 'publisherConfig',
  initialState,
  reducers: {
    init: (state, { payload }) => {
      state.offerId = payload.offerId || '';
      state.availableAndValidPaymentMethods = validatePaymentMethods(
        payload.paymentMethodsProvidedByPublisher
      );
    },
    updateAvailableAndValidPaymentMethods: (state, { payload }) => {
      state.availableAndValidPaymentMethods = payload;
    }
  }
});

export const {
  init,
  updateAvailableAndValidPaymentMethods
} = publisherConfigSlice.actions;
export default publisherConfigSlice.reducer;
