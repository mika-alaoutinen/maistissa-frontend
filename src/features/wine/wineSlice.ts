import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import api, { Wine } from './wineAPI'

// Thunk actions
export const addWine = createAsyncThunk('wines/addWine', async (wine: Wine) => {
  return await api.addWine(wine)
})

export const fetchWines = createAsyncThunk('wines/fetchWines', async () => {
  return await api.getWines()
})

export interface WineState {
  wines: Wine[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: WineState = {
  wines: [],
  status: 'idle',
}

const wineSlice = createSlice({
  name: 'wines',
  initialState,
  reducers: {
    addOne: (state, action: PayloadAction<Wine>) => {
      state.wines.push(action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addWine.fulfilled, (state, action) => {
        state.wines.push(action.payload)
      })
      .addCase(fetchWines.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchWines.fulfilled, (state, action) => {
        state.status = 'idle'
        state.wines = action.payload
      })
      .addCase(fetchWines.rejected, state => {
        state.status = 'failed'
      })
  },
})

// Actions
export const { addOne } = wineSlice.actions

// Selectors
export const selectWineCount = (state: RootState): number => state.wines.wines.length
export const selectWines = (state: RootState): Wine[] => state.wines.wines

export default wineSlice.reducer
