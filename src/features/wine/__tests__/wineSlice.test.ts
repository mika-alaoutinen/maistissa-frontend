import reducer, { sortAsc, sortDesc, WineState } from '../wineSlice';
import { wines as testdata } from '../../../tests/testdata';

describe('Wine reducer', () => {
  it('should handle initial state', () => {
    const initialState: WineState = {
      sorted: {
        direction: 'unsorted',
      },
      status: 'idle',
      wines: [],
    };
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});

describe('Sorting wines', () => {
  const previousState: WineState = {
    sorted: {
      direction: 'unsorted',
    },
    status: 'idle',
    wines: testdata,
  };

  it('sortAsc sorts wines in ascending order', () => {
    const { sorted, wines } = reducer(previousState, sortAsc('country'));
    const countries = wines.map((wine) => wine.country);
    expect(countries).toEqual(['Italy', 'Spain']);
    expect(sorted).toEqual({
      direction: 'asc',
      key: 'country',
    });
  });

  it('sortDesc sorts wines in descending order', () => {
    const { sorted, wines } = reducer(previousState, sortDesc('volume'));
    const volumes = wines.map((wine) => wine.volume);
    expect(volumes).toEqual([3, 0.75]);
    expect(sorted).toEqual({
      direction: 'desc',
      key: 'volume',
    });
  });
});
