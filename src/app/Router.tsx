import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../views/HomePage';
import ReviewPage from '../views/ReviewPage';
import WinePage from '../views/WinePage';

export interface Link {
  text: string
  to: string
}

const home: Link = { text: 'Home', to: '/' };
const reviews: Link = { text: 'Reviews', to: '/reviews' };
const wines: Link = { text: 'Wines', to: '/wines' };

const Router: React.FC = () => (
  <Routes>
    <Route path={home.to} element={<HomePage />} />
    <Route path={reviews.to} element={<ReviewPage />} />
    <Route path={wines.to} element={<WinePage />} />
  </Routes>
);

export const links = [home, reviews, wines];
export default Router;
