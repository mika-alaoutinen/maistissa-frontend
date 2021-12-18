import React from 'react';
import { useAddWine, useWineForm } from './hooks';
import { useAppSelector } from '../../app/hooks';
import { selectWineInfo } from '../../app/selectors';
import {
  Combobox, Input, NumberInput, RadioGroup, SubmitButton,
} from '../../components/index';
import { WineType } from '../wine/wineAPI';

const AddWine: React.FC = () => {
  const { countries, descriptions, foodPairings } = useAppSelector(selectWineInfo);
  const addWine = useAddWine();
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
    resetForm,
  } = useWineForm();

  const handleAddWine = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    const addedWine = await addWine(wine);
    console.log('added wine', addedWine);
    resetForm();
  };

  return (
    <form>
      <Input
        id="new-wine-name"
        label="Name"
        onChange={setName}
      />

      <Combobox
        id="new-wine-country"
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
        id="new-wine-description"
        label="Description"
        onChange={setDescription}
        options={descriptions}

      />

      <Combobox
        id="new-wine-food-pairings"
        label="Food pairings"
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
