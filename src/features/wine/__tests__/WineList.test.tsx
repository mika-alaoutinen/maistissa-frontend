import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { initStore } from '../../../tests/testutils';
import WineList from '../WineList';

describe('Displays wine names', () => {
  const store = initStore();

  it('renders two wine names as paragraphs', () => {
    render(
      <Provider store={store}>
        <WineList />
      </Provider>,
    );

    expect(screen.getAllByText(/wine/)).toHaveLength(2);
  });
});
