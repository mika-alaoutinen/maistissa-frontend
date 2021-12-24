import { screen } from '@testing-library/react';
import React from 'react';
import api from '../../api/wineAPI';
import { wines } from '../../tests/testdata';
import { renderWithStore } from '../../tests/testutils';
import WinePage from '../WinePage';

const mockAPI = api as jest.Mocked<typeof api>;
jest.mock('../../api/wineAPI');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Fetches all wines on component load', () => {
  it('should dispatch a fetchWines thunk', async () => {
    mockAPI.getWines.mockResolvedValue(Promise.resolve(wines));
    renderWithStore(<WinePage />);
    expect(mockAPI.getWines).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('Wines page (2 wines)')).toBeInTheDocument();
  });
});
