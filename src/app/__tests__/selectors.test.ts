import { initRootState } from '../../tests/testutils';
import { selectWines } from '../selectors';

describe('Selectors', () => {
  const state = initRootState();

  it('should return all wines', () => {
    const allWines = selectWines(state);
    expect(allWines[0].name).toBe('White wine 1');
    expect(allWines[1].name).toBe('Red wine 1');
  });
});
