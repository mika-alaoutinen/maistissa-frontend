import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { RootState } from '../../../app/store'
import { wines } from '../../../tests/testdata'
import counterReducer, { CounterState } from '../../counter/counterSlice'
import Wines from '../Wines'
import wineReducer, { WineState } from '../wineSlice'

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

describe('Displays wine names', () => {
  const store = initStore()

  it('renders two wine names as paragraphs', () => {
    render(
      <Provider store={store}>
        <Wines />
      </Provider>
    )

    expect(screen.getAllByText(/wine/)).toHaveLength(2)
  })
})
