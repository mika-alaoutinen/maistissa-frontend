import { Review } from './reviewAPI';

export const sortByWineName = (reviews: Review[], direction: 'ASC' | 'DESC'): Review[] => {
  const compare = (a: Review, b: Review): number => {
    const valueA = a.wine?.name ?? '';
    const valueB = b.wine?.name ?? '';

    if (valueA === valueB) {
      return 0;
    }

    if (valueA > valueB) {
      return direction === 'ASC' ? 1 : -1;
    }

    return direction === 'ASC' ? -1 : 1;
  };

  return reviews.slice().sort(compare);
};

export default { sortByWineName };
