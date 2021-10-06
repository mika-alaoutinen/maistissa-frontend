import { Wine } from '../generated/models/Wine'

export const wines: Wine[] = [
  {
    id: 1,
    name: 'White wine 1',
    type: Wine.type.WHITE,
    country: 'Spain',
    price: 10.5,
    volume: 0.75,
    description: ['dry', 'aromatic'],
    foodPairings: ['white meat'],
  },
  {
    id: 2,
    name: 'Red wine 1',
    type: Wine.type.RED,
    country: 'Italy',
    price: 33.5,
    volume: 3,
    description: ['full bodied', 'rich'],
    foodPairings: ['barbeque'],
  },
]
