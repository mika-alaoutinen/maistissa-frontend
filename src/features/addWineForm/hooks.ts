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

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

type AddNewWine = {
  wine: NewWine,
  setName: (e: ChangeEvent) => void;
  setType: (type: NewWine.type) => void;
  setCountry: (e: SelectEvent) => void;
  setPrice: (e: ChangeEvent) => void;
  setVolume: (e: ChangeEvent) => void;
  setDescription: (e: SelectEvent) => void;
  setFoodPairings: (e: SelectEvent) => void;
  setUrl: (e: ChangeEvent) => void;
};

export const useAddNewWine = (): AddNewWine => {
  const [wine, setWine] = useState<NewWine>(initialState);

  const setName = (e: ChangeEvent): void => {
    const name = e.target.value;
    setWine({ ...wine, name });
  };

  const setType = (type: NewWine.type): void => {
    setWine({ ...wine, type });
  };

  const setCountry = (e: SelectEvent): void => {
    const country = e.target.value;
    setWine({ ...wine, country });
  };

  const setPrice = (e: ChangeEvent): void => {
    const price = parseFloat(e.target.value);
    setWine({ ...wine, price });
  };

  const setVolume = (e: ChangeEvent): void => {
    const volume = parseFloat(e.target.value);
    setWine({ ...wine, volume });
  };

  const setDescription = (e: SelectEvent): void => {
    const description = [e.target.value];
    setWine({ ...wine, description });
  };

  const setFoodPairings = (e: SelectEvent): void => {
    const foodPairings = [e.target.value];
    setWine({ ...wine, foodPairings });
  };

  const setUrl = (e: ChangeEvent): void => {
    const url = e.target.value;
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
