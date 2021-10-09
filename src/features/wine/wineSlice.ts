import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Wine } from '../../generated'

const initialState: Wine[] = []

export const wineSlice = createSlice({
  name: 'wines',
  initialState,
  reducers: {
    addOne: (state, action: PayloadAction<Wine>) => {
      state.push(action.payload)
    },
  },
})

// Actions
export const { addOne } = wineSlice.actions

// Selectors
export const wineCount = (state: RootState): number => state.wines.length
export const wines = (state: RootState): Wine[] => state.wines

export default wineSlice.reducer
