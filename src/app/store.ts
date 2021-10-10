import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import wineReducer from '../features/wine/wineSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    wines: wineReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
