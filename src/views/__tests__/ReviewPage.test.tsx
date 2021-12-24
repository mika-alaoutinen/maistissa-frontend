import { screen } from '@testing-library/react';
import React from 'react';
import api from '../../api/reviewAPI';
import { reviews } from '../../tests/testdata';
import { renderWithStore } from '../../tests/testutils';
import ReviewPage from '../ReviewPage';

const mockAPI = api as jest.Mocked<typeof api>;
jest.mock('../../api/reviewAPI');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Fetches all reviews on component load', () => {
  it('should dispatch a fetchReviews thunk', async () => {
    mockAPI.getReviews.mockResolvedValue(Promise.resolve(reviews));
    renderWithStore(<ReviewPage />);
    expect(mockAPI.getReviews).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('Reviews page (2 reviews)')).toBeInTheDocument();
  });
});
