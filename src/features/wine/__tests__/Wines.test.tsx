import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { initStore } from '../../../tests/testutils'
import Wines from '../Wines'

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
