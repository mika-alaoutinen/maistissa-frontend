import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import reviewReducer from './reviewSlice';
import wineReducer from './wineSlice';
import wineInfoReducer from '../features/wineInfo/wineInfoSlice';

const store = configureStore({
  reducer: {
    reviews: reviewReducer,
    wines: wineReducer,
    wineInfo: wineInfoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

export default store;
