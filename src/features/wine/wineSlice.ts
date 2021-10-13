import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api, { Wine } from './wineAPI';

// Thunks
export const addWine = createAsyncThunk('wines/addWine', async (wine: Wine) => api.addWine(wine));

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
  reducers: {},
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

export default wineSlice.reducer;
