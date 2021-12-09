import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectWines, selectWinesSorted } from '../../app/selectors';
import { DataTable } from '../../components/index';
import { Column } from '../../components/datatable/types';
import { useSorting } from './hooks';
import { Wine } from './wineAPI';

const Wines: React.FC = () => {
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
    <DataTable
      columns={columns}
      data={wines}
      sorted={sorted}
      sortingFn={sortingFn}
    />
  );
};

export default Wines;
