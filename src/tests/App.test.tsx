import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import App from '../App'
import { store } from '../app/store'
import wineService from '../services/wineService'
import { wines } from './testdata'

const mockService = wineService as jest.Mocked<typeof wineService>
jest.mock('../services/wineService')

beforeEach(() => {
  mockService.getWines.mockResolvedValue(Promise.resolve(wines))
})

afterEach(() => {
  jest.clearAllMocks()
})

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  expect(getByText(/learn/i)).toBeInTheDocument()
})

test('fetches wines', async () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(getByText(/Number of wines 0/)).toBeInTheDocument()
  expect(mockService.getWines).toHaveBeenCalledTimes(1)
  expect(await screen.findByText(/Number of wines 2/)).toBeInTheDocument()
})
