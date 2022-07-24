import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioGroup from '../RadioGroup';

const onChangeMock = jest.fn();

describe('Component renders correctly', () => {
  beforeEach(() => render(
    <RadioGroup
      id="radiogroup-id"
      label="radiogroup label"
      onChange={onChangeMock}
      values={['a', 'b', 'c']}
    />,
  ));

  it('component has three radio buttons', () => {
    const radioButtons = within(screen.getByRole('radiogroup')).getAllByRole('radio');
    expect(radioButtons).toHaveLength(3);
  });

  it('radio buttons have labels', () => {
    ['a', 'b', 'c']
      .map((value) => screen.getByLabelText(value))
      .forEach((radioButton) => expect(radioButton).toBeInTheDocument());
  });

  it('radio group has a label', () => {
    expect(screen.getByText('radiogroup label')).toBeInTheDocument();
  });
});

describe('Component interactions', () => {
  beforeEach(() => render(
    <RadioGroup
      id="radiogroup-id"
      label="radiogroup label"
      onChange={onChangeMock}
      values={['a', 'b', 'c']}
    />,
  ));

  it('clicking on label selects radio button', async () => {
    const radioButton = screen.getByLabelText('a');
    expect(radioButton).not.toBeChecked();
    await userEvent.click(screen.getByText('a'));
    expect(radioButton).toBeChecked();
  });

  it('selecting radiobutton unselects previous selection', async () => {
    const radioButtonA = screen.getByLabelText('a');
    await userEvent.click(radioButtonA);
    await userEvent.click(screen.getByLabelText('b'));
    expect(radioButtonA).not.toBeChecked();
  });

  it('selecting radiobutton emits onChange function', async () => {
    await userEvent.click(screen.getByLabelText('c'));
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});

describe('Validation errors', () => {
  beforeEach(() => render(
    <RadioGroup
      id="radiogroup-id"
      label="radiogroup label"
      onChange={onChangeMock}
      values={['a', 'b', 'c']}
      validationErrors={['validation error']}
    />,
  ));

  it('component displays a validation error', () => {
    expect(screen.getByText('validation error')).toBeInTheDocument();
  });
});
