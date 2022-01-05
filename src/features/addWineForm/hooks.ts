import { useAppDispatch } from '../../app/hooks';
import { NewWine, Wine, WineType } from '../../api/wineAPI';
import { addWine } from '../../app/wineSlice';
import { useForm } from '../../hooks/useForm';

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
  const { data, setData, resetForm } = useForm<NewWine>(initialState);
  return {
    wine: data,
    setData,
    resetForm,
  };
};
