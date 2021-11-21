import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectWines, selectWinesSorted } from '../app/selectors';
import DataTable from '../components/datatable/DataTable';
import { useSorting } from '../features/wine/hooks/wineSorting';
import { WineProps } from '../features/wine/wineAPI';

type Headers = {
  key: WineProps,
  text: string
};

const wineHeaders: Headers[] = [
  {
    key: 'name',
    text: 'Name',
  },
  {
    key: 'type',
    text: 'Type',
  },
  {
    key: 'country',
    text: 'Country',
  },
  {
    key: 'volume',
    text: 'Volume (l)',
  },
  {
    key: 'price',
    text: 'Price (€)',
  },
];

const HomePage: React.FC = () => {
  const wines = useAppSelector(selectWines).map(({
    name, type, country, volume, price,
  }) => ({
    name, type, country, volume, price,
  }));

  const sorted = useAppSelector(selectWinesSorted);

  const sortingFn = useSorting();

  return (
    <div>
      <h1>Home page</h1>
      <DataTable
        data={wines}
        headers={wineHeaders}
        sorted={sorted}
        sortingFn={sortingFn}
      />
    </div>
  );
};

export default HomePage;
