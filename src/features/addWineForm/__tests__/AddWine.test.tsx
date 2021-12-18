import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { renderWithStore } from '../../../tests/testutils';
import AddWine from '../AddWine';
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
  it('Clicking add wine button calls wineAPI', () => {
    renderWithStore(<AddWine />);
    fireEvent.click(screen.getByText(/Add wine/));
    expect(mockAPI.addWine).toHaveBeenCalledTimes(1);
  });
});
