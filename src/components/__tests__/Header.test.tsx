import { screen } from '@testing-library/react';
import React from 'react';
import Header from '../header/Header';
import { renderWithRouter } from '../../tests/testutils';

const appName = 'Maistissa';

describe('Header displays application name', () => {
  it('header has text Maistissa', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText(appName)).toBeInTheDocument();
  });

  it('clicking on Maistissa navigates to the home page', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText(appName).getAttribute('href')).toBe('/');
  });
});

describe('Header has navigation links', () => {
  it('has two navigation links', () => {
    const { container } = renderWithRouter(<Header />);
    expect(container.querySelectorAll('nav > a').length).toBe(2);
  });

  it('displays link texts correctly', () => {
    renderWithRouter(<Header />);
    ['Reviews', 'Wines']
      .map((navText) => screen.getByText(navText))
      .forEach((htmlElement) => expect(htmlElement).toBeInTheDocument());
  });

  it('links point to correct hrefs', () => {
    const { container } = renderWithRouter(<Header />);
    const expectedHrefs = ['/reviews', '/wines'];

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
