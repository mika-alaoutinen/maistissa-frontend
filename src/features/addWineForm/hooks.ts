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

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

type AddNewWine = {
  wine: NewWine,
  setName: (e: ChangeEvent) => void;
  setType: (e: ChangeEvent) => void;
  setCountry: (e: SelectEvent) => void;
  setPrice: (e: ChangeEvent) => void;
  setVolume: (e: ChangeEvent) => void;
  setDescription: (e: SelectEvent) => void;
  setFoodPairings: (e: SelectEvent) => void;
  setUrl: (e: ChangeEvent) => void;
  resetForm: () => void;
};

const parseWineType = (type: string): NewWine.type => {
  const wineType = Object
    .values(WineType)
    .find((t) => t === type);

  if (!wineType) {
    console.error('Could not parse wine type', type);
    return WineType.OTHER;
  }

  return wineType;
};

export const useWineForm = (): AddNewWine => {
  const [wine, setWine] = useState<NewWine>(initialState);

  const setName = (e: ChangeEvent): void => {
    const name = e.target.value;
    setWine({ ...wine, name });
  };

  const setType = (e: ChangeEvent): void => {
    const type = parseWineType(e.target.value);
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
    const description = wine.description.concat(e.target.value);
    setWine({ ...wine, description });
  };

  const setFoodPairings = (e: SelectEvent): void => {
    const foodPairings = wine.foodPairings.concat(e.target.value);
    setWine({ ...wine, foodPairings });
  };

  const setUrl = (e: ChangeEvent): void => {
    const url = e.target.value;
    setWine({ ...wine, url });
  };

  const resetForm = (): void => {
    setWine(initialState);
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
