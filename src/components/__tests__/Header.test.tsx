import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from '../Header';

describe('Header is rendered', () => {
  it('has h1 text', () => {
    render(<Header />);
    expect(screen.getByText('Maistissa')).toBeInTheDocument();
  });
});
