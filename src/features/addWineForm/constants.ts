import { NewWine, WineType } from '../../api/wineAPI';
import { ValidationRules } from '../form/validation';

export const initialState: NewWine = {
  name: '',
  type: WineType.OTHER,
  country: '',
  price: 0.00,
  volume: 0.00,
  description: [],
  foodPairings: [],
  url: '',
};

export const validationRules: ValidationRules<NewWine> = {
  name: {
    required: {
      value: true,
      message: 'Name is required',
    },
  },
  type: {},
  country: {
    required: {
      value: true,
      message: 'Country is required',
    },
    valid: {
      func: (countryName) => countryName && String(countryName).length >= 4,
      message: 'Min length is 4 characters',
    },
  },
  price: {
    valid: {
      func: (price) => Number(price) > 1,
      message: 'Price should be > 1',
    },
  },
  volume: {},
  description: {},
  foodPairings: {},
  url: {},
};
