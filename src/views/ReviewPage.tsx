import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectReviews } from '../app/selectors';
import Reviews from '../features/review/Reviews';
import { fetchReviews } from '../features/review/reviewSlice';

const ReviewPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectReviews).length;

  useEffect(() => {
    void dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <div>
      <h2>{`Reviews page (${count} reviews)`}</h2>
      <Reviews />
    </div>
  );
};

export default ReviewPage;
