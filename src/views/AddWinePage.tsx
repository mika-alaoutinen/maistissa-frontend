import React, { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import AddWine from '../features/addWineForm/AddWine';
import { fetchCountries, fetchDescriptions, fetchFoodPairings } from '../features/wineInfo/wineInfoSlice';

const AddWinePage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchCountries());
    void dispatch(fetchDescriptions());
    void dispatch(fetchFoodPairings());
  }, [dispatch]);

  return (
    <div>
      <h2>Add new wine</h2>
      <AddWine />
    </div>
  );
};

export default AddWinePage;
