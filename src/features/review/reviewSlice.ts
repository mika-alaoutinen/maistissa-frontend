import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SortedByKey } from '../../components/datatable/types';
import { sortAscending, sortDescending } from '../../utils/sorting';
import api, { Review } from './reviewAPI';
import { sortByWineName } from './reviewSorting';

// Thunks
export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => api.getReviews());

export type Payload = PayloadAction<keyof Review>;

export interface ReviewState {
  reviews: Review[]
  sorted: SortedByKey<Review, keyof Review>
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ReviewState = {
  reviews: [],
  sorted: {
    direction: 'unsorted',
  },
  status: 'idle',
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    sortAsc: (state, { payload }: Payload) => {
      state.reviews = payload === 'wine'
        ? sortByWineName(state.reviews, 'ASC')
        : sortAscending(state.reviews, payload);

      state.sorted = {
        direction: 'asc',
        key: payload,
      };
    },
    sortDesc: (state, { payload }: Payload) => {
      state.reviews = payload === 'wine'
        ? sortByWineName(state.reviews, 'DESC')
        : sortDescending(state.reviews, payload);

      state.sorted = {
        direction: 'desc',
        key: payload,
      };
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
export const { sortAsc, sortDesc } = actions;
export default reducer;
