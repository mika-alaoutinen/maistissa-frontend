import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RootState } from '../app/store';
import reviewReducer, { ReviewState } from '../app/reviewSlice';
import wineReducer, { WineState } from '../app/wineSlice';
import wineInfoReducer, { WineInfoState } from '../features/wineInfo/wineInfoSlice';
import { reviews, wines } from './testdata';

export const initRootState = (): RootState => {
  const reviewState: ReviewState = {
    sorted: {
      direction: 'unsorted',
    },
    status: 'idle',
    reviews,
  };

  const wineState: WineState = {
    sorted: {
      direction: 'unsorted',
    },
    status: 'idle',
    wines,
  };

  const wineInfoState: WineInfoState = {
    countries: ['Italy', 'Spain'],
    descriptions: ['dry', 'aromatic', 'full bodied', 'rich'],
    foodPairings: ['white meat', 'barbeque'],
  };

  return {
    reviews: reviewState,
    wines: wineState,
    wineInfo: wineInfoState,
  };
};

/**
 * Redux store with preloaded test data
 * @returns redux store
 */
export const initStore = (): EnhancedStore<{ wines: WineState }> => configureStore({
  reducer: {
    reviews: reviewReducer,
    wines: wineReducer,
    wineInfo: wineInfoReducer,
  },
  preloadedState: initRootState(),
});

export const renderWithStore = (component: JSX.Element): RenderResult => render(
  <Provider store={initStore()}>
    {component}
  </Provider>,
);

export const renderWithRouter = (component: JSX.Element): RenderResult => render(
  <Router>
    {component}
  </Router>,
);
