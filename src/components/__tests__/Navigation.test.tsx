import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Navigation from '../Navigation';

describe('Navigation has links to application views', () => {
  it('has two navigation links', () => {
    const { container } = render(
      <Router>
        <Navigation />
      </Router>,
    );

    expect(container.querySelectorAll('nav > a').length).toBe(2);
  });

  it('displays link texts correctly', () => {
    render(
      <Router>
        <Navigation />
      </Router>,
    );

    ['Reviews', 'Wines'].forEach((navText) => expect(screen.getByText(navText)).toBeInTheDocument());
  });

  it('links point to correct hrefs', () => {
    const { container } = render(
      <Router>
        <Navigation />
      </Router>,
    );

    const expectedHrefs = ['/reviews', '/wines'];

    Array
      .from(container.querySelectorAll('nav > a'))
      .map((link) => link.getAttribute('href'))
      .forEach((href) => expect(expectedHrefs).toContain(href));
  });
});
