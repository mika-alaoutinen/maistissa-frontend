import reviewReducer, { ReviewState, sortAsc, sortDesc } from '../reviewSlice';
import { reviews } from '../../../tests/testdata';

describe('Review reducer', () => {
  it('should handle initial state', () => {
    const initialState: ReviewState = {
      reviews: [],
      status: 'idle',
    };
    expect(reviewReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});

describe('Sorting reviews', () => {
  const previousState: ReviewState = {
    reviews,
    status: 'idle',
  };

  it('sortAsc sorts reviews in ascending order', () => {
    const state = reviewReducer(previousState, sortAsc('author'));
    const authors = state.reviews.map((review) => review.author);
    expect(authors).toEqual(['Kukko Pena', 'Pekka Kana']);
  });

  it('sortDesc sorts reviews in descending order', () => {
    const state = reviewReducer(previousState, sortDesc('date'));
    const dates = state.reviews.map((review) => review.date);
    expect(dates).toEqual(['2020-01-02', '2020-01-01']);
  });
});
