import { initRootState } from '../../tests/testutils';
import { selectReviews, selectWines } from '../selectors';

describe('Selectors', () => {
  const state = initRootState();

  it('should return all wines', () => {
    const wines = selectWines(state);
    expect(wines[0].name).toBe('White wine 1');
    expect(wines[1].name).toBe('Red wine 1');
  });

  it('should return all reviews', () => {
    const reviews = selectReviews(state);
    expect(reviews[0].author).toBe('Pekka Kana');
    expect(reviews[1].author).toBe('Kukko Pena');
  });
});
