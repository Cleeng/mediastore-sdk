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
      const responseData = await getConsents(publisherId);
      return responseData;
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
      if (payload.responseData && payload.responseData.consents) {
        const publisherConsents = payload.responseData.consents.map(element => {
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
      } else if (payload.errors.includes('Invalid param pubId')) {
        state.loading = false;
        state.error = 'noPublisherId';
      }
    },
    [fetchPublisherConsents.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

export const { setChecked } = consentsSlice.actions;
export default consentsSlice.reducer;
