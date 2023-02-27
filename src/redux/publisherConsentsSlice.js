import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getConsents } from 'api';

const initialState = {
  publisherConsents: [],
  checked: [],
  loading: false,
  error: ''
};

export const fetchPublisherConsents = createAsyncThunk(
  'publisherConsents',
  async (publisherId, { rejectWithValue }) => {
    try {
      const { consents } = await getConsents(publisherId);
      return consents;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const consentsSlice = createSlice({
  name: 'publisherConsents',
  initialState,
  reducers: {
    setChecked(state, { payload }) {
      state.checked[payload] = !state.checked[payload];
    }
  },
  extraReducers: {
    [fetchPublisherConsents.pending]: state => {
      state.loading = true;
    },
    [fetchPublisherConsents.fulfilled]: (state, { payload }) => {
      const publisherConsents = payload.map(element => {
        return {
          name: element.name,
          label: element.label,
          version: element.version,
          required: element.required
        };
      });
      const checked = new Array(publisherConsents.length).fill(false);
      state.publisherConsents = publisherConsents;
      state.checked = checked;
      state.loading = false;
    },
    [fetchPublisherConsents.rejected]: (state, { payload }) => {
      if (payload.includes('Invalid param publisherId')) {
        state.error = 'noPublisherId';
      } else state.error = payload;
      state.loading = false;
    }
  }
});

export const { setChecked } = consentsSlice.actions;
export default consentsSlice.reducer;
