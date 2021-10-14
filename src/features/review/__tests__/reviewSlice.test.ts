import reviewReducer, { ReviewState } from '../reviewSlice';

describe('Review reducer', () => {
  it('should handle initial state', () => {
    const initialState: ReviewState = {
      reviews: [],
      status: 'idle',
    };
    expect(reviewReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});
