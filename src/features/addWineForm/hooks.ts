import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { NewWine, Wine, WineType } from '../../api/wineAPI';
import { addWine } from '../../app/wineSlice';

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

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

type AddNewWine = {
  wine: NewWine,
  setData: (key: keyof NewWine) => (e: ChangeEvent) => void;
  resetForm: () => void;
};

export const useWineForm = (): AddNewWine => {
  const [wine, setWine] = useState<NewWine>(initialState);

  const setData = (key: keyof NewWine) => (e: ChangeEvent): void => {
    const editedWine: NewWine = {
      ...wine,
      [key]: e.target.value,
    };
    setWine(editedWine);
  };

  const resetForm = (): void => {
    setWine(initialState);
  };

  return {
    wine,
    setData,
    resetForm,
  };
};

type AddWineHook = (wine: NewWine) => Promise<Wine>;

export const useAddWine = (): AddWineHook => {
  const dispatch = useAppDispatch();

  return async (wine: NewWine) => {
    const response = dispatch(addWine(wine));
    // Note that unwrap can throw an error!
    return response.unwrap();
  };
};
