import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TestComponent, { Data } from './TestComponent';
import { ValidationRules } from '../validation';

const validationRequired: ValidationRules<Data> = {
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
    render(<TestComponent initialData={{ value: 'initial' }} rules={validationRequired} />);
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

  it('onChange can be given a sanitize function to give data correct types', () => {
    render(<TestComponent
      initialData={{ value: 'fooba' }}
      sanitizeFn={(s) => s.toUpperCase()}
    />);
    expect(screen.getByText(/fooba/)).toBeInTheDocument();

    typeIntoInput('r');
    expect(screen.getByText(/FOOBAR/)).toBeInTheDocument();
  });
});

describe('OnSubmit is used to validate and submit the form', () => {
  const submitHandler = jest.fn();

  const clickSubmit = (): void => {
    userEvent.click(screen.getByText('Submit'));
  };

  it('onSubmit calls submit handler function that is given as parameter', () => {
    render(<TestComponent initialData={{ value: '' }} submitHandler={submitHandler} />);
    clickSubmit();
    expect(submitHandler).toHaveBeenCalledTimes(1);
  });

  it('onSubmit validates form before submitting if there are validation rules', () => {
    render(<TestComponent
      initialData={{ value: '' }}
      rules={validationRequired}
      submitHandler={submitHandler}
    />);
    clickSubmit();
    expect(submitHandler).not.toHaveBeenCalled();
  });
});
