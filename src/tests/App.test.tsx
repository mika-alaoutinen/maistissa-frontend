import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithProviders } from './testutils';

describe('Navigation directs to correct views', () => {
  const navigateToPage = (navButtonText: string): void => {
    userEvent.click(screen.getByText(navButtonText));
  };

  beforeEach(() => renderWithProviders(<App />));

  it('navigates to the home page', () => {
    navigateToPage('Add wine');
    navigateToPage('Maistissa');
    expect(screen.getByText('Home page')).toBeInTheDocument();
  });

  it('navigates to the reviews page', () => {
    navigateToPage('Reviews');
    expect(screen.getByText(/Reviews page/)).toBeInTheDocument();
  });

  it('navigates to the wines page', () => {
    navigateToPage('Wines');
    expect(screen.getByText(/Wines page/)).toBeInTheDocument();
  });

  it('navigates to the add wine page', () => {
    navigateToPage('Add wine');
    expect(screen.getByText('Add new wine')).toBeInTheDocument();
  });
});
