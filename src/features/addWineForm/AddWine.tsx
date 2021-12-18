import React from 'react';
import { useAddNewWine } from './hooks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectWineInfo } from '../../app/selectors';
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
  const { countries, descriptions, foodPairings } = useAppSelector(selectWineInfo);

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
        label="Country"
        onChange={setCountry}
        options={countries}
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
        label="Description"
        onChange={setDescription}
        options={descriptions}

      />

      <Combobox
        label="Foor pairings"
        onChange={setFoodPairings}
        options={foodPairings}
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
