import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import AddWine from '../AddWine';
import api, { NewWine, WineType } from '../../../api/wineAPI';
import { renderWithStore } from '../../../tests/testutils';

const mockAPI = api as jest.Mocked<typeof api>;
jest.mock('../../../api/wineAPI');

beforeEach(() => renderWithStore(<AddWine />));

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
  const clearInputAndType = async (labelText: string, value: number) => {
    const input = screen.getByLabelText(labelText);
    await userEvent.clear(input);
    await userEvent.type(input, value.toString());
  };

  it('clicking add wine button calls wineAPI', async () => {
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
    await userEvent.type(screen.getByLabelText(/Name/), newWine.name);
    await userEvent.selectOptions(screen.getByLabelText(/Country/), newWine.country);
    await userEvent.click(screen.getByLabelText(/white/));
    await clearInputAndType('Price', newWine.price);
    await clearInputAndType('Volume (l)', newWine.volume);

    // Submit form
    await userEvent.click(screen.getByText(/Add wine/));
    expect(mockAPI.addWine).toHaveBeenCalledTimes(1);
    expect(mockAPI.addWine).toHaveBeenCalledWith(newWine);
  });

  it('trying to submit an invalid form displays error messages and does not submit form', async () => {
    await userEvent.click(screen.getByText(/Add wine/));
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(mockAPI.addWine).not.toBeCalled();
  });

  it('should clear form after submit', async () => {
    const wineName = 'Gato Negro';
    const nameInput = screen.getByLabelText(/Name/);

    await userEvent.type(nameInput, wineName);
    expect(nameInput).toHaveValue(wineName);

    await userEvent.click(screen.getByText(/Add wine/));
    expect(screen.queryByText(wineName)).not.toBeInTheDocument();
  });
});
