import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectWineCountries } from '../../app/selectors';
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

  const handleAddWine = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    void dispatch(addWine(wine));
  };

  return (
    <>
      <div className="debug">
        <p>
          New wine name:
          {' '}
          {wine.name}
        </p>
        <p>
          New wine country:
          {' '}
          {wine.country}
        </p>

        <p>
          New wine type:
          {' '}
          {wine.type}
        </p>

        <p>
          New wine price:
          {' '}
          {wine.price}
        </p>

        <p>
          New wine volume:
          {' '}
          {wine.volume}
        </p>
      </div>

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

        <Select
          onChange={(e) => setWine({
            ...wine,
            country: e.target.value,
          })}
          placeholder="country"
          value={wine.country}
          variant="flushed"
        >
          {countries.map((country) => (
            <option key={country}>
              {country}
            </option>
          ))}
        </Select>

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

        <Button
          colorScheme="red"
          onClick={handleAddWine}
          type="submit"
        >
          Add wine
        </Button>
      </form>
    </>
  );
};

export default AddWine;
