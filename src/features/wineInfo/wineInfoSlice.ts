import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from './wineInfoAPI';

// Thunks
export const fetchCountries = createAsyncThunk('/wineInfo/fetchCountries', async () => api.getCountries());

export interface WineInfoState {
  countries: string[];
}

const initialState: WineInfoState = {
  countries: [],
};

const wineInfoSlice = createSlice({
  name: 'wineInfo',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
    });
  },
});

const { reducer } = wineInfoSlice;
export default reducer;
