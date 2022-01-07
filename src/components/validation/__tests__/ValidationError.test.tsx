import React from 'react';
import { render, screen } from '@testing-library/react';
import ValidationError from '../ValidationError';

describe('Component renders correctly', () => {
  it('displays multiple error messages', () => {
    render(<ValidationError errors={['error 1', 'error 2']} />);
    expect(screen.getAllByText(/error/)).toHaveLength(2);
  });

  it('displays nothing when there are no errors', () => {
    render(<ValidationError errors={[]} />);
    expect(screen.queryByText(/error/)).not.toBeInTheDocument();
  });
});
