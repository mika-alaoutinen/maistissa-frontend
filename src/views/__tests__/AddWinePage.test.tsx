import { screen } from '@testing-library/react';
import React from 'react';
import api from '../../features/wineInfo/wineInfoAPI';
import { renderWithStore } from '../../tests/testutils';
import AddWinePage from '../AddWinePage';

const mockAPI = api as jest.Mocked<typeof api>;
jest.mock('../../features/wineInfo/wineInfoAPI');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Fetches wine countries in component load', () => {
  const countriesResponse = ['Italy', 'Spain'];

  it('should dispatch a fetchCountries thunk', async () => {
    mockAPI.getCountries.mockResolvedValue(Promise.resolve(countriesResponse));
    renderWithStore(<AddWinePage />);
    expect(mockAPI.getCountries).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('Add new wine')).toBeInTheDocument();
  });
});
