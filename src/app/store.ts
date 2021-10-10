import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import wineReducer from "../features/wine/wineSlice";

export const store = configureStore({
  reducer: {
    wines: wineReducer,
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
