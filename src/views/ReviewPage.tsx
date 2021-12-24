import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectReviews } from '../app/selectors';
import ReviewTable from '../features/reviewTable/ReviewTable';
import { fetchReviews } from '../app/reviewSlice';

const ReviewPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { reviews } = useAppSelector(selectReviews);

  useEffect(() => {
    void dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <div>
      <h2>{`Reviews page (${reviews.length} reviews)`}</h2>
      <ReviewTable />
    </div>
  );
};

export default ReviewPage;
