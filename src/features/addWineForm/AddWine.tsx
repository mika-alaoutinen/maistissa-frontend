import React from 'react';
import { useWineForm } from './hooks';
import { useAppSelector } from '../../app/hooks';
import { selectWineInfo } from '../../app/selectors';
import {
  Combobox, Input, NumberInput, RadioGroup, Select, SubmitButton,
} from '../../components/index';
import { WineType } from '../../api/wineAPI';

const AddWine: React.FC = () => {
  const { countries, descriptions, foodPairings } = useAppSelector(selectWineInfo);
  const {
    data, errors, onChange, onSubmit,
  } = useWineForm();

  return (
    <form id="add-wine-form">

      <Input
        id="new-wine-name"
        label="Name"
        onChange={onChange('name')}
        validationErrors={errors.name}
        value={data.name}
      />

      <Select
        id="new-wine-country"
        label="Country"
        onChange={onChange('country')}
        options={countries}
        validationErrors={errors.country}
        value={data.country}
      />

      <RadioGroup
        id="new-wine-type"
        label="Wine type"
        onChange={onChange('type')}
        validationErrors={errors.type}
        values={Object.keys(WineType)}
      />

      <NumberInput
        id="new-wine-price"
        label="Price"
        onChange={onChange('price')}
        validationErrors={errors.price}
        value={data.price}
      />

      <NumberInput
        id="new-wine-volume"
        label="Volume (l)"
        onChange={onChange('volume')}
        validationErrors={errors.volume}
        value={data.volume}
      />

      <Combobox
        id="new-wine-description"
        label="Description"
        onChange={onChange('description')}
        options={descriptions}
        validationErrors={errors.description}
        values={data.description}
      />

      <Combobox
        id="new-wine-food-pairings"
        label="Food pairings"
        onChange={onChange('foodPairings')}
        options={foodPairings}
        validationErrors={errors.foodPairings}
        values={data.foodPairings}
      />

      <Input
        id="new-wine-url"
        label="URL"
        onChange={onChange('url')}
        validationErrors={errors.url}
        value={data.url}
      />

      <SubmitButton
        id="add-wine-form-submit"
        onClick={onSubmit}
        text="Add wine"
      />
    </form>
  );
};

export default AddWine;
