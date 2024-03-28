import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SettingsType from 'types/Settings.types';
import { SettingsInitialState } from './types';
import { getSettings } from '../api';
import { RootState } from './rootReducer';

export const initialState: SettingsInitialState = {
  settings: null,
  error: null,
  loading: false
};

export const fetchSettings = createAsyncThunk<
  SettingsType,
  string,
  {
    rejectValue: string;
  }
>('settings/fetchSettings', async (publisherId, { rejectWithValue }) => {
  try {
    const result = await getSettings(publisherId);
    return result;
  } catch (err) {
    const typedError = err as Error;
    return rejectWithValue(typedError.message);
  }
});

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSettings.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      state.loading = false;
      state.settings = action.payload;
    });
    builder.addCase(fetchSettings.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
  }
});

export const selectSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;
