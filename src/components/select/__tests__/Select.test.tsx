import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';

const onChangeMock = jest.fn();

const getByLabel = (): HTMLElement => screen.getByLabelText('select label');

beforeEach(() => {
  render(<Select
    id="select-id"
    label="select label"
    onChange={onChangeMock}
    options={['opt a', 'opt b', 'opt c']}
    value=""
  />);
});

describe('Component renders correctly', () => {
  it('component has dropdown select menu', () => {
    expect(screen.getByRole('combobox', { name: 'select label' }));
  });

  it('has a label', () => {
    expect(getByLabel()).toBeInTheDocument();
  });

  it('has default option of "select"', () => {
    const defaultOption = within(getByLabel()).getByText('select');
    expect(defaultOption).toBeInTheDocument();
  });
});

describe('Component interactions', () => {
  it('mouse click opens a dropdown with options', () => {
    const select = getByLabel();
    userEvent.click(select);

    ['opt a', 'opt b', 'opt c']
      .map((option) => within(select).getByText(option))
      .forEach((option) => expect(option).toBeInTheDocument());
  });

  it('selecting an option emits onClick', () => {
    userEvent.selectOptions(getByLabel(), 'opt a');
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
