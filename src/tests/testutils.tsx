import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RootState } from '../app/store';
import reviewReducer, { ReviewState } from '../features/review/reviewSlice';
import wineReducer, { WineState } from '../features/wine/wineSlice';
import { reviews, wines } from './testdata';

export const initRootState = (): RootState => {
  const reviewState: ReviewState = {
    reviews,
    status: 'idle',
  };

  const wineState: WineState = {
    sorted: 'unsorted',
    status: 'idle',
    wines,
  };

  return {
    reviews: reviewState,
    wines: wineState,
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
