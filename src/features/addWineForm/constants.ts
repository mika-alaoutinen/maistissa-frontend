import { NewWine, WineType } from '../../api/wineAPI';
import { ValidationRules, Validations } from '../form/validation';

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

const validations: Validations<NewWine> = {
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
      // For some reason the type is inferred incorrectly
      func: (country) => (country ? String(country).length > 3 : false),
      message: 'Min length is 4 characters',
    },
  },
  price: {
    valid: {
      // For some reason the type is inferred incorrectly
      func: (price) => Number(price) > 1,
      message: 'Price should be > 1',
    },
  },
  volume: {},
  description: {},
  foodPairings: {},
  url: {},
};

export const validationRules: ValidationRules<NewWine> = {
  mode: 'ON_CHANGE',
  validations,
};
