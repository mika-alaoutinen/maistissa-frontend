import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TestComponent, { Data } from './TestComponent';
import { ValidationRules } from '../validation';

describe('Displaying data and errors', () => {
  it('data is displayed', () => {
    render(<TestComponent initialData={{ value: 'initial' }} />);
    expect(screen.getByText(/initial/)).toBeInTheDocument();
  });

  it('errors are displayed', () => {
    const rules: ValidationRules<Data> = {
      mode: 'ON_CHANGE',
      validations: {
        value: {
          required: {
            value: true,
            message: 'value is required',
          },
        },
      },
    };
    render(<TestComponent initialData={{ value: 'initial' }} rules={rules} />);
    expect(screen.getByText(/initial/)).toBeInTheDocument();
  });
});

describe('OnChange updates the hooks internal state', () => {
  beforeEach(() => render(<TestComponent initialData={{ value: '' }} />));

  it('onChange updates data', () => {
    expect(screen.queryByText(/foo/)).not.toBeInTheDocument();
    userEvent.type(screen.getByTestId('test-input'), 'foo');
    expect(screen.getByText(/foo/)).toBeInTheDocument();
  });
});

export default TestComponent;
