import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberInput from '../NumberInput';

const onChangeMock = jest.fn();

describe('Component renders correctly', () => {
  beforeEach(() => render(
    <NumberInput
      id="input-id"
      label="input label"
      onChange={onChangeMock}
      value={10}
    />,
  ));

  it('component has a number input field', () => {
    expect(screen.getByRole('spinbutton', { name: 'input label' })).toBeInTheDocument();
  });

  it('input has a label and value', () => {
    expect(screen.getByLabelText('input label')).toHaveValue(10);
  });
});

describe('Component interactions', () => {
  beforeEach(() => render(
    <NumberInput id="input-id" label="input label" onChange={onChangeMock} />,
  ));

  it('input passes change events via onChange function', () => {
    userEvent.type(screen.getByLabelText('input label'), '20');
    expect(onChangeMock).toHaveBeenCalledTimes(2);
  });

  it('resets value to 0 if empty value is given', () => {
    const input = screen.getByLabelText('input label');
    userEvent.clear(input);
    expect(input).toHaveValue(0);
  });
});

describe('Validation errors', () => {
  beforeEach(() => render(
    <NumberInput
      id="input-id"
      label="input label"
      onChange={onChangeMock}
      validationErrors={['validation error']}
    />,
  ));

  it('component displays a validation error', () => {
    expect(screen.getByText('validation error')).toBeInTheDocument();
  });
});
