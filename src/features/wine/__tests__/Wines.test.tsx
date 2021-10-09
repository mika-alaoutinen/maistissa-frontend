import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import { wines } from '../../../tests/testdata'
import api from '../wineAPI'
import Wines from '../Wines'

const mockAPI = api as jest.Mocked<typeof api>
jest.mock('../wineAPI')

beforeEach(() => {
  mockAPI.getWines.mockResolvedValue(Promise.resolve(wines))
})

afterEach(() => {
  jest.clearAllMocks()
})

test('fetches wines', async () => {
  render(
    <Provider store={store}>
      <Wines />
    </Provider>
  )

  expect(await screen.findByText(/White wine 1/)).toBeInTheDocument()
  expect(mockAPI.getWines).toHaveBeenCalledTimes(1)
})
