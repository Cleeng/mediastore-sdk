import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getConsents } from 'api';

const initialState = {
  definitions: [],
  labels: [],
  checked: [],
  loading: false,
  error: ''
};

export const fetchConsents = createAsyncThunk(
  'consents',
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
  name: 'consents',
  initialState,
  reducers: {
    setChecked(state, { payload }) {
      state.checked[payload] = !state.checked[payload];
    }
  },
  extraReducers: {
    [fetchConsents.pending]: state => {
      state.loading = true;
    },
    [fetchConsents.fulfilled]: (state, { payload }) => {
      if (payload.responseData && payload.responseData.consents) {
        const definitions = payload.responseData.consents.map(element => {
          return {
            name: element.name,
            version: element.version,
            required: element.required
          };
        });
        const labels = payload.responseData.consents.map(
          element => element.label
        );
        const checked = new Array(definitions.length).fill(false);
        state.definitions = definitions;
        state.labels = labels;
        state.checked = checked;
        state.loading = false;
      } else if (payload.errors.includes('Invalid param pubId')) {
        state.loading = false;
        state.error = 'noPublisherId';
      }
    },
    [fetchConsents.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

export const { setChecked } = consentsSlice.actions;
export default consentsSlice.reducer;
