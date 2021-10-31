import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { NewWine, WineType } from './wineAPI';
import { addWine } from './wineSlice';

const wine: NewWine = {
  name: 'White wine 1',
  type: WineType.WHITE,
  country: 'Spain',
  price: 10.5,
  volume: 0.75,
  description: ['dry', 'aromatic'],
  foodPairings: ['white meat'],
  url: '',
};

const AddWine: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleAddWine = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    void dispatch(addWine(wine));
  };

  return (
    <div>
      <button onClick={handleAddWine} type="submit">
        Add wine
      </button>
    </div>
  );
};

export default AddWine;
