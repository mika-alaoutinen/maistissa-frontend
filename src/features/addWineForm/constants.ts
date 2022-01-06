import { NewWine, WineType } from '../../api/wineAPI';
import { Validations } from '../../hooks/useForm';

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

export const validations: Validations<NewWine> = {
  name: {
    required: {
      value: true,
      message: 'Name is required',
    },
  },
  price: {
    valid: {
      isValid: (price) => Number(price) > 1,
      message: 'Price should be > 1',
    },
  },
};
