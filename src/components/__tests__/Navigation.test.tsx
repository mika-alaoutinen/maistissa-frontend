import React from 'react';
import { screen } from '@testing-library/react';
import Navigation from '../Navigation';
import { renderWithRouter } from '../../tests/testutils';

describe('Navigation has links to application views', () => {
  it('has two navigation links', () => {
    const { container } = renderWithRouter(<Navigation />);
    expect(container.querySelectorAll('nav > a').length).toBe(2);
  });

  it('displays link texts correctly', () => {
    renderWithRouter(<Navigation />);
    ['Reviews', 'Wines'].forEach((navText) => expect(screen.getByText(navText)).toBeInTheDocument());
  });

  it('links point to correct hrefs', () => {
    const { container } = renderWithRouter(<Navigation />);
    const expectedHrefs = ['/reviews', '/wines'];

    Array
      .from(container.querySelectorAll('nav > a'))
      .map((link) => link.getAttribute('href'))
      .forEach((href) => expect(expectedHrefs).toContain(href));
  });
});
