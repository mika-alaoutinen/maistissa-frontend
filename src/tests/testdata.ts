import { Review } from '../features/review/reviewAPI';
import { Wine, WineType } from '../features/wine/wineAPI';

export const reviews: Review[] = [
  {
    id: 1,
    author: 'Pekka Kana',
    date: '2020-01-01',
    reviewText: 'Review of White wine 1',
    rating: 4,
  },
  {
    id: 2,
    author: 'Kukko Pena',
    date: '2020-01-02',
    reviewText: 'Another review of White wine 1',
    rating: 2,
  },
];

export const wines: Wine[] = [
  {
    id: 1,
    name: 'White wine 1',
    type: WineType.WHITE,
    country: 'Spain',
    price: 10.5,
    volume: 0.75,
    description: ['dry', 'aromatic'],
    foodPairings: ['white meat'],
    url: '',
  },
  {
    id: 2,
    name: 'Red wine 1',
    type: WineType.RED,
    country: 'Italy',
    price: 33.5,
    volume: 3,
    description: ['full bodied', 'rich'],
    foodPairings: ['barbeque'],
    url: '',
  },
];
