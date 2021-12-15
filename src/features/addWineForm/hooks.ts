import { useState } from 'react';
import { NewWine, WineType } from '../wine/wineAPI';

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

type NewWineFn = {
  wine: NewWine,
  setName: (name: string) => void;
};

const useAddNewWine = (): NewWineFn => {
  const [wine, setWine] = useState<NewWine>(initialState);

  const setName = (name: string): void => {
    setWine({
      ...wine,
      name,
    });
  };

  return {
    wine,
    setName,
  };
};

export default { useAddNewWine };
