import React, { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import AddWine from '../features/wine/AddWine';
import { fetchCountries } from '../features/wineInfo/wineInfoSlice';

const AddWinePage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <div>
      <h2>Add new wine</h2>
      <AddWine />
    </div>
  );
};

export default AddWinePage;
