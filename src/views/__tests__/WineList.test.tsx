import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { RootState } from '../../app/store'
import counterReducer, { CounterState } from '../../features/counter/counterSlice'
import wineReducer, { WineState } from '../../features/wine/wineSlice'
import { wines } from '../../tests/testdata'
import WineList from '../WineList'

const initStore = () => {
  const counterState: CounterState = {
    value: 0,
    status: 'idle',
  }

  const wineState: WineState = {
    wines,
    status: 'idle',
  }

  const preloadedState: RootState = {
    counter: counterState,
    wines: wineState,
  }

  return configureStore({
    reducer: {
      counter: counterReducer,
      wines: wineReducer,
    },
    preloadedState,
  })
}

describe('Fetches all wines on component load', () => {
  const store = initStore()

  it('should dispatch a fetchWines thunk', () => {
    render(
      <Provider store={store}>
        <WineList />
      </Provider>
    )

    expect(screen.getByText(/Wines page/)).toBeInTheDocument()
  })
})
