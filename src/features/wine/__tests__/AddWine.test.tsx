import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import AddWine from '../AddWine'
import api from '../wineAPI'

const mockAPI = api as jest.Mocked<typeof api>
jest.mock('../wineAPI')

afterEach(() => {
  jest.clearAllMocks()
})

describe('Adding a new wine', () => {
  test('Clicking add wine button calls wineAPI', () => {
    render(
      <Provider store={store}>
        <AddWine />
      </Provider>
    )
    fireEvent.click(screen.getByText(/Add wine/))
    expect(mockAPI.addWine).toHaveBeenCalledTimes(1)
  })
})
