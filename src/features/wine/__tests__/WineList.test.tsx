import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithStore } from '../../../tests/testutils';
import Wines from '../Wines';

// No idea why Eslint warns about any type here
describe('Displays wine names', () => {
  it('renders two wine names as paragraphs', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    renderWithStore(<Wines />);
    expect(screen.getAllByText(/wine/)).toHaveLength(2);
  });
});
