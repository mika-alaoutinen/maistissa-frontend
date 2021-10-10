import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import wineReducer, { WineState } from "../features/wine/wineSlice";
import { wines } from "./testdata";

export const initRootState = (): RootState => {
  const wineState: WineState = {
    wines,
    status: "idle",
  };

  return {
    wines: wineState,
  };
};

/**
 * Redux store with preloaded test data
 * @returns redux store
 */
export const initStore = (): EnhancedStore<{ wines: WineState }> =>
  configureStore({
    reducer: {
      wines: wineReducer,
    },
    preloadedState: initRootState(),
  });
