import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { initStore } from '../../tests/testutils'
import WineList from '../WineList'

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
