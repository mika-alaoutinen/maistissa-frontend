import { Review } from '../api/reviewAPI';
import { Wine, WineType } from '../api/wineAPI';

const white: Wine = {
  id: 1,
  name: 'White wine 1',
  type: WineType.WHITE,
  country: 'Spain',
  price: 10.5,
  volume: 0.75,
  description: ['dry', 'aromatic'],
  foodPairings: ['white meat'],
  url: '',
};

const red: Wine = {
  id: 2,
  name: 'Red wine 1',
  type: WineType.RED,
  country: 'Italy',
  price: 33.5,
  volume: 3,
  description: ['full bodied', 'rich'],
  foodPairings: ['barbeque'],
  url: '',
};

export const wines = [white, red];

export const reviews: Review[] = [
  {
    id: 1,
    author: 'Pekka Kana',
    date: '2020-01-01',
    reviewText: 'First review',
    rating: 4,
    wine: white,
  },
  {
    id: 2,
    author: 'Kukko Pena',
    date: '2020-01-02',
    reviewText: 'Another review',
    rating: 2,
    wine: red,
  },
];
