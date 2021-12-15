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

type AddNewWine = {
  wine: NewWine,
  setName: (name: string) => void;
  setType: (type: NewWine.type) => void;
  setCountry: (country: string) => void;
  setPrice: (price: number) => void;
  setVolume: (volume: number) => void;
  setDescription: (description: string[]) => void;
  setFoodPairings: (foodPairings: string[]) => void;
  setUrl: (url: string) => void;
};

export const useAddNewWine = (): AddNewWine => {
  const [wine, setWine] = useState<NewWine>(initialState);

  const setName = (name: string): void => {
    setWine({ ...wine, name });
  };

  const setType = (type: NewWine.type): void => {
    setWine({ ...wine, type });
  };

  const setCountry = (country: string): void => {
    setWine({ ...wine, country });
  };

  const setPrice = (price: number): void => {
    setWine({ ...wine, price });
  };

  const setVolume = (volume: number): void => {
    setWine({ ...wine, volume });
  };

  const setDescription = (description: string[]): void => {
    setWine({ ...wine, description });
  };

  const setFoodPairings = (foodPairings: string[]): void => {
    setWine({ ...wine, foodPairings });
  };

  const setUrl = (url: string): void => {
    setWine({ ...wine, url });
  };

  return {
    wine,
    setName,
    setType,
    setCountry,
    setPrice,
    setVolume,
    setDescription,
    setFoodPairings,
    setUrl,
  };
};

export default { useAddNewWine };
