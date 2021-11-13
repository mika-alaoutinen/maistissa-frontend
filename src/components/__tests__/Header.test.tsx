import { screen } from '@testing-library/react';
import React from 'react';
import Header from '../Header';
import { renderWithRouter } from '../../tests/testutils';

const appName = 'Maistissa';

describe('Header is rendered', () => {
  it('has text Maistissa', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText(appName)).toBeInTheDocument();
  });

  it('clicking on header directs to the home page', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText(appName).getAttribute('href')).toBe('/');
  });
});
