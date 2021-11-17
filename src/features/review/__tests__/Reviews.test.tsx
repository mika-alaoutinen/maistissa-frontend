import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore } from '../../../tests/testutils';
import Reviews from '../Reviews';

type ReviewInfo = {
  author: string,
  date: string,
  rating: number,
  review: string,
};

const verifyReviewIsRendered = (review: ReviewInfo): void => {
  Object
    .values(review)
    .map((value) => screen.getByText(value))
    .forEach((html) => expect(html).toBeInTheDocument());
};

const getFirstRow = (container: HTMLElement): Element => {
  const th = container.querySelector('tbody > tr > th');
  if (!th) {
    throw Error('Could not find a table row');
  }
  return th;
};

describe('Review information is presented as a table', () => {
  beforeEach(() => renderWithStore(<Reviews />));

  it('renders headers', () => {
    ['Date', 'Author', 'Review', 'Rating', 'Wine']
      .map((header) => screen.getByText(header))
      .forEach((html) => expect(html).toBeInTheDocument());
  });

  it('renders two reviews in a table', () => {
    const review1: ReviewInfo = {
      author: 'Pekka Kana',
      date: '2020-01-01',
      review: 'First review',
      rating: 4,
    };

    const review2: ReviewInfo = {
      author: 'Kukko Pena',
      date: '2020-01-02',
      review: 'Another review',
      rating: 2,
    };

    verifyReviewIsRendered(review1);
    verifyReviewIsRendered(review2);
    expect(screen.getAllByText(/White wine 1/).length).toBe(1);
    expect(screen.getAllByText(/Red wine 1/).length).toBe(1);
  });
});

describe('Clicking on headers sorts reviews', () => {
  it('sort reviews by author', () => {
    const { container } = renderWithStore(<Reviews />);
    const initialReviewAuthor = getFirstRow(container).firstChild?.textContent;

    // Sort reviews and check that the first row has different review
    fireEvent.click(screen.getByText(/Author/));
    const reviewAuthorAfterSorting = getFirstRow(container).firstChild?.textContent;

    expect(initialReviewAuthor).not.toEqual(reviewAuthorAfterSorting);
  });
});
