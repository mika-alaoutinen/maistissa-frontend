import React from 'react';
import { useAddNewWine } from './hooks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectWineCountries, selectWineDescriptions, selectWineFoorPairings } from '../../app/selectors';
import {
  Combobox, Input, NumberInput, RadioGroup, SubmitButton,
} from '../../components/index';
import { WineType } from '../wine/wineAPI';
import { addWine } from '../wine/wineSlice';

const AddWine: React.FC = () => {
  const {
    wine,
    setName,
    setType,
    setCountry,
    setPrice,
    setVolume,
    setDescription,
    setFoodPairings,
    setUrl,
  } = useAddNewWine();

  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectWineCountries);
  const descriptions = useAppSelector(selectWineDescriptions);
  const foodPairings = useAppSelector(selectWineFoorPairings);

  const handleAddWine = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    void dispatch(addWine(wine));
  };

  return (
    <form>
      <Input
        onChange={setName}
        placeholder="Name"
      />

      <Combobox
        onChange={setCountry}
        options={countries}
        value={wine.country}
        placeholder="Country"
      />

      <RadioGroup
        keys={Object.keys(WineType)}
        onChange={(e) => setType(e)}
      />

      <NumberInput
        label="Price"
        onChange={setPrice}
      />

      <NumberInput
        label="Volume (l)"
        onChange={setVolume}
      />

      <Combobox
        onChange={setDescription}
        options={descriptions}
        value={wine.description[0]}
        placeholder="Description"
      />

      <Combobox
        onChange={setFoodPairings}
        options={foodPairings}
        value={wine.foodPairings[0]}
        placeholder="Foor pairings"
      />

      <Input
        onChange={setUrl}
        placeholder="URL"
      />

      <SubmitButton
        onClick={handleAddWine}
        text="Add wine"
      />
    </form>
  );
};

export default AddWine;
