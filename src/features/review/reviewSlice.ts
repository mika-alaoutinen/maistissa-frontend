import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sortAscending, sortDescending } from '../../utils/sorting';
import api, { Review, ReviewProps } from './reviewAPI';
import { sortByWineName } from './reviewSorting';

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
  reducers: {
    sortAsc: (state, { payload }: PayloadAction<ReviewProps>) => {
      state.reviews = sortAscending(state.reviews, payload);
    },
    sortDesc: (state, { payload }: PayloadAction<ReviewProps>) => {
      state.reviews = sortDescending(state.reviews, payload);
    },
    sortWineAsc: (state) => {
      state.reviews = sortByWineName(state.reviews, 'ASC');
    },
    sortWineDesc: (state) => {
      state.reviews = sortByWineName(state.reviews, 'DESC');
    },
  },
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

const { actions, reducer } = reviewSlice;
export const {
  sortAsc, sortDesc, sortWineAsc, sortWineDesc,
} = actions;
export default reducer;
