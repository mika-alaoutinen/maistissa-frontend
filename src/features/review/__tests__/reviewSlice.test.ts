import reducer, {
  ReviewState, sortAsc, sortDesc, sortWineAsc, sortWineDesc,
} from '../reviewSlice';
import { reviews } from '../../../tests/testdata';

describe('Review reducer', () => {
  it('should handle initial state', () => {
    const initialState: ReviewState = {
      reviews: [],
      status: 'idle',
    };
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});

describe('Sorting reviews', () => {
  const previousState: ReviewState = {
    reviews,
    status: 'idle',
  };

  it('sortAsc sorts reviews in ascending order', () => {
    const state = reducer(previousState, sortAsc('author'));
    const authors = state.reviews.map((review) => review.author);
    expect(authors).toEqual(['Kukko Pena', 'Pekka Kana']);
  });

  it('sortDesc sorts reviews in descending order', () => {
    const state = reducer(previousState, sortDesc('date'));
    const dates = state.reviews.map((review) => review.date);
    expect(dates).toEqual(['2020-01-02', '2020-01-01']);
  });

  it('sortWineAsc sorts reviews in ascending order by wine name', () => {
    const state = reducer(previousState, sortWineAsc());
    const wineNames = state.reviews.map((review) => review.wine?.name);
    expect(wineNames).toEqual(['Red wine 1', 'White wine 1']);
  });

  it('sortWineDesc sorts reviews in descending order by wine name', () => {
    const state = reducer(previousState, sortWineDesc());
    const wineNames = state.reviews.map((review) => review.wine?.name);
    expect(wineNames).toEqual(['White wine 1', 'Red wine 1']);
  });
});
