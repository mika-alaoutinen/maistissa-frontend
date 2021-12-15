import {
  Button, Radio, RadioGroup, Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectWineCountries, selectWineDescriptions, selectWineFoorPairings } from '../../app/selectors';
import { Combobox, Input, NumberInput } from '../../components/index';
import { NewWine, WineType } from '../wine/wineAPI';

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
  // const dispatch = useAppDispatch();
  const countries = useAppSelector(selectWineCountries);
  const descriptions = useAppSelector(selectWineDescriptions);
  const foodPairings = useAppSelector(selectWineFoorPairings);

  const handleAddWine = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    console.log(wine);
    // void dispatch(addWine(wine));
  };

  return (
    <form>
      <Input
        onChange={(e) => setWine({
          ...wine,
          name: e.target.value,
        })}
        placeholder="Name"
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
        onChange={(e) => setWine({
          ...wine,
          price: parseFloat(e.target.value),
        })}
      />

      <NumberInput
        label="Volume (l)"
        onChange={(e) => setWine({
          ...wine,
          volume: parseFloat(e.target.value),
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
