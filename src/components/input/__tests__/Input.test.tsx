import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

const onChangeMock = jest.fn();

describe('Component renders correctly', () => {
  beforeEach(() => render(
    <Input id="input-id" label="input label" onChange={onChangeMock} />,
  ));

  it('component has an input text field', () => {
    expect(screen.getByRole('textbox', { name: 'input label' })).toBeInTheDocument();
  });

  it('input has a label', () => {
    expect(screen.getByLabelText('input label')).toBeInTheDocument();
  });

  it('input has a placeholder text', () => {
    expect(screen.getByPlaceholderText('input label')).toBeInTheDocument();
  });
});

describe('Component interactions', () => {
  beforeEach(() => render(
    <Input id="input-id" label="input label" onChange={onChangeMock} />,
  ));

  it('user can type in the input text field', async () => {
    await userEvent.type(screen.getByLabelText('input label'), 'test input');
    expect(screen.getByDisplayValue('test input')).toBeInTheDocument();
  });

  it('input passes change events via onChange function', async () => {
    await userEvent.type(screen.getByLabelText('input label'), 'test');
    expect(onChangeMock).toHaveBeenCalledTimes(4);
  });
});

describe('Validation errors', () => {
  beforeEach(() => render(
    <Input
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
