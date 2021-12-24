import { ReviewState } from './reviewSlice';
import { WineState } from './wineSlice';
import { WineInfoState } from '../features/wineInfo/wineInfoSlice';
import { RootState } from './store';

const selectReviews = (state: RootState): ReviewState => state.reviews;
const selectWines = (state: RootState): WineState => state.wines;
const selectWineInfo = (state: RootState): WineInfoState => state.wineInfo;

export {
  selectReviews, selectWines, selectWineInfo,
};
