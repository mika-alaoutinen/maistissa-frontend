import {
  Button, Input, Radio, RadioGroup, Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectWineCountries, selectWineDescriptions, selectWineFoorPairings } from '../../app/selectors';
import Combobox from '../../components/input/Combobox';
import NumberInput from '../../components/input/NumberInput';
import { NewWine, WineType } from './wineAPI';
import { addWine } from './wineSlice';

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

const AddWine: React.FC = () => {
  const [wine, setWine] = useState<NewWine>(initialState);
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
        onChange={(e) => setWine({
          ...wine,
          name: e.target.value,
        })}
        placeholder="Name"
        value={wine.name}
        variant="flushed"
      />

      <Combobox
        onChange={(e) => setWine({
          ...wine,
          country: e.target.value,
        })}
        options={countries}
        value={wine.country}
        placeholder="Country"
      />

      <RadioGroup
        onChange={(type: NewWine.type) => setWine({
          ...wine,
          type,
        })}
        value={wine.type}
      >
        <Stack direction="row" spacing={4}>
          {Object.keys(WineType).map((type) => (
            <Radio key={type} value={type}>
              {type.toLowerCase()}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>

      <NumberInput
        label="Price"
        onChange={(value) => setWine({
          ...wine,
          price: parseFloat(value),
        })}
      />

      <NumberInput
        label="Volume (l)"
        onChange={(value) => setWine({
          ...wine,
          volume: parseFloat(value),
        })}
      />

      <Combobox
        onChange={(e) => setWine({
          ...wine,
          description: [e.target.value],
        })}
        options={descriptions}
        value={wine.description[0]}
        placeholder="Description"
      />

      <Combobox
        onChange={(e) => setWine({
          ...wine,
          foodPairings: [e.target.value],
        })}
        options={foodPairings}
        value={wine.foodPairings[0]}
        placeholder="Foor pairings"
      />

      <Input
        onChange={(e) => setWine({
          ...wine,
          url: e.target.value,
        })}
        placeholder="URL"
        value={wine.url}
        variant="flushed"
      />

      <Button
        colorScheme="red"
        onClick={handleAddWine}
        type="submit"
      >
        Add wine
      </Button>
    </form>
  );
};

export default AddWine;
