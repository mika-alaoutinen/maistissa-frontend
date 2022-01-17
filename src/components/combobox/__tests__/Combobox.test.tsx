import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Combobox from '../Combobox';

const onChangeMock = jest.fn();

const clickDropdown = (): void => {
  userEvent.click(screen.getByTestId('dropdown-button'));
};

const addFilter = (filter: string): void => {
  userEvent.type(screen.getByLabelText('input-label'), filter);
};

describe('Should render component', () => {
  render(<Combobox
    id="input-id"
    label="input-label"
    onChange={onChangeMock}
    options={['opt a', 'opt b', 'opt c']}
    values={[]}
  />);

  it('should display input and button on component render', () => {
    expect(screen.getByLabelText('input-label')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('Dropdown should open and close', () => {
  beforeEach(() => {
    render(<Combobox
      id="input-id"
      label="input-label"
      onChange={onChangeMock}
      options={['opt a', 'opt b', 'opt c']}
      values={[]}
    />);
  });

  it('clicking button opens and closes dropdown', () => {
    clickDropdown();
    ['opt a', 'opt b', 'opt c']
      .map((opt) => screen.getByText(opt))
      .forEach((li) => expect(li).toBeInTheDocument());

    clickDropdown();
    expect(screen.queryByText('opt a')).not.toBeInTheDocument();
  });

  it('adding a filter automatically opens dropdown', () => {
    addFilter('a');
    expect(screen.getByText('opt a')).toBeInTheDocument();
  });
});

describe('Input filters available options', () => {
  beforeEach(() => {
    render(<Combobox
      id="input-id"
      label="input-label"
      onChange={onChangeMock}
      options={['opt a', 'opt b', 'opt c']}
      values={[]}
    />);
  });

  it('should only show "opt a" when filtered', () => {
    addFilter('a');
    expect(screen.getByText('opt a')).toBeInTheDocument();
    expect(screen.queryByText('opt b')).not.toBeInTheDocument();
    expect(screen.queryByText('opt c')).not.toBeInTheDocument();
  });
});

describe('Options in dropdown can be selected and unselected', () => {
  it('selected options are shown as pills', () => {
    render(<Combobox
      id="input-id"
      label="input-label"
      onChange={onChangeMock}
      options={['opt a', 'opt b', 'opt c']}
      values={['opt a']}
    />);

    const selectedItem = within(screen.getByTestId('selected_items')).getByText('opt a');
    expect(selectedItem).toBeInTheDocument();
  });

  it('clicking on an option in dropdown triggers onChange', () => {
    render(<Combobox
      id="input-id"
      label="input-label"
      onChange={onChangeMock}
      options={['opt a', 'opt b', 'opt c']}
      values={[]}
    />);

    clickDropdown();
    userEvent.click(screen.getByText('opt a'));
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(['opt a']);
  });

  it('clicking on selected option triggers onChange', () => {
    render(<Combobox
      id="input-id"
      label="input-label"
      onChange={onChangeMock}
      options={['opt a', 'opt b', 'opt c']}
      values={['opt a']}
    />);

    const removeSelectedButton = within(screen.getByTestId('selected_items')).getByRole('button');
    userEvent.click(removeSelectedButton);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith([]);
  });
});
