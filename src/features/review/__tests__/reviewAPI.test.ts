import api from '../reviewAPI';
import { ReviewsCrudService } from '../../../generated';

describe('API functions call REST services', () => {
  it('getReviews calls ReviewsCrudService', () => {
    const mockFn = jest.fn();
    ReviewsCrudService.getReviews = mockFn;

    void api.getReviews();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
