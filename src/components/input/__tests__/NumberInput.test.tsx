import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberInput from '../NumberInput';

const onChangeMock = jest.fn();

beforeEach(() => render(
  <NumberInput
    id="input-id"
    label="input label"
    onChange={onChangeMock}
    value={10}
  />,
));

describe('Component renders correctly', () => {
  it('component has a number input field', () => {
    expect(screen.getByRole('spinbutton', { name: 'input label' })).toBeInTheDocument();
  });

  it('input has a label and value', () => {
    expect(screen.getByLabelText('input label')).toHaveValue(10);
  });
});

describe('Component interactions', () => {
  it('input passes change events via onChange function', () => {
    userEvent.type(screen.getByLabelText('input label'), '20');
    expect(onChangeMock).toHaveBeenCalledTimes(2);
  });
});
