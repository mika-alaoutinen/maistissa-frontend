import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithStore } from '../../../tests/testutils';
import Wines from '../Wines';

describe('Displays wine names', () => {
  it('renders two wines in a table', () => {
    renderWithStore(<Wines />);
    expect(screen.getAllByText(/wine/)).toHaveLength(2);
  });
});
