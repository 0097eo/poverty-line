import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const createProfile = createAsyncThunk('profile/create', async (profileData, { rejectWithValue }) => {
  try {
    const response = await api.post('/profile', profileData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getProfile = createAsyncThunk('profile/get', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateProfile = createAsyncThunk('profile/update', async (profileData, { rejectWithValue }) => {
  try {
    const response = await api.put('/profile', profileData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteProfile = createAsyncThunk('profile/delete', async (_, { rejectWithValue }) => {
  try {
    const response = await api.delete('/profile');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default profileSlice.reducer;