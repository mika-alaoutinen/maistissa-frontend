import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api, { Review } from './reviewAPI';

// Thunks
export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => api.getReviews());

export interface ReviewState {
  reviews: Review[]
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ReviewState = {
  reviews: [],
  status: 'idle',
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default reviewSlice.reducer;
