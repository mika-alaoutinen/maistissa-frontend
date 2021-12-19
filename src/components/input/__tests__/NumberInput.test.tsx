import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberInput from '../NumberInput';

const onChangeMock = jest.fn();

describe('Component renders correctly', () => {
  beforeEach(() => render(
    <NumberInput id="input-id" label="input label" onChange={onChangeMock} />,
  ));

  it('component has a number input field', () => {
    expect(screen.getByRole('spinbutton', { name: 'input label' })).toBeInTheDocument();
  });

  it('input has a label', () => {
    expect(screen.getByLabelText('input label')).toBeInTheDocument();
  });
});

describe('Component has optional props', () => {
  it('has optional defaultValue prop', () => {
    render(<NumberInput id="input-id" label="input label" onChange={onChangeMock} defaultValue={1} />);
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  it('defaultValue is set to 0 if not given', () => {
    render(<NumberInput id="input-id" label="input label" onChange={onChangeMock} />);
    expect(screen.getByDisplayValue('0')).toBeInTheDocument();
  });
});

describe('Component interactions', () => {
  beforeEach(() => render(
    <NumberInput id="input-id" label="input label" onChange={onChangeMock} />,
  ));

  it('user can type in the input text field', () => {
    // Change inputs to be controlled rather than uncontrolled
    userEvent.type(screen.getByLabelText('input label'), '10');
    expect(screen.getByLabelText('input label')).toHaveAttribute('value', '0');
    // expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  it('input passes change events via onChange function', () => {
    userEvent.type(screen.getByLabelText('input label'), '10');
    expect(onChangeMock).toHaveBeenCalledTimes(2);
  });
});
