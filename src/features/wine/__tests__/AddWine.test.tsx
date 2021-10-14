import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { renderWithStore } from '../../../tests/testutils';
import AddWine from '../AddWine';
import api from '../wineAPI';

const mockAPI = api as jest.Mocked<typeof api>;
jest.mock('../wineAPI');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Adding a new wine', () => {
  it('Clicking add wine button calls wineAPI', () => {
    renderWithStore(<AddWine />);
    fireEvent.click(screen.getByText(/Add wine/));
    expect(mockAPI.addWine).toHaveBeenCalledTimes(1);
  });
});
