import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginButton from '../LoginButton';

describe('Login button fires a handle login function', () => {
  it('handle login is called on click', () => {
    const handleLogin = jest.fn();
    render(<LoginButton handleLogin={handleLogin} />);
    userEvent.click(screen.getByText('Login'));
    expect(handleLogin).toHaveBeenCalledTimes(1);
  });
});
