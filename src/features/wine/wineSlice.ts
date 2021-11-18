import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sortAscending, sortDescending, WinesSorted } from '../../utils/sorting';
import api, { NewWine, Wine, WineProps } from './wineAPI';

// Thunks
export const addWine = createAsyncThunk('wines/addWine', async (wine: NewWine) => api.addWine(wine));

export const fetchWines = createAsyncThunk('wines/fetchWines', async () => api.getWines());

export interface WineState {
  sorted: WinesSorted;
  status: 'idle' | 'loading' | 'failed';
  wines: Wine[];
}

const initialState: WineState = {
  sorted: {
    direction: 'unsorted',
  },
  status: 'idle',
  wines: [],
};

const wineSlice = createSlice({
  name: 'wines',
  initialState,
  reducers: {
    sortAsc: (state, { payload }: PayloadAction<WineProps>) => {
      state.sorted = {
        direction: 'asc',
        key: payload,
      };
      state.wines = sortAscending(state.wines, payload);
    },
    sortDesc: (state, { payload }: PayloadAction<WineProps>) => {
      state.sorted = {
        direction: 'desc',
        key: payload,
      };
      state.wines = sortDescending(state.wines, payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWine.fulfilled, (state, action) => {
        state.wines.push(action.payload);
      })
      .addCase(fetchWines.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWines.fulfilled, (state, action) => {
        state.status = 'idle';
        state.wines = action.payload;
      })
      .addCase(fetchWines.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

const { actions, reducer } = wineSlice;
export const { sortAsc, sortDesc } = actions;
export default reducer;
