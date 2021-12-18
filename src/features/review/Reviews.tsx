import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectReviews } from '../../app/selectors';
import { DataTable } from '../../components/index';
import { Column } from '../../components/datatable/types';
import { useSorting } from './hooks';
import { Review } from './reviewAPI';

// Replace Wine object with just wine name
type ReviewWithWineName = Omit<Review, 'wine'> & { wine: string };

const columns: Column<ReviewWithWineName, keyof ReviewWithWineName>[] = [
  {
    key: 'date',
    header: 'Date',
  },
  {
    key: 'author',
    header: 'Author',
  },
  {
    key: 'reviewText',
    header: 'Review',
  },
  {
    key: 'rating',
    header: 'Rating',
  },
  {
    key: 'wine',
    header: 'Wine',
  },
];

const Reviews: React.FC = () => {
  const { reviews, sorted } = useAppSelector(selectReviews);
  const sortingFn = useSorting();

  const reviewsWithWineNames: ReviewWithWineName[] = reviews.map((review) => ({
    ...review,
    wine: review.wine.name,
  }));

  return (
    <DataTable
      columns={columns}
      data={reviewsWithWineNames}
      sorted={sorted}
      sortingFn={sortingFn}
    />
  );
};

export default Reviews;
