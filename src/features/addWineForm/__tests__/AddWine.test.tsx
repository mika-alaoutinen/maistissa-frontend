import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import AddWine from '../AddWine';
import api, { NewWine, WineType } from '../../../api/wineAPI';
import { renderWithStore } from '../../../tests/testutils';

const mockAPI = api as jest.Mocked<typeof api>;
jest.mock('../../../api/wineAPI');

beforeEach(() => renderWithStore(<AddWine />));

afterEach(() => {
  jest.clearAllMocks();
});

describe('Form should have all input fields', () => {
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
  const clearInputAndType = (labelText: string, value: number): void => {
    const input = screen.getByLabelText(labelText);
    userEvent.clear(input);
    userEvent.type(input, value.toString());
  };

  it('clicking add wine button calls wineAPI', () => {
    const newWine: NewWine = {
      name: 'Gato Negro',
      country: 'Spain',
      type: WineType.WHITE,
      price: 10,
      volume: 0.75,
      description: [],
      foodPairings: [],
      url: '',
    };

    // Fill out the form
    userEvent.type(screen.getByLabelText(/Name/), newWine.name);
    userEvent.selectOptions(screen.getByLabelText(/Country/), newWine.country);
    userEvent.click(screen.getByLabelText(/white/));
    clearInputAndType('Price', newWine.price);
    clearInputAndType('Volume (l)', newWine.volume);

    // Submit form
    userEvent.click(screen.getByText(/Add wine/));
    expect(mockAPI.addWine).toHaveBeenCalledTimes(1);
    expect(mockAPI.addWine).toHaveBeenCalledWith(newWine);
  });

  it('trying to submit an invalid form displays error messages and does not submit form', () => {
    userEvent.click(screen.getByText(/Add wine/));
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(mockAPI.addWine).not.toBeCalled();
  });

  it('should clear form after submit', () => {
    const wineName = 'Gato Negro';
    const nameInput = screen.getByLabelText(/Name/);

    userEvent.type(nameInput, wineName);
    expect(nameInput).toHaveValue(wineName);

    userEvent.click(screen.getByText(/Add wine/));
    expect(screen.queryByText(wineName)).not.toBeInTheDocument();
  });
});
