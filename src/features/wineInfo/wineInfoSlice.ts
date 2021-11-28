import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from './wineInfoAPI';

// Thunks
export const fetchCountries = createAsyncThunk(
  '/wineInfo/fetchCountries',
  async () => api.getCountries(),
);

export const fetchDescriptions = createAsyncThunk(
  '/wineInfo/fetchDescriptions',
  async () => api.getDescriptions(),
);

export const fetchFoodPairings = createAsyncThunk(
  '/wineInfo/fetchFoodPairings',
  async () => api.getFoodPairings(),
);

export interface WineInfoState {
  countries: string[];
  descriptions: string[];
  foodPairings: string[];
}

const initialState: WineInfoState = {
  countries: [],
  descriptions: [],
  foodPairings: [],
};

const wineInfoSlice = createSlice({
  name: 'wineInfo',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, { payload }) => {
      state.countries = payload;
    });
    builder.addCase(fetchDescriptions.fulfilled, (state, { payload }) => {
      state.descriptions = payload;
    });
    builder.addCase(fetchFoodPairings.fulfilled, (state, { payload }) => {
      state.foodPairings = payload;
    });
  },
});

const { reducer } = wineInfoSlice;
export default reducer;
