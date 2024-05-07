import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getConsents } from 'api';
import { Consent } from 'types/Consents.types';
import { PublisherConsentsInitialState } from './types/publisherConsentsSlice.types';

const initialState: PublisherConsentsInitialState = {
  publisherConsents: [],
  checked: [],
  loading: false,
  error: null
};

export const fetchPublisherConsents = createAsyncThunk<
  Consent[],
  string,
  {
    rejectValue: string;
  }
>('publisherConsents', async (publisherId: string, { rejectWithValue }) => {
  try {
    const { consents } = await getConsents(publisherId);
    return consents;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError.message);
  }
});

export const consentsSlice = createSlice({
  name: 'publisherConsents',
  initialState,
  reducers: {
    setChecked(state, { payload }) {
      state.checked[payload] = !state.checked[payload];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPublisherConsents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPublisherConsents.fulfilled, (state, { payload }) => {
      state.publisherConsents = payload;
      state.checked = new Array(payload.length).fill(false);
      state.loading = false;
    });
    builder.addCase(fetchPublisherConsents.rejected, (state, { payload }) => {
      if (payload && payload.includes('Invalid param publisherId')) {
        state.error = 'noPublisherId';
      } else state.error = payload;
      state.loading = false;
    });
  }
});

export const { setChecked } = consentsSlice.actions;
export default consentsSlice.reducer;
