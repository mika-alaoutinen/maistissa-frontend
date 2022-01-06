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
  const { data, errors, onChange } = useWineForm();
  // const addWine = useAddWine();

  const handleAddWine = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    console.log('errors', errors);
    console.log(data);
    // void addWine(data);
    // resetForm();
  };

  return (
    <form id="add-wine-form">

      {errors.name && (
        <div className="error_msg">
          Error on name field:
          {' '}
          {errors.name}
        </div>
      )}

      <Input
        id="new-wine-name"
        label="Name"
        onChange={onChange('name')}
        value={data.name}
      />

      <Select
        id="new-wine-country"
        label="Country"
        onChange={onChange('country')}
        options={countries}
        value={data.country}
      />

      <RadioGroup
        id="new-wine-type"
        label="Wine type"
        onChange={onChange('type')}
        values={Object.keys(WineType)}
      />

      <NumberInput
        id="new-wine-price"
        label="Price"
        onChange={onChange('price')}
        value={data.price}
      />

      <NumberInput
        id="new-wine-volume"
        label="Volume (l)"
        onChange={onChange('volume')}
        value={data.volume}
      />

      <Combobox
        id="new-wine-description"
        label="Description"
        onChange={onChange('description')}
        options={descriptions}
        values={data.description}
      />

      <Combobox
        id="new-wine-food-pairings"
        label="Food pairings"
        onChange={onChange('foodPairings')}
        options={foodPairings}
        values={data.foodPairings}
      />

      <Input
        id="new-wine-url"
        label="URL"
        onChange={onChange('url')}
        value={data.url}
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
