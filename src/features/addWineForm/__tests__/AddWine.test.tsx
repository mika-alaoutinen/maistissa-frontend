import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithStore } from '../../../tests/testutils';
import AddWine from '../AddWine';
import { initialState } from '../hooks';
import api from '../../wine/wineAPI';

const mockAPI = api as jest.Mocked<typeof api>;
jest.mock('../../wine/wineAPI');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Form should have all input fields', () => {
  beforeEach(() => renderWithStore(<AddWine />));

  it('should have text input with label for name', () => {
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
  });

  it('should have dropdown menu with label for country', () => {
    expect(screen.getByLabelText(/Country/)).toBeInTheDocument();
  });

  it('should have five radio buttons for wine types', () => {
    ['red', 'rose', 'white', 'sparkling', 'other']
      .map((label) => screen.getByLabelText(label))
      .forEach((htmlElement) => expect(htmlElement).toBeInTheDocument());
  });

  it('should have number input with label for price', () => {
    expect(screen.getByLabelText(/Price/)).toBeInTheDocument();
  });

  it('should have number input with label for volume', () => {
    expect(screen.getByLabelText(/Volume/)).toBeInTheDocument();
  });

  it('should have dropdown menu with label for description', () => {
    expect(screen.getByLabelText(/Description/)).toBeInTheDocument();
  });

  it('should have dropdown menu with label for food pairings', () => {
    expect(screen.getByLabelText(/Food pairings/)).toBeInTheDocument();
  });
});

describe('Adding a new wine', () => {
  it('clicking add wine button calls wineAPI', () => {
    renderWithStore(<AddWine />);
    userEvent.click(screen.getByText(/Add wine/));
    expect(mockAPI.addWine).toHaveBeenCalledTimes(1);
    expect(mockAPI.addWine).toHaveBeenCalledWith(initialState);
  });

  it('should clear form after submit', () => {
    renderWithStore(<AddWine />);

    const wineName = 'Gato Negro';
    const nameInput = screen.getByLabelText(/Name/);

    userEvent.type(nameInput, wineName);
    expect(nameInput).toHaveValue(wineName);

    userEvent.click(screen.getByText(/Add wine/));
    expect(screen.queryByText(wineName)).not.toBeInTheDocument();
  });
});
