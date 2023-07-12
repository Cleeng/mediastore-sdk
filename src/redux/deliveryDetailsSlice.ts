import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DeliveryDetailsField,
  DeliveryDetailsInitialState
} from './types/DeliveryDetailsSlice.types';
import { RootState } from './rootReducer';

export const initialState: DeliveryDetailsInitialState = {
  recipientEmail: { value: '', error: '' },
  confirmRecipientEmail: { value: '', error: '' },
  deliveryDate: { value: '', error: '' },
  message: { value: '', error: '' }
};

export const deliveryDetailsSlice = createSlice({
  name: 'deliveryDetails',
  initialState,
  reducers: {
    setFieldValue(
      state,
      action: PayloadAction<{ name: string; value: string; error?: string }>
    ) {
      const {
        payload: { name, value, error }
      } = action;

      state[name as DeliveryDetailsField].value = value;

      if (error) {
        state[name as DeliveryDetailsField].error = error;
      }
    }
  }
});

export const { setFieldValue } = deliveryDetailsSlice.actions;

export const selectDeliveryDetails = (state: RootState) =>
  state.deliveryDetails;

export default deliveryDetailsSlice.reducer;
