import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api, { NewWine, Wine } from './wineAPI';
import { sortWines, SortType, WineProps } from './wineSorting';

// Actions
interface SortAction {
  key: WineProps,
  sortType: SortType
}

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
    sort: (state, { payload }: PayloadAction<SortAction>) => {
      const { key, sortType } = payload;
      return {
        ...state,
        wines: sortWines(state.wines, key, sortType),
      };
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
export const { sort } = actions;
export default reducer;
