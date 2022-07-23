import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SubmitButton from '../SubmitButton';

const onClickMock = jest.fn();

beforeEach(() => render(
  <SubmitButton id="button-id" text="button text" onClick={onClickMock} />,
));

describe('Component renders correctly', () => {
  it('renders a button', () => {
    expect(screen.getByRole('button', { name: 'button text' })).toBeInTheDocument();
  });
});

describe('Component interactions', () => {
  it('clicking on button emits onClick function', async () => {
    await userEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
