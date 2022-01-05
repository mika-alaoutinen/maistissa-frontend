import { useAppDispatch } from '../../app/hooks';
import { NewWine, Wine, WineType } from '../../api/wineAPI';
import { addWine } from '../../app/wineSlice';
import { Validations, useForm } from '../../hooks/useForm';

const initialState: NewWine = {
  name: '',
  type: WineType.OTHER,
  country: '',
  price: 0.00,
  volume: 0.00,
  description: [],
  foodPairings: [],
  url: '',
};

export const useAddWine = (): (wine: NewWine) => Promise<Wine> => {
  const dispatch = useAppDispatch();

  return async (wine: NewWine) => {
    const response = dispatch(addWine(wine));
    // Note that unwrap can throw an error!
    return response.unwrap();
  };
};

export const useWineForm = () => {
  const validations: Validations<NewWine> = {
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

  const {
    data, setData, resetForm, validate,
  } = useForm<NewWine>(initialState, validations);

  return {
    wine: data,
    setData,
    resetForm,
    validate,
  };
};
