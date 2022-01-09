import { screen } from '@testing-library/react';
import React from 'react';
import api from '../../features/wineInfo/wineInfoAPI';
import { renderWithStore } from '../../tests/testutils';
import AddWinePage from '../AddWinePage';

const mockAPI = api as jest.Mocked<typeof api>;
jest.mock('../../features/wineInfo/wineInfoAPI');

describe('Fetches wine info on component load', () => {
  it('should dispatch three thunks', async () => {
    mockAPI.getCountries.mockResolvedValue(Promise.resolve(['Italy', 'Spain']));
    mockAPI.getDescriptions.mockResolvedValue(Promise.resolve(['dry', 'aromatic', 'full bodied', 'rich']));
    mockAPI.getFoodPairings.mockResolvedValue(Promise.resolve(['white meat', 'barbeque']));

    renderWithStore(<AddWinePage />);
    expect(mockAPI.getCountries).toHaveBeenCalledTimes(1);
    expect(mockAPI.getDescriptions).toHaveBeenCalledTimes(1);
    expect(mockAPI.getFoodPairings).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('Add new wine')).toBeInTheDocument();
  });
});
