import { render, screen } from '@testing-library/react';
import React from 'react';
import HomePage from '../HomePage';

describe('Home page has h1', () => {
  it('page has a header', () => {
    render(<HomePage />);
    expect(screen.getByText(/Home page/)).toBeInTheDocument();
  });
});
