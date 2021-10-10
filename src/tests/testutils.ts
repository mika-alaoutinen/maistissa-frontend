import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import counterReducer, { CounterState } from '../features/counter/counterSlice'
import wineReducer, { WineState } from '../features/wine/wineSlice'
import { wines } from './testdata'

export const initRootState = (): RootState => {
  const counterState: CounterState = {
    value: 0,
    status: 'idle',
  }

  const wineState: WineState = {
    wines,
    status: 'idle',
  }

  return {
    counter: counterState,
    wines: wineState,
  }
}

/**
 * Redux store with preloaded test data
 * @returns redux store
 */
export const initStore = (): EnhancedStore<{
  counter: CounterState
  wines: WineState
}> =>
  configureStore({
    reducer: {
      counter: counterReducer,
      wines: wineReducer,
    },
    preloadedState: initRootState(),
  })
