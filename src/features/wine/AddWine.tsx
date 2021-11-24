import { Button, Input, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
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
      </div>
      <form>
        <Input
          onChange={(e) => setWine({
            ...wine,
            name: e.target.value,
          })}
          placeholder="Wine name"
          value={wine.name}
          variant="flushed"
        />

        <Select placeholder="Wine country" variant="flushed">
          <option>Spain</option>
        </Select>

        <Button colorScheme="red" onClick={handleAddWine} type="submit">
          Add wine
        </Button>
      </form>
    </>
  );
};

export default AddWine;
