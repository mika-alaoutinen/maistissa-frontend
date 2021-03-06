import { initRootState } from '../../tests/testutils';
import { selectReviews, selectWines, selectWineInfo } from '../selectors';

describe('Wine selectors', () => {
  const state = initRootState();

  it('should return all wines', () => {
    const { wines } = selectWines(state);
    expect(wines[0].name).toBe('White wine 1');
    expect(wines[1].name).toBe('Red wine 1');
  });

  it('should return wines\' sorting info', () => {
    const { sorted } = selectWines(state);
    expect(sorted.direction).toBe('unsorted');
    expect(sorted.key).toBeFalsy();
  });
});

describe('Review selectors', () => {
  const state = initRootState();

  it('should return all reviews', () => {
    const { reviews } = selectReviews(state);
    expect(reviews[0].author).toBe('Pekka Kana');
    expect(reviews[1].author).toBe('Kukko Pena');
  });

  it('should return reviews\' sorting info', () => {
    const { sorted } = selectReviews(state);
    expect(sorted.direction).toBe('unsorted');
    expect(sorted.key).toBeFalsy();
  });
});

describe('Wine info selectors', () => {
  const state = initRootState();

  it('should return wine countries', () => {
    const { countries } = selectWineInfo(state);
    expect(countries).toEqual(['Italy', 'Spain']);
  });

  it('should return wine descriptions', () => {
    const { descriptions } = selectWineInfo(state);
    expect(descriptions).toEqual(['dry', 'aromatic', 'full bodied', 'rich']);
  });

  it('should return wine food pairings', () => {
    const { foodPairings } = selectWineInfo(state);
    expect(foodPairings).toEqual(['white meat', 'barbeque']);
  });
});
