import { screen } from '@testing-library/react';
import React from 'react';
import Header from '../Header';
import { renderWithRouter } from '../../../tests/testutils';

describe('Header displays application name', () => {
  it('header has text Maistissa', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Maistissa')).toBeInTheDocument();
  });

  it('Maistissa header has link to home page', () => {
    const { container } = renderWithRouter(<Header />);
    const href = container.querySelector('#home-link')?.getAttribute('href');
    expect(href).toBe('/');
  });
});

describe('Header has navigation links', () => {
  it('has three navigation links', () => {
    const { container } = renderWithRouter(<Header />);
    expect(container.querySelectorAll('nav > a').length).toBe(3);
  });

  it('displays link texts correctly', () => {
    renderWithRouter(<Header />);
    ['Reviews', 'Wines']
      .map((navText) => screen.getByText(navText))
      .forEach((htmlElement) => expect(htmlElement).toBeInTheDocument());
  });

  it('links point to correct hrefs', () => {
    const { container } = renderWithRouter(<Header />);
    const expectedHrefs = ['/reviews', '/wines', '/add-wine'];

    Array
      .from(container.querySelectorAll('nav > a'))
      .map((link) => link.getAttribute('href'))
      .forEach((href) => expect(expectedHrefs).toContain(href));
  });
});

describe('Header has a login button', () => {
  it('button has text login', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
