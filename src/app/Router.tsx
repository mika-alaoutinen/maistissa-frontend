import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddWinePage from '../views/AddWinePage';
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
const addWine: Link = { text: 'Add wine', to: 'add-wine' };

const Router: React.FC = () => (
  <Routes>
    <Route path={home.to} element={<HomePage />} />
    <Route path={reviews.to} element={<ReviewPage />} />
    <Route path={wines.to} element={<WinePage />} />
    <Route path={addWine.to} element={<AddWinePage />} />
  </Routes>
);

export const links = [home, reviews, wines, addWine];
export default Router;
