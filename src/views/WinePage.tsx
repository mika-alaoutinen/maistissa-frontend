import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectWines } from '../app/selectors';
import AddWine from '../features/wine/AddWine';
import WineList from '../features/wine/WineList';
import { fetchWines } from '../features/wine/wineSlice';

const WinePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectWines).length;

  useEffect(() => {
    dispatch(fetchWines());
  }, [dispatch]);

  return (
    <div>
      <h2>{`Wines page (${count} wines)`}</h2>
      <AddWine />
      <WineList />
    </div>
  );
};

export default WinePage;
