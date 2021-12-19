import React from 'react';
import { useWineForm } from './hooks';
import { useAppSelector } from '../../app/hooks';
import { selectWineInfo } from '../../app/selectors';
import {
  Combobox, Input, NumberInput, RadioGroup, Select, SubmitButton,
} from '../../components/index';
import { WineType } from '../wine/wineAPI';

const AddWine: React.FC = () => {
  const { countries, descriptions, foodPairings } = useAppSelector(selectWineInfo);
  // const addWine = useAddWine();
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
    // void addWine(wine);
    console.log(wine);
    resetForm();
  };

  return (
    <form id="add-wine-form">
      <Input
        id="new-wine-name"
        label="Name"
        onChange={setName}
        value={wine.name}
      />

      <Select
        id="new-wine-country"
        label="Country"
        onChange={setCountry}
        options={countries}
        value={wine.country}
      />

      <RadioGroup
        id="new-wine-type"
        label="Wine type"
        onChange={(e) => setType(e)}
        values={Object.keys(WineType)}
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
        values={wine.description}
      />

      <Combobox
        id="new-wine-food-pairings"
        label="Food pairings"
        onChange={setFoodPairings}
        options={foodPairings}
        values={wine.foodPairings}
      />

      <Input
        id="new-wine-url"
        label="URL"
        onChange={setUrl}
        value={wine.url}
      />

      <SubmitButton
        id="add-wine-form-submit"
        onClick={handleAddWine}
        text="Add wine"
      />
    </form>
  );
};

export default AddWine;
