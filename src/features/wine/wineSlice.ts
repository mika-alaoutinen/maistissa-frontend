import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Wine } from '../../generated'
import wineService from './wineService'

// Thunk actions
export const fetchWines = createAsyncThunk('wines/fetchWines', async () => {
  return await wineService.getWines()
})

export interface WineState {
  wines: Wine[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: WineState = {
  wines: [],
  status: 'idle',
}

export const wineSlice = createSlice({
  name: 'wines',
  initialState,
  reducers: {
    addOne: (state, action: PayloadAction<Wine>) => {
      state.wines.push(action.payload)
    },
  },
  extraReducers: builder => {
    builder
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
export const wineCount = (state: RootState): number => state.wines.wines.length
export const wines = (state: RootState): Wine[] => state.wines.wines

export default wineSlice.reducer
