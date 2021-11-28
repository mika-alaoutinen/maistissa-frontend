import reducer, { WineInfoState } from '../wineInfoSlice';

describe('Wine info reducer', () => {
  it('should handle initial state', () => {
    const initialState: WineInfoState = {
      countries: [],
    };
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});
