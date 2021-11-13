import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Header';

const appName = 'Maistissa';

describe('Header is rendered', () => {
  it('has text Maistissa', () => {
    render(
      <Router>
        <Header />
      </Router>,
    );
    expect(screen.getByText(appName)).toBeInTheDocument();
  });

  it('clicking on header directs to the home page', () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    expect(screen.getByText(appName).getAttribute('href')).toBe('/');
  });
});
