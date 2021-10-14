import wineReducer, { WineState } from '../wineSlice';

describe('Wine reducer', () => {
  it('should handle initial state', () => {
    const initialState: WineState = {
      wines: [],
      status: 'idle',
    };
    expect(wineReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});
