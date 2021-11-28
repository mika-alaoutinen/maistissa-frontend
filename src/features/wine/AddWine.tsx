import { Button, Input, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectWineCountries } from '../../app/selectors';
import { NewWine, WineType } from './wineAPI';
import { addWine } from './wineSlice';

const initialState: NewWine = {
  name: '',
  type: WineType.WHITE,
  country: '',
  price: -1,
  volume: -1,
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
