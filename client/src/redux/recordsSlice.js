import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

// Async thunks
export const fetchRecords = createAsyncThunk(
  'records/fetchRecords',
  async ({ page = 1, per_page = 9, region, social_background, min_income, max_income } = {}) => {
    const params = new URLSearchParams({
      page,
      per_page,
      ...(region && { region }),
      ...(social_background && { social_background }),
      ...(min_income && { min_income }),
      ...(max_income && { max_income }),
    });
    const response = await api.get(`/records?${params}`);
    return response.data;
  }
);

export const createRecord = createAsyncThunk(
  'records/createRecord',
  async (recordData) => {
    const response = await api.post('/records', recordData);
    return response.data;
  }
);

export const updateRecord = createAsyncThunk(
  'records/updateRecord',
  async ({ id, data }) => {
    const response = await api.put(`/records/${id}`, data);
    return { id, ...response.data };
  }
);

export const deleteRecord = createAsyncThunk(
  'records/deleteRecord',
  async (id) => {
    await api.delete(`/records/${id}`);
    return id;
  }
);

const recordsSlice = createSlice({
  name: 'records',
  initialState: {
    items: [],
    meta: {
      page: 1,
      per_page: 9,
      total_pages: 0,
      total_items: 0,
    },
    filters: {
      region: '',
      social_background: '',
      min_income: '',
      max_income: '',
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        region: '',
        social_background: '',
        min_income: '',
        max_income: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.records;
        state.meta = action.payload.meta;
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createRecord.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        const index = state.items.findIndex((record) => record.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.items = state.items.filter((record) => record.id !== action.payload);
      });
  },
});

export const { setFilters, clearFilters } = recordsSlice.actions;
export default recordsSlice.reducer;