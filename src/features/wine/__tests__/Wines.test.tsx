import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { renderWithStore } from '../../../tests/testutils';
import Wines from '../Wines';

type WineInfo = {
  name: string,
  type: string,
  country: string,
  price: number,
  volume: number
};

const verifyWineIsRendered = (wine: WineInfo): void => {
  Object
    .values(wine)
    .map((value) => screen.getByText(value))
    .forEach((html) => expect(html).toBeInTheDocument());
};

const getFirstRow = (container: HTMLElement): Element => {
  const th = container.querySelector('tbody > tr > th');
  if (!th) {
    throw Error('Could not find a table row');
  }
  return th;
};

describe('Wine information is presented as a table', () => {
  beforeEach(() => renderWithStore(<Wines />));

  it('renders headers', () => {
    ['Name', 'Type', 'Country', 'Volume (l)', 'Price (€)']
      .map((header) => screen.getByText(header))
      .forEach((html) => expect(html).toBeInTheDocument());
  });

  it('renders two wines in a table', () => {
    const whiteWine: WineInfo = {
      name: 'White wine 1',
      type: 'WHITE',
      country: 'Spain',
      price: 10.5,
      volume: 0.75,
    };

    const redWine: WineInfo = {
      name: 'Red wine 1',
      type: 'RED',
      country: 'Italy',
      price: 33.5,
      volume: 3,
    };

    verifyWineIsRendered(whiteWine);
    verifyWineIsRendered(redWine);
  });
});

describe('Clicking on headers sorts wines', () => {
  it('sort wines by name', () => {
    const { container } = renderWithStore(<Wines />);
    const initialWineName = getFirstRow(container).firstChild?.textContent;

    // Sort wines and check that the first row has different wine
    fireEvent.click(screen.getByText(/Name/));
    const wineNameAfterSorting = getFirstRow(container).firstChild?.textContent;

    expect(initialWineName).not.toEqual(wineNameAfterSorting);
  });
});