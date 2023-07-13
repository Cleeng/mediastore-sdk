import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DeliveryDetailsField,
  DeliveryDetailsInitialState
} from './types/DeliveryDetailsSlice.types';
import { RootState } from './rootReducer';

export const initialState: DeliveryDetailsInitialState = {
  isGift: false,
  recipientEmail: { value: '', error: '' },
  confirmRecipientEmail: { value: '', error: '' },
  deliveryDate: { value: '', error: '' },
  message: { value: '', error: '' }
};

export const deliveryDetailsSlice = createSlice({
  name: 'deliveryDetails',
  initialState,
  reducers: {
    setIsGift(state, action: PayloadAction<boolean>) {
      state.isGift = action.payload;
    },
    setFieldValue(
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) {
      const {
        payload: { name, value }
      } = action;

      state[name as DeliveryDetailsField].value = value;
    },
    setFieldError(
      state,
      action: PayloadAction<{ name: string; error: string }>
    ) {
      const {
        payload: { name, error }
      } = action;

      console.log(`action ${action}`);

      state[name as DeliveryDetailsField].error = error;
    }
  }
});

export const {
  setIsGift,
  setFieldValue,
  setFieldError
} = deliveryDetailsSlice.actions;

export const selectDeliveryDetails = (state: RootState) =>
  state.deliveryDetails;

export default deliveryDetailsSlice.reducer;
