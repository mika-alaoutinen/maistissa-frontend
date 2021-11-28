import reducer, { WineInfoState } from '../wineInfoSlice';

describe('Wine info reducer', () => {
  it('should handle initial state', () => {
    const initialState: WineInfoState = {
      countries: [],
      descriptions: [],
      foodPairings: [],
    };
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});
