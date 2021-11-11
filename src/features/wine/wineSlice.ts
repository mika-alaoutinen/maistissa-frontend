import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api, { NewWine, Wine } from './wineAPI';
import { sortAscending, sortDescending, WineProps } from './wineSorting';

// Thunks
export const addWine = createAsyncThunk('wines/addWine', async (wine: NewWine) => api.addWine(wine));

export const fetchWines = createAsyncThunk('wines/fetchWines', async () => api.getWines());

export interface WineState {
  wines: Wine[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: WineState = {
  wines: [],
  status: 'idle',
};

const wineSlice = createSlice({
  name: 'wines',
  initialState,
  reducers: {
    sortAsc: (state, { payload }: PayloadAction<WineProps>) => ({
      ...state,
      wines: sortAscending(state.wines, payload),
    }),
    sortDesc: (state, { payload }: PayloadAction<WineProps>) => ({
      ...state,
      wines: sortDescending(state.wines, payload),
    }),
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
