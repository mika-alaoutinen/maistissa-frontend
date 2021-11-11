import reducer, { sortAsc, sortDesc, WineState } from '../wineSlice';
import { wines } from '../../../tests/testdata';

describe('Wine reducer', () => {
  it('should handle initial state', () => {
    const initialState: WineState = {
      wines: [],
      status: 'idle',
    };
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});

describe('Sorting wines', () => {
  const previousState: WineState = {
    wines,
    status: 'idle',
  };

  it('sortAsc sorts wines in ascending order', () => {
    const state = reducer(previousState, sortAsc('country'));
    const countries = state.wines.map((wine) => wine.country);
    expect(countries).toEqual(['Italy', 'Spain']);
  });

  it('sortDesc sorts wines in descending order', () => {
    const state = reducer(previousState, sortDesc('volume'));
    const volumes = state.wines.map((wine) => wine.volume);
    expect(volumes).toEqual([3, 0.75]);
  });
});
