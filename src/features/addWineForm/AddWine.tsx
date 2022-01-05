import React from 'react';
import { useAddWine, useWineForm } from './hooks';
import { useAppSelector } from '../../app/hooks';
import { selectWineInfo } from '../../app/selectors';
import {
  Combobox, Input, NumberInput, RadioGroup, Select, SubmitButton,
} from '../../components/index';
import { WineType } from '../../api/wineAPI';

const AddWine: React.FC = () => {
  const { countries, descriptions, foodPairings } = useAppSelector(selectWineInfo);
  const addWine = useAddWine();
  const { wine, setData, resetForm } = useWineForm();

  const handleAddWine = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    void addWine(wine);
    resetForm();
  };

  return (
    <form id="add-wine-form">
      <Input
        id="new-wine-name"
        label="Name"
        onChange={setData('name')}
        value={wine.name}
      />

      <Select
        id="new-wine-country"
        label="Country"
        onChange={setData('country')}
        options={countries}
        value={wine.country}
      />

      <RadioGroup
        id="new-wine-type"
        label="Wine type"
        onChange={setData('type')}
        values={Object.keys(WineType)}
      />

      <NumberInput
        id="new-wine-price"
        label="Price"
        onChange={setData('price')}
        value={wine.price}
      />

      <NumberInput
        id="new-wine-volume"
        label="Volume (l)"
        onChange={setData('volume')}
        value={wine.volume}
      />

      <Combobox
        id="new-wine-description"
        label="Description"
        onChange={setData('description')}
        options={descriptions}
        values={wine.description}
      />

      <Combobox
        id="new-wine-food-pairings"
        label="Food pairings"
        onChange={setData('foodPairings')}
        options={foodPairings}
        values={wine.foodPairings}
      />

      <Input
        id="new-wine-url"
        label="URL"
        onChange={setData('url')}
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
