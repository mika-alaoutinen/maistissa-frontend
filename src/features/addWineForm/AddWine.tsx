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
        id="new-wine-name"
        label="Name"
        onChange={setName}
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
        id="new-wine-price"
        label="Price"
        onChange={setPrice}
      />

      <NumberInput
        id="new-wine-volume"
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
        id="new-wine-url"
        label="URL"
        onChange={setUrl}
      />

      <SubmitButton
        onClick={handleAddWine}
        text="Add wine"
      />
    </form>
  );
};

export default AddWine;
