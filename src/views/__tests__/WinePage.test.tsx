import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import api from '../../features/wine/wineAPI';
import { wines } from '../../tests/testdata';
import WinePage from '../WinePage';

const mockAPI = api as jest.Mocked<typeof api>;
jest.mock('../../features/wine/wineAPI');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Fetches all wines on component load', () => {
  it('should dispatch a fetchWines thunk', async () => {
    mockAPI.getWines.mockResolvedValue(Promise.resolve(wines));

    render(
      <Provider store={store}>
        <WinePage />
      </Provider>,
    );

    expect(screen.getByText('Wines page (0 wines)')).toBeInTheDocument();
    expect(mockAPI.getWines).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('Wines page (2 wines)')).toBeInTheDocument();
  });
});
