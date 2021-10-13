import { Review } from '../features/review/reviewAPI';
import { Wine } from '../features/wine/wineAPI';
import { RootState } from './store';

const selectReviews = (state: RootState): Review[] => state.reviews.reviews;
const selectWines = (state: RootState): Wine[] => state.wines.wines;

export { selectReviews, selectWines };
