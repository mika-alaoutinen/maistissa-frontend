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

const typeIntoInput = async (text: string) => {
  await userEvent.type(screen.getByTestId('test-input'), text);
};

const clearInput = async () => {
  await userEvent.clear(screen.getByTestId('test-input'));
};

describe('Data is displayed', () => {
  it('data is displayed', () => {
    render(<TestComponent initialData={{ value: 'initial' }} />);
    expect(screen.getByText(/initial/)).toBeInTheDocument();
  });
});

describe('Errors are displayed based on given validation rules', () => {
  it('error is displayed when required field is empty', async () => {
    render(<TestComponent initialData={{ value: 'initial' }} rules={validationRequired} />);
    expect(screen.queryByText(/required/)).not.toBeInTheDocument();

    await typeIntoInput('foo');
    await clearInput();
    expect(screen.getByText(/required/)).toBeInTheDocument();
  });

  it('error is displayed when custom validation function fails', async () => {
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

    await typeIntoInput('f');
    expect(screen.queryByText(/failed/)).not.toBeInTheDocument();

    await typeIntoInput('o');
    expect(screen.getByText(/failed/)).toBeInTheDocument();
  });
});

describe('IsValid can be used to manually validate the form', () => {
  it('isValid validates the form', async () => {
    render(<TestComponent initialData={{ value: '' }} rules={validationRequired} />);
    await userEvent.click(screen.getByText('Validate'));
    expect(screen.getByText(/required/)).toBeInTheDocument();
  });
});

describe('OnChange updates the hooks internal state', () => {
  it('onChange updates data', async () => {
    render(<TestComponent initialData={{ value: '' }} />);
    expect(screen.queryByText(/foo/)).not.toBeInTheDocument();

    await typeIntoInput('foo');
    expect(screen.getByText(/foo/)).toBeInTheDocument();
  });
});

describe('OnSubmit is used to validate and submit the form', () => {
  const submitHandler = jest.fn();

  const clickSubmit = async () => {
    await userEvent.click(screen.getByText('Submit'));
  };

  it('onSubmit calls submit handler function that is given as parameter', async () => {
    render(<TestComponent initialData={{ value: '' }} submitHandler={submitHandler} />);
    await clickSubmit();
    expect(submitHandler).toHaveBeenCalledTimes(1);
  });

  it('onSubmit validates form before submitting if there are validation rules', async () => {
    render(<TestComponent
      initialData={{ value: '' }}
      rules={validationRequired}
      submitHandler={submitHandler}
    />);
    await clickSubmit();
    expect(submitHandler).not.toHaveBeenCalled();
  });
});

describe('ResetForm resets form to its initial state', () => {
  it('value field is reset', async () => {
    render(<TestComponent initialData={{ value: 'initial' }} />);

    await clearInput();
    await typeIntoInput('foo');
    expect(screen.getByText(/foo/)).toBeInTheDocument();

    await userEvent.click(screen.getByText('Reset'));
    expect(screen.getByText(/initial/)).toBeInTheDocument();
  });
});
