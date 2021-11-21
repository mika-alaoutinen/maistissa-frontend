import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectWines, selectWinesSorted } from '../app/selectors';
import DataTable from '../components/datatable/DataTable';
import { Column } from '../components/datatable/types';
import { useSorting } from '../features/wine/hooks/wineSorting';
import { Wine } from '../features/wine/wineAPI';

const HomePage: React.FC = () => {
  const wines = useAppSelector(selectWines);
  const sorted = useAppSelector(selectWinesSorted);
  const sortingFn = useSorting();

  const columns: Column<Wine, keyof Wine>[] = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'type',
      header: 'Type',
    },
    {
      key: 'country',
      header: 'Country',
    },
    {
      key: 'volume',
      header: 'Volume (l)',
    },
    {
      key: 'price',
      header: 'Price (€)',
    },
  ];

  return (
    <div>
      <h1>Home page</h1>
      <DataTable
        columns={columns}
        data={wines}
        sorted={sorted}
        sortingFn={sortingFn}
      />
    </div>
  );
};

export default HomePage;
