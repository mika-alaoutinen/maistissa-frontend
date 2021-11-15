import { Review, ReviewProps } from './reviewAPI';

const sortAsc = (a: Review, b: Review, key: ReviewProps): number => {
  const aValue = a[key] ?? -1;
  const bValue = b[key] ?? -1;
  if (aValue < bValue) return -1;
  if (aValue > bValue) return 1;
  return 0;
};

const sortDesc = (a: Review, b: Review, key: ReviewProps): number => {
  const aValue = a[key] ?? -1;
  const bValue = b[key] ?? -1;
  if (aValue < bValue) return 1;
  if (aValue > bValue) return -1;
  return 0;
};

export const sortAscending = (reviews: Review[], sortBy: ReviewProps): Review[] => reviews
  .slice()
  .sort((r1, r2) => sortAsc(r1, r2, sortBy));

export const sortDescending = (reviews: Review[], sortBy: ReviewProps): Review[] => reviews
  .slice()
  .sort((r1, r2) => sortDesc(r1, r2, sortBy));

export default { sortAscending, sortDescending };
