import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TestComponent, { Data } from './TestComponent';
import { ValidationRules } from '../validation';

const typeIntoInput = (text: string): void => {
  userEvent.type(screen.getByTestId('test-input'), text);
};

describe('Data is displayed', () => {
  it('data is displayed', () => {
    render(<TestComponent initialData={{ value: 'initial' }} />);
    expect(screen.getByText(/initial/)).toBeInTheDocument();
  });
});

describe('Errors are displayed based on given validation rules', () => {
  it('error is displayed when required field is empty', () => {
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

    render(<TestComponent initialData={{ value: '' }} rules={rules} />);
    expect(screen.queryByText(/required/)).not.toBeInTheDocument();

    typeIntoInput('foo');
    userEvent.clear(screen.getByTestId('test-input'));
    expect(screen.getByText(/required/)).toBeInTheDocument();
  });

  it('error is displayed when custom validation function fails', () => {
    const rules: ValidationRules<Data> = {
      mode: 'ON_CHANGE',
      validations: {
        value: {
          valid: {
            func: (value) => value.length < 2,
            message: 'validation failed',
          },
        },
      },
    };

    render(<TestComponent initialData={{ value: '' }} rules={rules} />);

    typeIntoInput('f');
    expect(screen.queryByText(/failed/)).not.toBeInTheDocument();

    typeIntoInput('o');
    expect(screen.getByText(/failed/)).toBeInTheDocument();
  });
});

describe('OnChange updates the hooks internal state', () => {
  it('onChange updates data', () => {
    render(<TestComponent initialData={{ value: '' }} />);
    expect(screen.queryByText(/foo/)).not.toBeInTheDocument();

    typeIntoInput('foo');
    expect(screen.getByText(/foo/)).toBeInTheDocument();
  });
});

describe('OnSubmit is used to validate and submit the form', () => {
  const clickSubmit = (): void => {
    userEvent.click(screen.getByText('Submit'));
  };

  it('onSubmit calls submit handler function that is given as parameter', () => {
    const onSubmit = jest.fn();
    render(<TestComponent initialData={{ value: '' }} onSubmit={onSubmit} />);

    clickSubmit();
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
