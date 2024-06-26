import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeliveryDetailsField, DeliveryDetailsInitialState } from './types';
import { RootState } from './rootReducer';

export const initialState: DeliveryDetailsInitialState = {
  isGift: false,
  recipientEmail: { value: '', error: '', translationKey: '' },
  confirmRecipientEmail: { value: '', error: '', translationKey: '' },
  deliveryDate: { value: '', error: '', translationKey: '' },
  deliveryTime: { value: '', error: '', translationKey: '' },
  message: { value: '' }
};

export const deliveryDetailsSlice = createSlice({
  name: 'deliveryDetails',
  initialState,
  reducers: (create) => ({
    setIsGift: create.reducer((state, action: PayloadAction<boolean>) => {
      state.isGift = action.payload;
    }),
    setFieldValue: create.reducer(
      (
        state,
        action: PayloadAction<{ name: string; value: string | number }>
      ) => {
        const {
          payload: { name, value }
        } = action;

        state[name as DeliveryDetailsField].value = value;
      }
    ),
    setFieldError: create.reducer(
      (
        state,
        action: PayloadAction<{
          name: string;
          error: string;
          translationKey: string;
        }>
      ) => {
        const {
          payload: { name, error, translationKey }
        } = action;

        state[name as DeliveryDetailsField].error = error;
        state[name as DeliveryDetailsField].translationKey = translationKey;
      }
    ),
    resetDeliveryDetailsState: create.reducer(() => initialState)
  })
});

export const {
  setIsGift,
  setFieldValue,
  setFieldError,
  resetDeliveryDetailsState
} = deliveryDetailsSlice.actions;

export const selectDeliveryDetails = (state: RootState) =>
  state.deliveryDetails;

export default deliveryDetailsSlice.reducer;
