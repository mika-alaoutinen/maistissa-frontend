import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectWines } from '../../app/selectors';
import { DataTable } from '../../components/index';
import { Column } from '../../components/datatable/types';
import { useSorting } from '../wine/hooks';
import { Wine } from '../wine/wineAPI';

const WineTable: React.FC = () => {
  const { sorted, wines } = useAppSelector(selectWines);
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

export default WineTable;
