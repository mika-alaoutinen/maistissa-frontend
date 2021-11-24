import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectWines } from '../app/selectors';
import Wines from '../features/wine/Wines';
import { fetchWines } from '../features/wine/wineSlice';

const WinePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectWines).length;

  useEffect(() => {
    void dispatch(fetchWines());
  }, [dispatch]);

  return (
    <div>
      <h2>{`Wines page (${count} wines)`}</h2>
      <Wines />
    </div>
  );
};

export default WinePage;
